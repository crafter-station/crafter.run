import "server-only"
import { eventGuest } from "@crafter/db/schema"
import { and, asc, eq, max } from "drizzle-orm"
import { env } from "@/env"
import { getDb } from "@/lib/db"
import type { GuestSource } from "@/lib/luma-guests"

/* https://docs.luma.com/reference/get_v1-events-guests-list */
const LUMA_LIST_URL = "https://public-api.luma.com/v1/events/guests/list"

export type ApprovedGuests = { guests: { email: string; name: string | null }[]; syncedAt: string | null }

/** Every approved guest of an event, from Luma or from the imported list. Null when the source is unavailable. */
export async function listApprovedGuests(eventId: string, calendar: GuestSource = "default"): Promise<ApprovedGuests | null> {
  try {
    if (calendar === "list") {
      const db = getDb()
      if (!db) return null
      const [guests, [sync]] = await Promise.all([
        db.select({ email: eventGuest.email, name: eventGuest.name }).from(eventGuest)
          .where(and(eq(eventGuest.lumaEventId, eventId), eq(eventGuest.approvalStatus, "approved"))).orderBy(asc(eventGuest.name)),
        db.select({ at: max(eventGuest.updatedAt) }).from(eventGuest).where(eq(eventGuest.lumaEventId, eventId)),
      ])
      return { guests, syncedAt: sync?.at ?? null }
    }
    const apiKey = calendar === "codex" ? env.LUMA_CODEX_API_KEY : env.LUMA_API_KEY
    if (!apiKey) return null
    const guests: ApprovedGuests["guests"] = []
    let cursor: string | undefined
    do {
      const url = new URL(LUMA_LIST_URL)
      url.searchParams.set("event_id", eventId)
      url.searchParams.set("approval_status", "approved")
      url.searchParams.set("sort_column", "name")
      if (cursor) url.searchParams.set("pagination_cursor", cursor)
      const response = await fetch(url, { headers: { "x-luma-api-key": apiKey }, cache: "no-store", signal: AbortSignal.timeout(8000) })
      if (!response.ok) return null
      const page = (await response.json()) as { entries: { user_email: string; user_name: string | null }[]; has_more: boolean; next_cursor?: string }
      guests.push(...page.entries.map(entry => ({ email: entry.user_email.toLowerCase(), name: entry.user_name })))
      cursor = page.has_more ? page.next_cursor : undefined
    } while (cursor)
    return { guests, syncedAt: new Date().toISOString() }
  } catch {
    return null
  }
}

/** Splits approved guests by whether they submitted, and flags submissions from people no longer approved. */
export function guestProgress<T extends { email: string }>(approved: ApprovedGuests, submissions: T[]) {
  const submitted = new Set(submissions.map(row => row.email.toLowerCase()))
  const emails = new Set(approved.guests.map(guest => guest.email))
  return {
    syncedAt: approved.syncedAt,
    total: approved.guests.length,
    missing: approved.guests.filter(guest => !submitted.has(guest.email)),
    completed: submissions.filter(row => emails.has(row.email.toLowerCase())),
    notListed: submissions.filter(row => !emails.has(row.email.toLowerCase())),
  }
}
