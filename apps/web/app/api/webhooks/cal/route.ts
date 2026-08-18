import { createHmac, timingSafeEqual } from "node:crypto"

import { env } from "@/env"

const guests = [
  { email: "shiara@crafterstation.com", name: "Shiara" },
  { email: "anthony@crafterstation.com", name: "Anthony" },
]

type CalWebhookPayload = {
  triggerEvent?: string
  payload?: { uid?: string }
}

export async function POST(request: Request) {
  if (!env.CAL_API_KEY || !env.CAL_WEBHOOK_SECRET) {
    console.error("Cal.com webhook environment variables are not configured")
    return Response.json({ error: "Webhook unavailable" }, { status: 503 })
  }

  const rawBody = await request.text()
  const signature = request.headers.get("x-cal-signature-256")
  const expectedSignature = createHmac("sha256", env.CAL_WEBHOOK_SECRET).update(rawBody).digest()

  if (
    !signature ||
    !/^[a-f\d]{64}$/i.test(signature) ||
    !timingSafeEqual(Buffer.from(signature, "hex"), expectedSignature)
  ) {
    return Response.json({ error: "Invalid webhook signature" }, { status: 401 })
  }

  let body: CalWebhookPayload

  try {
    body = JSON.parse(rawBody) as CalWebhookPayload
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 })
  }

  if (body.triggerEvent !== "BOOKING_CREATED") {
    return Response.json({ ok: true, skipped: true })
  }

  const bookingUid = body.payload?.uid

  if (!bookingUid) {
    return Response.json({ error: "Missing booking UID" }, { status: 400 })
  }

  const response = await fetch(`https://api.cal.com/v2/bookings/${encodeURIComponent(bookingUid)}/guests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.CAL_API_KEY}`,
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
    },
    body: JSON.stringify({ guests }),
  }).catch((error: unknown) => {
    console.error("Failed to reach Cal.com while adding booking guests", error)
    return null
  })

  if (!response?.ok) {
    const details = response ? await response.text().catch(() => "") : ""
    console.error("Failed to add Cal.com booking guests", {
      bookingUid,
      status: response?.status,
      details,
    })
    return Response.json({ error: "Failed to add guests" }, { status: 502 })
  }

  return Response.json({
    ok: true,
    bookingUid,
    guestsAdded: guests.map((guest) => guest.email),
  })
}
