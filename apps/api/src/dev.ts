import { resolve } from "node:path"

import { loadEnvConfig } from "@next/env"

loadEnvConfig(resolve(import.meta.dir, ".."))

const { default: app } = await import("./index")

const port = Number(process.env.PORT ?? 3001)

Bun.serve({
  port,
  fetch: app.fetch,
})

console.log(`Crafter API listening on http://localhost:${port}`)
