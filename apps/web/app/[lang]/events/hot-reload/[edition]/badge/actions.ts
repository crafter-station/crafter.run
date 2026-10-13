"use server"

import { getEventGuest } from "@/lib/event-guest"
import { findEdition } from "@/lib/hot-reload"
import { editionBadge, isBadgeVariant } from "@/lib/hot-reload-badge"
import { badgeImageKey, getUserBadge, reserveBadge } from "@/lib/hot-reload-badge-store"
import { r2Configured, r2Put } from "@/lib/r2"

export type BadgeError = "auth" | "approval" | "early" | "name" | "image" | "unavailable"
type Result<T> = ({ ok: true } & T) | { ok: false; error: BadgeError }

async function attendee(editionNumber: string): Promise<Result<{ edition: number; userId: string; checkedIn: boolean }>> {
  const edition = findEdition(editionNumber)
  if (!edition || !editionBadge(edition) || !edition.lumaEventId) return { ok: false, error: "unavailable" }
  const { user, check } = await getEventGuest(edition.lumaEventId)
  if (!user) return { ok: false, error: "auth" }
  if (check?.status === "unavailable") return { ok: false, error: "unavailable" }
  if (check?.status !== "approved") return { ok: false, error: "approval" }
  // Luma check-in proves attendance; an approved guest also qualifies once the edition has started.
  const checkedIn = check.checkedIn === true
  if (!checkedIn && (!edition.startsAt || Date.now() < Date.parse(edition.startsAt))) return { ok: false, error: "early" }
  return { ok: true, edition: edition.number, userId: user.id, checkedIn }
}

/** Gives the attendee their badge number, so the print can carry it before it is uploaded. */
export async function claimBadge(editionNumber: string, rawName: string, variant: string): Promise<Result<{ number: number }>> {
  const guest = await attendee(editionNumber)
  if (!guest.ok) return guest
  const name = rawName.trim()
  if (name.length < 2 || name.length > 80) return { ok: false, error: "name" }
  if (!isBadgeVariant(variant)) return { ok: false, error: "unavailable" }
  try {
    const badge = await reserveBadge(guest.edition, guest.userId, name, guest.checkedIn, variant)
    return { ok: true, number: badge.number }
  } catch (error) {
    console.error(error)
    return { ok: false, error: "unavailable" }
  }
}

export async function uploadBadge(editionNumber: string, form: FormData): Promise<Result<{ number: number }>> {
  const guest = await attendee(editionNumber)
  if (!guest.ok) return guest
  const badge = await getUserBadge(guest.edition, guest.userId)
  if (!badge) return { ok: false, error: "unavailable" }
  const faces = (["front", "back"] as const).map((side) => [side, form.get(side)] as const)
  if (faces.some(([, file]) => !(file instanceof File) || file.type !== "image/jpeg" || file.size === 0)) return { ok: false, error: "image" }
  if (!r2Configured()) return { ok: false, error: "unavailable" }
  try {
    await Promise.all(faces.map(async ([side, file]) =>
      r2Put(badgeImageKey(guest.edition, badge.number, side), new Uint8Array(await (file as File).arrayBuffer()), "image/jpeg")))
    return { ok: true, number: badge.number }
  } catch (error) {
    console.error(error)
    return { ok: false, error: "unavailable" }
  }
}
