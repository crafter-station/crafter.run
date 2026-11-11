import "server-only"
import { teamAssets } from "@crafter/db/schema"
import { and, asc, eq, ne } from "drizzle-orm"

import type { AssetKind } from "@/lib/core-inventory-input"
import { getDb } from "@/lib/db"

export type PublicAsset = { slug: string; kind: AssetKind; name: string; url: string | null; perk: string | null }

/**
 * The public face of the inventory: rows marked `public` that are not dead, and only the columns a
 * stranger may see. Owner, access, notes and the password manager reference never leave this query.
 * `null` means storage is unavailable.
 */
export async function listPublicAssets(): Promise<PublicAsset[] | null> {
  const db = getDb()
  if (!db) return null
  const rows = await db
    .select({ slug: teamAssets.slug, kind: teamAssets.kind, name: teamAssets.name, url: teamAssets.url, perk: teamAssets.perk })
    .from(teamAssets)
    .where(and(eq(teamAssets.visibility, "public"), ne(teamAssets.status, "dead")))
    .orderBy(asc(teamAssets.name))
  return rows as PublicAsset[]
}
