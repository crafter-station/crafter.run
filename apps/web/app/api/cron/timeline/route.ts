import { revalidatePath, revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

import { locales } from "@/lib/i18n"
import {
  getProjectTimeline,
  PROJECT_TIMELINE_CACHE_TAG,
} from "@/lib/project-timeline-cache"

export const dynamic = "force-dynamic"
export const maxDuration = 300

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return Response.json(
      { error: "CRON_SECRET is not configured" },
      { status: 503 },
    )
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidateTag(PROJECT_TIMELINE_CACHE_TAG, { expire: 0 })
  const timeline = await getProjectTimeline()

  if (timeline.source !== "live") {
    return Response.json(
      { error: "Live GitHub refresh failed; the snapshot remains available" },
      { status: 502 },
    )
  }

  for (const locale of locales) {
    revalidatePath(`/${locale}/timeline`)
  }

  return Response.json({
    refreshed: true,
    generatedAt: timeline.generatedAt,
    repositories: timeline.projects.length,
  })
}
