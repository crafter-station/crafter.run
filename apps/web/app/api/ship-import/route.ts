import { auth } from "@clerk/nextjs/server"

import { fetchPageMeta } from "@/lib/ship-og"

/** Reads the public metadata of a page for the new Ship form. Signed-in members only. */
export async function POST(request: Request) {
  const identity = await auth()
  if (!identity.isAuthenticated) return Response.json({ error: "Authentication required." }, { status: 401 })
  const body = (await request.json().catch(() => null)) as { url?: unknown } | null
  if (typeof body?.url !== "string" || body.url.length > 2000) return Response.json({ error: "Send a url." }, { status: 400 })
  let target: URL
  try {
    target = new URL(body.url)
  } catch {
    return Response.json({ error: "Send a valid url." }, { status: 400 })
  }
  try {
    const meta = await fetchPageMeta(target.toString())
    return Response.json({ meta }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return Response.json({ meta: null }, { headers: { "Cache-Control": "no-store" } })
  }
}
