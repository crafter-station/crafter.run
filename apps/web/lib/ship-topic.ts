/** Pure rules for syncing GitHub releases into Ship updates. No I/O here. */

export const SHIP_TOPIC = "crafter-ship"
/** The daily cron only imports releases published within this many days of the run. */
export const AUTO_SYNC_WINDOW_DAYS = 2
/** A manual "Sync releases" imports at most this many updates. */
export const MANUAL_SYNC_LIMIT = 10

export type TopicRepo = {
  full_name: string
  name: string
  html_url: string
  stargazers_count: number
  fork: boolean
  archived: boolean
  size: number
  topics?: string[]
  owner: { login: string; type: string }
}

export type Contributor = { login: string; type?: string; contributions: number }

export type GithubRelease = {
  tag_name: string
  name: string | null
  body: string | null
  html_url: string
  draft: boolean
  prerelease: boolean
  published_at: string | null
}

export type UpdateInput = { title: string; description: string; socialPostUrl: string; publishedAt: string }

export type SyncReason =
  | "no-repository"
  | "topic-missing"
  | "repo-unusable"
  | "github-not-linked"
  | "not-repo-owner-or-contributor"
  | "owner-not-trusted"
  | "ship-not-published"
  | "no-new-releases"

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined)

export function normalizeRepoUrl(url: string): string {
  return url
    .trim()
    .replace(/^http:\/\//i, "https://")
    .replace(/\/+$/, "")
    .replace(/\.git$/i, "")
    .toLowerCase()
}

/** `owner/repo` from a GitHub repository URL, or null for anything else. */
export function githubFullName(url: string): string | null {
  const match = url.trim().match(/^https?:\/\/(?:www\.)?github\.com\/([^/?#\s]+)\/([^/?#\s]+?)(?:\.git)?\/?$/i)
  return match ? `${match[1]}/${match[2]}` : null
}

export function repoSkipReason(repo: TopicRepo): "fork" | "archived" | "empty" | null {
  if (repo.fork) return "fork"
  if (repo.archived) return "archived"
  if (repo.size === 0) return "empty"
  return null
}

export const hasTopic = (repo: Pick<TopicRepo, "topics">) => Boolean(repo.topics?.includes(SHIP_TOPIC))

export const isBot = (contributor: Contributor) => contributor.type === "Bot" || /\[bot\]$/i.test(contributor.login)

/**
 * The Ship owner's Clerk-linked GitHub login must be the repo owner (personal repo)
 * or one of its non-bot contributors (organization repo).
 */
export function verifyOwnerGithub(input: {
  ownerLogin: string
  ownerType: string
  contributors: Contributor[]
  linkedLogins: string[]
}): { ok: true } | { ok: false; reason: "github-not-linked" | "not-repo-owner-or-contributor" } {
  const linked = new Set(input.linkedLogins.map((login) => login.toLowerCase()))
  if (!linked.size) return { ok: false, reason: "github-not-linked" }
  if (input.ownerType === "User") {
    return linked.has(input.ownerLogin.toLowerCase()) ? { ok: true } : { ok: false, reason: "not-repo-owner-or-contributor" }
  }
  const found = input.contributors.some((contributor) => !isBot(contributor) && linked.has(contributor.login.toLowerCase()))
  return found ? { ok: true } : { ok: false, reason: "not-repo-owner-or-contributor" }
}

/**
 * Releases to import, oldest first. Always after the Ship's publication and never already an
 * update. `windowDays` further limits how old a release may be; `limit` keeps the newest N.
 */
export function planReleaseUpdates(input: {
  releases: GithubRelease[]
  shipPublishedAt: string
  existingUrls: ReadonlySet<string>
  now?: number
  windowDays?: number
  limit?: number
}): UpdateInput[] {
  const notBefore = Math.max(
    Date.parse(input.shipPublishedAt),
    input.windowDays === undefined ? Number.NEGATIVE_INFINITY : (input.now ?? Date.now()) - input.windowDays * 86_400_000,
  )
  const seen = new Set(input.existingUrls)
  const updates: UpdateInput[] = []
  const newestFirst = [...input.releases].sort((a, b) => Date.parse(b.published_at ?? "") - Date.parse(a.published_at ?? ""))
  for (const release of newestFirst) {
    if (release.draft || release.prerelease || !release.published_at || !release.html_url) continue
    if (!(Date.parse(release.published_at) > notBefore) || seen.has(release.html_url)) continue
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
    if (input.limit !== undefined && updates.length >= input.limit) break
  }
  return updates.reverse()
}

export const syncReasonMessage: Record<SyncReason, string> = {
  "no-repository": "This Ship has no GitHub repository link.",
  "topic-missing": "Add the crafter-ship topic to the repo.",
  "repo-unusable": "The repo is a fork, archived or empty.",
  "github-not-linked": "Your GitHub account is not linked.",
  "not-repo-owner-or-contributor": "Your linked GitHub account is neither the repo owner nor a contributor.",
  "owner-not-trusted": "Releases sync once your first Ship has been approved.",
  "ship-not-published": "Only published Ships sync releases.",
  "no-new-releases": "No new releases.",
}
