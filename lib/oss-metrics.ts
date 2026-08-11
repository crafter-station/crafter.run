import { ossRepoNames } from "@/lib/oss"

const PUBLIC_LAUNCH_AT = new Date("2026-08-08T13:00:00.000Z")
const MAX_WINDOW_MS = 14 * 24 * 60 * 60 * 1000
const MAINTAINER_ASSOCIATIONS = new Set(["OWNER", "MEMBER", "COLLABORATOR"])

type GitHubSearchItem = {
  repository_url: string
  created_at: string
  closed_at: string | null
  author_association: string
  user: {
    login: string
    type: string
  } | null
  pull_request?: {
    merged_at: string | null
  }
}

type GitHubSearchResponse = {
  total_count: number
  incomplete_results: boolean
  items: GitHubSearchItem[]
}

export type OssMetricPeriod = {
  issuesOpened: number
  issuesClosed: number
  prsOpened: number
  prsClosed: number
  prsMerged: number
  externalPrsOpened: number
  externalPrsClosed: number
  totalOpened: number
  totalClosed: number
  netBacklog: number
  activeRepos: number
  closuresByRepo: { repo: string; count: number }[]
}

export type OssMetrics = {
  source: "github" | "snapshot"
  incomplete: boolean
  generatedAt: string
  launchAt: string
  windowDays: number
  repoCount: number
  openIssues: number
  openPrs: number
  pre: OssMetricPeriod
  post: OssMetricPeriod
}

const fallback: OssMetrics = {
  source: "snapshot",
  incomplete: false,
  generatedAt: "2026-08-11T17:23:14.000Z",
  launchAt: PUBLIC_LAUNCH_AT.toISOString(),
  windowDays: 3.183,
  repoCount: 18,
  openIssues: 114,
  openPrs: 21,
  pre: {
    issuesOpened: 88,
    issuesClosed: 30,
    prsOpened: 44,
    prsClosed: 31,
    prsMerged: 31,
    externalPrsOpened: 23,
    externalPrsClosed: 11,
    totalOpened: 132,
    totalClosed: 61,
    netBacklog: 71,
    activeRepos: 9,
    closuresByRepo: [
      { repo: "Railly/tinte", count: 20 },
      { repo: "Railly/one-hunter-vscode", count: 16 },
      { repo: "crafter-station/trx", count: 7 },
      { repo: "crafter-station/text0", count: 6 },
      { repo: "crafter-station/survey-cli", count: 4 },
      { repo: "crafter-station/hack0", count: 3 },
      { repo: "Railly/cligentic", count: 2 },
      { repo: "Railly/v0-cli", count: 2 },
      { repo: "crafter-station/elements", count: 1 },
    ],
  },
  post: {
    issuesOpened: 51,
    issuesClosed: 42,
    prsOpened: 31,
    prsClosed: 36,
    prsMerged: 34,
    externalPrsOpened: 13,
    externalPrsClosed: 15,
    totalOpened: 82,
    totalClosed: 78,
    netBacklog: 4,
    activeRepos: 6,
    closuresByRepo: [
      { repo: "crafter-station/petdex", count: 30 },
      { repo: "Railly/vcut", count: 27 },
      { repo: "crafter-station/trx", count: 9 },
      { repo: "crafter-station/skill-kit", count: 8 },
      { repo: "crafter-station/survey-cli", count: 2 },
      { repo: "crafter-station/crafter-tracker", count: 2 },
    ],
  },
}

function searchHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "crafter-station-website",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  }
}

async function fetchSearchPage(query: string, page: number, perPage = 100) {
  const params = new URLSearchParams({
    q: query,
    per_page: String(perPage),
    page: String(page),
  })
  const response = await fetch(`https://api.github.com/search/issues?${params}`, {
    headers: searchHeaders(),
    next: { revalidate: 3600 },
  })
  if (!response.ok) throw new Error(`GitHub search failed: ${response.status}`)
  return (await response.json()) as GitHubSearchResponse
}

async function fetchAll(query: string) {
  const first = await fetchSearchPage(query, 1)
  const pageCount = Math.min(10, Math.ceil(first.total_count / 100))
  if (pageCount <= 1) return first
  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) => fetchSearchPage(query, index + 2)),
  )
  return {
    total_count: first.total_count,
    incomplete_results: first.incomplete_results || rest.some((page) => page.incomplete_results),
    items: [first, ...rest].flatMap((page) => page.items),
  }
}

function isInWindow(value: string | null, start: Date, end: Date) {
  if (!value) return false
  const time = new Date(value).getTime()
  return time >= start.getTime() && time < end.getTime()
}

function isExternal(item: GitHubSearchItem) {
  return item.user?.type !== "Bot" && !MAINTAINER_ASSOCIATIONS.has(item.author_association)
}

function repoName(item: GitHubSearchItem) {
  return item.repository_url.replace("https://api.github.com/repos/", "")
}

function summarize(
  issueCreated: GitHubSearchItem[],
  issueClosed: GitHubSearchItem[],
  prCreated: GitHubSearchItem[],
  prClosed: GitHubSearchItem[],
  start: Date,
  end: Date,
): OssMetricPeriod {
  const issuesOpened = issueCreated.filter((item) => isInWindow(item.created_at, start, end))
  const issuesResolved = issueClosed.filter((item) => isInWindow(item.closed_at, start, end))
  const prsOpened = prCreated.filter((item) => isInWindow(item.created_at, start, end))
  const prsResolved = prClosed.filter((item) => isInWindow(item.closed_at, start, end))
  const closureCounts = new Map<string, number>()
  for (const item of [...issuesResolved, ...prsResolved]) {
    const repo = repoName(item)
    closureCounts.set(repo, (closureCounts.get(repo) ?? 0) + 1)
  }
  const closuresByRepo = [...closureCounts.entries()]
    .map(([repo, count]) => ({ repo, count }))
    .sort((a, b) => b.count - a.count)
  const totalOpened = issuesOpened.length + prsOpened.length
  const totalClosed = issuesResolved.length + prsResolved.length

  return {
    issuesOpened: issuesOpened.length,
    issuesClosed: issuesResolved.length,
    prsOpened: prsOpened.length,
    prsClosed: prsResolved.length,
    prsMerged: prsResolved.filter((item) => item.pull_request?.merged_at).length,
    externalPrsOpened: prsOpened.filter(isExternal).length,
    externalPrsClosed: prsResolved.filter(isExternal).length,
    totalOpened,
    totalClosed,
    netBacklog: totalOpened - totalClosed,
    activeRepos: closuresByRepo.length,
    closuresByRepo,
  }
}

async function fetchMetrics(): Promise<OssMetrics> {
  const now = new Date()
  const postEnd = new Date(Math.min(now.getTime(), PUBLIC_LAUNCH_AT.getTime() + MAX_WINDOW_MS))
  const windowMs = postEnd.getTime() - PUBLIC_LAUNCH_AT.getTime()
  const preStart = new Date(PUBLIC_LAUNCH_AT.getTime() - windowMs)
  const searchDate = preStart.toISOString().slice(0, 10)
  const repos = ossRepoNames.map((repo) => `repo:${repo}`).join(" ")

  const [issueCreated, issueClosed, prCreated, prClosed, openIssues, openPrs] = await Promise.all([
    fetchAll(`${repos} is:issue created:>=${searchDate}`),
    fetchAll(`${repos} is:issue closed:>=${searchDate}`),
    fetchAll(`${repos} is:pr created:>=${searchDate}`),
    fetchAll(`${repos} is:pr closed:>=${searchDate}`),
    fetchSearchPage(`${repos} is:issue is:open`, 1, 1),
    fetchSearchPage(`${repos} is:pr is:open`, 1, 1),
  ])

  return {
    source: "github",
    incomplete: [issueCreated, issueClosed, prCreated, prClosed].some(
      (result) => result.incomplete_results,
    ),
    generatedAt: now.toISOString(),
    launchAt: PUBLIC_LAUNCH_AT.toISOString(),
    windowDays: windowMs / (24 * 60 * 60 * 1000),
    repoCount: ossRepoNames.length,
    openIssues: openIssues.total_count,
    openPrs: openPrs.total_count,
    pre: summarize(
      issueCreated.items,
      issueClosed.items,
      prCreated.items,
      prClosed.items,
      preStart,
      PUBLIC_LAUNCH_AT,
    ),
    post: summarize(
      issueCreated.items,
      issueClosed.items,
      prCreated.items,
      prClosed.items,
      PUBLIC_LAUNCH_AT,
      postEnd,
    ),
  }
}

export async function getOssMetrics() {
  try {
    return await fetchMetrics()
  } catch {
    return fallback
  }
}
