import { eventGuest } from "@crafter/db/schema"
import { and, eq, inArray, sql } from "drizzle-orm"
import { getDb } from "@/lib/db"
import type { GuestCheck } from "@/lib/luma-guests"

/* Same contract as the Luma lookup, read from the imported guest list. */
export async function checkListedGuest(eventId: string, emails: string[]): Promise<GuestCheck> {
  const db = getDb()
  if (!db) return { status: "unavailable" }
  if (!emails.length) return { status: "not-found" }
  try {
    const rows = await db.select().from(eventGuest)
      .where(and(eq(eventGuest.lumaEventId, eventId), inArray(eventGuest.email, emails.map(email => email.toLowerCase()))))
    const approved = rows.find(row => row.approvalStatus === "approved")
    if (approved) return { status: "approved", email: approved.email, name: approved.name }
    const pending = rows[0]
    return pending ? { status: "not-approved", email: pending.email, approvalStatus: pending.approvalStatus } : { status: "not-found" }
  } catch {
    return { status: "unavailable" }
  }
}

/* Saves a guest's Luma status, from a lookup or a webhook, so later checks skip Luma. */
export async function saveGuest(eventId: string, email: string, name: string | null, approvalStatus: string) {
  const db = getDb()
  if (!db) return
  await db.insert(eventGuest).values({ lumaEventId: eventId, email: email.toLowerCase(), name, approvalStatus })
    .onConflictDoUpdate({ target: [eventGuest.lumaEventId, eventGuest.email], set: { name, approvalStatus, updatedAt: sql`now()` } })
}
