import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { loadEnvConfig } from "@next/env"
import { defineConfig } from "drizzle-kit"

const packageDirectory = fileURLToPath(new URL(".", import.meta.url))
const webDirectory = resolve(packageDirectory, "../../apps/web")
loadEnvConfig(webDirectory)

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured.")
}

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
