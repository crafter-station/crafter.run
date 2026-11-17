import "server-only"
import { unstable_cache } from "next/cache"
import sharp from "sharp"

import { type ShipTone, toneFromName, toneFromPixels } from "@/lib/ship-tone"

const toneOfImage = unstable_cache(
  async (imageUrl: string): Promise<ShipTone | null> => {
    try {
      const response = await fetch(imageUrl, { signal: AbortSignal.timeout(4000) })
      if (!response.ok) return null
      const { data, info } = await sharp(Buffer.from(await response.arrayBuffer()))
        .resize(48, 48, { fit: "cover" })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })
      return toneFromPixels(data, info.channels)
    } catch {
      return null
    }
  },
  ["ship-tone-v1"],
  { revalidate: 60 * 60 * 24 * 7 },
)

/** The palette tone for a Ship: from its cover when it has one, otherwise stable per name. */
export async function shipTone(ship: { slug: string; imageUrl?: string | null }): Promise<ShipTone> {
  if (ship.imageUrl?.startsWith("https://")) {
    const tone = await toneOfImage(ship.imageUrl)
    if (tone) return tone
  }
  return toneFromName(ship.slug)
}
