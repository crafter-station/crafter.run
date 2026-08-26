/**
 * Font loading for generated OG images.
 *
 * Satori cannot read the woff2 files the pages ship, and next/font gives no
 * way to reach the underlying bytes, so the card fetches its own faces from
 * Google Fonts. The `text=` parameter subsets the file to exactly the glyphs
 * the card draws, which is what keeps a CJK title from pulling a multi-megabyte
 * face into a single image render.
 *
 * Shared by `/og` (the site-wide card) and the blog's per-post card so the two
 * cannot drift onto different faces.
 */
import type { Locale } from "@/lib/i18n"

/**
 * Fetch a glyph-subsetted font from Google Fonts (css2 `text=` trick).
 * Without a browser UA, Google serves TTF, which satori can parse.
 */
export async function loadGoogleFont(family: string, weight: number, text: string) {
  const chars = [...new Set(text)].join("")
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(chars)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!resource) throw new Error(`No font resource for ${family}`)
  const response = await fetch(resource[1])
  if (!response.ok) throw new Error(`Font fetch failed for ${family}`)
  return response.arrayBuffer()
}

/** Space Grotesk carries no CJK, so those locales draw their titles in Noto. */
export function titleFontFamily(lang: Locale) {
  if (lang === "zh") return { family: "Noto Sans SC", weight: 700 as const }
  if (lang === "ja") return { family: "Noto Sans JP", weight: 700 as const }
  return { family: "Space Grotesk", weight: 600 as const }
}

/** True where tight Latin tracking would damage the glyphs. */
export function isCjk(lang: Locale) {
  return lang === "zh" || lang === "ja"
}
