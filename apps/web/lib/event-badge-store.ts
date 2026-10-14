import { and, desc, eq, sql } from "drizzle-orm"
import { eventBadges } from "@crafter/db/schema"

import { getDb } from "@/lib/db"
import type { BadgeSide } from "@/lib/hot-reload-badge-store"
import type { BadgeVariant } from "@/lib/hot-reload-badge"

export const eventBadgeImageKey = (event: string, number: number, side: BadgeSide) => `events/${event}/${number}-${side}.jpg`

/** Public path of a badge face; `v` changes on every publish so caches pick up the new print. */
export const eventBadgeImagePath = (badge: { eventSlug: string; number: number; updatedAt: string }, side: BadgeSide) =>
  `/api/events/badge/${badge.eventSlug}/${badge.number}/${side}?v=${Date.parse(badge.updatedAt)}`

const columns = {
  eventSlug: eventBadges.eventSlug,
  number: eventBadges.number,
  clerkUserId: eventBadges.clerkUserId,
  name: eventBadges.name,
  checkedIn: eventBadges.checkedIn,
  variant: eventBadges.variant,
  createdAt: eventBadges.createdAt,
  updatedAt: eventBadges.updatedAt,
}

export async function getUserEventBadge(event: string, clerkUserId: string) {
  const db = getDb()
  if (!db) return null
  const [badge] = await db.select(columns).from(eventBadges)
    .where(and(eq(eventBadges.eventSlug, event), eq(eventBadges.clerkUserId, clerkUserId))).limit(1)
  return badge ?? null
}

export async function getEventBadgeByNumber(event: string, number: number) {
  const db = getDb()
  if (!db) return null
  const [badge] = await db.select(columns).from(eventBadges)
    .where(and(eq(eventBadges.eventSlug, event), eq(eventBadges.number, number))).limit(1)
  return badge ?? null
}

/** Drizzle wraps the driver error in `cause`; the constraint name shows up in one of the messages. */
function numberTaken(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  return error.message.includes("event_badges_event_number_idx") || numberTaken(error.cause)
}

/** Reserves the attendee's number (next free one on first publish, the same one afterwards). */
export async function reserveEventBadge(event: string, clerkUserId: string, name: string, checkedIn: boolean, variant: BadgeVariant) {
  const db = getDb()
  if (!db) throw new Error("Database is not configured")
  // Two first publishes can read the same max; the loser retries against the new max.
  for (;;) {
    try {
      const [badge] = await db.insert(eventBadges).values({
        eventSlug: event, clerkUserId, name, checkedIn, variant,
        number: sql`(select coalesce(max(${eventBadges.number}), 0) + 1 from ${eventBadges} where ${eventBadges.eventSlug} = ${event})`,
      }).onConflictDoUpdate({
        target: [eventBadges.eventSlug, eventBadges.clerkUserId],
        set: { name, variant, checkedIn: sql`${eventBadges.checkedIn} or ${checkedIn}`, updatedAt: sql`now()` },
      }).returning(columns)
      return badge
    } catch (error) {
      if (!numberTaken(error)) throw error
    }
  }
}

/** Every claimed badge of an event, newest first, for the admin. Null when the database is unavailable. */
export async function listEventBadges(event: string) {
  const db = getDb()
  if (!db) return null
  try {
    return await db.select(columns).from(eventBadges).where(eq(eventBadges.eventSlug, event)).orderBy(desc(eventBadges.createdAt))
  } catch {
    return null
  }
}
