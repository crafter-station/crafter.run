import "server-only"
import { members, shipLinks, shipUpdates, ships } from "@crafter/db/schema"
import { and, eq, inArray, sql } from "drizzle-orm"
import { unstable_cache } from "next/cache"

import { env } from "@/env"
import { getDb } from "@/lib/db"
import {
  type Contributor,
  deriveDraft,
  type GithubRelease,
  normalizeRepoUrl,
  parseShipConfig,
  planReleaseUpdates,
  repoSkipReason,
  resolveOwner,
  SHIP_TOPIC,
  type TopicMember,
  type TopicRepo,
  validWebsite,
} from "@/lib/ship-topic"

export type ScanReport = {
  dryRun: boolean
  scanned: number
  draftsCreated: number
  updatesCreated: number
  drafts: { repo: string; slug: string; owner: string }[]
  updates: { repo: string; ship: string; title: string }[]
  skipped: { repo: string; reason: string }[]
  unmatched: UnmatchedRepo[]
}

export type UnmatchedRepo = { repo: string; url: string; owner: string; stars: number; reason: string }

type Fetcher = typeof fetch

function headers(accept = "application/vnd.github+json") {
  return {
    accept,
    "x-github-api-version": "2022-11-28",
    "user-agent": "crafter-run-ships-topic",
    ...(env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
  }
}

async function github<T>(path: string, fetcher: Fetcher, accept?: string): Promise<T | null> {
  const response = await fetcher(`https://api.github.com${path}`, { headers: headers(accept), cache: "no-store" })
  if (response.status === 404 || (response.status === 403 && path.includes("/contributors"))) return null
  if (!response.ok) throw new Error(`GitHub ${path} answered ${response.status}`)
  return (accept?.includes("raw") ? await response.text() : await response.json()) as T
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

/** GitHub login (lowercase) -> Clerk user id, from linked GitHub external accounts. */
async function githubLoginMap(): Promise<Map<string, string>> {
  const { clerkClient } = await import("@clerk/nextjs/server")
  const client = await clerkClient()
  const map = new Map<string, string>()
  const limit = 500
  for (let offset = 0; ; offset += limit) {
    const { data } = await client.users.getUserList({ limit, offset })
    for (const user of data) {
      for (const account of user.externalAccounts) {
        if (account.provider.endsWith("github") && account.username) map.set(account.username.toLowerCase(), user.id)
      }
    }
    if (data.length < limit) break
  }
  return map
}

export type ScanOptions = { dryRun: boolean; fetcher?: Fetcher }

export async function scanTopic({ dryRun, fetcher = fetch }: ScanOptions): Promise<ScanReport> {
  const db = getDb()
  if (!db) throw new Error("DATABASE_URL is not configured.")
  const report: ScanReport = { dryRun, scanned: 0, draftsCreated: 0, updatesCreated: 0, drafts: [], updates: [], skipped: [], unmatched: [] }

  const repos = await searchTopicRepos(fetcher)
  report.scanned = repos.length
  const candidates: TopicRepo[] = []
  for (const repo of repos) {
    const reason = repoSkipReason(repo)
    if (reason) report.skipped.push({ repo: repo.full_name, reason })
    else candidates.push(repo)
  }
  if (!candidates.length) return report

  const urls = candidates.map((repo) => normalizeRepoUrl(repo.html_url))
  const repoLinks = await db
    .select({
      url: sql<string>`lower(${shipLinks.url})`,
      shipId: ships.id,
      status: ships.status,
      publishedAt: ships.publishedAt,
      ownerTrust: members.trust,
    })
    .from(shipLinks)
    .innerJoin(ships, eq(ships.id, shipLinks.shipId))
    .innerJoin(members, eq(members.id, ships.ownerMemberId))
    .where(and(eq(shipLinks.type, "repository"), inArray(sql`lower(${shipLinks.url})`, urls)))
  const shipByUrl = new Map(repoLinks.map((row) => [normalizeRepoUrl(row.url), row]))

  const takenSlugs = new Set((await db.select({ slug: ships.slug }).from(ships)).map((row) => row.slug))
  let identity: { logins: Map<string, string>; byClerk: Map<string, TopicMember>; byHandle: Map<string, TopicMember> } | undefined
  const loadIdentity = async () => {
    if (identity) return identity
    const [logins, rows] = await Promise.all([
      githubLoginMap(),
      db.select({ id: members.id, handle: members.handle, trust: members.trust, clerkUserId: members.clerkUserId }).from(members),
    ])
    identity = {
      logins,
      byClerk: new Map(rows.map((row) => [row.clerkUserId, { id: row.id, handle: row.handle, trust: row.trust }])),
      byHandle: new Map(rows.map((row) => [row.handle.toLowerCase(), { id: row.id, handle: row.handle, trust: row.trust }])),
    }
    return identity
  }

  for (const repo of candidates) {
    const existing = shipByUrl.get(normalizeRepoUrl(repo.html_url))
    try {
      if (existing) {
        if (existing.status !== "published" || !existing.publishedAt) {
          report.skipped.push({ repo: repo.full_name, reason: `ship-exists-${existing.status}` })
          continue
        }
        if (existing.ownerTrust !== "trusted") {
          report.skipped.push({ repo: repo.full_name, reason: "owner-not-trusted" })
          continue
        }
        const releases = (await github<GithubRelease[]>(`/repos/${repo.full_name}/releases?per_page=30`, fetcher)) ?? []
        const known = await db
          .select({ url: shipUpdates.socialPostUrl })
          .from(shipUpdates)
          .where(eq(shipUpdates.shipId, existing.shipId))
        const plan = planReleaseUpdates({
          releases,
          shipPublishedAt: existing.publishedAt,
          existingUrls: new Set(known.map((row) => row.url).filter((url): url is string => Boolean(url))),
        })
        if (!plan.length) {
          report.skipped.push({ repo: repo.full_name, reason: "no-new-releases" })
          continue
        }
        for (const update of plan) {
          if (!dryRun) await db.insert(shipUpdates).values({ shipId: existing.shipId, ...update })
          report.updatesCreated++
          report.updates.push({ repo: repo.full_name, ship: existing.shipId, title: update.title })
        }
        continue
      }

      const [rawConfig, contributors] = await Promise.all([
        github<string>(`/repos/${repo.full_name}/contents/crafter.ship.json`, fetcher, "application/vnd.github.raw"),
        github<Contributor[]>(`/repos/${repo.full_name}/contributors?per_page=100`, fetcher),
      ])
      const config = parseShipConfig(rawConfig ?? undefined)
      const ids = await loadIdentity()
      const memberByLogin = (login: string) => {
        const clerkId = ids.logins.get(login.toLowerCase())
        return clerkId ? ids.byClerk.get(clerkId) : undefined
      }
      const owner = resolveOwner({
        ownerLogin: repo.owner.login,
        ownerType: repo.owner.type,
        contributors: contributors ?? [],
        memberByLogin,
        memberByHandle: (handle) => ids.byHandle.get(handle),
        overrideHandle: config.crafter,
      })
      if (!owner.ok) {
        report.skipped.push({ repo: repo.full_name, reason: owner.reason })
        if (owner.reason !== "member-blocked") {
          report.unmatched.push({ repo: repo.full_name, url: repo.html_url, owner: repo.owner.login, stars: repo.stargazers_count, reason: owner.reason })
        }
        continue
      }

      const homepage = validWebsite(repo.homepage)
      const websiteTaken = homepage
        ? (await db
            .select({ id: shipLinks.id })
            .from(shipLinks)
            .where(and(inArray(shipLinks.type, ["repository", "website"]), eq(sql`lower(${shipLinks.url})`, homepage.toLowerCase())))
            .limit(1)).length > 0
        : false
      const readme = await github<string>(`/repos/${repo.full_name}/readme`, fetcher, "application/vnd.github.raw")
      const draft = deriveDraft({ repo, readme, config, takenSlugs, websiteTaken })
      takenSlugs.add(draft.slug)

      if (!dryRun) {
        const [created] = await db
          .insert(ships)
          .values({
            ownerMemberId: owner.member.id,
            slug: draft.slug,
            name: draft.name,
            tagline: draft.tagline,
            description: draft.description,
            reviewNote: draft.reviewNote,
            status: "draft",
            source: "import",
          })
          .returning({ id: ships.id })
        const linked = await db
          .insert(shipLinks)
          .values(draft.links.map((link) => ({ shipId: created.id, ...link })))
          .onConflictDoNothing()
          .returning({ type: shipLinks.type })
        if (!linked.some((link) => link.type === "repository")) {
          await db.delete(ships).where(eq(ships.id, created.id))
          throw new Error("repository link already belongs to another ship")
        }
      }
      report.draftsCreated++
      report.drafts.push({ repo: repo.full_name, slug: draft.slug, owner: owner.member.handle })
    } catch (error) {
      report.skipped.push({ repo: repo.full_name, reason: `error: ${error instanceof Error ? error.message : String(error)}` })
    }
  }
  return report
}

/** Live, read-only list for the admin page; cached for 15 minutes. Failures read as an empty list. */
export const getUnmatchedTopicRepos = unstable_cache(
  async (): Promise<UnmatchedRepo[] | null> => {
    try {
      return (await scanTopic({ dryRun: true })).unmatched
    } catch (error) {
      console.warn("Topic scan for the admin list failed.", error)
      return null
    }
  },
  ["ships-topic-unmatched-v1"],
  { revalidate: 900 },
)
