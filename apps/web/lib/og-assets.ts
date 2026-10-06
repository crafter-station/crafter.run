import { readFile } from "node:fs/promises"
import { join } from "node:path"
import sharp from "sharp"
import type { SocialCardData } from "@/lib/og-data"

const files = new Map<string, Promise<Buffer>>()
function localFile(relative: string, kind: "font" | "art" | "portrait" | "bounty" | "blog" | "event") {
  const key = `${kind}/${relative}`
  let file = files.get(key)
  if (!file) {
    // Literal directory roots keep Next's tracer out of the rest of the repo.
    const path = kind === "font" ? join(process.cwd(), "app/fonts", relative)
      : kind === "art" ? join(process.cwd(), "public/og/art", relative)
      : kind === "portrait" ? join(process.cwd(), "public/team/station-ink", relative)
      : kind === "bounty" ? join(process.cwd(), "public/bounties", relative)
      : kind === "event" ? join(process.cwd(), "public/events", relative)
      : join(process.cwd(), "public/og/blog", relative)
    file = readFile(path).catch(error => { files.delete(key); throw error })
    files.set(key, file)
  }
  return file
}

const remoteHosts = new Set(["img.clerk.com", "images.clerk.dev", "avatars.githubusercontent.com", "images.unsplash.com"])
async function imageBytes(source: string) {
  if (!source.includes("..")) {
    if (source.startsWith("/team/station-ink/")) return localFile(source.slice("/team/station-ink/".length), "portrait")
    if (source.startsWith("/bounties/")) return localFile(source.slice("/bounties/".length), "bounty")
    if (source.startsWith("/og/blog/")) return localFile(source.slice("/og/blog/".length), "blog")
    if (source.startsWith("/events/")) return localFile(source.slice("/events/".length), "event")
  }
  const url = new URL(source)
  if (url.protocol !== "https:" || url.username || url.password || url.port ||
    !(remoteHosts.has(url.hostname) || url.hostname.endsWith(".public.blob.vercel-storage.com"))) return null
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(4000), cache: "no-store" })
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) return null
  if (Number(response.headers.get("content-length")) > 5_000_000) return null
  const reader = response.body?.getReader()
  if (!reader) return null
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.length
    if (size > 5_000_000) { await reader.cancel(); return null }
    chunks.push(value)
  }
  return Buffer.concat(chunks)
}

async function raster(source: string, portrait: boolean, muted = false) {
  try {
    const bytes = await imageBytes(source)
    if (!bytes) return undefined
    let image = sharp(bytes, { limitInputPixels: 24_000_000 })
      .rotate().resize(portrait ? 420 : 640, portrait ? 500 : 360, { fit: "inside", withoutEnlargement: true })
    if (muted) image = image.modulate({ saturation: .2 }).tint("#b49e7e")
    return `data:image/png;base64,${(await image.png().toBuffer()).toString("base64")}`
  } catch {
    // An unavailable avatar must never turn the social preview into a 500.
    return undefined
  }
}

export async function socialAssets(data: SocialCardData) {
  const [art, portrait, portraits, poster] = await Promise.all([
    localFile(`${data.art}.svg`, "art").then(bytes => `data:image/svg+xml;base64,${bytes.toString("base64")}`),
    data.portrait ? raster(data.portrait, true) : undefined,
    Promise.all((data.portraits ?? []).map(source => raster(source, true))),
    data.poster ? raster(data.poster, false, data.kind === "bounties") : undefined,
  ])
  return { art, portrait, portraits: portraits.filter((image): image is string => Boolean(image)), poster }
}

type SocialFont = { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" }
export async function socialFonts(data: SocialCardData): Promise<SocialFont[]> {
  const text = [data.title, data.description, data.eyebrow, data.detail, data.status].join(" ")
  const names: Array<[string, string, 400 | 500]> = [
    ["Crafter Display", "CrafterSansPreview-Medium.ttf", 500],
    ["Crafter Text", "CrafterSansTextPreview-Regular.ttf", 400],
  ]
  if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\u3000-\u303f\uff00-\uffef]/u.test(text)) {
    names.push(["Noto", data.locale === "ja" || /[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)
      ? "NotoSansJP-Medium.woff" : "NotoSansSC-Medium.woff", 500])
  }
  return Promise.all(names.map(async ([name, filename, weight]) => ({
    name, data: new Uint8Array(await localFile(filename, "font")).buffer, weight, style: "normal" as const,
  })))
}
