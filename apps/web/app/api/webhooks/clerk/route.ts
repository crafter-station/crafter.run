import { verifyWebhook } from "@clerk/nextjs/webhooks"
import type { NextRequest } from "next/server"

import { syncClerkAvatar } from "@/lib/clerk-avatar"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  let event
  try {
    event = await verifyWebhook(request)
  } catch (error) {
    console.error("Clerk webhook verification failed.", error)
    return new Response("Invalid webhook signature", { status: 400 })
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
