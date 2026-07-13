const WORK_EVENT_TYPES = new Set([
  "PushEvent",
  "PullRequestEvent",
  "CreateEvent",
])

export type DayActivity = {
  date: string // YYYY-MM-DD
  repos: { name: string; count: number }[] // name is "owner/repo"
}

export type BuildingActivity = {
  days: DayActivity[] // across the fetched window (~last 90 days)
}

type GitHubEvent = {
  type: string
  created_at: string
  repo?: { name: string }
}

function usernameFromUrl(githubUrl?: string): string | null {
  if (!githubUrl) return null
  const match = githubUrl.match(/github\.com\/([^/?#]+)/i)
  return match ? match[1] : null
}

/**
 * Fetches a member's public GitHub activity for the CURRENT month and
 * aggregates it per day. Returns null when there is no username, no activity,
 * or the API fails/rate-limits (the calendar section is hidden in that case).
 */
export async function getBuildingActivity(
  githubUrl?: string,
): Promise<BuildingActivity | null> {
  const username = usernameFromUrl(githubUrl)
  if (!username) return null

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

  // date (YYYY-MM-DD) -> repo full name -> count
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

  const days: DayActivity[] = [...byDay.entries()]
    .map(([date, repoMap]) => ({
      date,
      repos: [...repoMap.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return { days }
}
