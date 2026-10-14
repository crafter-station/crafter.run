import { findEventBadge } from "@/lib/event-badge"
import { eventBadgeImageKey } from "@/lib/event-badge-store"
import { r2Get } from "@/lib/r2"

export async function GET(_request: Request, { params }: { params: Promise<{ event: string; number: string; side: string }> }) {
  const { event, number, side } = await params
  if (!findEventBadge(event) || !/^\d+$/.test(number) || (side !== "front" && side !== "back")) return new Response(null, { status: 404 })
  const object = await r2Get(eventBadgeImageKey(event, Number(number), side))
  if (!object?.body) return new Response(null, { status: 404 })
  return new Response(object.body, {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" },
  })
}
