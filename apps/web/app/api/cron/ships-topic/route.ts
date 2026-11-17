import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"

import { locales } from "@/lib/i18n"
import { scanTopic } from "@/lib/ship-topic-scan"

export const dynamic = "force-dynamic"
export const maxDuration = 300

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return Response.json({ error: "CRON_SECRET is not configured" }, { status: 503 })
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const dryRun = ["1", "true"].includes(request.nextUrl.searchParams.get("dryRun") ?? "")
  let report: Awaited<ReturnType<typeof scanTopic>>
  try {
    report = await scanTopic({ dryRun })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Topic scan failed" }, { status: 502 })
  }

  if (!dryRun && report.updatesCreated) {
    for (const locale of locales) {
      revalidatePath(`/${locale}/admin/ships`)
      revalidatePath(`/${locale}/ships`)
      revalidatePath(`/${locale}`)
    }
  }

  return Response.json(report)
}
