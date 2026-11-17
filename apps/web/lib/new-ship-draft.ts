import { httpUrlSchema, shipSlugSchema, socialPostUrlSchema } from "@crafter/contracts"

/** What the new Ship form edits. Every value is the raw text the member typed or an import filled in. */
export type ShipFields = {
  name: string
  slug: string
  tagline: string
  description: string
  /** An http(s) cover URL, filled by an import. An uploaded file is held separately. */
  imageUrl: string
  repository: string
  website: string
  socialPostUrl: string
}

export const SHIP_FIELD_KEYS = ["name", "slug", "tagline", "description", "imageUrl", "repository", "website", "socialPostUrl"] as const

export const SHIP_LIMITS = { name: 100, slug: 80, taglineMin: 4, tagline: 180, descriptionMin: 20, description: 5000 } as const

export type ShipErrorKey = "nameRequired" | "slugInvalid" | "taglineShort" | "taglineLong" | "descriptionShort" | "descriptionLong" | "urlInvalid" | "imageInvalid"
export type ShipIssues = Partial<Record<keyof ShipFields, ShipErrorKey>>

export function emptyShipFields(): ShipFields {
  return { name: "", slug: "", tagline: "", description: "", imageUrl: "", repository: "", website: "", socialPostUrl: "" }
}

/** Turns a name into a slug the API accepts, or an empty string. */
export function slugifyShip(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SHIP_LIMITS.slug)
    .replace(/-+$/g, "")
}

/** Adds https:// to a bare domain. Returns "" for blank input. */
export function normalizeUrl(value: string): string {
  const text = value.trim()
  if (!text) return ""
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(text) ? text : `https://${text}`
}

export function parseRepoUrl(value: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(normalizeUrl(value))
    if (!["github.com", "www.github.com"].includes(url.hostname.toLowerCase())) return null
    const [owner, repo] = url.pathname.split("/").filter(Boolean)
    if (!owner || !repo) return null
    return { owner, repo: repo.replace(/\.git$/i, "") }
  } catch {
    return null
  }
}

const urlOk = (value: string, schema: typeof httpUrlSchema | typeof socialPostUrlSchema) => {
  if (!schema.safeParse(value).success) return false
  // A bare word like "nope" becomes https://nope, which is not a web address a person can visit.
  return new URL(value).hostname.includes(".")
}

export function validateShip(fields: ShipFields): ShipIssues {
  const issues: ShipIssues = {}
  const name = fields.name.trim()
  if (!name || name.length > SHIP_LIMITS.name) issues.name = "nameRequired"
  if (!shipSlugSchema.safeParse(fields.slug).success) issues.slug = "slugInvalid"
  const tagline = fields.tagline.trim()
  if (tagline.length < SHIP_LIMITS.taglineMin) issues.tagline = "taglineShort"
  else if (tagline.length > SHIP_LIMITS.tagline) issues.tagline = "taglineLong"
  const description = fields.description.trim()
  if (description.length < SHIP_LIMITS.descriptionMin) issues.description = "descriptionShort"
  else if (description.length > SHIP_LIMITS.description) issues.description = "descriptionLong"
  for (const key of ["repository", "website"] as const) {
    if (fields[key].trim() && !urlOk(normalizeUrl(fields[key]), httpUrlSchema)) issues[key] = "urlInvalid"
  }
  if (fields.socialPostUrl.trim() && !urlOk(normalizeUrl(fields.socialPostUrl), socialPostUrlSchema)) issues.socialPostUrl = "urlInvalid"
  if (fields.imageUrl.trim() && !urlOk(fields.imageUrl.trim(), httpUrlSchema)) issues.imageUrl = "imageInvalid"
  return issues
}

export function isShipReady(fields: ShipFields): boolean {
  return Object.keys(validateShip(fields)).length === 0
}

/** The body for POST /v1/ship-drafts and PATCH /v1/ship-drafts/:id. `imageUrl` overrides the typed one after an upload. */
export function shipToRequest(fields: ShipFields, provenance: string[], imageUrl?: string | null) {
  const links = [
    ["repository", fields.repository],
    ["website", fields.website],
  ].flatMap(([type, url]) => (url!.trim() ? [{ type: type!, url: normalizeUrl(url!) }] : []))
  const cover = imageUrl === undefined ? fields.imageUrl.trim() || null : imageUrl
  return {
    slug: fields.slug,
    name: fields.name.trim(),
    tagline: fields.tagline.trim(),
    description: fields.description.trim(),
    imageUrl: cover,
    socialPostUrl: fields.socialPostUrl.trim() ? normalizeUrl(fields.socialPostUrl) : null,
    links,
    provenance,
  }
}

/** Cuts text at a sentence or word boundary so it fits `max` characters. */
export function clipText(value: string, max: number): string {
  const text = value.replace(/\s+/g, " ").trim()
  if (text.length <= max) return text
  const sentence = text.slice(0, max).match(/^(.*[.!?])\s/)
  if (sentence && sentence[1]!.length >= 20) return sentence[1]!
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`
}

/** The first prose paragraphs of a README: no headings, badges, images, HTML or code. */
export function readmeSummary(markdown: string, max = 600): string {
  const paragraphs: string[] = []
  let inCode = false
  let current: string[] = []
  const flush = () => {
    const text = current.join(" ").replace(/\s+/g, " ").trim()
    current = []
    if (text.length >= 40 && !/^[|>\-*+\d]/.test(text)) paragraphs.push(text)
  }
  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trim()
    if (line.startsWith("```") || line.startsWith("~~~")) {
      inCode = !inCode
      flush()
      continue
    }
    if (inCode) continue
    if (!line || line.startsWith("#") || line.startsWith("<") || line.startsWith("![") || line.startsWith("[![") || /^[-=_*]{3,}$/.test(line)) {
      flush()
      continue
    }
    current.push(line)
  }
  flush()
  const text = paragraphs
    .join("\n\n")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
  return text.length <= max ? text : clipText(text, max)
}

/** A site title without the " | Brand" tail most pages add. */
export function cleanSiteTitle(title: string): string {
  const head = title.split(/\s+[|–—·-]\s+/)[0]?.trim()
  return (head || title).slice(0, SHIP_LIMITS.name)
}

export function nameFromHost(url: string): string {
  try {
    const host = new URL(normalizeUrl(url)).hostname.replace(/^www\./, "")
    const label = host.split(".")[0] ?? host
    return label.charAt(0).toUpperCase() + label.slice(1)
  } catch {
    return ""
  }
}

export type ImportErrorKey = "invalidUrl" | "repoNotFound" | "rateLimited" | "importFailed" | "siteUnreachable"
export class ImportError extends Error {
  constructor(readonly key: ImportErrorKey) {
    super(key)
  }
}

export type ImportResult = {
  source: "github" | "site"
  /** Fields the import could fill. Empty values are left out. */
  fields: Partial<ShipFields>
  /** True when the repository already carries the crafter-ship topic. Null when unknown. */
  hasTopic: boolean | null
  /** False when only part of the page could be read. */
  complete: boolean
  provenance: string
}

type RepoPayload = { name?: string; description?: string | null; homepage?: string | null; html_url?: string; topics?: string[] }
type PageMeta = { title: string | null; description: string | null; image: string | null; siteName: string | null }

/** Reads a public GitHub repository or any web page into form fields. Fetches only through the passed functions. */
export async function importShipFromLink(
  input: string,
  io: { fetchImpl?: typeof fetch; pageMeta: (url: string) => Promise<PageMeta | null> },
): Promise<ImportResult> {
  const fetchImpl = io.fetchImpl ?? fetch
  const link = normalizeUrl(input)
  let url: URL
  try {
    url = new URL(link)
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) throw new Error("scheme")
  } catch {
    throw new ImportError("invalidUrl")
  }
  const repo = parseRepoUrl(link)
  if (repo) {
    const base = `https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}`
    const response = await fetchImpl(base, { headers: { Accept: "application/vnd.github+json" } })
    if (response.status === 404) throw new ImportError("repoNotFound")
    if (response.status === 403 || response.status === 429) throw new ImportError("rateLimited")
    if (!response.ok) throw new ImportError("importFailed")
    const data = (await response.json()) as RepoPayload
    const readme = await fetchImpl(`${base}/readme`, { headers: { Accept: "application/vnd.github.raw+json" } })
      .then((res) => (res.ok ? res.text() : ""))
      .catch(() => "")
    const summary = readme ? readmeSummary(readme) : ""
    const about = (data.description ?? "").replace(/\s+/g, " ").trim()
    const description = summary.length > about.length ? summary : about
    const homepage = data.homepage?.trim() ? normalizeUrl(data.homepage) : ""
    const meta = homepage ? await io.pageMeta(homepage).catch(() => null) : null
    const name = data.name ?? repo.repo
    const fields: Partial<ShipFields> = {
      name,
      slug: slugifyShip(name),
      repository: data.html_url ?? `https://github.com/${repo.owner}/${repo.repo}`,
      ...(about ? { tagline: clipText(about, SHIP_LIMITS.tagline) } : {}),
      ...(description ? { description: description.slice(0, SHIP_LIMITS.description) } : {}),
      ...(homepage ? { website: homepage } : {}),
      ...(meta?.image ? { imageUrl: meta.image } : {}),
    }
    return { source: "github", fields, hasTopic: Array.isArray(data.topics) ? data.topics.includes("crafter-ship") : null, complete: Boolean(about), provenance: `metadata URL: ${fields.repository}` }
  }
  // pageMeta throws ImportError("siteUnreachable") when the host does not answer: that link never becomes a Ship.
  const meta = await io.pageMeta(url.toString()).catch((cause) => {
    if (cause instanceof ImportError) throw cause
    return null
  })
  const name = meta?.siteName || (meta?.title ? cleanSiteTitle(meta.title) : "") || nameFromHost(link)
  const summary = meta?.description?.replace(/\s+/g, " ").trim() ?? ""
  const fields: Partial<ShipFields> = {
    name,
    slug: slugifyShip(name),
    website: url.toString().replace(/\/$/, ""),
    ...(summary ? { tagline: clipText(summary, SHIP_LIMITS.tagline), description: summary.slice(0, SHIP_LIMITS.description) } : {}),
    ...(meta?.image ? { imageUrl: meta.image } : {}),
  }
  return { source: "site", fields, hasTopic: null, complete: Boolean(meta && summary), provenance: `metadata URL: ${fields.website}` }
}
