import { badgeImageKey } from "@/lib/hot-reload-badge-store"
import { r2Get } from "@/lib/r2"

export async function GET(_request: Request, { params }: { params: Promise<{ edition: string; number: string; side: string }> }) {
  const { edition, number, side } = await params
  if (!/^\d+$/.test(edition) || !/^\d+$/.test(number) || (side !== "front" && side !== "back")) return new Response(null, { status: 404 })
  const object = await r2Get(badgeImageKey(Number(edition), Number(number), side))
  if (!object?.body) return new Response(null, { status: 404 })
  return new Response(object.body, {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" },
  })
}
