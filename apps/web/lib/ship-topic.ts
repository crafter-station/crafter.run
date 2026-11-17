/** Pure matching and derivation for the `crafter-ship` GitHub topic. No I/O here. */

export const SHIP_TOPIC = "crafter-ship"
export const MIN_CONTRIBUTION_SHARE = 0.1

export type Trust = "new" | "trusted" | "blocked"
export type TopicMember = { id: string; handle: string; trust: Trust }

export type TopicRepo = {
  full_name: string
  name: string
  html_url: string
  description: string | null
  homepage: string | null
  stargazers_count: number
  fork: boolean
  archived: boolean
  size: number
  owner: { login: string; type: string }
}

export type Contributor = { login: string; type?: string; contributions: number }

export type ShipConfig = { name?: string; crafter?: string }

export type GithubRelease = {
  tag_name: string
  name: string | null
  body: string | null
  html_url: string
  draft: boolean
  prerelease: boolean
  published_at: string | null
}

export type DraftInput = {
  slug: string
  name: string
  tagline: string
  description: string
  reviewNote: string | null
  links: { type: "repository" | "website"; url: string }[]
}

export type UpdateInput = { title: string; description: string; socialPostUrl: string; publishedAt: string }

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined)

export function normalizeRepoUrl(url: string): string {
  return url
    .trim()
    .replace(/^http:\/\//i, "https://")
    .replace(/\/+$/, "")
    .replace(/\.git$/i, "")
    .toLowerCase()
}

export function repoSkipReason(repo: TopicRepo): "fork" | "archived" | "empty" | null {
  if (repo.fork) return "fork"
  if (repo.archived) return "archived"
  if (repo.size === 0) return "empty"
  return null
}

export function parseShipConfig(raw: unknown): ShipConfig {
  let value = raw
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw)
    } catch {
      return {}
    }
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) return {}
  const object = value as Record<string, unknown>
  return { name: text(object.name), crafter: text(object.crafter)?.replace(/^@/, "").toLowerCase() }
}

export const isBot = (contributor: Contributor) => contributor.type === "Bot" || /\[bot\]$/i.test(contributor.login)

export type OwnerResolution =
  | { ok: true; member: TopicMember; via: "owner" | "top-contributor" | "override" }
  | { ok: false; reason: string }

export function resolveOwner(input: {
  ownerLogin: string
  ownerType: string
  contributors: Contributor[]
  memberByLogin: (login: string) => TopicMember | undefined
  memberByHandle: (handle: string) => TopicMember | undefined
  overrideHandle?: string
}): OwnerResolution {
  const humans = input.contributors.filter((contributor) => !isBot(contributor))
  const finish = (member: TopicMember, via: "owner" | "top-contributor" | "override"): OwnerResolution =>
    member.trust === "blocked" ? { ok: false, reason: "member-blocked" } : { ok: true, member, via }

  if (input.overrideHandle) {
    const member = input.memberByHandle(input.overrideHandle)
    if (member) {
      const ownerMember = input.ownerType === "User" ? input.memberByLogin(input.ownerLogin) : undefined
      const involved =
        ownerMember?.id === member.id || humans.some((contributor) => input.memberByLogin(contributor.login)?.id === member.id)
      if (involved) return finish(member, "override")
    }
  }

  if (input.ownerType === "User") {
    const member = input.memberByLogin(input.ownerLogin)
    return member ? finish(member, "owner") : { ok: false, reason: "owner-has-no-account" }
  }

  const total = humans.reduce((sum, contributor) => sum + contributor.contributions, 0)
  let top: { member: TopicMember; contributions: number } | undefined
  for (const contributor of humans) {
    const member = input.memberByLogin(contributor.login)
    if (member && (!top || contributor.contributions > top.contributions)) top = { member, contributions: contributor.contributions }
  }
  if (!top) return { ok: false, reason: "no-contributor-has-an-account" }
  if (total === 0 || top.contributions / total < MIN_CONTRIBUTION_SHARE) return { ok: false, reason: "top-member-below-10-percent" }
  return finish(top.member, "top-contributor")
}

export function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "")
  return slug.length >= 3 ? slug : `${slug || "ship"}-ship`.replace(/^-/, "")
}

export function uniqueSlug(base: string, taken: ReadonlySet<string>): string {
  const slug = slugify(base)
  if (!taken.has(slug)) return slug
  for (let n = 2; ; n++) {
    const candidate = `${slug}-${n}`
    if (!taken.has(candidate)) return candidate
  }
}

export function titleCase(name: string): string {
  return name
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map((word) => (/[A-Z]/.test(word) ? word : word[0].toUpperCase() + word.slice(1)))
    .join(" ")
}

export function readmeFirstParagraph(readme: string | null | undefined): string | undefined {
  if (!readme) return undefined
  const paragraph = readme
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/<[^>]+>/g, "")
    .split(/\n\s*\n/)
    .map((part) =>
      part
        .split("\n")
        .filter((line) => !/^\s*(#|>|\||[-*]\s|\[!)/.test(line))
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .find((part) => part.length >= 20)
  return paragraph?.slice(0, 1500)
}

const TAGLINE_PLACEHOLDER = "A Ship from GitHub that its owner has yet to describe."
const EDIT_HINT = "Drafted from the GitHub topic crafter-ship. Edit the tagline and description before you publish."

export function validWebsite(url: string | null | undefined): string | undefined {
  const value = url?.trim()
  return value && /^https?:\/\//i.test(value) && value.length >= 8 && value.length <= 2048 ? value : undefined
}

export function deriveDraft(input: {
  repo: TopicRepo
  readme?: string | null
  config?: ShipConfig
  takenSlugs: ReadonlySet<string>
  websiteTaken?: boolean
}): DraftInput {
  const { repo } = input
  const name = (input.config?.name ?? titleCase(repo.name)).slice(0, 100).trim() || repo.name
  const description = repo.description?.replace(/\s+/g, " ").trim() ?? ""
  const usableTagline = description.length >= 4 && description.length <= 180
  const tagline = usableTagline ? description : TAGLINE_PLACEHOLDER
  const parts = [description, readmeFirstParagraph(input.readme)].filter((part): part is string => Boolean(part))
  let body = [...new Set(parts)].join("\n\n")
  if (body.length < 20) body = `${name} is an open source project on GitHub (${repo.full_name}).`
  if (!usableTagline) body = `${body}\n\n${EDIT_HINT}`
  const website = input.websiteTaken ? undefined : validWebsite(repo.homepage)
  const repoUrl = repo.html_url
  return {
    slug: uniqueSlug(repo.name, input.takenSlugs),
    name,
    tagline,
    description: body.slice(0, 5000),
    reviewNote: usableTagline ? null : EDIT_HINT,
    links: [
      { type: "repository", url: repoUrl },
      ...(website && normalizeRepoUrl(website) !== normalizeRepoUrl(repoUrl) ? [{ type: "website" as const, url: website }] : []),
    ],
  }
}

/** Releases newer than the Ship's publication that are not yet updates, oldest first. */
export function planReleaseUpdates(input: {
  releases: GithubRelease[]
  shipPublishedAt: string
  existingUrls: ReadonlySet<string>
}): UpdateInput[] {
  const since = Date.parse(input.shipPublishedAt)
  const seen = new Set(input.existingUrls)
  const updates: UpdateInput[] = []
  const ordered = [...input.releases].sort((a, b) => Date.parse(a.published_at ?? "") - Date.parse(b.published_at ?? ""))
  for (const release of ordered) {
    if (release.draft || release.prerelease || !release.published_at || !release.html_url) continue
    const at = Date.parse(release.published_at)
    if (!(at > since) || seen.has(release.html_url)) continue
    const title = (text(release.name) ?? text(release.tag_name))?.slice(0, 100).trim()
    if (!title) continue
    const body = text(release.body)
    updates.push({
      title,
      description: (body && body.length >= 4 ? body : `Released ${release.tag_name}.`).slice(0, 5000),
      socialPostUrl: release.html_url,
      publishedAt: release.published_at,
    })
    seen.add(release.html_url)
  }
  return updates
}
