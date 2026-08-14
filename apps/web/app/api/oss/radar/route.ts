import { ossRadarSnapshots } from "@crafter/db/schema"
import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"

import { env } from "@/env"
import { getDb } from "@/lib/db"
import { locales } from "@/lib/i18n"
import { ossRadarSchema } from "@/lib/oss-radar"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  if (!env.OSS_RADAR_INGEST_TOKEN) {
    return Response.json({ error: "Radar ingestion is not configured" }, { status: 503 })
  }
  if (request.headers.get("authorization") !== `Bearer ${env.OSS_RADAR_INGEST_TOKEN}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  const parsed = ossRadarSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: "Invalid radar payload" }, { status: 400 })
  }
  const db = getDb()
  if (!db) return Response.json({ error: "Database is not configured" }, { status: 503 })
  await db
    .insert(ossRadarSnapshots)
    .values({ generatedAt: parsed.data.generatedAt, payload: parsed.data })
    .onConflictDoNothing()
  for (const locale of locales) revalidatePath(`/${locale}/oss/metrics`)
  return Response.json({ accepted: true, generatedAt: parsed.data.generatedAt })
}
