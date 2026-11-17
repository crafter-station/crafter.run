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
  "p", "br", "strong", "em", "del", "code", "pre", "ul", "ol", "li", "blockquote", "hr", "a", "img",
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
  } else if (tag === "img") {
    const src = typeof properties.src === "string" ? properties.src : ""
    if (!safeImageSrc(src)) return null
    out.src = src.trim()
    out.alt = typeof properties.alt === "string" ? properties.alt : ""
    if (typeof properties.title === "string") out.title = properties.title
    out.loading = "lazy"
    out.decoding = "async"
    out.referrerPolicy = "no-referrer"
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
  if (node.type !== "element" || node.tagName === "pre" || node.tagName === "img" || node.tagName === "input") return ""
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

/** Tagline plus the opening of the description, cut to 140-160 characters at a sentence or word end. */
export function shipMetaDescription(tagline: string, markdown: string): string {
  const lead = tagline.trim().replace(/[.!?。]*$/, "")
  const body = markdownToPlainText(markdown)
  const full = body ? `${lead}. ${body}` : lead
  if (full.length <= META_MAX) return full
  const head = full.slice(0, META_MAX)
  const sentence = Math.max(...[". ", "! ", "? "].map((stop) => head.lastIndexOf(stop)))
  if (sentence >= META_MIN - 1) return head.slice(0, sentence + 1)
  const word = head.slice(0, META_MAX - 1).lastIndexOf(" ")
  return `${head.slice(0, word >= META_MIN - 1 ? word : META_MAX - 1).trimEnd()}…`
}
