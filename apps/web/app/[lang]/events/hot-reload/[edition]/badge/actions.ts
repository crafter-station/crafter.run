"use server"

import { getEventGuest } from "@/lib/event-guest"
import { findEdition } from "@/lib/hot-reload"
import { editionBadge, isBadgeVariant } from "@/lib/hot-reload-badge"
import { badgeImageKey, getUserBadge, reserveBadge } from "@/lib/hot-reload-badge-store"
import { r2Configured, r2Put } from "@/lib/r2"

export type BadgeError = "auth" | "approval" | "early" | "name" | "image" | "unavailable"
type Result<T> = ({ ok: true } & T) | { ok: false; error: BadgeError }

/** Logs why a badge action was refused, so a failed publish in production can be traced from the function logs. */
function refuse(step: string, error: BadgeError, detail?: unknown): { ok: false; error: BadgeError } {
  console.warn(`[hot-reload badge] ${step}: ${error}`, detail ?? "")
  return { ok: false, error }
}

async function attendee(editionNumber: string): Promise<Result<{ edition: number; userId: string; checkedIn: boolean }>> {
  const edition = findEdition(editionNumber)
  if (!edition || !editionBadge(edition) || !edition.lumaEventId) return refuse("edition", "unavailable", editionNumber)
  const { user, check } = await getEventGuest(edition.lumaEventId)
  if (!user) return refuse("guest", "auth")
  if (check?.status === "unavailable") return refuse("guest", "unavailable", "luma lookup failed")
  if (check?.status !== "approved") return refuse("guest", "approval", check?.status)
  // Luma check-in proves attendance; an approved guest also qualifies once the edition has started.
  const checkedIn = check.checkedIn === true
  if (!checkedIn && (!edition.startsAt || Date.now() < Date.parse(edition.startsAt))) return refuse("guest", "early")
  return { ok: true, edition: edition.number, userId: user.id, checkedIn }
}

/** Gives the attendee their badge number, so the print can carry it before it is uploaded. */
export async function claimBadge(editionNumber: string, rawName: string, variant: string): Promise<Result<{ number: number }>> {
  const guest = await attendee(editionNumber)
  if (!guest.ok) return guest
  const name = rawName.trim()
  if (name.length < 2 || name.length > 80) return refuse("claim", "name")
  if (!isBadgeVariant(variant)) return refuse("claim", "unavailable", variant)
  try {
    const badge = await reserveBadge(guest.edition, guest.userId, name, guest.checkedIn, variant)
    return { ok: true, number: badge.number }
  } catch (error) {
    return refuse("claim", "unavailable", error)
  }
}

export async function uploadBadge(editionNumber: string, form: FormData): Promise<Result<{ number: number }>> {
  const guest = await attendee(editionNumber)
  if (!guest.ok) return guest
  const badge = await getUserBadge(guest.edition, guest.userId)
  if (!badge) return refuse("upload", "unavailable", "no claimed badge")
  const faces = (["front", "back"] as const).map((side) => [side, form.get(side)] as const)
  if (faces.some(([, file]) => !(file instanceof File) || file.type !== "image/jpeg" || file.size === 0)) return refuse("upload", "image")
  if (!r2Configured()) return refuse("upload", "unavailable", "R2 is not configured")
  try {
    await Promise.all(faces.map(async ([side, file]) =>
      r2Put(badgeImageKey(guest.edition, badge.number, side), new Uint8Array(await (file as File).arrayBuffer()), "image/jpeg")))
    return { ok: true, number: badge.number }
  } catch (error) {
    return refuse("upload", "unavailable", error)
  }
}
