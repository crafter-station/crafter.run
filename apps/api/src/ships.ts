import type {
  CreateShipDraftRequest,
  MemberProfile,
  ShipDetail,
  ShipDraftInput,
  ShipLink,
  ShipSummary,
  UpdateShipDraftRequest,
  UpsertMemberRequest,
} from "@crafter/contracts"
import { randomUUID } from "node:crypto"
import { createDatabase } from "@crafter/db"
import { members, shipLinks, shipProvenance, ships } from "@crafter/db/schema"
import { and, desc, eq, inArray, sql } from "drizzle-orm"

export class RepositoryUnavailableError extends Error {}

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new RepositoryUnavailableError("DATABASE_URL is not configured")
  return createDatabase(databaseUrl)
}

function memberProfile(row: typeof members.$inferSelect): MemberProfile {
  return {
    handle: row.handle,
    displayName: row.displayName,
    bio: row.bio,
    avatarUrl: row.avatarUrl,
    createdAt: new Date(row.createdAt).toISOString(),
  }
}

export async function findMemberByClerkId(clerkUserId: string) {
  const db = getDatabase()
  const [member] = await db.select().from(members).where(eq(members.clerkUserId, clerkUserId)).limit(1)
  return member ?? null
}

export async function getMemberByClerkId(clerkUserId: string): Promise<MemberProfile | null> {
  const member = await findMemberByClerkId(clerkUserId)
  return member ? memberProfile(member) : null
}

export async function getMemberByHandle(handle: string): Promise<MemberProfile | null> {
  const db = getDatabase()
  const [member] = await db.select().from(members).where(eq(members.handle, handle.toLowerCase())).limit(1)
  return member ? memberProfile(member) : null
}

export async function upsertMember(clerkUserId: string, input: UpsertMemberRequest): Promise<MemberProfile | null> {
  const db = getDatabase()
  const [member] = await db
    .insert(members)
    .values({
      clerkUserId,
      handle: input.handle,
      displayName: input.displayName,
      bio: input.bio ?? null,
      avatarUrl: input.avatarUrl ?? null,
    })
    .onConflictDoUpdate({
      target: members.clerkUserId,
      set: {
        handle: input.handle,
        displayName: input.displayName,
        bio: input.bio ?? null,
        avatarUrl: input.avatarUrl ?? null,
        updatedAt: new Date().toISOString(),
      },
    })
    .returning()
  return member ? memberProfile(member) : null
}

async function linksForShips(db: ReturnType<typeof getDatabase>, shipIds: string[]) {
  if (shipIds.length === 0) return new Map<string, ShipLink[]>()
  const rows = await db
    .select({ shipId: shipLinks.shipId, type: shipLinks.type, url: shipLinks.url, verifiedAt: shipLinks.verifiedAt })
    .from(shipLinks)
    .where(inArray(shipLinks.shipId, shipIds))
  const result = new Map<string, ShipLink[]>()
  for (const link of rows) {
    const current = result.get(link.shipId) ?? []
    current.push({
      type: link.type,
      url: link.url,
      verifiedAt: link.verifiedAt ? new Date(link.verifiedAt).toISOString() : null,
    })
    result.set(link.shipId, current)
  }
  return result
}

async function provenanceForShips(db: ReturnType<typeof getDatabase>, shipIds: string[]) {
  if (shipIds.length === 0) return new Map<string, string[]>()
  const rows = await db
    .select({ shipId: shipProvenance.shipId, value: shipProvenance.value })
    .from(shipProvenance)
    .where(inArray(shipProvenance.shipId, shipIds))
  const result = new Map<string, string[]>()
  for (const row of rows) result.set(row.shipId, [...(result.get(row.shipId) ?? []), row.value])
  return result
}

export async function listPublishedShips(ownerHandle?: string): Promise<ShipSummary[]> {
  const db = getDatabase()
  const rows = await db
    .select({
      id: ships.id,
      slug: ships.slug,
      name: ships.name,
      tagline: ships.tagline,
      publishedAt: ships.publishedAt,
      ownerHandle: members.handle,
      ownerDisplayName: members.displayName,
      ownerAvatarUrl: members.avatarUrl,
    })
    .from(ships)
    .innerJoin(members, eq(ships.ownerMemberId, members.id))
    .where(ownerHandle ? and(eq(ships.status, "published"), eq(members.handle, ownerHandle)) : eq(ships.status, "published"))
    .orderBy(desc(ships.publishedAt))
    .limit(100)
  const links = await linksForShips(db, rows.map((ship) => ship.id))
  return rows.flatMap((ship) =>
    ship.publishedAt
      ? [{
          id: ship.id,
          slug: ship.slug,
          name: ship.name,
          tagline: ship.tagline,
          publishedAt: new Date(ship.publishedAt).toISOString(),
          owner: {
            handle: ship.ownerHandle,
            displayName: ship.ownerDisplayName,
            avatarUrl: ship.ownerAvatarUrl,
          },
          links: links.get(ship.id) ?? [],
        }]
      : [],
  )
}

type ShipRow = typeof ships.$inferSelect & {
  ownerHandle: string
  ownerDisplayName: string
  ownerAvatarUrl: string | null
}

async function hydrateShips(
  db: ReturnType<typeof getDatabase>,
  rows: ShipRow[],
  includeProvenance = false,
): Promise<ShipDetail[]> {
  const shipIds = rows.map((ship) => ship.id)
  const [links, provenance] = await Promise.all([
    linksForShips(db, shipIds),
    includeProvenance ? provenanceForShips(db, shipIds) : Promise.resolve(new Map<string, string[]>()),
  ])
  return rows.map((ship) => ({
    id: ship.id,
    slug: ship.slug,
    name: ship.name,
    tagline: ship.tagline,
    description: ship.description,
    status: ship.status,
    source: ship.source,
    publishedAt: ship.publishedAt ? new Date(ship.publishedAt).toISOString() : null,
    createdAt: new Date(ship.createdAt).toISOString(),
    updatedAt: new Date(ship.updatedAt).toISOString(),
    owner: {
      handle: ship.ownerHandle,
      displayName: ship.ownerDisplayName,
      avatarUrl: ship.ownerAvatarUrl,
    },
    links: links.get(ship.id) ?? [],
    provenance: provenance.get(ship.id) ?? [],
  }))
}

const shipSelection = {
  id: ships.id,
  ownerMemberId: ships.ownerMemberId,
  slug: ships.slug,
  name: ships.name,
  tagline: ships.tagline,
  description: ships.description,
  status: ships.status,
  source: ships.source,
  publishedAt: ships.publishedAt,
  createdAt: ships.createdAt,
  updatedAt: ships.updatedAt,
  ownerHandle: members.handle,
  ownerDisplayName: members.displayName,
  ownerAvatarUrl: members.avatarUrl,
}

export async function getPublishedShip(slug: string): Promise<ShipDetail | null> {
  const db = getDatabase()
  const rows = await db
    .select(shipSelection)
    .from(ships)
    .innerJoin(members, eq(ships.ownerMemberId, members.id))
    .where(and(eq(ships.slug, slug), eq(ships.status, "published")))
    .limit(1)
  return (await hydrateShips(db, rows))[0] ?? null
}

export async function listOwnedShips(memberId: string): Promise<ShipDetail[]> {
  const db = getDatabase()
  const rows = await db
    .select(shipSelection)
    .from(ships)
    .innerJoin(members, eq(ships.ownerMemberId, members.id))
    .where(eq(ships.ownerMemberId, memberId))
    .orderBy(desc(ships.updatedAt))
  return hydrateShips(db, rows, true)
}

export async function createDraft(
  memberId: string,
  input: CreateShipDraftRequest & { source: ShipDraftInput["source"] },
): Promise<ShipDetail | null> {
  const db = getDatabase()
  const shipId = randomUUID()
  const insertShip = db.insert(ships).values({
    id: shipId,
    ownerMemberId: memberId,
    slug: input.slug,
    name: input.name,
    tagline: input.tagline,
    description: input.description,
    source: input.source,
  })
  const insertLinks = input.links.length
    ? db.insert(shipLinks).values(input.links.map((link) => ({ shipId, ...link })))
    : null
  const insertProvenance = input.provenance.length
    ? db.insert(shipProvenance).values(input.provenance.map((value) => ({ shipId, value })))
    : null

  if (insertLinks && insertProvenance) {
    await db.batch([insertShip, insertLinks, insertProvenance])
  } else if (insertLinks) {
    await db.batch([insertShip, insertLinks])
  } else if (insertProvenance) {
    await db.batch([insertShip, insertProvenance])
  } else {
    await insertShip
  }
  const result = await getOwnedShip(memberId, shipId)
  return result?.status === "draft" ? result : null
}

export async function getOwnedShip(memberId: string, shipId: string): Promise<ShipDetail | null> {
  const db = getDatabase()
  const rows = await db
    .select(shipSelection)
    .from(ships)
    .innerJoin(members, eq(ships.ownerMemberId, members.id))
    .where(and(eq(ships.id, shipId), eq(ships.ownerMemberId, memberId)))
    .limit(1)
  return (await hydrateShips(db, rows, true))[0] ?? null
}

export async function getOwnedShipBySlug(memberId: string, slug: string): Promise<ShipDetail | null> {
  const db = getDatabase()
  const rows = await db
    .select(shipSelection)
    .from(ships)
    .innerJoin(members, eq(ships.ownerMemberId, members.id))
    .where(and(eq(ships.slug, slug), eq(ships.ownerMemberId, memberId)))
    .limit(1)
  return (await hydrateShips(db, rows, true))[0] ?? null
}

export async function updateDraft(
  memberId: string,
  shipId: string,
  input: UpdateShipDraftRequest,
): Promise<ShipDetail | null> {
  const db = getDatabase()
  const changes: Partial<typeof ships.$inferInsert> = { updatedAt: new Date().toISOString() }
  for (const key of ["slug", "name", "tagline", "description"] as const) {
    if (input[key] !== undefined) changes[key] = input[key]
  }
  const current = await getOwnedShip(memberId, shipId)
  if (!current || current.status !== "draft") return null
  const updateShip = db
    .update(ships)
    .set(changes)
    .where(and(eq(ships.id, shipId), eq(ships.ownerMemberId, memberId), eq(ships.status, "draft")))
  const insertLinks = input.links?.length
    ? db.execute(sql`
        insert into ship_links (ship_id, type, url)
        select ${shipId}::uuid, values_to_insert.type::ship_link_type, values_to_insert.url
        from (values ${sql.join(input.links.map((link) => sql`(${link.type}, ${link.url})`), sql`, `)})
          as values_to_insert(type, url)
        where exists (
          select 1 from ships
          where id = ${shipId}::uuid and owner_member_id = ${memberId}::uuid and status = 'draft'
        )
      `)
    : null
  const editableShip = db
    .select({ id: ships.id })
    .from(ships)
    .where(and(eq(ships.id, shipId), eq(ships.ownerMemberId, memberId), eq(ships.status, "draft")))
  const guardedDeleteLinks = db
    .delete(shipLinks)
    .where(and(eq(shipLinks.shipId, shipId), inArray(shipLinks.shipId, editableShip)))
  const guardedDeleteProvenance = db
    .delete(shipProvenance)
    .where(and(eq(shipProvenance.shipId, shipId), inArray(shipProvenance.shipId, editableShip)))
  const insertProvenance = input.provenance?.length
    ? db.execute(sql`
        insert into ship_provenance (ship_id, value)
        select ${shipId}::uuid, values_to_insert.value
        from (values ${sql.join(input.provenance.map((value) => sql`(${value})`), sql`, `)})
          as values_to_insert(value)
        where exists (
          select 1 from ships
          where id = ${shipId}::uuid and owner_member_id = ${memberId}::uuid and status = 'draft'
        )
      `)
    : null

  if (input.links && input.provenance) {
    if (insertLinks && insertProvenance) await db.batch([updateShip, guardedDeleteLinks, insertLinks, guardedDeleteProvenance, insertProvenance])
    else if (insertLinks) await db.batch([updateShip, guardedDeleteLinks, insertLinks, guardedDeleteProvenance])
    else if (insertProvenance) await db.batch([updateShip, guardedDeleteLinks, guardedDeleteProvenance, insertProvenance])
    else await db.batch([updateShip, guardedDeleteLinks, guardedDeleteProvenance])
  } else if (input.links) {
    if (insertLinks) await db.batch([updateShip, guardedDeleteLinks, insertLinks])
    else await db.batch([updateShip, guardedDeleteLinks])
  } else if (input.provenance) {
    if (insertProvenance) await db.batch([updateShip, guardedDeleteProvenance, insertProvenance])
    else await db.batch([updateShip, guardedDeleteProvenance])
  } else {
    await updateShip
  }
  const result = await getOwnedShip(memberId, shipId)
  return result?.status === "draft" ? result : null
}

export async function publishDraft(
  memberId: string,
  shipId: string,
  expectedUpdatedAt: string,
): Promise<ShipDetail | null> {
  const db = getDatabase()
  const now = new Date().toISOString()
  const [updated] = await db
    .update(ships)
    .set({ status: "published", publishedAt: now, updatedAt: now })
    .where(
      and(
        eq(ships.id, shipId),
        eq(ships.ownerMemberId, memberId),
        eq(ships.status, "draft"),
        eq(ships.updatedAt, expectedUpdatedAt),
      ),
    )
    .returning({ id: ships.id })
  return updated ? getOwnedShip(memberId, shipId) : null
}
