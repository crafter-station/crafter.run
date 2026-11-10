import "server-only"
import { currentUser } from "@clerk/nextjs/server"

import { isAdminUser } from "@/lib/admin"
import { findCoreMember } from "@/lib/core-members"
import type { TeamMember } from "@/lib/team"

export type CoreViewer = { state: "signed-out" } | { state: "outsider" } | { state: "core"; member: TeamMember | null }

/**
 * Core is the active roster in `lib/team.ts`. Admins, and accounts with `{ "role": "core" }`
 * in Clerk public metadata, are let in too, for members whose GitHub or email is not listed.
 */
export async function getCoreViewer(): Promise<CoreViewer> {
  const user = await currentUser()
  if (!user) return { state: "signed-out" }
  const member = findCoreMember(user)
  if (member || isAdminUser(user) || user.publicMetadata?.role === "core") return { state: "core", member }
  return { state: "outsider" }
}
