import { and, desc, eq, sql } from "drizzle-orm"
import { hotReloadBadges } from "@crafter/db/schema"

import { getDb } from "@/lib/db"
import type { BadgeVariant } from "@/lib/hot-reload-badge"

export type BadgeSide = "front" | "back"

export const badgeImageKey = (edition: number, number: number, side: BadgeSide) => `hot-reload/${edition}/${number}-${side}.jpg`

/** Public path of a badge face; `v` changes on every publish so caches pick up the new print. */
export const badgeImagePath = (badge: { edition: number; number: number; updatedAt: string }, side: BadgeSide) =>
  `/api/hot-reload/badge/${badge.edition}/${badge.number}/${side}?v=${Date.parse(badge.updatedAt)}`

const columns = {
  edition: hotReloadBadges.edition,
  number: hotReloadBadges.number,
  clerkUserId: hotReloadBadges.clerkUserId,
  name: hotReloadBadges.name,
  checkedIn: hotReloadBadges.checkedIn,
  variant: hotReloadBadges.variant,
  updatedAt: hotReloadBadges.updatedAt,
}

export async function getUserBadge(edition: number, clerkUserId: string) {
  const db = getDb()
  if (!db) return null
  const [badge] = await db.select(columns).from(hotReloadBadges)
    .where(and(eq(hotReloadBadges.edition, edition), eq(hotReloadBadges.clerkUserId, clerkUserId))).limit(1)
  return badge ?? null
}

export async function getBadgeByNumber(edition: number, number: number) {
  const db = getDb()
  if (!db) return null
  const [badge] = await db.select(columns).from(hotReloadBadges)
    .where(and(eq(hotReloadBadges.edition, edition), eq(hotReloadBadges.number, number))).limit(1)
  return badge ?? null
}

/** Drizzle wraps the driver error in `cause`; the constraint name shows up in one of the messages. */
function numberTaken(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  return error.message.includes("hot_reload_badges_edition_number_idx") || numberTaken(error.cause)
}

/** Reserves the attendee's number (next free one on first publish, the same one afterwards). */
export async function reserveBadge(edition: number, clerkUserId: string, name: string, checkedIn: boolean, variant: BadgeVariant) {
  const db = getDb()
  if (!db) throw new Error("Database is not configured")
  // Two first publishes can read the same max; the loser retries against the new max.
  for (;;) {
    try {
      const [badge] = await db.insert(hotReloadBadges).values({
        edition, clerkUserId, name, checkedIn, variant,
        number: sql`(select coalesce(max(${hotReloadBadges.number}), 0) + 1 from ${hotReloadBadges} where ${hotReloadBadges.edition} = ${edition})`,
      }).onConflictDoUpdate({
        target: [hotReloadBadges.edition, hotReloadBadges.clerkUserId],
        set: { name, variant, checkedIn: sql`${hotReloadBadges.checkedIn} or ${checkedIn}`, updatedAt: sql`now()` },
      }).returning(columns)
      return badge
    } catch (error) {
      if (!numberTaken(error)) throw error
    }
  }
}

/** Every claimed badge of an edition, newest first, for the admin. Null when the database is unavailable. */
export async function listEditionBadges(edition: number) {
  const db = getDb()
  if (!db) return null
  try {
    return await db.select({ ...columns, createdAt: hotReloadBadges.createdAt }).from(hotReloadBadges)
      .where(eq(hotReloadBadges.edition, edition)).orderBy(desc(hotReloadBadges.createdAt))
  } catch {
    return null
  }
}
