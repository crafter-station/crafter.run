import { createDatabase } from "@crafter/db"

import { env } from "@/env"
export function getDb() {
  if (!env.DATABASE_URL) {
    return null
  }

  return createDatabase(env.DATABASE_URL)
}
