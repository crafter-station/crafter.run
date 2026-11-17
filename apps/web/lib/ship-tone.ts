/**
 * The colour a Ship page wears, taken from its cover and snapped to the Crafter palette, so a
 * neon cover still lands on one of the brand's soft tones.
 */
export const SHIP_TONES = ["yellow", "clay", "green", "sage", "blue", "lilac", "paper"] as const
export type ShipTone = (typeof SHIP_TONES)[number]

/** Hue of each palette family, in degrees. Paper is the fallback for covers with little colour. */
const FAMILY_HUES: Array<{ tone: Exclude<ShipTone, "paper">; hue: number }> = [
  { tone: "clay", hue: 18 },
  { tone: "yellow", hue: 48 },
  { tone: "green", hue: 95 },
  { tone: "sage", hue: 140 },
  { tone: "blue", hue: 210 },
  { tone: "lilac", hue: 275 },
]

function hueDistance(a: number, b: number) {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

export function nearestTone(hue: number): Exclude<ShipTone, "paper"> {
  return FAMILY_HUES.reduce((best, family) => (hueDistance(hue, family.hue) < hueDistance(hue, best.hue) ? family : best)).tone
}

/**
 * Picks a tone from raw RGB pixels. Each pixel votes for its hue with a weight that favours
 * saturated mid-tones, so a white background or black text does not decide the colour.
 */
export function toneFromPixels(pixels: Uint8Array | Buffer, channels = 3): ShipTone {
  let x = 0
  let y = 0
  let weight = 0
  let count = 0
  for (let i = 0; i + 2 < pixels.length; i += channels) {
    const r = pixels[i]! / 255
    const g = pixels[i + 1]! / 255
    const b = pixels[i + 2]! / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const lightness = (max + min) / 2
    const delta = max - min
    count++
    if (delta === 0) continue
    const saturation = delta / (1 - Math.abs(2 * lightness - 1))
    const hue =
      max === r ? 60 * (((g - b) / delta) % 6) : max === g ? 60 * ((b - r) / delta + 2) : 60 * ((r - g) / delta + 4)
    const w = saturation * (1 - Math.abs(2 * lightness - 1))
    const radians = (hue * Math.PI) / 180
    x += Math.cos(radians) * w
    y += Math.sin(radians) * w
    weight += w
  }
  // Mostly grey, white or black: no colour worth borrowing.
  if (!count || weight / count < 0.08) return "paper"
  const hue = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
  return nearestTone(hue)
}

/** A stable tone for a Ship without a cover, so its page does not change colour between visits. */
export function toneFromName(name: string): Exclude<ShipTone, "paper"> {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return FAMILY_HUES[hash % FAMILY_HUES.length]!.tone
}
