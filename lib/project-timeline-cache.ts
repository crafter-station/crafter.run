import { unstable_cache } from "next/cache"

import {
  fetchProjectTimeline,
  type ProjectTimelineData,
} from "@/lib/project-timeline"

export const PROJECT_TIMELINE_CACHE_TAG = "crafter-project-timeline"

const getCachedLiveTimeline = unstable_cache(
  async () => {
    const token = process.env.GITHUB_TOKEN
    if (!token) throw new Error("GITHUB_TOKEN is not configured")
    return fetchProjectTimeline(token)
  },
  ["crafter-project-timeline-v2"],
  {
    revalidate: 86400,
    tags: [PROJECT_TIMELINE_CACHE_TAG],
  },
)

async function getSnapshot() {
  const snapshot = (await import("@/data/project-timeline.json"))
    .default as ProjectTimelineData
  return { ...snapshot, source: "snapshot" as const }
}

export async function getProjectTimeline(): Promise<ProjectTimelineData> {
  if (!process.env.GITHUB_TOKEN) return getSnapshot()

  try {
    return await getCachedLiveTimeline()
  } catch (error) {
    console.warn("GitHub project timeline refresh failed; using snapshot.", error)
    return getSnapshot()
  }
}
