import { drizzle } from "drizzle-orm/neon-http"

import { env } from "@/env"
import * as schema from "@/lib/db/schema"

export function getDb() {
  if (!env.DATABASE_URL) {
    return null
  }

  return drizzle(env.DATABASE_URL, { schema })
}
