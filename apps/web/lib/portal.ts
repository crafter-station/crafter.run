import { env } from "@/env"
import type { NextProjectRealtimeEvent } from "@/lib/next-projects"
import { nextProjectsChannelId, workshopQuestionsChannelId } from "@/lib/portal-channels"
import type { WorkshopQuestionRealtimeEvent } from "@/lib/workshop-questions"

async function publishPortalEvent(channelId: string, event: NextProjectRealtimeEvent | WorkshopQuestionRealtimeEvent) {
  if (!env.PORTAL_SECRET) {
    console.warn(`PORTAL_SECRET is not configured; skipping ${channelId} realtime publish.`)
    return
  }

  try {
    const response = await fetch(
      `https://api.useportal.co/v1/channels/${channelId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.PORTAL_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId: "crafter-run-api", type: event.type, content: event }),
      },
    )

    if (!response.ok) {
      console.error(`Portal ${channelId} publish failed:`, response.status, await response.text())
    }
  } catch (error) {
    console.error(`Portal ${channelId} publish failed:`, error)
  }
}

export function publishNextProjectEvent(event: NextProjectRealtimeEvent) {
  return publishPortalEvent(nextProjectsChannelId, event)
}

export function publishWorkshopQuestionEvent(boardSlug: string, event: WorkshopQuestionRealtimeEvent) {
  return publishPortalEvent(workshopQuestionsChannelId(boardSlug), event)
}
