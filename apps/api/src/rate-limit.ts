import { createDatabase } from "@crafter/db"
import { apiRateLimits } from "@crafter/db/schema"
import { sql } from "drizzle-orm"

export async function consumeMutationLimit(memberId: string, operation: string, limit = 20) {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return false
  const db = createDatabase(databaseUrl)
  const now = new Date()
  now.setUTCSeconds(0, 0)
  const [row] = await db
    .insert(apiRateLimits)
    .values({ memberId, operation, windowStartedAt: now.toISOString() })
    .onConflictDoUpdate({
      target: [apiRateLimits.memberId, apiRateLimits.operation, apiRateLimits.windowStartedAt],
      set: { count: sql`${apiRateLimits.count} + 1` },
    })
    .returning({ count: apiRateLimits.count })
  return Boolean(row && row.count <= limit)
}
