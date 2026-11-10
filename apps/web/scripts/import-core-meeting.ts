// Upsert a Core meeting from its Obsidian notes into core_meetings.
// Usage: bun scripts/import-core-meeting.ts <summary.md> [transcript.md] [--slug <slug>] [--dry-run]
// The slug defaults to the summary's folder name. Meeting content never goes into this repository.
import { readFileSync } from "node:fs"
import { basename, dirname } from "node:path"
import { loadEnvConfig } from "@next/env"
import { coreMeetings } from "@crafter/db/schema"
import { drizzle } from "drizzle-orm/neon-http"
import { parseMeetingNote, parseTranscriptNote } from "../lib/core-meeting-note"

loadEnvConfig(process.cwd())

const args = process.argv.slice(2)
const slugFlag = args.indexOf("--slug")
const slugArg = slugFlag >= 0 ? args[slugFlag + 1] : undefined
const [summaryPath, transcriptPath] = args.filter((arg, index) => !arg.startsWith("--") && index !== slugFlag + 1)
const dryRun = args.includes("--dry-run")
if (!summaryPath) throw new Error("Usage: bun scripts/import-core-meeting.ts <summary.md> [transcript.md] [--slug <slug>] [--dry-run]")

const slug = slugArg ?? basename(dirname(summaryPath))
const meeting = parseMeetingNote(readFileSync(summaryPath, "utf8"), slug)
const transcript = transcriptPath ? parseTranscriptNote(readFileSync(transcriptPath, "utf8")) : null

console.log(JSON.stringify({ ...meeting, body: `${meeting.body.length} chars`, transcript: transcript ? `${transcript.length} chars` : null }, null, 2))
if (dryRun) process.exit(0)
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.")

const db = drizzle(process.env.DATABASE_URL)
const values = { ...meeting, transcript }
await db
  .insert(coreMeetings)
  .values(values)
  .onConflictDoUpdate({ target: coreMeetings.slug, set: { ...values, updatedAt: new Date().toISOString() } })
console.log(`Saved ${slug}.`)
