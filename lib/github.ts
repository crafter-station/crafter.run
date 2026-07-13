export type DayActivity = {
  date: string // YYYY-MM-DD
  repos: { name: string; count: number }[] // name is "owner/repo"
}

export type BuildingActivity = {
  days: DayActivity[] // commits/events grouped by day
}

type GitHubEvent = {
  type: string
  created_at: string
  repo?: { name: string }
}

type ContribRepo = {
  repository?: { nameWithOwner?: string; isPrivate?: boolean }
  contributions?: { nodes?: { occurredAt?: string; commitCount?: number }[] }
}

const WORK_EVENT_TYPES = new Set(["PushEvent", "PullRequestEvent", "CreateEvent"])
const pad = (n: number) => String(n).padStart(2, "0")

function usernameFromUrl(githubUrl?: string): string | null {
  if (!githubUrl) return null
  const match = githubUrl.match(/github\.com\/([^/?#]+)/i)
  return match ? match[1] : null
}

function daysFromMap(byDay: Map<string, Map<string, number>>): DayActivity[] {
  return [...byDay.entries()]
    .map(([date, repoMap]) => ({
      date,
      repos: [...repoMap.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * With a token: GitHub's GraphQL contributionsCollection returns the full
 * PUBLIC commit history per repository per day in a single request — no
 * pagination, no ~300-event cap, and cheap enough to run for the whole team
 * without hitting rate limits. Private repos are excluded.
 */
async function viaGraphQL(username: string): Promise<BuildingActivity | null> {
  const now = new Date()
  const from = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
  const to = now.toISOString()

  const query = `query($login:String!,$from:DateTime!,$to:DateTime!){
    user(login:$login){
      contributionsCollection(from:$from,to:$to){
        commitContributionsByRepository(maxRepositories:100){
          repository{ nameWithOwner isPrivate }
          contributions(first:100){ nodes{ occurredAt commitCount } }
        }
      }
    }
  }`

  let json: {
    data?: {
      user?: {
        contributionsCollection?: { commitContributionsByRepository?: ContribRepo[] }
      }
    }
  }
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "crafter-station-website",
      },
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    json = await res.json()
  } catch {
    return null
  }

  const repos = json.data?.user?.contributionsCollection?.commitContributionsByRepository ?? []
  const byDay = new Map<string, Map<string, number>>()
  for (const repo of repos) {
    if (repo.repository?.isPrivate) continue // never surface private repos
    const name = repo.repository?.nameWithOwner
    if (!name) continue
    for (const node of repo.contributions?.nodes ?? []) {
      const date = node.occurredAt?.slice(0, 10)
      if (!date) continue
      const map = byDay.get(date) ?? new Map<string, number>()
      map.set(name, (map.get(name) ?? 0) + (node.commitCount ?? 1))
      byDay.set(date, map)
    }
  }
  if (byDay.size === 0) return null
  return { days: daysFromMap(byDay) }
}

/**
 * Tokenless fallback: the public events API. Works without auth (60 req/min)
 * but is capped at ~300 events, so it only covers recent activity.
 */
async function viaEvents(username: string): Promise<BuildingActivity | null> {
  let events: GitHubEvent[]
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "crafter-station-website",
        },
        next: { revalidate: 86400 },
      },
    )
    if (!res.ok) return null
    events = (await res.json()) as GitHubEvent[]
  } catch {
    return null
  }
  if (!Array.isArray(events)) return null

  const byDay = new Map<string, Map<string, number>>()
  for (const event of events) {
    if (!WORK_EVENT_TYPES.has(event.type)) continue
    if (!event.repo?.name || !event.created_at) continue
    const date = event.created_at.slice(0, 10)
    const repos = byDay.get(date) ?? new Map<string, number>()
    repos.set(event.repo.name, (repos.get(event.repo.name) ?? 0) + 1)
    byDay.set(date, repos)
  }
  if (byDay.size === 0) return null
  return { days: daysFromMap(byDay) }
}

/**
 * Aggregates a member's recent GitHub activity per day. Uses GraphQL
 * contributions (full public history) when a GITHUB_TOKEN is set, otherwise
 * falls back to the tokenless events API. Returns null when there is no
 * username, no activity, or the request fails (the section is hidden then).
 */
export async function getBuildingActivity(
  githubUrl?: string,
): Promise<BuildingActivity | null> {
  const username = usernameFromUrl(githubUrl)
  if (!username) return null
  return process.env.GITHUB_TOKEN ? viaGraphQL(username) : viaEvents(username)
}
