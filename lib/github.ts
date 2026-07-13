export type DayActivity = {
  date: string // YYYY-MM-DD
  repos: { name: string; count: number }[] // name is "owner/repo"
}

export type BuildingActivity = {
  days: DayActivity[] // commits/events grouped by day
}

type CommitSearchItem = {
  repository?: { full_name?: string; private?: boolean }
  commit?: { committer?: { date?: string }; author?: { date?: string } }
}

type GitHubEvent = {
  type: string
  created_at: string
  repo?: { name: string }
}

const WORK_EVENT_TYPES = new Set(["PushEvent", "PullRequestEvent", "CreateEvent"])
const pad = (n: number) => String(n).padStart(2, "0")

function usernameFromUrl(githubUrl?: string): string | null {
  if (!githubUrl) return null
  const match = githubUrl.match(/github\.com\/([^/?#]+)/i)
  return match ? match[1] : null
}

function baseHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "crafter-station-website",
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
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
 * With a token: use the commit search API, which returns the full public
 * commit history (not capped at ~300 events) so even very active contributors
 * show their real work — including org repos. Private repos are excluded.
 */
async function fetchMonthCommits(
  username: string,
  year: number,
  month: number, // 0-indexed
): Promise<CommitSearchItem[]> {
  const from = `${year}-${pad(month + 1)}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const to = `${year}-${pad(month + 1)}-${pad(lastDay)}`
  const q = `author:${username} committer-date:${from}..${to}`
  const url = `https://api.github.com/search/commits?q=${encodeURIComponent(q)}&sort=committer-date&order=desc&per_page=100`
  try {
    const res = await fetch(url, { headers: baseHeaders(), next: { revalidate: 86400 } })
    if (!res.ok) return []
    const data = (await res.json()) as { items?: CommitSearchItem[] }
    return Array.isArray(data.items) ? data.items : []
  } catch {
    return []
  }
}

async function viaCommitSearch(username: string): Promise<BuildingActivity | null> {
  const now = new Date()
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const [curItems, prevItems] = await Promise.all([
    fetchMonthCommits(username, now.getFullYear(), now.getMonth()),
    fetchMonthCommits(username, prev.getFullYear(), prev.getMonth()),
  ])

  const byDay = new Map<string, Map<string, number>>()
  for (const item of [...curItems, ...prevItems]) {
    if (item.repository?.private) continue // never surface private repos
    const repo = item.repository?.full_name
    const date = (item.commit?.committer?.date ?? item.commit?.author?.date)?.slice(0, 10)
    if (!repo || !date) continue
    const repos = byDay.get(date) ?? new Map<string, number>()
    repos.set(repo, (repos.get(repo) ?? 0) + 1)
    byDay.set(date, repos)
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
      { headers: baseHeaders(), next: { revalidate: 86400 } },
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
 * Aggregates a member's recent GitHub activity per day. Uses the commit search
 * API when a GITHUB_TOKEN is configured (full public history), otherwise falls
 * back to the tokenless events API. Returns null when there is no username, no
 * activity, or the request fails (the calendar section is hidden then).
 */
export async function getBuildingActivity(
  githubUrl?: string,
): Promise<BuildingActivity | null> {
  const username = usernameFromUrl(githubUrl)
  if (!username) return null
  return process.env.GITHUB_TOKEN ? viaCommitSearch(username) : viaEvents(username)
}
