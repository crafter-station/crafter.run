"use server"

import { isAdminUser } from "@/lib/admin"
import { findAccessEvent } from "@/lib/access-events"
import { findEventBadge } from "@/lib/event-badge"
import { eventBadgeImageKey, getUserEventBadge, reserveEventBadge } from "@/lib/event-badge-store"
import { getEventGuest } from "@/lib/event-guest"
import { type BadgeError, isBadgeVariant } from "@/lib/hot-reload-badge"
import { r2Configured, r2Put } from "@/lib/r2"

type Result<T> = ({ ok: true } & T) | { ok: false; error: BadgeError }

/** Logs why a badge action was refused, so a failed publish in production can be traced from the function logs. */
function refuse(step: string, error: BadgeError, detail?: unknown): { ok: false; error: BadgeError } {
  console.warn(`[event badge] ${step}: ${error}`, detail ?? "")
  return { ok: false, error }
}

async function attendee(slug: string): Promise<Result<{ event: string; userId: string; checkedIn: boolean }>> {
  const event = findAccessEvent(slug)
  if (!event || !findEventBadge(event.slug)) return refuse("event", "unavailable", slug)
  const { user, check } = await getEventGuest(event.lumaEventId, event.lumaCalendar)
  if (!user) return refuse("guest", "auth")
  if (check?.status === "unavailable") return refuse("guest", "unavailable", "guest lookup failed")
  if (check?.status !== "approved") return refuse("guest", "approval", check?.status)
  // Same rule as Hot Reload: checked in, or the event has started. Admins skip the timing to test before the day.
  const checkedIn = check.checkedIn === true
  if (!checkedIn && !isAdminUser(user) && Date.now() < Date.parse(event.startsAt)) return refuse("guest", "early")
  return { ok: true, event: event.slug, userId: user.id, checkedIn }
}

/** Gives the attendee their badge number, so the print can carry it before it is uploaded. */
export async function claimEventBadge(slug: string, rawName: string, variant: string): Promise<Result<{ number: number }>> {
  const guest = await attendee(slug)
  if (!guest.ok) return guest
  const name = rawName.trim()
  if (name.length < 2 || name.length > 80) return refuse("claim", "name")
  if (!isBadgeVariant(variant)) return refuse("claim", "unavailable", variant)
  try {
    const badge = await reserveEventBadge(guest.event, guest.userId, name, guest.checkedIn, variant)
    return { ok: true, number: badge.number }
  } catch (error) {
    return refuse("claim", "unavailable", error)
  }
}

export async function uploadEventBadge(slug: string, form: FormData): Promise<Result<{ number: number }>> {
  const guest = await attendee(slug)
  if (!guest.ok) return guest
  const badge = await getUserEventBadge(guest.event, guest.userId)
  if (!badge) return refuse("upload", "unavailable", "no claimed badge")
  const faces = (["front", "back"] as const).map((side) => [side, form.get(side)] as const)
  if (faces.some(([, file]) => !(file instanceof File) || file.type !== "image/jpeg" || file.size === 0)) return refuse("upload", "image")
  if (!r2Configured()) return refuse("upload", "unavailable", "R2 is not configured")
  try {
    await Promise.all(faces.map(async ([side, file]) =>
      r2Put(eventBadgeImageKey(guest.event, badge.number, side), new Uint8Array(await (file as File).arrayBuffer()), "image/jpeg")))
    return { ok: true, number: badge.number }
  } catch (error) {
    return refuse("upload", "unavailable", error)
  }
}
