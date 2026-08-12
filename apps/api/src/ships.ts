import type {
  CreateShipDraftRequest,
  CreateShipUpdateRequest,
  MemberProfile,
  MemberSource,
  PrivateMemberProfile,
  ShipDetail,
  ShipDraftInput,
  ShipLink,
  ShipSummary,
  ShipUpdate,
  ShipVote,
  UpdateShipDraftRequest,
  UpdatePublishedShipRequest,
  UpsertMemberRequest,
} from "@crafter/contracts"
import { randomUUID } from "node:crypto"
import { createDatabase } from "@crafter/db"
import { members, shipLinks, shipProvenance, ships, shipUpdates, shipVotes } from "@crafter/db/schema"
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm"

export class RepositoryUnavailableError extends Error {}

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new RepositoryUnavailableError("DATABASE_URL is not configured")
  return createDatabase(databaseUrl)
}

export function memberProfile(row: typeof members.$inferSelect): MemberProfile {
  return {
    handle: row.handle,
    displayName: row.displayName,
    bio: row.bio,
    avatarUrl: row.avatarUrl,
    githubUrl: row.githubUrl,
    gitlabUrl: row.gitlabUrl,
    linkedinUrl: row.linkedinUrl,
    instagramUrl: row.instagramUrl,
    xUrl: row.xUrl,
    primaryWebsiteUrl: row.primaryWebsiteUrl,
    secondaryWebsiteUrl: row.secondaryWebsiteUrl,
    currentRole: row.currentRole,
    rolesOpenTo: row.rolesOpenTo,
    isJobSeeking: row.isJobSeeking,
    createdAt: new Date(row.createdAt).toISOString(),
  }
}

export function privateMemberProfile(row: typeof members.$inferSelect): PrivateMemberProfile {
  return {
    ...memberProfile(row),
    salaryRange: row.salaryMin === null || row.salaryMax === null || row.salaryCurrency === null
      ? null
      : { min: row.salaryMin, max: row.salaryMax, currency: row.salaryCurrency },
    workArrangements: row.workArrangements as PrivateMemberProfile["workArrangements"],
    onsiteCity: row.onsiteCity,
    resumeUrl: row.resumeUrl,
  }
}

export async function findMemberByClerkId(clerkUserId: string) {
  const db = getDatabase()
  const [member] = await db.select().from(members).where(eq(members.clerkUserId, clerkUserId)).limit(1)
  return member ?? null
}

export async function getMemberByClerkId(clerkUserId: string): Promise<PrivateMemberProfile | null> {
  const member = await findMemberByClerkId(clerkUserId)
  return member ? privateMemberProfile(member) : null
}

export async function isHandleTaken(handle: string): Promise<boolean> {
  const db = getDatabase()
  const [row] = await db
    .select({ id: members.id })
    .from(members)
    .where(eq(members.handle, handle.toLowerCase()))
    .limit(1)
  return Boolean(row)
}

export async function getMemberByHandle(handle: string): Promise<MemberProfile | null> {
  const db = getDatabase()
  const [member] = await db.select().from(members).where(eq(members.handle, handle.toLowerCase())).limit(1)
  return member ? memberProfile(member) : null
}

export async function listMembers(): Promise<MemberProfile[]> {
  const db = getDatabase()
  const rows = await db.select().from(members).orderBy(asc(members.createdAt))
  return rows.map(memberProfile)
}

export async function upsertMember(
  clerkUserId: string,
  input: UpsertMemberRequest,
  source: MemberSource = "web",
): Promise<PrivateMemberProfile | null> {
  const db = getDatabase()
  const profileUpdates = {
    ...(Object.hasOwn(input, "githubUrl") ? { githubUrl: input.githubUrl ?? null } : {}),
    ...(Object.hasOwn(input, "gitlabUrl") ? { gitlabUrl: input.gitlabUrl ?? null } : {}),
    ...(Object.hasOwn(input, "linkedinUrl") ? { linkedinUrl: input.linkedinUrl ?? null } : {}),
    ...(Object.hasOwn(input, "instagramUrl") ? { instagramUrl: input.instagramUrl ?? null } : {}),
    ...(Object.hasOwn(input, "xUrl") ? { xUrl: input.xUrl ?? null } : {}),
    ...(Object.hasOwn(input, "primaryWebsiteUrl") ? { primaryWebsiteUrl: input.primaryWebsiteUrl ?? null } : {}),
    ...(Object.hasOwn(input, "secondaryWebsiteUrl") ? { secondaryWebsiteUrl: input.secondaryWebsiteUrl ?? null } : {}),
    ...(Object.hasOwn(input, "currentRole") ? { currentRole: input.currentRole ?? null } : {}),
    ...(Object.hasOwn(input, "rolesOpenTo") ? { rolesOpenTo: input.rolesOpenTo ?? [] } : {}),
    ...(Object.hasOwn(input, "isJobSeeking") ? { isJobSeeking: input.isJobSeeking ?? false } : {}),
    ...(Object.hasOwn(input, "salaryRange") ? {
      salaryMin: input.salaryRange?.min ?? null,
      salaryMax: input.salaryRange?.max ?? null,
      salaryCurrency: input.salaryRange?.currency ?? null,
    } : {}),
    ...(Object.hasOwn(input, "workArrangements") ? { workArrangements: input.workArrangements ?? [] } : {}),
    ...(Object.hasOwn(input, "onsiteCity") ? { onsiteCity: input.onsiteCity ?? null } : {}),
    ...(Object.hasOwn(input, "resumeUrl") ? { resumeUrl: input.resumeUrl ?? null } : {}),
  }
  const [member] = await db
    .insert(members)
    .values({
      clerkUserId,
      handle: input.handle,
      displayName: input.displayName,
      bio: input.bio ?? null,
      avatarUrl: input.avatarUrl ?? null,
      githubUrl: input.githubUrl ?? null,
      gitlabUrl: input.gitlabUrl ?? null,
      linkedinUrl: input.linkedinUrl ?? null,
      instagramUrl: input.instagramUrl ?? null,
      xUrl: input.xUrl ?? null,
      primaryWebsiteUrl: input.primaryWebsiteUrl ?? null,
      secondaryWebsiteUrl: input.secondaryWebsiteUrl ?? null,
      currentRole: input.currentRole ?? null,
      rolesOpenTo: input.rolesOpenTo ?? [],
      isJobSeeking: input.isJobSeeking ?? false,
      salaryMin: input.salaryRange?.min ?? null,
      salaryMax: input.salaryRange?.max ?? null,
      salaryCurrency: input.salaryRange?.currency ?? null,
      workArrangements: input.workArrangements ?? [],
      onsiteCity: input.onsiteCity ?? null,
      resumeUrl: input.resumeUrl ?? null,
      source,
    })
    .onConflictDoUpdate({
      target: members.clerkUserId,
      set: {
        handle: input.handle,
        displayName: input.displayName,
        bio: input.bio ?? null,
        avatarUrl: input.avatarUrl ?? null,
        ...profileUpdates,
        updatedAt: new Date().toISOString(),
      },
    })
    .returning()
  return member ? privateMemberProfile(member) : null
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

async function updatesForShips(db: ReturnType<typeof getDatabase>, shipIds: string[]) {
  if (shipIds.length === 0) return new Map<string, ShipUpdate[]>()
  const rows = await db
    .select()
    .from(shipUpdates)
    .where(inArray(shipUpdates.shipId, shipIds))
    .orderBy(desc(shipUpdates.publishedAt))
  const result = new Map<string, ShipUpdate[]>()
  for (const update of rows) {
    const current = result.get(update.shipId) ?? []
    current.push({
      id: update.id,
      title: update.title,
      description: update.description,
      imageUrl: update.imageUrl,
      socialPostUrl: update.socialPostUrl,
      publishedAt: new Date(update.publishedAt).toISOString(),
    })
    result.set(update.shipId, current)
  }
  return result
}

async function voteCountsForShips(db: ReturnType<typeof getDatabase>, shipIds: string[]) {
  if (shipIds.length === 0) return new Map<string, number>()
  const rows = await db
    .select({ shipId: shipVotes.shipId, count: sql<number>`count(*)::int` })
    .from(shipVotes)
    .where(inArray(shipVotes.shipId, shipIds))
    .groupBy(shipVotes.shipId)
  return new Map(rows.map((row) => [row.shipId, row.count]))
}

export async function listPublishedShips(ownerHandle?: string): Promise<ShipSummary[]> {
  const db = getDatabase()
  const rows = await db
    .select({
      id: ships.id,
      slug: ships.slug,
      name: ships.name,
      tagline: ships.tagline,
      imageUrl: ships.imageUrl,
      socialPostUrl: ships.socialPostUrl,
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
  const shipIds = rows.map((ship) => ship.id)
  const [links, voteCounts] = await Promise.all([
    linksForShips(db, shipIds),
    voteCountsForShips(db, shipIds),
  ])
  return rows.flatMap((ship) =>
    ship.publishedAt
      ? [{
          id: ship.id,
          slug: ship.slug,
          name: ship.name,
          tagline: ship.tagline,
          imageUrl: ship.imageUrl,
          socialPostUrl: ship.socialPostUrl,
          publishedAt: new Date(ship.publishedAt).toISOString(),
          owner: {
            handle: ship.ownerHandle,
            displayName: ship.ownerDisplayName,
            avatarUrl: ship.ownerAvatarUrl,
          },
          links: links.get(ship.id) ?? [],
          voteCount: voteCounts.get(ship.id) ?? 0,
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
  const [links, provenance, updates, voteCounts] = await Promise.all([
    linksForShips(db, shipIds),
    includeProvenance ? provenanceForShips(db, shipIds) : Promise.resolve(new Map<string, string[]>()),
    updatesForShips(db, shipIds),
    voteCountsForShips(db, shipIds),
  ])
  return rows.map((ship) => ({
    id: ship.id,
    slug: ship.slug,
    name: ship.name,
    tagline: ship.tagline,
    description: ship.description,
    imageUrl: ship.imageUrl,
    socialPostUrl: ship.socialPostUrl,
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
    updates: updates.get(ship.id) ?? [],
    provenance: provenance.get(ship.id) ?? [],
    voteCount: voteCounts.get(ship.id) ?? 0,
  }))
}

export async function listShipVoteIds(clerkUserId: string): Promise<string[]> {
  const db = getDatabase()
  const rows = await db
    .select({ shipId: shipVotes.shipId })
    .from(shipVotes)
    .innerJoin(ships, eq(shipVotes.shipId, ships.id))
    .where(and(eq(shipVotes.voterClerkUserId, clerkUserId), eq(ships.status, "published")))
  return rows.map((row) => row.shipId)
}

export async function setShipVote(clerkUserId: string, slug: string, active: boolean): Promise<ShipVote | null> {
  const db = getDatabase()
  const [ship] = await db
    .select({ id: ships.id })
    .from(ships)
    .where(and(eq(ships.slug, slug), eq(ships.status, "published")))
    .limit(1)
  if (!ship) return null

  if (active) {
    await db.insert(shipVotes).values({ shipId: ship.id, voterClerkUserId: clerkUserId }).onConflictDoNothing()
  } else {
    await db
      .delete(shipVotes)
      .where(and(eq(shipVotes.shipId, ship.id), eq(shipVotes.voterClerkUserId, clerkUserId)))
  }

  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(shipVotes)
    .where(eq(shipVotes.shipId, ship.id))
  return { shipId: ship.id, active, voteCount: result?.count ?? 0 }
}

const shipSelection = {
  id: ships.id,
  ownerMemberId: ships.ownerMemberId,
  slug: ships.slug,
  name: ships.name,
  tagline: ships.tagline,
  description: ships.description,
  imageUrl: ships.imageUrl,
  socialPostUrl: ships.socialPostUrl,
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
    imageUrl: input.imageUrl,
    socialPostUrl: input.socialPostUrl,
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
  if (input.imageUrl !== undefined) changes.imageUrl = input.imageUrl
  if (input.socialPostUrl !== undefined) changes.socialPostUrl = input.socialPostUrl
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

export async function updatePublishedShip(
  memberId: string,
  shipId: string,
  input: UpdatePublishedShipRequest,
): Promise<ShipDetail | null> {
  const db = getDatabase()
  const updatedAt = new Date(Math.max(Date.now(), Date.parse(input.expectedUpdatedAt) + 1)).toISOString()
  const changes: Partial<typeof ships.$inferInsert> = { updatedAt }
  for (const key of ["slug", "name", "tagline", "description"] as const) {
    if (input[key] !== undefined) changes[key] = input[key]
  }
  if (input.imageUrl !== undefined) changes.imageUrl = input.imageUrl
  if (input.socialPostUrl !== undefined) changes.socialPostUrl = input.socialPostUrl
  const editableShip = db
    .select({ id: ships.id })
    .from(ships)
    .where(and(
      eq(ships.id, shipId),
      eq(ships.ownerMemberId, memberId),
      eq(ships.status, "published"),
      eq(ships.updatedAt, input.expectedUpdatedAt),
    ))
  const updateShip = db
    .update(ships)
    .set(changes)
    .where(and(
      eq(ships.id, shipId),
      eq(ships.ownerMemberId, memberId),
      eq(ships.status, "published"),
      eq(ships.updatedAt, input.expectedUpdatedAt),
    ))
  const guardedDeleteLinks = db
    .delete(shipLinks)
    .where(and(eq(shipLinks.shipId, shipId), inArray(shipLinks.shipId, editableShip)))
  const insertLinks = input.links?.length
    ? db.execute(sql`
        insert into ship_links (ship_id, type, url)
        select ${shipId}::uuid, values_to_insert.type::ship_link_type, values_to_insert.url
        from (values ${sql.join(input.links.map((link) => sql`(${link.type}, ${link.url})`), sql`, `)})
          as values_to_insert(type, url)
        where exists (
          select 1 from ships
          where id = ${shipId}::uuid and owner_member_id = ${memberId}::uuid
            and status = 'published' and updated_at = ${input.expectedUpdatedAt}
        )
      `)
    : null
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
          where id = ${shipId}::uuid and owner_member_id = ${memberId}::uuid
            and status = 'published' and updated_at = ${input.expectedUpdatedAt}
        )
      `)
    : null

  if (input.links && input.provenance) {
    if (insertLinks && insertProvenance) await db.batch([guardedDeleteLinks, insertLinks, guardedDeleteProvenance, insertProvenance, updateShip])
    else if (insertLinks) await db.batch([guardedDeleteLinks, insertLinks, guardedDeleteProvenance, updateShip])
    else if (insertProvenance) await db.batch([guardedDeleteLinks, guardedDeleteProvenance, insertProvenance, updateShip])
    else await db.batch([guardedDeleteLinks, guardedDeleteProvenance, updateShip])
  } else if (input.links) {
    if (insertLinks) await db.batch([guardedDeleteLinks, insertLinks, updateShip])
    else await db.batch([guardedDeleteLinks, updateShip])
  } else if (input.provenance) {
    if (insertProvenance) await db.batch([guardedDeleteProvenance, insertProvenance, updateShip])
    else await db.batch([guardedDeleteProvenance, updateShip])
  } else {
    await updateShip
  }
  const result = await getOwnedShip(memberId, shipId)
  return result?.status === "published" && result.updatedAt !== input.expectedUpdatedAt ? result : null
}

export async function publishDraft(
  memberId: string,
  shipId: string,
  expectedUpdatedAt: string,
  imageUrl?: string,
): Promise<ShipDetail | null> {
  const db = getDatabase()
  const now = new Date().toISOString()
  const [updated] = await db
    .update(ships)
    .set({ status: "published", publishedAt: now, updatedAt: now, ...(imageUrl ? { imageUrl } : {}) })
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

export async function createShipUpdate(
  memberId: string,
  slug: string,
  input: CreateShipUpdateRequest,
): Promise<ShipUpdate | null> {
  const db = getDatabase()
  const [ship] = await db
    .select({ id: ships.id })
    .from(ships)
    .where(and(eq(ships.slug, slug), eq(ships.ownerMemberId, memberId), eq(ships.status, "published")))
    .limit(1)
  if (!ship) return null

  const [update] = await db
    .insert(shipUpdates)
    .values({ shipId: ship.id, ...input })
    .returning()
  return update
    ? {
        id: update.id,
        title: update.title,
        description: update.description,
        imageUrl: update.imageUrl,
        socialPostUrl: update.socialPostUrl,
        publishedAt: new Date(update.publishedAt).toISOString(),
      }
    : null
}
