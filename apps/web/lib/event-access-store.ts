import "server-only"
import { eventAccess } from "@crafter/db/schema"
import { and, asc, eq } from "drizzle-orm"
import type { AccessEvent } from "@/lib/access-events"
import { getDb } from "@/lib/db"
import type { AccessDetails, AccessValues } from "@/lib/event-access-service"
import { checkLumaGuest } from "@/lib/luma-guests"

/** Call only after the current account's approval was checked for this event. */
export async function readOwnAccess(eventSlug: string, clerkUserId: string): Promise<AccessDetails | null> {
  const db = getDb()
  if (!db) throw new Error("Entry storage unavailable")
  const [row] = await db.select({
    fullName: eventAccess.fullName, documentType: eventAccess.documentType,
    documentNumber: eventAccess.documentNumber, vehiclePlate: eventAccess.vehiclePlate, equipment: eventAccess.equipment,
  }).from(eventAccess).where(and(eq(eventAccess.eventSlug, eventSlug), eq(eventAccess.clerkUserId, clerkUserId))).limit(1)
  return row ? { ...row, documentType: row.documentType as AccessDetails["documentType"] } : null
}

export async function writeAccess(values: AccessValues) {
  const db = getDb()
  if (!db) return false
  const { eventSlug, clerkUserId, ...details } = values
  const now = new Date().toISOString()
  await db.insert(eventAccess).values(values).onConflictDoUpdate({
    target: [eventAccess.eventSlug, eventAccess.clerkUserId],
    set: { ...details, updatedAt: now, consentedAt: now },
  })
  return true
}

/** Admin callers must authorize before reading. Check in batches to bound Luma load. */
export async function listAccessForAdmin(event: AccessEvent) {
  const db = getDb()
  if (!db) return null
  try {
    const rows = await db.select().from(eventAccess).where(eq(eventAccess.eventSlug, event.slug)).orderBy(asc(eventAccess.createdAt))
    const result: (typeof rows[number] & { approval: "approved" | "not-approved" | "unavailable" })[] = []
    for (let i = 0; i < rows.length; i += 4) {
      result.push(...await Promise.all(rows.slice(i, i + 4).map(async row => {
        const check = await checkLumaGuest(event.lumaEventId, [row.email], event.lumaCalendar)
        return { ...row, approval: check.status === "approved" ? "approved" as const : check.status === "unavailable" ? "unavailable" as const : "not-approved" as const }
      })))
    }
    return result
  } catch {
    return null
  }
}
