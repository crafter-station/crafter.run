import { createClerkClient } from "@clerk/backend"
import type { ShipDetail } from "@crafter/contracts"

import { setMemberTrust } from "./ships"

// Clerk public metadata roles that publish without review.
const trustedRoles = new Set(["admin", "core", "crew"])

async function clerkRole(clerkUserId: string): Promise<string | null> {
  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) return null
  try {
    const user = await createClerkClient({ secretKey }).users.getUser(clerkUserId)
    const role = user.publicMetadata?.role
    return typeof role === "string" ? role : null
  } catch {
    return null
  }
}

/**
 * Trusted members publish directly. A member becomes trusted when an admin approves their first Ship, when
 * /admin/ships syncs the Core and Crew rosters, or here, the first time someone with an admin, core or crew
 * role in Clerk publishes.
 */
export async function isTrustedPublisher(
  member: { id: string; trust: string },
  clerkUserId: string,
  deps: { role: (clerkUserId: string) => Promise<string | null>; trust: typeof setMemberTrust } = {
    role: clerkRole,
    trust: setMemberTrust,
  },
) {
  if (member.trust === "trusted") return true
  if (member.trust === "blocked") return false
  const role = await deps.role(clerkUserId)
  if (!role || !trustedRoles.has(role)) return false
  await deps.trust(member.id, "trusted")
  return true
}

/** Trusted Ships go live unless automated moderation could not run; everything else waits for an admin. */
export function publishStatus(trusted: boolean, moderation: { review: boolean }): "published" | "pending" {
  return trusted && !moderation.review ? "published" : "pending"
}

/** Tells the team a Ship is waiting, when SHIPS_REVIEW_WEBHOOK_URL is set. Never fails the publish. */
export async function notifyShipReview(ship: ShipDetail, reason: string, send: typeof fetch = fetch) {
  const url = process.env.SHIPS_REVIEW_WEBHOOK_URL
  if (!url) return
  const reviewUrl = `${process.env.WEB_URL ?? "https://crafter.run"}/en/admin/ships`
  const text = `New Ship waiting for review: ${ship.name} by @${ship.owner.handle}. ${ship.tagline}\n${reviewUrl}`
  try {
    await send(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, ship: { slug: ship.slug, name: ship.name, owner: ship.owner.handle }, reason, reviewUrl }),
      signal: AbortSignal.timeout(3000),
    })
  } catch (error) {
    console.error("Ship review notification failed", error)
  }
}
