import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import sharp from "sharp"
import { socialImageUrl } from "../lib/og"

/** Generate only social fallbacks; never touches icons or the original poster. */
export async function generateSocialFallbacks() {
  const origin = process.env.OG_ORIGIN ?? "http://localhost:8875"
  const response = await fetch(new URL(socialImageUrl("Craft. Ship. Repeat.", "en"), origin), {
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/png")) {
    throw new Error(`Social renderer returned ${response.status}; start the web app or set OG_ORIGIN.`)
  }
  const image = Buffer.from(await response.arrayBuffer())
  const { width, height } = await sharp(image).metadata()
  if (width !== 1200 || height !== 630) throw new Error(`Unexpected social image size: ${width}×${height}`)
  for (const filename of ["og.png", "og-twitter.png"]) {
    await writeFile(join(import.meta.dir, "../public", filename), image)
    console.log(`${filename}: ${Math.round(image.length / 1024)} KB, 1200×630`)
  }
}

if (import.meta.main) generateSocialFallbacks().catch(error => { console.error(error); process.exitCode = 1 })
