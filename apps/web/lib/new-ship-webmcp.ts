import { json, modelContext, type ModelContextTool } from "@/lib/onboarding-webmcp"
import {
  SHIP_FIELD_KEYS,
  SHIP_LIMITS,
  slugifyShip,
  validateShip,
  type ImportResult,
  type ShipErrorKey,
  type ShipFields,
} from "@/lib/new-ship-draft"

export type NewShipToolHost = {
  steps: readonly string[]
  getStep: () => number
  getFields: () => ShipFields
  setFields: (fields: ShipFields) => void
  /** Reads a link into the form. Resolves with what it filled, or the reason it could not. */
  importFromLink: (url: string) => Promise<{ ok: true; result: ImportResult } | { ok: false; reason: string }>
  /** Moves to the last step and focuses the publish button. The member still has to click it. */
  requestSubmit: () => void
  /** True when this member's next Ship goes to review instead of publishing. */
  firstShip: () => boolean
}

const MESSAGES: Record<ShipErrorKey, string> = {
  nameRequired: "Name is required, up to 100 characters",
  slugInvalid: "Use 3 to 80 lowercase letters, numbers and inner hyphens",
  taglineShort: "Tagline needs at least 4 characters",
  taglineLong: "Tagline can have at most 180 characters",
  descriptionShort: "Description needs at least 20 characters",
  descriptionLong: "Description can have at most 5000 characters",
  urlInvalid: "Use a valid http or https URL",
  imageInvalid: "Use a valid http or https image URL",
}

const REQUIRED = ["name", "slug", "tagline", "description"]

function problems(fields: ShipFields) {
  return Object.fromEntries(Object.entries(validateShip(fields)).map(([key, code]) => [key, MESSAGES[code as ShipErrorKey]]))
}

function snapshot(host: NewShipToolHost) {
  const fields = host.getFields()
  const issues = problems(fields)
  return {
    step: host.getStep() + 1,
    stepName: host.steps[host.getStep()],
    steps: host.steps,
    required: REQUIRED,
    problems: issues,
    readyToSubmit: Object.keys(issues).length === 0,
    willBeReviewed: host.firstShip(),
    ship: fields,
  }
}

/** Applies the fields an agent sent. Fields that fail validation are reported and left unchanged. */
export function applyShipFields(current: ShipFields, input: Record<string, unknown>) {
  const next: ShipFields = { ...current }
  const applied: string[] = []
  const rejected: { field: string; reason: string }[] = []
  for (const key of SHIP_FIELD_KEYS) {
    const value = input[key]
    if (value === undefined) continue
    if (typeof value !== "string") {
      rejected.push({ field: key, reason: "Expected a string" })
      continue
    }
    next[key] = key === "slug" ? slugifyShip(value) : value
    applied.push(key)
  }
  // A name without a slug gets one, unless the member already chose their own.
  if (applied.includes("name") && !applied.includes("slug") && (!current.slug || current.slug === slugifyShip(current.name))) {
    next.slug = slugifyShip(next.name)
    applied.push("slug")
  }
  const issues = validateShip(next)
  for (const field of [...applied]) {
    const code = issues[field as keyof ShipFields]
    if (!code) continue
    rejected.push({ field, reason: MESSAGES[code] })
    applied.splice(applied.indexOf(field), 1)
    next[field as keyof ShipFields] = current[field as keyof ShipFields]
  }
  return { fields: next, applied, rejected }
}

export function registerNewShipTools(host: NewShipToolHost): () => void {
  const context = modelContext()
  if (!context) return () => {}
  const controller = new AbortController()
  const tools: ModelContextTool[] = [
    {
      name: "get_ship_draft_state",
      title: "Read the new Ship form",
      description: "Returns the current step, every value in the new Ship form, validation problems, and whether publishing will send this Ship to review.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: () => json(snapshot(host)),
    },
    {
      name: "import_from_link",
      title: "Fill the form from a link",
      description: "Reads a public GitHub repository or website and fills name, tagline, description, cover and links. Only fields the link provides are changed. Never saves or publishes.",
      inputSchema: { type: "object", properties: { url: { type: "string", description: "A GitHub repository or website URL." } }, required: ["url"] },
      annotations: { untrustedContentHint: true },
      execute: async (input) => {
        const url = typeof input?.url === "string" ? input.url : ""
        if (!url.trim()) return json({ error: "url is required" })
        const outcome = await host.importFromLink(url)
        if (!outcome.ok) return json({ status: "failed", reason: outcome.reason, state: snapshot(host) })
        return json({ status: "filled", source: outcome.result.source, complete: outcome.result.complete, hasCrafterShipTopic: outcome.result.hasTopic, state: snapshot(host) })
      },
    },
    {
      name: "fill_ship_fields",
      title: "Fill Ship fields",
      description: "Fills fields of the new Ship form, validated like the API does. Send only what you know. Invalid fields are returned in `rejected` and left unchanged. This never saves or publishes.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: `Up to ${SHIP_LIMITS.name} characters.` },
          slug: { type: "string", description: "Lowercase letters, numbers and inner hyphens, 3 to 80 characters." },
          tagline: { type: "string", description: "One short line saying what it does, not keywords. 4 to 180 characters." },
          description: { type: "string", description: "20 to 5000 characters." },
          imageUrl: { type: "string", description: "Cover image URL (http or https). Empty string clears it." },
          repository: { type: "string", description: "Repository URL." },
          website: { type: "string", description: "Website URL." },
          socialPostUrl: { type: "string", description: "A LinkedIn, Instagram, X, YouTube or Substack post URL." },
        },
      },
      annotations: { untrustedContentHint: true },
      execute: (input) => {
        const result = applyShipFields(host.getFields(), input ?? {})
        host.setFields(result.fields)
        return json({ applied: result.applied, rejected: result.rejected, state: snapshot(host) })
      },
    },
    {
      name: "submit_ship",
      title: "Review and publish the Ship",
      description: "Moves to the preview step and highlights the publish button. It does not publish anything: the person must click the button themselves. Tell them to review the preview and click it.",
      inputSchema: { type: "object", properties: {} },
      annotations: { consequentialHint: true },
      execute: () => {
        const state = snapshot(host)
        if (!state.readyToSubmit) return json({ status: "not_ready", ...state })
        host.requestSubmit()
        return json({
          status: "awaiting_user_click",
          message: host.firstShip() ? "Ask the person to review the preview and click Send for review." : "Ask the person to review the preview and click Publish Ship.",
          state: snapshot(host),
        })
      },
    },
  ]
  for (const tool of tools) {
    try {
      Promise.resolve(context.registerTool(tool, { signal: controller.signal })).catch(() => {})
    } catch {
      // A page must keep working when the browser rejects a tool.
    }
  }
  return () => controller.abort()
}
