import "server-only"
import { members, shipLinks, shipUpdates, ships } from "@crafter/db/schema"
import { and, eq, inArray, sql } from "drizzle-orm"
import { unstable_cache } from "next/cache"

import { env } from "@/env"
import { getDb } from "@/lib/db"
import {
  AUTO_SYNC_WINDOW_DAYS,
  type Contributor,
  githubFullName,
  type GithubRelease,
  hasTopic,
  MANUAL_SYNC_LIMIT,
  normalizeRepoUrl,
  planReleaseUpdates,
  repoSkipReason,
  SHIP_TOPIC,
  type SyncReason,
  type TopicRepo,
  verifyOwnerGithub,
} from "@/lib/ship-topic"

type Fetcher = typeof fetch
type Database = NonNullable<ReturnType<typeof getDb>>

export type SyncResult = { added: { title: string }[]; reason?: SyncReason }

export type ScanReport = {
  dryRun: boolean
  scanned: number
  updatesCreated: number
  updates: { repo: string; ship: string; title: string }[]
  skipped: { repo: string; reason: string }[]
  unmatched: UnmatchedRepo[]
}

export type UnmatchedRepo = { repo: string; url: string; owner: string; stars: number; reason: string }

function headers(accept = "application/vnd.github+json") {
  return {
    accept,
    "x-github-api-version": "2022-11-28",
    "user-agent": "crafter-run-ships-topic",
    ...(env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
  }
}

async function github<T>(path: string, fetcher: Fetcher): Promise<T | null> {
  const response = await fetcher(`https://api.github.com${path}`, { headers: headers(), cache: "no-store" })
  if (response.status === 404 || (response.status === 403 && path.includes("/contributors"))) return null
  if (!response.ok) throw new Error(`GitHub ${path} answered ${response.status}`)
  return (await response.json()) as T
}

/** Public, non-fork repos carrying the topic. Search returns at most 1000 results. */
export async function searchTopicRepos(fetcher: Fetcher = fetch): Promise<TopicRepo[]> {
  const repos: TopicRepo[] = []
  for (let page = 1; page <= 10; page++) {
    const result = await github<{ items: TopicRepo[] }>(
      `/search/repositories?q=topic:${SHIP_TOPIC}+is:public+fork:false&per_page=100&page=${page}`,
      fetcher,
    )
    const items = result?.items ?? []
    repos.push(...items)
    if (items.length < 100) break
  }
  return repos
}

/** GitHub logins linked to a Clerk user through external accounts. */
async function linkedGithubLogins(clerkUserId: string): Promise<string[]> {
  const { clerkClient } = await import("@clerk/nextjs/server")
  const user = await (await clerkClient()).users.getUser(clerkUserId)
  return user.externalAccounts
    .filter((account) => account.provider.endsWith("github") && account.username)
    .map((account) => account.username as string)
}

type ShipRow = {
  id: string
  status: "draft" | "pending" | "published" | "hidden"
  publishedAt: string | null
  ownerClerkUserId: string
  ownerTrust: "new" | "trusted" | "blocked"
}

/** Verifies the owner and imports releases for one Ship. `repo` must carry its topics. */
export async function syncShipReleases(input: {
  db: Database
  ship: ShipRow
  repo: TopicRepo
  mode: "auto" | "manual"
  dryRun?: boolean
  fetcher?: Fetcher
  now?: number
}): Promise<SyncResult> {
  const { db, ship, repo, mode, fetcher = fetch } = input
  const none = (reason: SyncReason): SyncResult => ({ added: [], reason })
  if (ship.status !== "published" || !ship.publishedAt) return none("ship-not-published")
  if (!hasTopic(repo)) return none("topic-missing")
  if (repoSkipReason(repo)) return none("repo-unusable")
  if (ship.ownerTrust !== "trusted") return none("owner-not-trusted")

  const linkedLogins = await linkedGithubLogins(ship.ownerClerkUserId)
  const contributors =
    repo.owner.type === "User" || !linkedLogins.length
      ? []
      : ((await github<Contributor[]>(`/repos/${repo.full_name}/contributors?per_page=100`, fetcher)) ?? [])
  const verified = verifyOwnerGithub({ ownerLogin: repo.owner.login, ownerType: repo.owner.type, contributors, linkedLogins })
  if (!verified.ok) return none(verified.reason)

  const releases = (await github<GithubRelease[]>(`/repos/${repo.full_name}/releases?per_page=30`, fetcher)) ?? []
  const known = await db.select({ url: shipUpdates.socialPostUrl }).from(shipUpdates).where(eq(shipUpdates.shipId, ship.id))
  const plan = planReleaseUpdates({
    releases,
    shipPublishedAt: ship.publishedAt,
    existingUrls: new Set(known.map((row) => row.url).filter((url): url is string => Boolean(url))),
    now: input.now,
    ...(mode === "auto" ? { windowDays: AUTO_SYNC_WINDOW_DAYS } : { limit: MANUAL_SYNC_LIMIT }),
  })
  if (!plan.length) return none("no-new-releases")
  if (!input.dryRun) await db.insert(shipUpdates).values(plan.map((update) => ({ shipId: ship.id, ...update })))
  return { added: plan.map((update) => ({ title: update.title })) }
}

/** Manual sync for a Ship's owner; ownership is checked here against the Clerk user id. */
export async function syncShipForOwner(slug: string, clerkUserId: string): Promise<SyncResult | { error: "not-found" | "forbidden" }> {
  const db = getDb()
  if (!db) throw new Error("DATABASE_URL is not configured.")
  const [ship] = await db
    .select({
      id: ships.id,
      status: ships.status,
      publishedAt: ships.publishedAt,
      ownerClerkUserId: members.clerkUserId,
      ownerTrust: members.trust,
    })
    .from(ships)
    .innerJoin(members, eq(members.id, ships.ownerMemberId))
    .where(eq(ships.slug, slug))
    .limit(1)
  if (!ship) return { error: "not-found" }
  if (ship.ownerClerkUserId !== clerkUserId) return { error: "forbidden" }

  const links = await db
    .select({ url: shipLinks.url })
    .from(shipLinks)
    .where(and(eq(shipLinks.shipId, ship.id), eq(shipLinks.type, "repository")))
  const fullName = links.map((link) => githubFullName(link.url)).find(Boolean)
  if (!fullName) return { added: [], reason: "no-repository" }
  const repo = await github<TopicRepo>(`/repos/${fullName}`, fetch)
  if (!repo) return { added: [], reason: "no-repository" }
  return syncShipReleases({ db, ship, repo, mode: "manual" })
}

export async function scanTopic({ dryRun, fetcher = fetch }: { dryRun: boolean; fetcher?: Fetcher }): Promise<ScanReport> {
  const db = getDb()
  if (!db) throw new Error("DATABASE_URL is not configured.")
  const report: ScanReport = { dryRun, scanned: 0, updatesCreated: 0, updates: [], skipped: [], unmatched: [] }

  const repos = await searchTopicRepos(fetcher)
  report.scanned = repos.length
  if (!repos.length) return report

  const rows = await db
    .select({
      url: sql<string>`lower(${shipLinks.url})`,
      id: ships.id,
      status: ships.status,
      publishedAt: ships.publishedAt,
      ownerClerkUserId: members.clerkUserId,
      ownerTrust: members.trust,
    })
    .from(shipLinks)
    .innerJoin(ships, eq(ships.id, shipLinks.shipId))
    .innerJoin(members, eq(members.id, ships.ownerMemberId))
    .where(and(eq(shipLinks.type, "repository"), inArray(sql`lower(${shipLinks.url})`, repos.map((repo) => normalizeRepoUrl(repo.html_url)))))
  const shipByUrl = new Map(rows.map((row) => [normalizeRepoUrl(row.url), row]))

  for (const repo of repos) {
    const unmatched = (reason: string) =>
      report.unmatched.push({ repo: repo.full_name, url: repo.html_url, owner: repo.owner.login, stars: repo.stargazers_count, reason })
    const skip = repoSkipReason(repo)
    if (skip) {
      report.skipped.push({ repo: repo.full_name, reason: skip })
      continue
    }
    const ship = shipByUrl.get(normalizeRepoUrl(repo.html_url))
    if (!ship) {
      report.skipped.push({ repo: repo.full_name, reason: "no-ship-yet" })
      unmatched("no-ship-yet")
      continue
    }
    try {
      const result = await syncShipReleases({ db, ship, repo, mode: "auto", dryRun, fetcher })
      for (const update of result.added) {
        report.updatesCreated++
        report.updates.push({ repo: repo.full_name, ship: ship.id, title: update.title })
      }
      if (result.reason) {
        report.skipped.push({ repo: repo.full_name, reason: result.reason })
        if (result.reason === "github-not-linked" || result.reason === "not-repo-owner-or-contributor") unmatched(result.reason)
      }
    } catch (error) {
      report.skipped.push({ repo: repo.full_name, reason: `error: ${error instanceof Error ? error.message : String(error)}` })
    }
  }
  return report
}

/** Live, read-only list for the admin page; cached for 15 minutes. A failed scan reads as null. */
export const getUnmatchedTopicRepos = unstable_cache(
  async (): Promise<UnmatchedRepo[] | null> => {
    try {
      return (await scanTopic({ dryRun: true })).unmatched
    } catch (error) {
      console.warn("Topic scan for the admin list failed.", error)
      return null
    }
  },
  ["ships-topic-unmatched-v2"],
  { revalidate: 900 },
)
