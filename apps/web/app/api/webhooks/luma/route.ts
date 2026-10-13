import { createHmac, timingSafeEqual } from "node:crypto"

import { env } from "@/env"
import { saveGuest } from "@/lib/event-guest-list"

/* Signature scheme: https://help.luma.com/p/webhooks
   Payload: https://docs.luma.com/reference/webhook_guest_updated */
const MAX_AGE_SECONDS = 300

type LumaWebhook = {
  type?: string
  data?: { user_email?: string; user_name?: string | null; approval_status?: string; event?: { id?: string } }
}

function verify(secret: string, header: string | null, body: string) {
  if (!header) return false
  const parts = Object.fromEntries(header.split(",").map(part => [part.slice(0, part.indexOf("=")), part.slice(part.indexOf("=") + 1)]))
  const timestamp = Number(parts.t)
  if (!parts.v1 || !Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > MAX_AGE_SECONDS) return false
  const expected = Buffer.from(createHmac("sha256", secret).update(`${parts.t}.${body}`).digest("hex"))
  const actual = Buffer.from(parts.v1)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

export async function POST(request: Request) {
  if (!env.LUMA_WEBHOOK_SECRET) return Response.json({ error: "Webhook unavailable" }, { status: 503 })
  const rawBody = await request.text()
  if (!verify(env.LUMA_WEBHOOK_SECRET, request.headers.get("webhook-signature"), rawBody))
    return Response.json({ error: "Invalid webhook signature" }, { status: 401 })

  let body: LumaWebhook
  try {
    body = JSON.parse(rawBody) as LumaWebhook
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 })
  }
  if (body.type !== "guest.registered" && body.type !== "guest.updated") return Response.json({ ok: true, skipped: true })

  const { user_email: email, user_name: name, approval_status: status, event } = body.data ?? {}
  if (!email || !status || !event?.id) return Response.json({ error: "Missing guest fields" }, { status: 400 })
  // Upsert is idempotent, so Luma's duplicate deliveries are harmless.
  await saveGuest(event.id, email, name ?? null, status)
  return Response.json({ ok: true })
}
