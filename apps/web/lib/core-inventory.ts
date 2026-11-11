import "server-only"
import { teamAssets } from "@crafter/db/schema"
import { asc, eq } from "drizzle-orm"

import type { AssetInput, AssetKind, AssetStatus, AssetVisibility } from "@/lib/core-inventory-input"
import { getDb } from "@/lib/db"

export type TeamAsset = Omit<AssetInput, "kind" | "status" | "visibility"> & {
  kind: AssetKind
  status: AssetStatus
  visibility: AssetVisibility
  verifiedAt: string | null
  verifiedBy: string | null
  updatedAt: string
}

const columns = {
  slug: teamAssets.slug,
  kind: teamAssets.kind,
  name: teamAssets.name,
  url: teamAssets.url,
  status: teamAssets.status,
  visibility: teamAssets.visibility,
  owner: teamAssets.owner,
  access: teamAssets.access,
  perk: teamAssets.perk,
  notes: teamAssets.notes,
  secretRef: teamAssets.secretRef,
  verifiedAt: teamAssets.verifiedAt,
  verifiedBy: teamAssets.verifiedBy,
  updatedAt: teamAssets.updatedAt,
}

/** Call only after `getCoreViewer()` returned a Core viewer. `null` means storage is unavailable. */
export async function listTeamAssets(): Promise<TeamAsset[] | null> {
  const db = getDb()
  if (!db) return null
  return (await db.select(columns).from(teamAssets).orderBy(asc(teamAssets.kind), asc(teamAssets.name))) as TeamAsset[]
}

/**
 * Call only after `getCoreViewer()` returned a Core viewer. Without `previousSlug` it creates a row and
 * returns false when the slug is taken; with it, it updates that row. Editing never marks a row verified.
 */
export async function saveTeamAsset(asset: AssetInput, previousSlug?: string): Promise<boolean> {
  const db = getDb()
  if (!db) throw new Error("Storage unavailable.")
  if (!previousSlug) {
    const inserted = await db.insert(teamAssets).values(asset).onConflictDoNothing({ target: teamAssets.slug }).returning({ slug: teamAssets.slug })
    return inserted.length > 0
  }
  const updated = await db
    .update(teamAssets)
    .set({ ...asset, updatedAt: new Date().toISOString() })
    .where(eq(teamAssets.slug, previousSlug))
    .returning({ slug: teamAssets.slug })
  return updated.length > 0
}

/** Call only after `getCoreViewer()` returned a Core viewer. */
export async function verifyTeamAsset(slug: string, verifiedBy: string) {
  const db = getDb()
  if (!db) throw new Error("Storage unavailable.")
  const now = new Date().toISOString()
  await db.update(teamAssets).set({ verifiedAt: now, verifiedBy, updatedAt: now }).where(eq(teamAssets.slug, slug))
}
