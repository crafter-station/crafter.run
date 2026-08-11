import { resolve } from "node:path"

import { loadEnvConfig } from "@next/env"

const apiDirectory = resolve(import.meta.dir, "..")
loadEnvConfig(apiDirectory)

// Local web development already has the shared database and auth credentials.
// Keep API-specific and shell values authoritative while filling missing values.
if (!process.env.DATABASE_URL) {
  const apiEnvironment = { ...process.env }
  loadEnvConfig(resolve(apiDirectory, "../web"), false, console, true)
  Object.assign(process.env, apiEnvironment)
}

const { default: app } = await import("./index")

const port = Number(process.env.PORT ?? 3001)

Bun.serve({
  port,
  fetch: app.fetch,
})

console.log(`Crafter API listening on http://localhost:${port}`)
