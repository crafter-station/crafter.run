import { createDatabase } from "@crafter/db"
import { apiIdempotencyKeys } from "@crafter/db/schema"
import { and, eq, lt } from "drizzle-orm"

export type IdempotencyStart =
  | { kind: "reserved"; id: string }
  | { kind: "replay"; status: number; body: unknown }
  | { kind: "pending" }
  | { kind: "mismatch" }

function database() {
  const url = process.env.DATABASE_URL
  return url ? createDatabase(url) : null
}

export async function reserveIdempotency(
  memberId: string,
  key: string,
  route: string,
  requestHash: string,
): Promise<IdempotencyStart | null> {
  const db = database()
  if (!db) return null
  const [reservation] = await db
    .insert(apiIdempotencyKeys)
    .values({ memberId, key, route, requestHash })
    .onConflictDoNothing()
    .returning({ id: apiIdempotencyKeys.id })
  if (reservation) return { kind: "reserved", id: reservation.id }

  const [existing] = await db
    .select()
    .from(apiIdempotencyKeys)
    .where(
      and(
        eq(apiIdempotencyKeys.memberId, memberId),
        eq(apiIdempotencyKeys.key, key),
        eq(apiIdempotencyKeys.route, route),
      ),
    )
    .limit(1)
  if (!existing) return null
  if (existing.requestHash !== requestHash) return { kind: "mismatch" }
  if (!existing.responseStatus) {
    const staleBefore = new Date(Date.now() - 2 * 60_000).toISOString()
    const [removed] = await db
      .delete(apiIdempotencyKeys)
      .where(and(eq(apiIdempotencyKeys.id, existing.id), lt(apiIdempotencyKeys.createdAt, staleBefore)))
      .returning({ id: apiIdempotencyKeys.id })
    return removed ? reserveIdempotency(memberId, key, route, requestHash) : { kind: "pending" }
  }
  return { kind: "replay", status: Number(existing.responseStatus), body: existing.responseBody }
}

export async function completeIdempotency(id: string, status: number, body: unknown) {
  const db = database()
  if (!db) return
  await db
    .update(apiIdempotencyKeys)
    .set({ responseStatus: String(status), responseBody: body })
    .where(eq(apiIdempotencyKeys.id, id))
}

export async function abandonIdempotency(id: string) {
  const db = database()
  if (!db) return
  await db.delete(apiIdempotencyKeys).where(eq(apiIdempotencyKeys.id, id))
}
