import type { Database } from "@crafter/db"
import { sql } from "drizzle-orm"

export async function consumeRateLimit(db: Database, key: string, limit: number, windowSeconds: number) {
  const result = await db.execute(sql`
    insert into rate_limits ("key", "count", "reset_at")
    values (${key}, 1, now() + (${windowSeconds} * interval '1 second'))
    on conflict ("key") do update
      set "count" = case when rate_limits."reset_at" <= now() then 1 else rate_limits."count" + 1 end,
          "reset_at" = case when rate_limits."reset_at" <= now() then excluded."reset_at" else rate_limits."reset_at" end
    returning "count"
  `)
  const count = Number((result.rows[0] as { count: number } | undefined)?.count)
  return Number.isFinite(count) && count <= limit
}
