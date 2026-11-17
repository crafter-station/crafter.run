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

/** The member's public repositories, cached per user for 5 minutes. Any failure returns an empty list. */
export async function listGithubRepos(login: string, fetchImpl: typeof fetch = fetch): Promise<RepoOption[]> {
  try {
    const request = githubFetch(process.env.GITHUB_TOKEN, fetchImpl)
    const response = await request(`https://api.github.com/users/${encodeURIComponent(login)}/repos?type=owner&sort=pushed&per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(3500),
      next: { revalidate: REPO_CACHE_SECONDS },
    } as RequestInit)
    if (!response.ok) return []
    const raw = (await response.json()) as RawRepo[]
    return Array.isArray(raw) ? selectRepos(raw, []) : []
  } catch {
    return []
  }
}
