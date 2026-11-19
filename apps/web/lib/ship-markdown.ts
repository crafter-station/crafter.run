import type { Element, ElementContent, Root, RootContent } from "hast"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

/**
 * Markdown written by members, turned into a hast tree that is safe to render.
 *
 * Raw HTML is never parsed (remark-rehype drops it unless told otherwise), and the tree is then
 * filtered again against an allowlist of elements, properties and URL schemes, so nothing a member
 * writes can become a script, handler, style or javascript: link.
 */
const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype)

const ALLOWED = new Set([
  "p", "br", "strong", "em", "del", "code", "pre", "ul", "ol", "li", "blockquote", "hr", "a", "img", "video", "figure", "figcaption",
  "h1", "h2", "h3", "h4", "h5", "h6", "table", "thead", "tbody", "tr", "th", "td", "input",
])

const REL = ["ugc", "nofollow", "noopener", "noreferrer"]

type Props = NonNullable<Element["properties"]>

/** http(s) and mailto links, in-site paths and fragments. Everything else, javascript: included, is refused. */
export function safeHref(href: string): "external" | "internal" | null {
  const value = href.trim()
  if (value.startsWith("#")) return "internal"
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return "internal"
  try {
    const url = new URL(value)
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? "external" : null
  } catch {
    return null
  }
}

/** Images load over https only. */
export function safeImageSrc(src: string): boolean {
  try {
    return new URL(src.trim()).protocol === "https:"
  } catch {
    return false
  }
}

const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com"
const VIDEO_PATH = /\.(mp4|webm)$/i
const POSTER_TOKEN = /(?:^|\s)poster=(\S+)/i

/** https URL on the Vercel Blob store the API uploads to. */
export function isBlobUrl(src: string): boolean {
  try {
    const url = new URL(src.trim())
    return url.protocol === "https:" && url.hostname.endsWith(BLOB_HOST_SUFFIX)
  } catch {
    return false
  }
}

/** A video is an mp4 or webm file on the Blob store. */
export function isBlobVideo(src: string): boolean {
  if (!isBlobUrl(src)) return false
  return VIDEO_PATH.test(new URL(src.trim()).pathname)
}

/** Splits a markdown image title into its caption and an optional same-host poster URL. */
export function parseMediaTitle(title: string): { caption: string; poster: string | null } {
  const match = POSTER_TOKEN.exec(title)
  const poster = match && isBlobUrl(match[1]) ? match[1].trim() : null
  const caption = title.replace(POSTER_TOKEN, " ").replace(/\s+/g, " ").trim()
  return { caption, poster }
}

function mediaElement(properties: Props): Element | null {
  const src = typeof properties.src === "string" ? properties.src.trim() : ""
  const alt = typeof properties.alt === "string" ? properties.alt : ""
  const title = typeof properties.title === "string" ? properties.title : ""
  const { caption, poster } = parseMediaTitle(title)
  if (isBlobVideo(src)) {
    const video: Props = {
      src,
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      ariaLabel: alt,
    }
    if (poster) video.poster = poster
    return { type: "element", tagName: "video", properties: video, children: [] }
  }
  if (!safeImageSrc(src) || VIDEO_PATH.test(new URL(src).pathname)) return null
  const img: Props = { src, alt, loading: "lazy", decoding: "async", referrerPolicy: "no-referrer" }
  if (caption) img.title = caption
  return { type: "element", tagName: "img", properties: img, children: [] }
}

function captionOf(properties: Props): string {
  return typeof properties.title === "string" ? parseMediaTitle(properties.title).caption : ""
}

function figure(media: Element, caption: string): Element {
  const children: ElementContent[] = [media]
  if (caption) children.push({ type: "element", tagName: "figcaption", properties: {}, children: [{ type: "text", value: caption }] })
  return { type: "element", tagName: "figure", properties: {}, children }
}

function cleanProps(tag: string, properties: Props): Props | null {
  const out: Props = {}
  if (tag === "a") {
    const href = typeof properties.href === "string" ? properties.href : ""
    const kind = safeHref(href)
    if (!kind) return null
    out.href = href.trim()
    if (typeof properties.title === "string") out.title = properties.title
    if (kind === "external") {
      out.target = "_blank"
      out.rel = REL
    }
  } else if (tag === "input") {
    if (properties.type !== "checkbox") return null
    out.type = "checkbox"
    out.checked = properties.checked === true
    out.disabled = true
  } else if (tag === "ol" && typeof properties.start === "number") {
    out.start = properties.start
  } else if ((tag === "th" || tag === "td") && ["left", "right", "center"].includes(String(properties.align))) {
    out.align = properties.align as "left" | "right" | "center"
  } else if (tag === "code" && Array.isArray(properties.className)) {
    const language = properties.className.find((name) => typeof name === "string" && /^language-[\w+#-]+$/.test(name))
    if (language) out.className = [language]
  }
  if ((tag === "ul" || tag === "ol" || tag === "li") && Array.isArray(properties.className)) {
    const kept = properties.className.filter((name) => name === "contains-task-list" || name === "task-list-item")
    if (kept.length > 0) out.className = kept
  }
  return out
}

function clean(node: RootContent | ElementContent): ElementContent[] {
  if (node.type === "text") return [node]
  if (node.type !== "element") return []
  if (node.tagName === "img") {
    const props = node.properties ?? {}
    const media = mediaElement(props)
    if (media) return [media]
    const alt = typeof props.alt === "string" ? props.alt : ""
    const src = typeof props.src === "string" ? props.src : ""
    // A video from another host is not played; its description stays as text.
    return alt && VIDEO_PATH.test(src.split(/[?#]/)[0]) ? [{ type: "text", value: alt }] : []
  }
  if (node.tagName === "p") {
    const parts = node.children.filter((child) => !(child.type === "text" && child.value.trim() === ""))
    const only = parts.length === 1 ? parts[0] : null
    if (only && only.type === "element" && only.tagName === "img") {
      const media = clean(only)[0]
      const caption = captionOf(only.properties ?? {})
      if (media && media.type === "element" && caption) return [figure(media, caption)]
    }
  }
  const children = node.children.flatMap(clean)
  if (!ALLOWED.has(node.tagName)) return children
  const properties = cleanProps(node.tagName, node.properties ?? {})
  if (properties === null) return node.tagName === "img" || node.tagName === "input" ? [] : children
  // Headings sit under the page's own h1 and h2: the Ship page never gets a second h1.
  const match = /^h([1-6])$/.exec(node.tagName)
  const tagName = match ? (Number(match[1]) <= 3 ? "h3" : "h4") : node.tagName
  return [{ type: "element", tagName, properties, children }]
}

/** Parse member markdown into a sanitized hast tree. */
export function shipMarkdownTree(source: string): Root {
  const tree = processor.runSync(processor.parse(source)) as Root
  return { type: "root", children: tree.children.flatMap(clean) as Root["children"] }
}

function plainText(node: RootContent | ElementContent): string {
  if (node.type === "text") return node.value
  if (node.type !== "element" || node.tagName === "pre" || node.tagName === "figure" || node.tagName === "img" || node.tagName === "video" || node.tagName === "input") return ""
  const text = node.children.map(plainText).join("")
  // Blocks and list items end a sentence for the reader, so they get a break between them.
  return ["p", "li", "h3", "h4", "blockquote", "tr"].includes(node.tagName) ? `${text}\n` : text
}

/** Markdown reduced to readable text: no syntax, no code blocks, whitespace collapsed. */
export function markdownToPlainText(source: string): string {
  return shipMarkdownTree(source).children.map(plainText).join(" ").replace(/\s+/g, " ").trim()
}

const META_MIN = 140
const META_MAX = 160

const META_TAGLINE_MIN = 70

/**
 * The tagline alone when it is long enough to stand as a description (the description body may be in
 * another language), else the tagline plus the opening of the body, cut to 160 characters at a sentence or word end.
 */
export function shipMetaDescription(tagline: string, markdown: string): string {
  const lead = tagline.trim().replace(/[.!?。]*$/, "")
  if (lead.length >= META_TAGLINE_MIN) {
    if (lead.length <= META_MAX) return lead
    const word = lead.slice(0, META_MAX - 1).lastIndexOf(" ")
    return `${lead.slice(0, word >= META_TAGLINE_MIN ? word : META_MAX - 1).trimEnd()}…`
  }
  const body = markdownToPlainText(markdown)
  const full = body ? `${lead}. ${body}` : lead
  if (full.length <= META_MAX) return full
  const head = full.slice(0, META_MAX)
  const sentence = Math.max(...[". ", "! ", "? "].map((stop) => head.lastIndexOf(stop)))
  if (sentence >= META_MIN - 1) return head.slice(0, sentence + 1)
  const word = head.slice(0, META_MAX - 1).lastIndexOf(" ")
  return `${head.slice(0, word >= META_MIN - 1 ? word : META_MAX - 1).trimEnd()}…`
}
