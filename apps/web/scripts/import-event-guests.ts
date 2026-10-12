// Sync an event's approved guests from a Luma "Guests" CSV export into event_guest.
// Usage: bun scripts/import-event-guests.ts <event-slug> <guests.csv> [--dry-run]
import { readFileSync } from "node:fs"
import { loadEnvConfig } from "@next/env"
import { eventGuest } from "@crafter/db/schema"
import { and, eq, notInArray, sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/neon-http"
import { findAccessEvent } from "../lib/access-events"

loadEnvConfig(process.cwd())

const [slug, csvPath] = process.argv.slice(2).filter(arg => !arg.startsWith("--"))
const dryRun = process.argv.includes("--dry-run")
const event = slug ? findAccessEvent(slug) : undefined
if (!event || !csvPath) throw new Error("Usage: bun scripts/import-event-guests.ts <event-slug> <guests.csv> [--dry-run]")
if (event.lumaCalendar !== "list") throw new Error(`${slug} reads approvals from Luma, not from the imported list.`)
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.")

function parseCsv(text: string) {
  const rows: string[][] = []
  let row: string[] = [], field = "", quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === "\"" && text[i + 1] === "\"") { field += "\""; i++ }
      else if (c === "\"") quoted = false
      else field += c
    } else if (c === "\"") quoted = true
    else if (c === ",") { row.push(field); field = "" }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++
      row.push(field); rows.push(row); row = []; field = ""
    } else field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  const [header, ...body] = rows.filter(r => r.some(Boolean))
  return body.map(r => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? "").trim()])))
}

const guests = parseCsv(readFileSync(csvPath, "utf8").replace(/^﻿/, ""))
if (!guests[0] || !("email" in guests[0]) || !("approval_status" in guests[0])) throw new Error("Not a Luma guests export: missing email or approval_status.")

const approved = [...new Map(guests
  .filter(guest => guest.approval_status === "approved" && guest.email)
  .map(guest => [guest.email.toLowerCase(), { email: guest.email.toLowerCase(), name: guest.name || null }])).values()]

console.log(`${event.slug}: ${approved.length} approved of ${guests.length} in the export`)
if (dryRun) process.exit(0)
if (!approved.length) throw new Error("No approved guests in the export; refusing to revoke the whole list.")

const db = drizzle(process.env.DATABASE_URL)
const now = new Date().toISOString()
await db.insert(eventGuest)
  .values(approved.map(guest => ({ lumaEventId: event.lumaEventId, ...guest, approvalStatus: "approved" })))
  .onConflictDoUpdate({
    target: [eventGuest.lumaEventId, eventGuest.email],
    set: { name: sql`excluded.name`, approvalStatus: "approved", updatedAt: now },
  })
// Anyone no longer approved in Luma loses access on the next sync.
const revoked = await db.update(eventGuest)
  .set({ approvalStatus: "revoked", updatedAt: now })
  .where(and(eq(eventGuest.lumaEventId, event.lumaEventId), eq(eventGuest.approvalStatus, "approved"), notInArray(eventGuest.email, approved.map(guest => guest.email))))
  .returning({ email: eventGuest.email })
console.log(`synced ${approved.length} approved, revoked ${revoked.length}`)
