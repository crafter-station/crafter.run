import type { Database } from "@crafter/db"
import { members } from "@crafter/db/schema"
import { eq } from "drizzle-orm"

export async function syncClerkAvatar(db: Database, clerkUserId: string, avatarUrl: string) {
  const updated = await db
    .update(members)
    .set({ avatarUrl, updatedAt: new Date().toISOString() })
    .where(eq(members.clerkUserId, clerkUserId))
    .returning({ id: members.id })

  return updated.length > 0
}
