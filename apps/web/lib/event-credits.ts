import "server-only"
import { randomInt } from "node:crypto"
import { eventCreditCode, eventCreditEntry, eventCreditRound } from "@crafter/db/schema"
import { and, asc, eq, sql } from "drizzle-orm"
import { getDb } from "@/lib/db"

export type CreditKind = "luma" | "waitlist"
export type RoundState = "idle" | "open" | "closed"
export type CreditError = "auth" | "unavailable" | "closed" | "code" | "locked" | "entry" | "name"

const MAX_ATTEMPTS = 5
const LOCK_SECONDS = 60

function db() {
  const database = getDb()
  if (!database) throw new Error("Credit storage unavailable")
  return database
}

export async function readRound(eventSlug: string) {
  const [row] = await db().select().from(eventCreditRound).where(eq(eventCreditRound.eventSlug, eventSlug)).limit(1)
  return { state: (row?.state ?? "idle") as RoundState, code: row?.code ?? null, openedAt: row?.openedAt ?? null }
}

export async function readEntry(eventSlug: string, clerkUserId: string) {
  const [row] = await db().select().from(eventCreditEntry)
    .where(and(eq(eventCreditEntry.eventSlug, eventSlug), eq(eventCreditEntry.clerkUserId, clerkUserId))).limit(1)
  return row ?? null
}

export async function readOwnCode(eventSlug: string, clerkUserId: string) {
  const [row] = await db().select({ code: eventCreditCode.code }).from(eventCreditCode)
    .where(and(eq(eventCreditCode.eventSlug, eventSlug), eq(eventCreditCode.assignedTo, clerkUserId), eq(eventCreditCode.status, "assigned"))).limit(1)
  return row?.code ?? null
}

/** A Luma guest keeps their kind if they first joined the waitlist and later linked their Luma email. */
export async function saveEntry(eventSlug: string, clerkUserId: string, kind: CreditKind, name: string, email: string) {
  await db().insert(eventCreditEntry).values({ eventSlug, clerkUserId, kind, name, email })
    .onConflictDoUpdate({
      target: [eventCreditEntry.eventSlug, eventCreditEntry.clerkUserId],
      set: kind === "luma" ? { kind, name, email } : { name: sql`${eventCreditEntry.name}` },
    })
}

/** Attempts are counted per account, never per IP: the whole room shares the venue Wi-Fi. */
export async function confirmPresence(eventSlug: string, clerkUserId: string, input: string): Promise<{ ok: true } | { ok: false; error: CreditError }> {
  const entry = await readEntry(eventSlug, clerkUserId)
  if (!entry) return { ok: false, error: "entry" }
  if (entry.presentAt) return { ok: true }
  if (entry.lockedUntil && Date.parse(entry.lockedUntil) > Date.now()) return { ok: false, error: "locked" }
  const round = await readRound(eventSlug)
  if (round.state !== "open" || !round.code) return { ok: false, error: "closed" }
  const where = and(eq(eventCreditEntry.eventSlug, eventSlug), eq(eventCreditEntry.clerkUserId, clerkUserId))
  if (input.trim() === round.code) {
    await db().update(eventCreditEntry).set({ presentAt: sql`now()`, attempts: 0 }).where(where)
    return { ok: true }
  }
  const attempts = entry.attempts + 1
  const locked = attempts >= MAX_ATTEMPTS
  await db().update(eventCreditEntry).set({
    attempts: locked ? 0 : attempts,
    lockedUntil: locked ? sql`now() + make_interval(secs => ${LOCK_SECONDS})` : entry.lockedUntil,
  }).where(where)
  return { ok: false, error: locked ? "locked" : "code" }
}

/** Marks the owner's code as taken the first time they open or copy it. */
export async function markClaimed(eventSlug: string, clerkUserId: string) {
  await db().update(eventCreditCode).set({ claimedAt: sql`coalesce(${eventCreditCode.claimedAt}, now())` })
    .where(and(eq(eventCreditCode.eventSlug, eventSlug), eq(eventCreditCode.assignedTo, clerkUserId), eq(eventCreditCode.status, "assigned")))
}

export async function reportCode(eventSlug: string, clerkUserId: string) {
  await db().update(eventCreditEntry).set({ reportedAt: sql`now()` })
    .where(and(eq(eventCreditEntry.eventSlug, eventSlug), eq(eventCreditEntry.clerkUserId, clerkUserId)))
}

/* Admin operations. Callers must authorize first. */

export async function importCodes(eventSlug: string, codes: string[], reserve: boolean) {
  const values = [...new Set(codes.map(code => code.trim()).filter(Boolean))].map(code => ({ eventSlug, code, reserve }))
  if (!values.length) return 0
  const rows = await db().insert(eventCreditCode).values(values).onConflictDoNothing().returning({ id: eventCreditCode.id })
  return rows.length
}

/** Each opening gets a fresh 4-digit code, so one shared earlier stops working. */
export async function openRound(eventSlug: string) {
  const code = String(randomInt(0, 10_000)).padStart(4, "0")
  await db().insert(eventCreditRound).values({ eventSlug, state: "open", code, openedAt: sql`now()` })
    .onConflictDoUpdate({ target: eventCreditRound.eventSlug, set: { state: "open", code, openedAt: sql`now()`, closedAt: null } })
}

/**
 * Closes the window and hands out codes in one transaction. Present Luma guests go first,
 * then present waitlist entries in random order; reserve codes are held back.
 * Closing twice is a no-op because the update only matches an open round.
 */
export async function closeRound(eventSlug: string) {
  const database = db()
  const [, assigned] = await database.batch([
    database.update(eventCreditRound).set({ state: "closed", closedAt: sql`now()` })
      .where(and(eq(eventCreditRound.eventSlug, eventSlug), eq(eventCreditRound.state, "open"))),
    database.execute(sql`
      with round as (
        select 1 from event_credit_round where event_slug = ${eventSlug} and state = 'closed' and closed_at = now()
      ),
      people as (
        select e.clerk_user_id, row_number() over (order by case e.kind when 'luma' then 0 else 1 end, random()) as n
        from event_credit_entry e
        where e.event_slug = ${eventSlug} and e.present_at is not null and exists (select 1 from round)
          and not exists (select 1 from event_credit_code c where c.event_slug = e.event_slug and c.assigned_to = e.clerk_user_id and c.status = 'assigned')
      ),
      codes as (
        select id, row_number() over (order by random()) as n
        from event_credit_code where event_slug = ${eventSlug} and status = 'free' and not reserve
      )
      update event_credit_code c set status = 'assigned', assigned_to = p.clerk_user_id, assigned_at = now()
      from codes k join people p on p.n = k.n
      where c.id = k.id
      returning c.id`),
  ])
  return assigned.rows.length
}

/** Hands one code to a person by hand, from the leftover pool first and the reserve after. */
export async function assignCode(eventSlug: string, clerkUserId: string, burnCurrent: boolean) {
  const database = db()
  const burn = database.update(eventCreditCode).set({ status: "burned" })
    .where(and(eq(eventCreditCode.eventSlug, eventSlug), eq(eventCreditCode.assignedTo, clerkUserId), eq(eventCreditCode.status, "assigned")))
  const assign = database.execute(sql`
    update event_credit_code set status = 'assigned', assigned_to = ${clerkUserId}, assigned_at = now()
    where id = (
      select id from event_credit_code
      where event_slug = ${eventSlug} and status = 'free'
        and not exists (select 1 from event_credit_code a where a.event_slug = ${eventSlug} and a.assigned_to = ${clerkUserId} and a.status = 'assigned')
      order by reserve, random() limit 1 for update skip locked
    )
    returning code`)
  const clear = database.update(eventCreditEntry).set({ reportedAt: null })
    .where(and(eq(eventCreditEntry.eventSlug, eventSlug), eq(eventCreditEntry.clerkUserId, clerkUserId)))
  const results = burnCurrent ? await database.batch([burn, assign, clear]) : await database.batch([assign, clear])
  const assigned = results[burnCurrent ? 1 : 0] as { rows: { code: string }[] }
  return assigned.rows[0]?.code ?? null
}

export async function markPresent(eventSlug: string, clerkUserId: string) {
  await db().update(eventCreditEntry).set({ presentAt: sql`now()`, lockedUntil: null, attempts: 0 })
    .where(and(eq(eventCreditEntry.eventSlug, eventSlug), eq(eventCreditEntry.clerkUserId, clerkUserId)))
}

/** For rehearsals: clears entries and the round, and frees every code. */
export async function resetRound(eventSlug: string) {
  const database = db()
  await database.batch([
    database.delete(eventCreditEntry).where(eq(eventCreditEntry.eventSlug, eventSlug)),
    database.delete(eventCreditRound).where(eq(eventCreditRound.eventSlug, eventSlug)),
    database.update(eventCreditCode).set({ status: "free", assignedTo: null, assignedAt: null, claimedAt: null }).where(eq(eventCreditCode.eventSlug, eventSlug)),
  ])
}

export async function listCreditsForAdmin(eventSlug: string) {
  const database = db()
  const [round, entries, codes] = await Promise.all([
    readRound(eventSlug),
    database.select().from(eventCreditEntry).where(eq(eventCreditEntry.eventSlug, eventSlug)).orderBy(asc(eventCreditEntry.createdAt)),
    database.select().from(eventCreditCode).where(eq(eventCreditCode.eventSlug, eventSlug)),
  ])
  const owner = new Map(codes.filter(code => code.status === "assigned").map(code => [code.assignedTo, code.code]))
  const names = new Map(entries.map(entry => [entry.clerkUserId, entry.name]))
  return {
    round,
    entries: entries.map(entry => ({ ...entry, code: owner.get(entry.clerkUserId) ?? null })),
    board: codes.map(code => ({
      id: code.id, code: code.code, reserve: code.reserve, status: code.status as "free" | "assigned" | "burned",
      owner: code.assignedTo ? names.get(code.assignedTo) ?? null : null, assignedAt: code.assignedAt, claimedAt: code.claimedAt,
    })),
    codes: {
      free: codes.filter(code => code.status === "free" && !code.reserve).length,
      reserve: codes.filter(code => code.status === "free" && code.reserve).length,
      assigned: codes.filter(code => code.status === "assigned").length,
      burned: codes.filter(code => code.status === "burned").length,
    },
  }
}

/** What the projector shows. Names only, never emails or codes. */
export async function readScreen(eventSlug: string) {
  const { round, entries, codes } = await listCreditsForAdmin(eventSlug)
  return {
    state: round.state,
    code: round.state === "open" ? round.code : null,
    checkedIn: entries.length,
    present: entries.filter(entry => entry.presentAt).length,
    available: codes.free,
    winners: round.state === "closed" ? entries.filter(entry => entry.kind === "waitlist" && entry.code).map(entry => entry.name) : [],
  }
}
