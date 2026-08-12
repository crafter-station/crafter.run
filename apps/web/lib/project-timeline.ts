import { teamMembers } from "@/lib/team"
import { ORGANIZATION_OWNERS } from "@/lib/project-timeline-org"

export {
  matchesTimelineOrg,
  ORGANIZATION_OWNERS,
  type TimelineOrgFilter,
} from "@/lib/project-timeline-org"

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
const REPOSITORIES_PER_PAGE = 50
const COMMITS_PER_PAGE = 100
const MAX_COMMITS_PER_REPOSITORY = 2500
const TIMELINE_WEEKS = 52
const WEEK_MS = 7 * 24 * 60 * 60 * 1000
const RETRYABLE_GITHUB_STATUSES = new Set([429, 502, 503, 504])

export type TimelineCoreMember = {
  login: string
  name: string
  username: string
  image: string
}

export type TimelineContributor = {
  login: string
  name: string
  avatarUrl: string | null
  url: string | null
  weeks: number[]
  contributions: number
  coreMember: TimelineCoreMember | null
}

export type TimelineProject = {
  name: string
  fullName: string
  owner: string
  description: string | null
  url: string
  homepageUrl: string | null
  createdAt: string
  pushedAt: string
  archived: boolean
  stars: number
  forks: number
  openIssues: number
  language: string | null
  languageColor: string | null
  license: string | null
  topics: string[]
  weeks: number[]
  totalContributions: number
  capturedContributions: number
  coreContributions: number
  contributors: TimelineContributor[]
  complete: boolean
}

export type ProjectTimelineData = {
  owners: string[]
  generatedAt: string
  startDate: string
  endDate: string
  weeks: string[]
  projects: TimelineProject[]
  coreMembers: TimelineCoreMember[]
  source: "live" | "snapshot"
}

type GitHubActor = {
  name?: string | null
  avatarUrl?: string | null
  user?: {
    login: string
    avatarUrl: string
    url: string
  } | null
}

type GitHubCommit = {
  oid: string
  committedDate: string
  author?: GitHubActor | null
}

type GitHubHistory = {
  totalCount: number
  nodes: GitHubCommit[]
  pageInfo: {
    hasNextPage: boolean
    endCursor: string | null
  }
}

type GitHubRepository = {
  name: string
  nameWithOwner: string
  description: string | null
  url: string
  homepageUrl: string | null
  createdAt: string
  pushedAt: string
  isArchived: boolean
  stargazerCount: number
  forkCount: number
  primaryLanguage?: { name: string; color: string | null } | null
  licenseInfo?: { spdxId: string | null } | null
  openIssues?: { totalCount: number } | null
  repositoryTopics?: {
    nodes: { topic: { name: string } }[]
  } | null
  defaultBranchRef?: {
    target?: { history?: GitHubHistory | null } | null
  } | null
}

type RepositoryPage = {
  repositoryOwner?: {
    repositories: {
      nodes: GitHubRepository[]
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
    }
  } | null
}

type HistoryPage = {
  repository?: {
    defaultBranchRef?: {
      target?: { history?: GitHubHistory | null } | null
    } | null
  } | null
}

const REPOSITORIES_QUERY = `
  query ProjectTimeline($owner: String!, $cursor: String, $since: GitTimestamp!) {
    repositoryOwner(login: $owner) {
      repositories(
        first: ${REPOSITORIES_PER_PAGE}
        after: $cursor
        privacy: PUBLIC
        isFork: false
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        pageInfo { hasNextPage endCursor }
        nodes {
          name
          nameWithOwner
          description
          url
          homepageUrl
          createdAt
          pushedAt
          isArchived
          stargazerCount
          forkCount
          primaryLanguage { name color }
          licenseInfo { spdxId }
          openIssues: issues(states: OPEN) { totalCount }
          repositoryTopics(first: 8) {
            nodes { topic { name } }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: ${COMMITS_PER_PAGE}, since: $since) {
                  totalCount
                  pageInfo { hasNextPage endCursor }
                  nodes {
                    oid
                    committedDate
                    author {
                      name
                      avatarUrl
                      user { login avatarUrl url }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const HISTORY_QUERY = `
  query ProjectHistory(
    $owner: String!
    $name: String!
    $since: GitTimestamp!
    $cursor: String
  ) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: ${COMMITS_PER_PAGE}, since: $since, after: $cursor) {
              totalCount
              pageInfo { hasNextPage endCursor }
              nodes {
                oid
                committedDate
                author {
                  name
                  avatarUrl
                  user { login avatarUrl url }
                }
              }
            }
          }
        }
      }
    }
  }
`

function startOfUtcWeek(value: Date | string) {
  const date = new Date(value)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCDate(date.getUTCDate() - date.getUTCDay())
  return date
}

function dateOnly(date: Date) {
  return date.toISOString().slice(0, 10)
}

function timelineDates(now: Date) {
  const currentWeek = startOfUtcWeek(now)
  const start = new Date(currentWeek.getTime() - (TIMELINE_WEEKS - 1) * WEEK_MS)
  const weeks = Array.from({ length: TIMELINE_WEEKS }, (_, index) =>
    dateOnly(new Date(start.getTime() + index * WEEK_MS)),
  )

  return { start, weeks }
}

function githubLogin(githubUrl?: string) {
  return githubUrl?.match(/github\.com\/([^/?#]+)/i)?.[1] ?? null
}

function getCoreMembers(): TimelineCoreMember[] {
  return teamMembers.flatMap((member) => {
    const login = githubLogin(member.github)
    return login
      ? [
          {
            login,
            name: member.name,
            username: member.username,
            image: member.image,
          },
        ]
      : []
  })
}

function timelineOwners() {
  return [
    ...new Set([
      ...ORGANIZATION_OWNERS,
      ...getCoreMembers().map((member) => member.login),
    ]),
  ]
}

async function githubGraphQL<T>(
  token: string,
  query: string,
  variables: Record<string, string | null>,
) {
  let lastError: unknown

  for (let attempt = 0; attempt < 4; attempt += 1) {
    let response: Response
    try {
      response = await fetch(GITHUB_GRAPHQL_URL, {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "crafter-station-website",
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      })
    } catch (error) {
      lastError = error
      if (attempt === 3) throw error
      await new Promise((resolve) => setTimeout(resolve, 300 * 3 ** attempt))
      continue
    }

    if (RETRYABLE_GITHUB_STATUSES.has(response.status) && attempt < 3) {
      lastError = new Error(`GitHub GraphQL returned ${response.status}`)
      await new Promise((resolve) => setTimeout(resolve, 300 * 3 ** attempt))
      continue
    }

    if (!response.ok) {
      throw new Error(`GitHub GraphQL returned ${response.status}`)
    }

    const payload = (await response.json()) as {
      data?: T
      errors?: { message: string }[]
    }

    if (!payload.data || payload.errors?.length) {
      throw new Error(
        payload.errors?.[0]?.message ?? "GitHub GraphQL returned no data",
      )
    }

    return payload.data
  }

  throw lastError ?? new Error("GitHub GraphQL request failed")
}

function historyFor(repository: GitHubRepository) {
  return repository.defaultBranchRef?.target?.history ?? null
}

async function fetchOwnerRepositories(
  token: string,
  since: string,
  owner: string,
) {
  const repositories: GitHubRepository[] = []
  let cursor: string | null = null
  let hasNextPage = true

  while (hasNextPage) {
    const data: RepositoryPage = await githubGraphQL<RepositoryPage>(
      token,
      REPOSITORIES_QUERY,
      { owner, cursor, since },
    )
    const page = data.repositoryOwner?.repositories
    if (!page) {
      console.warn(`GitHub repository owner ${owner} was not found`)
      break
    }

    repositories.push(
      ...page.nodes.filter((repository) => repository.pushedAt >= since),
    )
    const oldestRepository = page.nodes[page.nodes.length - 1]
    hasNextPage =
      page.pageInfo.hasNextPage &&
      Boolean(oldestRepository && oldestRepository.pushedAt >= since)
    cursor = page.pageInfo.endCursor
    if (hasNextPage && !cursor) break
  }

  return repositories
}

async function fetchRepositories(token: string, since: string) {
  const owners = timelineOwners()
  const repositories: GitHubRepository[] = []

  for (let index = 0; index < owners.length; index += 3) {
    const ownerRepositories = await Promise.all(
      owners
        .slice(index, index + 3)
        .map((owner) => fetchOwnerRepositories(token, since, owner)),
    )
    repositories.push(...ownerRepositories.flat())
  }

  return [
    ...new Map(
      repositories.map((repository) => [repository.nameWithOwner, repository]),
    ).values(),
  ]
}

async function completeHistory(
  token: string,
  repository: GitHubRepository,
  since: string,
) {
  const history = historyFor(repository)
  if (!history?.pageInfo.hasNextPage) return

  let cursor = history.pageInfo.endCursor
  let hasNextPage: boolean = history.pageInfo.hasNextPage

  while (
    hasNextPage &&
    cursor &&
    history.nodes.length < MAX_COMMITS_PER_REPOSITORY
  ) {
    const data: HistoryPage = await githubGraphQL<HistoryPage>(
      token,
      HISTORY_QUERY,
      {
        owner: repository.nameWithOwner.split("/")[0],
        name: repository.name,
        since,
        cursor,
      },
    )
    const page = data.repository?.defaultBranchRef?.target?.history
    if (!page) break

    history.nodes.push(...page.nodes)
    history.pageInfo = page.pageInfo
    hasNextPage = page.pageInfo.hasNextPage
    cursor = page.pageInfo.endCursor
  }
}

async function completeRepositoryHistories(
  token: string,
  repositories: GitHubRepository[],
  since: string,
) {
  const repositoriesWithMore = repositories.filter(
    (repository) => historyFor(repository)?.pageInfo.hasNextPage,
  )

  // Keep GitHub response sizes and concurrent work predictable during ISR.
  for (let index = 0; index < repositoriesWithMore.length; index += 6) {
    await Promise.all(
      repositoriesWithMore
        .slice(index, index + 6)
        .map((repository) => completeHistory(token, repository, since)),
    )
  }
}

function createTimelineData(
  repositories: GitHubRepository[],
  now: Date,
): ProjectTimelineData {
  const { start, weeks } = timelineDates(now)
  const coreMembers = getCoreMembers()
  const coreByLogin = new Map(
    coreMembers.map((member) => [member.login.toLowerCase(), member]),
  )

  const projects = repositories.map((repository): TimelineProject => {
    const projectWeeks = Array<number>(TIMELINE_WEEKS).fill(0)
    const contributors = new Map<
      string,
      Omit<TimelineContributor, "contributions">
    >()
    const history = historyFor(repository)

    for (const commit of history?.nodes ?? []) {
      const commitWeek = startOfUtcWeek(commit.committedDate)
      const weekIndex = Math.floor((commitWeek.getTime() - start.getTime()) / WEEK_MS)
      if (weekIndex < 0 || weekIndex >= TIMELINE_WEEKS) continue

      projectWeeks[weekIndex] += 1
      const user = commit.author?.user
      const fallbackName = commit.author?.name?.trim() || "Unknown contributor"
      const key = user?.login.toLowerCase() ?? `anonymous:${fallbackName.toLowerCase()}`
      const current = contributors.get(key) ?? {
        login: user?.login ?? fallbackName,
        name: user?.login ?? fallbackName,
        avatarUrl: user?.avatarUrl ?? commit.author?.avatarUrl ?? null,
        url: user?.url ?? null,
        weeks: Array<number>(TIMELINE_WEEKS).fill(0),
        coreMember: user ? coreByLogin.get(user.login.toLowerCase()) ?? null : null,
      }
      current.weeks[weekIndex] += 1
      contributors.set(key, current)
    }

    const timelineContributors = [...contributors.values()]
      .map((contributor) => ({
        ...contributor,
        contributions: contributor.weeks.reduce((total, count) => total + count, 0),
      }))
      .sort((a, b) => b.contributions - a.contributions)
    const capturedContributions = projectWeeks.reduce(
      (total, count) => total + count,
      0,
    )
    const coreContributions = timelineContributors
      .filter((contributor) => contributor.coreMember)
      .reduce((total, contributor) => total + contributor.contributions, 0)

    return {
      name: repository.name,
      fullName: repository.nameWithOwner,
      owner: repository.nameWithOwner.split("/")[0],
      description: repository.description,
      url: repository.url,
      homepageUrl: repository.homepageUrl || null,
      createdAt: repository.createdAt,
      pushedAt: repository.pushedAt,
      archived: repository.isArchived,
      stars: repository.stargazerCount,
      forks: repository.forkCount,
      openIssues: repository.openIssues?.totalCount ?? 0,
      language: repository.primaryLanguage?.name ?? null,
      languageColor: repository.primaryLanguage?.color ?? null,
      license: repository.licenseInfo?.spdxId ?? null,
      topics:
        repository.repositoryTopics?.nodes.map((node) => node.topic.name) ?? [],
      weeks: projectWeeks,
      totalContributions: history?.totalCount ?? 0,
      capturedContributions,
      coreContributions,
      contributors: timelineContributors,
      complete:
        !history?.pageInfo.hasNextPage ||
        capturedContributions >= (history?.totalCount ?? 0),
    }
  })

  return {
    owners: timelineOwners(),
    generatedAt: now.toISOString(),
    startDate: dateOnly(start),
    endDate: dateOnly(now),
    weeks,
    projects,
    coreMembers,
    source: "live",
  }
}

export async function fetchProjectTimeline(
  token: string,
  now = new Date(),
): Promise<ProjectTimelineData> {
  const { start } = timelineDates(now)
  const since = start.toISOString()
  const repositories = await fetchRepositories(token, since)
  await completeRepositoryHistories(token, repositories, since)
  return createTimelineData(repositories, now)
}
