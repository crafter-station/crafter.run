import { lookup } from "node:dns/promises"
import { isIP } from "node:net"

/** Page metadata the new Ship form can use. */
export type PageMeta = { title: string | null; description: string | null; image: string | null; siteName: string | null }

const MAX_BYTES = 512 * 1024
const MAX_REDIRECTS = 3
const TIMEOUT_MS = 5000

/** True for loopback, private, link-local, carrier-grade NAT, multicast and other non-public addresses. */
export function isPrivateAddress(address: string): boolean {
  const version = isIP(address)
  if (version === 4) {
    const [a, b] = address.split(".").map(Number) as [number, number]
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19))
    )
  }
  if (version === 6) {
    const value = address.toLowerCase()
    const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
    if (mapped) return isPrivateAddress(mapped[1]!)
    return value === "::" || value === "::1" || value.startsWith("fc") || value.startsWith("fd") || /^fe[89ab]/.test(value) || value.startsWith("ff")
  }
  return true
}

async function assertPublic(url: URL) {
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("scheme")
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("port")
  const host = url.hostname.replace(/^\[|\]$/g, "")
  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true })
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) throw new Error("private")
}

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .trim()
}

function metaContent(html: string, keys: string[]): string | null {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = /(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]?.toLowerCase()
    if (!key || !keys.includes(key)) continue
    const content = /content\s*=\s*"([^"]*)"|content\s*=\s*'([^']*)'/i.exec(tag)
    const value = decode(content?.[1] ?? content?.[2] ?? "")
    if (value) return value
  }
  return null
}

/** Reads Open Graph and basic meta tags from HTML. An image with a query string is dropped: the API strips queries. */
export function parsePageMeta(html: string, base: string): PageMeta {
  const head = html.slice(0, MAX_BYTES)
  const title = metaContent(head, ["og:title", "twitter:title"]) ?? (/<title[^>]*>([^<]*)<\/title>/i.exec(head)?.[1] ? decode(/<title[^>]*>([^<]*)<\/title>/i.exec(head)![1]!) : null)
  const rawImage = metaContent(head, ["og:image", "og:image:url", "twitter:image"])
  let image: string | null = null
  if (rawImage) {
    try {
      const url = new URL(rawImage, base)
      if (["http:", "https:"].includes(url.protocol) && !url.search && url.toString().length <= 2000) image = url.toString()
    } catch {
      image = null
    }
  }
  return {
    title,
    description: metaContent(head, ["og:description", "description", "twitter:description"]),
    image,
    siteName: metaContent(head, ["og:site_name"]),
  }
}

/** Fetches a public web page and returns its metadata. Refuses non-public hosts, including after redirects. */
export async function fetchPageMeta(target: string): Promise<PageMeta | null> {
  let url = new URL(target)
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await assertPublic(url)
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "text/html,application/xhtml+xml", "User-Agent": "CrafterStationBot/1.0 (+https://crafter.run)" },
    })
    const location = response.headers.get("location")
    if (response.status >= 300 && response.status < 400 && location) {
      url = new URL(location, url)
      continue
    }
    if (!response.ok || !(response.headers.get("content-type") ?? "").includes("html") || !response.body) return null
    const reader = response.body.getReader()
    const chunks: Uint8Array[] = []
    let size = 0
    while (size < MAX_BYTES) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      size += value.byteLength
    }
    await reader.cancel().catch(() => {})
    const html = new TextDecoder().decode(Buffer.concat(chunks))
    return parsePageMeta(html, url.toString())
  }
  return null
}
