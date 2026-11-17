import { parseRepoUrl } from "@/lib/new-ship-draft"

export const SHIP_TOPIC = "crafter-ship"

/** A repository a member can turn into a Ship. */
export type RepoOption = {
  fullName: string
  name: string
  url: string
  description: string
  language: string | null
  stars: number
  pushedAt: string | null
  /** The repository carries the crafter-ship topic. */
  topic: boolean
  /** One of the member's Ships already links to it. */
  hasShip: boolean
}

type RawRepo = {
  full_name?: string
  name?: string
  html_url?: string
  description?: string | null
  language?: string | null
  stargazers_count?: number
  pushed_at?: string | null
  topics?: string[]
  fork?: boolean
  archived?: boolean
  private?: boolean
  disabled?: boolean
}

/** A GitHub repository reduced to `owner/name` in lowercase, or null for any other link. */
export function repoKey(value: string): string | null {
  const parsed = parseRepoUrl(value)
  return parsed ? `${parsed.owner}/${parsed.repo}`.toLowerCase() : null
}

/** Accepts `owner/name` or a GitHub link and returns the repository URL. Null for anything else. */
export function repoInputToUrl(value: string): string | null {
  const text = value.trim()
  if (/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/.test(text)) return `https://github.com/${text}`
  const parsed = parseRepoUrl(text)
  return parsed ? `https://github.com/${parsed.owner}/${parsed.repo}` : null
}

/** Public, original, active repositories ordered by last push. Repos with a Ship are flagged, not removed. */
export function selectRepos(raw: RawRepo[], shipUrls: readonly string[]): RepoOption[] {
  return markShipped(
    raw
      .filter((repo) => repo.full_name && repo.html_url && !repo.fork && !repo.archived && !repo.private && !repo.disabled)
      // The <login>/<login> repo is a profile README, not a project.
      .filter((repo) => { const [owner, name] = repo.full_name!.split("/"); return owner?.toLowerCase() !== name?.toLowerCase() })
    .map((repo) => ({
      fullName: repo.full_name!,
      name: repo.name ?? repo.full_name!.split("/")[1] ?? repo.full_name!,
      url: repo.html_url!,
      description: (repo.description ?? "").replace(/\s+/g, " ").trim().slice(0, 200),
      language: repo.language ?? null,
      stars: repo.stargazers_count ?? 0,
      pushedAt: repo.pushed_at ?? null,
      topic: Boolean(repo.topics?.includes(SHIP_TOPIC)),
      hasShip: false,
    }))
    .sort((a, b) => (Date.parse(b.pushedAt ?? "") || 0) - (Date.parse(a.pushedAt ?? "") || 0)),
    shipUrls,
  )
}

/** Flags repositories already linked from one of the member's Ships. Matches ignore case, a trailing slash and `.git`. */
export function markShipped(repos: readonly RepoOption[], shipUrls: readonly string[]): RepoOption[] {
  const taken = new Set(shipUrls.map(repoKey).filter((key): key is string => Boolean(key)))
  return repos.map((repo) => ({ ...repo, hasShip: taken.has(repo.fullName.toLowerCase()) }))
}

/** Repositories ready to publish: tagged with the topic and without a Ship. They come first in the list. */
export function readyRepos(repos: readonly RepoOption[]): RepoOption[] {
  return repos.filter((repo) => repo.topic && !repo.hasShip)
}

/** Ready repositories first, the rest keep their order. */
export function orderRepos(repos: readonly RepoOption[]): RepoOption[] {
  const ready = readyRepos(repos)
  return [...ready, ...repos.filter((repo) => !ready.includes(repo))]
}

/** Case-insensitive match on name, description and language. */
export function filterRepos(repos: readonly RepoOption[], query: string): RepoOption[] {
  const text = query.trim().toLowerCase()
  if (!text) return [...repos]
  return repos.filter((repo) => `${repo.fullName} ${repo.description} ${repo.language ?? ""}`.toLowerCase().includes(text))
}

/** Adds the token to GitHub requests when one is set. Without it, or when GitHub rejects it, the call goes out unauthenticated. */
export function githubFetch(token: string | undefined, base: typeof fetch = fetch): typeof fetch {
  if (!token) return base
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers)
    headers.set("Authorization", `Bearer ${token}`)
    const response = await base(input, { ...init, headers })
    return response.status === 401 ? base(input, init) : response
  }) as typeof fetch
}

const REPO_CACHE_SECONDS = 300

/** A GitHub user or organization login. */
export const GITHUB_LOGIN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/

export type OwnerKind = "user" | "org"
export type OwnerRepos = { status: "ok"; repos: RepoOption[] } | { status: "notFound" } | { status: "error" }

function githubGet(path: string, fetchImpl: typeof fetch) {
  return githubFetch(process.env.GITHUB_TOKEN, fetchImpl)(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(3500),
    next: { revalidate: REPO_CACHE_SECONDS },
  } as RequestInit)
}

async function readRepos(response: Response): Promise<OwnerRepos> {
  if (response.status === 404) return { status: "notFound" }
  if (!response.ok) return { status: "error" }
  const raw = (await response.json()) as RawRepo[]
  return Array.isArray(raw) ? { status: "ok", repos: selectRepos(raw, []) } : { status: "error" }
}

/** Public repositories of a user or an organization, newest push first, cached for 5 minutes.
 * An organization that is not found is retried as a user, so a typed login works either way. */
export async function listOwnerRepos(owner: string, kind: OwnerKind, fetchImpl: typeof fetch = fetch): Promise<OwnerRepos> {
  if (!GITHUB_LOGIN.test(owner)) return { status: "notFound" }
  const login = encodeURIComponent(owner)
  try {
    if (kind === "org") {
      const org = await readRepos(await githubGet(`/orgs/${login}/repos?type=public&sort=pushed&per_page=100`, fetchImpl))
      if (org.status !== "notFound") return org
    }
    return await readRepos(await githubGet(`/users/${login}/repos?type=owner&sort=pushed&per_page=100`, fetchImpl))
  } catch {
    return { status: "error" }
  }
}

/** The user's public organization memberships. GitHub never lists private ones, so an empty list is common. */
export async function listGithubOrgs(login: string, fetchImpl: typeof fetch = fetch): Promise<string[]> {
  if (!GITHUB_LOGIN.test(login)) return []
  try {
    const response = await githubGet(`/users/${encodeURIComponent(login)}/orgs?per_page=100`, fetchImpl)
    if (!response.ok) return []
    const raw = (await response.json()) as { login?: string }[]
    return Array.isArray(raw) ? raw.map((org) => org.login).filter((name): name is string => Boolean(name)) : []
  } catch {
    return []
  }
}
