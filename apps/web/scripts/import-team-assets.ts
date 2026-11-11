// Upsert team assets from a JSON array into team_assets. Rows already in the table keep their verification.
// Usage: bun scripts/import-team-assets.ts <assets.json> [--dry-run]
// Inventory content never goes into this repository: keep the JSON in the vault.
import { readFileSync } from "node:fs"
import { loadEnvConfig } from "@next/env"
import { teamAssets } from "@crafter/db/schema"
import { drizzle } from "drizzle-orm/neon-http"
import { assetInput } from "../lib/core-inventory-input"

loadEnvConfig(process.cwd())

const [path] = process.argv.slice(2).filter((arg) => !arg.startsWith("--"))
const dryRun = process.argv.includes("--dry-run")
if (!path) throw new Error("Usage: bun scripts/import-team-assets.ts <assets.json> [--dry-run]")

const raw: unknown = JSON.parse(readFileSync(path, "utf8"))
if (!Array.isArray(raw)) throw new Error("Expected a JSON array of assets.")
const assets = raw.map((row, index) => {
  const parsed = assetInput.safeParse({ status: "unknown", visibility: "core", access: [], ...row })
  if (!parsed.success) throw new Error(`Row ${index}: ${parsed.error.issues.map((issue) => `${issue.path.join(".")} ${issue.message}`).join("; ")}`)
  return parsed.data
})

console.log(assets.map((asset) => `${asset.kind.padEnd(8)} ${asset.status.padEnd(8)} ${asset.slug}`).join("\n"))
if (dryRun) process.exit(0)
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.")

const db = drizzle(process.env.DATABASE_URL)
for (const asset of assets) {
  await db
    .insert(teamAssets)
    .values(asset)
    .onConflictDoUpdate({ target: teamAssets.slug, set: { ...asset, updatedAt: new Date().toISOString() } })
}
console.log(`Saved ${assets.length} assets.`)
