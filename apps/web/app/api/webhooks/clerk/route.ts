import { verifyWebhook } from "@clerk/nextjs/webhooks"
import type { NextRequest } from "next/server"

import { env } from "@/env"
import { syncClerkAvatar } from "@/lib/clerk-avatar"
import { getDb } from "@/lib/db"
import { type ClerkUserCreated, sendInviteWelcome } from "@/lib/welcome-mail"

export async function POST(request: NextRequest) {
  let event
  try {
    event = await verifyWebhook(request)
  } catch (error) {
    console.error("Clerk webhook verification failed.", error)
    return new Response("Invalid webhook signature", { status: 400 })
  }

  if (event.type === "user.created") {
    const result = await sendInviteWelcome(event.data as unknown as ClerkUserCreated, {
      apiKey: env.RESEND_API_KEY,
      segmentId: env.RESEND_NEWSLETTER_SEGMENT_ID,
      ojitoCode: env.WELCOME_OJITO_CODE,
      tasteCode: env.WELCOME_TASTE_CODE,
    })
    if (result.status === "failed") return new Response("Welcome mail failed", { status: 502 })
    if (result.status === "unavailable") console.error("Invite welcome skipped because RESEND_API_KEY or the WELCOME_* codes are not configured.")
    return new Response(null, { status: 204 })
  }

  if (event.type !== "user.updated") return new Response(null, { status: 204 })

  const db = getDb()
  if (!db) {
    console.error("Clerk avatar sync skipped because DATABASE_URL is not configured.")
    return new Response("Database unavailable", { status: 503 })
  }

  await syncClerkAvatar(db, event.data.id, event.data.image_url)
  return new Response(null, { status: 204 })
}
