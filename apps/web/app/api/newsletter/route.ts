import { env } from "@/env"
import { statusCode, subscribe } from "@/lib/newsletter"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const result = await subscribe(body, {
    apiKey: env.RESEND_API_KEY,
    segmentId: env.RESEND_NEWSLETTER_SEGMENT_ID,
    suppress: env.MAIL_SUPPRESS,
  })
  return Response.json(result, { status: statusCode(result) })
}
