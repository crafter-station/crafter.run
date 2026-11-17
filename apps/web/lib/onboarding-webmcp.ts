import { parsePlaceText, type Place } from "@/lib/place"
import { LINK_KEYS, MAX_ROLES, isDraftReady, slugifyHandle, validateDraft, type LinkKey, type ProfileDraft } from "@/lib/profile-draft"

/**
 * WebMCP (https://github.com/webmachinelearning/webmcp): pages register tools on
 * `document.modelContext`. Older builds exposed `navigator.modelContext`, so both are probed.
 * Nothing happens in a browser without it.
 */
type ToolResult = { content: { type: "text"; text: string }[] }
type ModelContextTool = {
  name: string
  title?: string
  description: string
  inputSchema?: object
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean; consequentialHint?: boolean }
  execute: (input: Record<string, unknown>, options?: { signal?: AbortSignal }) => Promise<ToolResult> | ToolResult
}
type ModelContextLike = { registerTool: (tool: ModelContextTool, options?: { signal?: AbortSignal }) => unknown }

export type OnboardingToolHost = {
  steps: readonly string[]
  getStep: () => number
  getDraft: () => ProfileDraft
  setDraft: (draft: ProfileDraft) => void
  goToStep: (index: number) => void
  /** Focuses the visible submit button. The member still has to click it. */
  requestSubmit: () => void
  handleStatus: () => "unknown" | "checking" | "available" | "taken"
}

function modelContext(): ModelContextLike | null {
  if (typeof document === "undefined") return null
  const candidate = (document as unknown as { modelContext?: ModelContextLike }).modelContext
    ?? (navigator as unknown as { modelContext?: ModelContextLike }).modelContext
  return candidate && typeof candidate.registerTool === "function" ? candidate : null
}

const json = (value: unknown): ToolResult => ({ content: [{ type: "text", text: JSON.stringify(value) }] })

function snapshot(host: OnboardingToolHost) {
  const draft = host.getDraft()
  const missing = [!draft.handle.trim() && "handle", !draft.displayName.trim() && "displayName"].filter(Boolean)
  return {
    step: host.getStep() + 1,
    stepName: host.steps[host.getStep()],
    steps: host.steps,
    required: ["handle", "displayName"],
    missingRequired: missing,
    handleStatus: host.handleStatus(),
    readyToSubmit: isDraftReady(draft) && host.handleStatus() !== "taken",
    problems: validateDraft(draft),
    profile: {
      handle: draft.handle,
      displayName: draft.displayName,
      bio: draft.bio,
      currentRole: draft.currentRole,
      rolesOpenTo: draft.rolesOpenTo,
      isJobSeeking: draft.isJobSeeking,
      origin: draft.origin,
      based: draft.based,
      links: draft.links,
    },
  }
}

function placeFromInput(value: unknown): Place | null | undefined {
  if (value === null || value === "") return null
  if (typeof value === "string") return parsePlaceText(value) ?? undefined
  if (value && typeof value === "object") {
    const input = value as Record<string, unknown>
    const text = [input.city, input.country ?? input.countryCode].filter((part): part is string => typeof part === "string" && part !== "").join(", ")
    return parsePlaceText(text) ?? undefined
  }
  return undefined
}

/** Applies the fields an agent sent. Fields that fail validation are reported and left unchanged. */
export function applyProfileFields(draft: ProfileDraft, input: Record<string, unknown>) {
  const next: ProfileDraft = { ...draft, links: { ...draft.links }, rolesOpenTo: [...draft.rolesOpenTo] }
  const applied: string[] = []
  const rejected: { field: string; reason: string }[] = []
  const reject = (field: string, reason: string) => rejected.push({ field, reason })
  const text = (field: "displayName" | "bio" | "currentRole", max: number) => {
    const value = input[field]
    if (value === undefined) return
    if (typeof value !== "string") return reject(field, "Expected a string")
    if (value.length > max) return reject(field, `At most ${max} characters`)
    next[field] = value
    applied.push(field)
  }

  if (input.handle !== undefined) {
    const handle = typeof input.handle === "string" ? slugifyHandle(input.handle) : ""
    if (handle) { next.handle = handle; applied.push("handle") } else reject("handle", "Use 3 to 40 lowercase letters, numbers and inner hyphens")
  }
  text("displayName", 80)
  text("bio", 280)
  text("currentRole", 120)
  if (input.isJobSeeking !== undefined) {
    if (typeof input.isJobSeeking === "boolean") { next.isJobSeeking = input.isJobSeeking; applied.push("isJobSeeking") } else reject("isJobSeeking", "Expected a boolean")
  }
  if (input.rolesOpenTo !== undefined) {
    if (Array.isArray(input.rolesOpenTo) && input.rolesOpenTo.every((role) => typeof role === "string")) {
      const roles = [...new Set((input.rolesOpenTo as string[]).map((role) => role.trim()).filter(Boolean))]
      if (roles.length > MAX_ROLES || roles.some((role) => role.length > 80)) reject("rolesOpenTo", `Up to ${MAX_ROLES} roles, 80 characters each`)
      else { next.rolesOpenTo = roles; applied.push("rolesOpenTo") }
    } else reject("rolesOpenTo", "Expected an array of strings")
  }
  for (const field of ["origin", "based"] as const) {
    if (input[field] === undefined) continue
    const place = placeFromInput(input[field])
    if (place === undefined) reject(field, 'Use a "City, Country" string')
    else { next[field] = place; applied.push(field) }
  }
  if (input.links !== undefined) {
    if (input.links && typeof input.links === "object") {
      for (const [key, value] of Object.entries(input.links as Record<string, unknown>)) {
        if (!(LINK_KEYS as readonly string[]).includes(key)) reject(`links.${key}`, `Unknown link. Use ${LINK_KEYS.join(", ")}`)
        else if (typeof value !== "string") reject(`links.${key}`, "Expected a string")
        else { next.links[key as LinkKey] = value; applied.push(`links.${key}`) }
      }
    } else reject("links", "Expected an object")
  }

  // Keep only the fields that the API would accept.
  const problems = validateDraft(next)
  for (const key of Object.keys(problems)) {
    const field = ({ githubUrl: "links.github", gitlabUrl: "links.gitlab", linkedinUrl: "links.linkedin", instagramUrl: "links.instagram", xUrl: "links.x", primaryWebsiteUrl: "links.website", secondaryWebsiteUrl: "links.website2", originLocation: "origin", basedLocation: "based" } as Record<string, string>)[key] ?? key
    if (!applied.includes(field)) continue
    reject(field, problems[key]!)
    applied.splice(applied.indexOf(field), 1)
    if (field.startsWith("links.")) next.links[field.slice(6) as LinkKey] = draft.links[field.slice(6) as LinkKey]
    else (next as Record<string, unknown>)[field] = (draft as Record<string, unknown>)[field]
  }
  return { draft: next, applied, rejected }
}

export function registerOnboardingTools(host: OnboardingToolHost): () => void {
  const context = modelContext()
  if (!context) return () => {}
  const controller = new AbortController()
  const tools: ModelContextTool[] = [
    {
      name: "get_onboarding_state",
      title: "Read the profile form",
      description: "Returns the current step, which required fields are missing, validation problems and every value in the Crafter profile form.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: () => json(snapshot(host)),
    },
    {
      name: "fill_profile_fields",
      title: "Fill profile fields",
      description: "Fills fields of the Crafter profile form, validated like the API does. Send only what you know; only handle and displayName are required. Invalid fields are returned in `rejected` and left unchanged. This never saves the profile.",
      inputSchema: {
        type: "object",
        properties: {
          handle: { type: "string", description: "Lowercase letters, numbers and inner hyphens, 3 to 40 characters." },
          displayName: { type: "string", description: "Full name, up to 80 characters." },
          bio: { type: "string", description: "Up to 280 characters." },
          currentRole: { type: "string", description: "For example: Product designer at Acme." },
          rolesOpenTo: { type: "array", items: { type: "string" }, description: "Up to 10 roles." },
          isJobSeeking: { type: "boolean" },
          origin: { type: "string", description: 'Where they are from, as "City, Country". Empty string clears it.' },
          based: { type: "string", description: 'Where they live now, as "City, Country". Empty string clears it.' },
          links: {
            type: "object",
            description: "Usernames or URLs.",
            properties: Object.fromEntries(LINK_KEYS.map((key) => [key, { type: "string" }])),
          },
        },
      },
      annotations: { untrustedContentHint: true },
      execute: (input) => {
        const result = applyProfileFields(host.getDraft(), input ?? {})
        host.setDraft(result.draft)
        return json({ applied: result.applied, rejected: result.rejected, state: snapshot(host) })
      },
    },
    {
      name: "go_to_step",
      title: "Go to a step",
      description: `Shows one step of the profile form. Steps: ${host.steps.map((name, index) => `${index + 1} ${name}`).join(", ")}.`,
      inputSchema: { type: "object", properties: { step: { type: "integer", minimum: 1, maximum: host.steps.length } }, required: ["step"] },
      execute: (input) => {
        const step = Number(input?.step)
        if (!Number.isInteger(step) || step < 1 || step > host.steps.length) return json({ error: `step must be 1 to ${host.steps.length}` })
        host.goToStep(step - 1)
        return json(snapshot(host))
      },
    },
    {
      name: "submit_profile",
      title: "Review and create the profile",
      description: "Moves to the last step and highlights the Create profile button. It does not save anything: the person must click the button themselves. Tell them to review and click it.",
      inputSchema: { type: "object", properties: {} },
      annotations: { consequentialHint: true },
      execute: () => {
        const state = snapshot(host)
        if (!state.readyToSubmit) return json({ status: "not_ready", ...state })
        host.requestSubmit()
        return json({ status: "awaiting_user_click", message: "Ask the person to review the form and click Create profile.", state: snapshot(host) })
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
