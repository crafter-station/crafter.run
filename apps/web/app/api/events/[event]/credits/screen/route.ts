import { timingSafeEqual } from "node:crypto"
import { env } from "@/env"
import { findAccessEvent } from "@/lib/access-events"
import { readScreen } from "@/lib/event-credits"

export const dynamic = "force-dynamic"

/* The talks deck at devday.crafter.run polls this from the projector. The key keeps the live code off the public internet. */
const ORIGINS = new Set(["https://devday.crafter.run", "http://localhost:3000", "http://localhost:3001"])

function cors(request: Request): Record<string, string> {
  const origin = request.headers.get("origin")
  return origin && ORIGINS.has(origin) ? { "access-control-allow-origin": origin, vary: "origin" } : {}
}

function authorized(key: string | null) {
  const expected = env.CREDITS_SCREEN_TOKEN
  if (!expected || !key) return false
  const a = Buffer.from(key)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function GET(request: Request, { params }: { params: Promise<{ event: string }> }) {
  const { event: slug } = await params
  const headers = { ...cors(request), "cache-control": "no-store" }
  if (!findAccessEvent(slug)) return Response.json({ error: "not-found" }, { status: 404, headers })
  if (!authorized(new URL(request.url).searchParams.get("key"))) return Response.json({ error: "unauthorized" }, { status: 401, headers })
  try {
    return Response.json(await readScreen(slug), { headers })
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503, headers })
  }
}
