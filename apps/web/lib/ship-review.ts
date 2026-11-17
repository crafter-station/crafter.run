import "server-only"
import { members, shipLinks, ships } from "@crafter/db/schema"
import { and, asc, desc, eq, inArray, isNotNull, ne, sql } from "drizzle-orm"

import { crewMembers } from "@/lib/crew"
import { getDb } from "@/lib/db"
import { teamMembers } from "@/lib/team"

export type ReviewShip = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  imageUrl: string | null
  status: "draft" | "pending" | "published" | "hidden"
  updatedAt: string
  publishedAt: string | null
  featuredAt: string | null
  owner: { id: string; handle: string; displayName: string; trust: "new" | "trusted" | "blocked"; createdAt: string }
  links: { type: string; url: string }[]
}

const githubHandle = (url: string | undefined) => url?.match(/github\.com\/([^/?#]+)/i)?.[1]?.toLowerCase()

/** GitHub handles of the active Core roster and the Crew, which publish without review. */
export function rosterHandles(): string[] {
  const core = teamMembers.filter((member) => !member.alumni).map((member) => githubHandle(member.github))
  const crew = crewMembers.map((member) => githubHandle(member.link))
  return [...new Set([...core, ...crew].filter((handle): handle is string => Boolean(handle)))]
}

function database() {
  const db = getDb()
  if (!db) throw new Error("DATABASE_URL is not configured.")
  return db
}

async function load(
  status: ReviewShip["status"],
  order: "oldest" | "newest" | "featured",
  limit: number,
): Promise<ReviewShip[]> {
  const db = database()
  const rows = await db
    .select({
      id: ships.id,
      slug: ships.slug,
      name: ships.name,
      tagline: ships.tagline,
      description: ships.description,
      imageUrl: ships.imageUrl,
      status: ships.status,
      updatedAt: ships.updatedAt,
      publishedAt: ships.publishedAt,
      featuredAt: ships.featuredAt,
      ownerId: members.id,
      ownerHandle: members.handle,
      ownerDisplayName: members.displayName,
      ownerTrust: members.trust,
      ownerCreatedAt: members.createdAt,
    })
    .from(ships)
    .innerJoin(members, eq(members.id, ships.ownerMemberId))
    .where(order === "featured" ? and(eq(ships.status, status), isNotNull(ships.featuredAt)) : eq(ships.status, status))
    .orderBy(
      order === "oldest"
        ? asc(ships.updatedAt)
        : order === "featured"
          ? desc(ships.featuredAt)
          : desc(sql`coalesce(${ships.publishedAt}, ${ships.updatedAt})`),
    )
    .limit(limit)
  const ids = rows.map((row) => row.id)
  const links = ids.length
    ? await db.select({ shipId: shipLinks.shipId, type: shipLinks.type, url: shipLinks.url }).from(shipLinks).where(inArray(shipLinks.shipId, ids))
    : []
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    imageUrl: row.imageUrl,
    status: row.status,
    updatedAt: row.updatedAt,
    publishedAt: row.publishedAt,
    featuredAt: row.featuredAt,
    owner: { id: row.ownerId, handle: row.ownerHandle, displayName: row.ownerDisplayName, trust: row.ownerTrust, createdAt: row.ownerCreatedAt },
    links: links.filter((link) => link.shipId === row.id).map(({ type, url }) => ({ type, url })),
  }))
}

export async function loadReviewBoard() {
  const [pending, published, hidden, [featured]] = await Promise.all([
    load("pending", "oldest", 100),
    load("published", "newest", 30),
    load("hidden", "newest", 30),
    load("published", "featured", 1),
  ])
  return { pending, published, hidden, featured: featured ?? null }
}

export async function countPendingShips(): Promise<number> {
  const db = getDb()
  if (!db) return 0
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(ships).where(eq(ships.status, "pending"))
  return row?.count ?? 0
}

/** Core and Crew in the roster files become trusted members; blocked members stay blocked. */
export async function syncRosterTrust(): Promise<number> {
  const handles = rosterHandles()
  if (!handles.length) return 0
  const db = database()
  const updated = await db
    .update(members)
    .set({ trust: "trusted", updatedAt: new Date().toISOString() })
    .where(
      and(
        eq(members.trust, "new"),
        sql`lower(substring(${members.githubUrl} from 'github\\.com/([^/?#]+)')) in (${sql.join(handles.map((handle) => sql`${handle}`), sql`, `)})`,
      ),
    )
    .returning({ id: members.id })
  return updated.length
}

/** Publishes a pending Ship and trusts its owner, so their next Ships skip review. */
export async function approveShip(shipId: string) {
  const db = database()
  const now = new Date().toISOString()
  const [ship] = await db
    .update(ships)
    .set({ status: "published", publishedAt: now, reviewNote: null, updatedAt: now })
    .where(and(eq(ships.id, shipId), eq(ships.status, "pending")))
    .returning({ ownerMemberId: ships.ownerMemberId })
  if (!ship) return false
  await db
    .update(members)
    .set({ trust: "trusted", updatedAt: now })
    .where(and(eq(members.id, ship.ownerMemberId), ne(members.trust, "blocked")))
  return true
}

/** Sends a pending Ship back to its owner's drafts with a note explaining why. */
export async function sendShipBack(shipId: string, note: string) {
  const db = database()
  const [ship] = await db
    .update(ships)
    .set({ status: "draft", reviewNote: note.trim().slice(0, 500) || null, updatedAt: new Date().toISOString() })
    .where(and(eq(ships.id, shipId), eq(ships.status, "pending")))
    .returning({ id: ships.id })
  return Boolean(ship)
}

/** Features a published Ship (the latest one featured wins on /ships) or clears it. */
export async function setShipFeatured(shipId: string, featured: boolean) {
  const db = database()
  const [ship] = await db
    .update(ships)
    .set({ featuredAt: featured ? new Date().toISOString() : null })
    .where(and(eq(ships.id, shipId), eq(ships.status, "published")))
    .returning({ id: ships.id })
  return Boolean(ship)
}

export async function setShipHidden(shipId: string, hidden: boolean) {
  const db = database()
  const [ship] = await db
    .update(ships)
    .set({ status: hidden ? "hidden" : "published", updatedAt: new Date().toISOString(), ...(hidden ? { featuredAt: null } : {}) })
    .where(and(eq(ships.id, shipId), eq(ships.status, hidden ? "published" : "hidden")))
    .returning({ id: ships.id })
  return Boolean(ship)
}

/** Blocks a member from publishing and hides everything they have public or waiting. */
export async function blockMember(memberId: string) {
  const db = database()
  const now = new Date().toISOString()
  await db.update(members).set({ trust: "blocked", updatedAt: now }).where(eq(members.id, memberId))
  await db
    .update(ships)
    .set({ status: "hidden", featuredAt: null, updatedAt: now })
    .where(and(eq(ships.ownerMemberId, memberId), eq(ships.status, "published")))
  await db
    .update(ships)
    .set({ status: "draft", updatedAt: now })
    .where(and(eq(ships.ownerMemberId, memberId), eq(ships.status, "pending")))
}

export async function setMemberTrusted(memberId: string) {
  const db = database()
  await db.update(members).set({ trust: "trusted", updatedAt: new Date().toISOString() }).where(eq(members.id, memberId))
}
