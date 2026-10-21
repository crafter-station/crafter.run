"use server"

import { revalidatePath } from "next/cache"
import { findAccessEvent } from "@/lib/access-events"
import { type CreditError, confirmPresence, markClaimed, readEntry, reportCode, saveEntry } from "@/lib/event-credits"
import { getEventGuest } from "@/lib/event-guest"
import { locales } from "@/lib/i18n"

type Result = { ok: true } | { ok: false; error: CreditError }

function refresh(slug: string) {
  for (const locale of locales) revalidatePath(`/${locale}/events/${slug}/credits`)
}

async function guest(slug: string) {
  const event = findAccessEvent(slug)
  if (!event) return null
  const { user, emails, check } = await getEventGuest(event.lumaEventId, event.lumaCalendar)
  return user ? { event, user, emails: emails ?? [], check } : null
}

export async function joinWaitlist(slug: string, rawName: string): Promise<Result> {
  const current = await guest(slug)
  if (!current) return { ok: false, error: "auth" }
  const name = rawName.trim()
  if (name.length < 2 || name.length > 120) return { ok: false, error: "name" }
  try {
    // A listed guest who reaches this form still checks in under their Luma spot.
    if (current.check?.status === "approved") await saveEntry(slug, current.user.id, "luma", current.check.name ?? name, current.check.email)
    else await saveEntry(slug, current.user.id, "waitlist", name, current.emails[0] ?? "")
    refresh(slug)
    return { ok: true }
  } catch {
    return { ok: false, error: "unavailable" }
  }
}

export async function confirmCredits(slug: string, code: string): Promise<Result> {
  const current = await guest(slug)
  if (!current) return { ok: false, error: "auth" }
  try {
    const result = await confirmPresence(slug, current.user.id, code)
    if (result.ok) refresh(slug)
    return result
  } catch {
    return { ok: false, error: "unavailable" }
  }
}

export async function reportCredits(slug: string): Promise<Result> {
  const current = await guest(slug)
  if (!current) return { ok: false, error: "auth" }
  try {
    if (!(await readEntry(slug, current.user.id))) return { ok: false, error: "entry" }
    await reportCode(slug, current.user.id)
    return { ok: true }
  } catch {
    return { ok: false, error: "unavailable" }
  }
}

export async function claimCredits(slug: string): Promise<Result> {
  const current = await guest(slug)
  if (!current) return { ok: false, error: "auth" }
  try {
    await markClaimed(slug, current.user.id)
    return { ok: true }
  } catch {
    return { ok: false, error: "unavailable" }
  }
}
