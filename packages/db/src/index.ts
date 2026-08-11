import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

export function createDatabase(databaseUrl: string) {
  return drizzle(databaseUrl, { schema })
}

export type Database = ReturnType<typeof createDatabase>
