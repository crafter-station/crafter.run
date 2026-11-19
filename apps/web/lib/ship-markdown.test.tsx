import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import { ShipMarkdown } from "@/components/ships/ship-markdown"
import { markdownToPlainText, safeHref, safeImageSrc, shipMetaDescription } from "@/lib/ship-markdown"
import { shipSchema } from "@/lib/structured-data"

const render = (source: string) => renderToStaticMarkup(<ShipMarkdown source={source} />)

describe("ship markdown", () => {
  test("renders lists, paragraphs and headings with capped levels", () => {
    const html = render("Intro\n\n- one\n- two\n\n# Big\n\n###### Small")
    expect(html).toContain("<ul>")
    expect(html).toContain("<li>one</li>")
    expect(html).toContain("<h3>Big</h3>")
    expect(html).toContain("<h4>Small</h4>")
    expect(html).not.toContain("<h1")
    expect(html).not.toContain("<h2")
  })

  test("drops raw html, scripts and handlers", () => {
    const html = render('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n<iframe src="https://evil.test"></iframe>\n\n<b onclick="x()">hi</b>')
    expect(html).not.toContain("<script")
    expect(html).not.toContain("onerror")
    expect(html).not.toContain("<iframe")
    expect(html).not.toContain("onclick")
  })

  test("strips javascript: and data: links but keeps the text", () => {
    const html = render("[a](javascript:alert(1)) [b](JaVaScRiPt:alert(1)) [c](data:text/html,x) [d](&#106;avascript:alert(1)) [e](//evil.test)")
    expect(html).not.toContain("<a")
    expect(html).toContain("a")
    expect(html.toLowerCase()).not.toContain("javascript:")
  })

  test("external links are untrusted, in-site links are plain", () => {
    const html = render("[x](https://example.com) [y](/en/ships) [z](#top)")
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('rel="ugc nofollow noopener noreferrer"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('<a href="/en/ships">y</a>')
  })

  test("images must be https and load lazily", () => {
    const html = render("![ok](https://example.com/a.png) ![bad](http://example.com/a.png) ![js](javascript:alert(1))")
    expect(html).toContain('src="https://example.com/a.png"')
    expect(html).toContain('loading="lazy"')
    expect(html).not.toContain("http://example.com")
    expect(html).not.toContain("javascript:")
  })

  test("url helpers", () => {
    expect(safeHref("https://a.test")).toBe("external")
    expect(safeHref("mailto:a@b.test")).toBe("external")
    expect(safeHref("/x")).toBe("internal")
    expect(safeHref("//x.test")).toBeNull()
    expect(safeHref(" javascript:alert(1)")).toBeNull()
    expect(safeImageSrc("https://a.test/i.png")).toBe(true)
    expect(safeImageSrc("http://a.test/i.png")).toBe(false)
  })

  test("tables scroll in a wrapper and code stays text", () => {
    const html = render("| a | b |\n|---|---|\n| 1 | 2 |\n\n```\n<script>x</script>\n```")
    expect(html).toContain("ship-prose-table")
    expect(html).toContain("&lt;script&gt;")
  })
})

describe("ship meta description", () => {
  const long = "TOCus adds a short breathing pause before the websites you choose, so you can notice the impulse and decide what to do next.\n\n- Choose your websites and customize your pause and browsing times.\n- Set the days and hours.\n\n```\ncode()\n```"

  test("is 140-160 chars, plain text, starts with the tagline", () => {
    const text = shipMetaDescription("Pause before visiting addictive websites", long)
    expect(text.length).toBeGreaterThanOrEqual(140)
    expect(text.length).toBeLessThanOrEqual(160)
    expect(text.startsWith("Pause before visiting addictive websites. TOCus adds")).toBe(true)
    expect(text).not.toMatch(/[`*#\n]|code\(\)/)
  })

  test("short ships keep what they have", () => {
    expect(shipMetaDescription("Tiny tool.", "")).toBe("Tiny tool")
  })
})

describe("ship json-ld", () => {
  test("is valid json with no undefined fields", () => {
    const base = { name: "X", description: "d", slug: "x", imageUrl: "https://a.test/i.png", owner: { handle: "h", displayName: "H" }, socialPostUrl: null, publishedAt: "2026-01-01T00:00:00.000Z", modifiedAt: "2026-02-01T00:00:00.000Z" }
    const app = shipSchema({ ...base, links: [{ type: "repository", url: "https://github.com/a/b" }] }, "en")
    const work = shipSchema({ ...base, links: [{ type: "social", url: "https://x.com/a" }] }, "en")
    expect(app["@type"]).toBe("SoftwareSourceCode")
    expect(work["@type"]).toBe("CreativeWork")
    const parsed = JSON.parse(JSON.stringify(app))
    expect(parsed).toEqual(app)
    expect(parsed.author.url).toBe("https://crafter.run/en/crafters/h")
    expect(Object.values(parsed).includes(undefined)).toBe(false)
  })
})

describe("ship media", () => {
  const BLOB = "https://abc123.public.blob.vercel-storage.com"

  test("blob mp4 and webm render as muted looping video with aria-label", () => {
    const html = render(`![Pan over the map](${BLOB}/tiny-lima/pan.mp4)\n\n![Rotate](${BLOB}/tiny-lima/rot.webm)`)
    expect(html).toContain("<video")
    expect(html).toContain(`src="${BLOB}/tiny-lima/pan.mp4"`)
    expect(html).toContain(`src="${BLOB}/tiny-lima/rot.webm"`)
    expect(html).toContain('aria-label="Pan over the map"')
    const lower = html.toLowerCase()
    for (const attr of ["autoplay", "muted", "loop", "playsinline"]) expect(lower).toContain(`${attr}=""`)
    expect(html).toContain('preload="metadata"')
    expect(html).not.toContain("<img")
  })

  test("video from another host or over http is dropped, alt kept as text", () => {
    const html = render("![Evil clip](https://example.com/a.mp4)\n\n![Plain http](http://x.public.blob.vercel-storage.com/a.mp4)\n\n![Lookalike](https://public.blob.vercel-storage.com.evil.test/a.mp4)")
    expect(html).not.toContain("<video")
    expect(html).not.toContain("<img")
    expect(html).not.toContain("a.mp4")
    expect(html).toContain("Evil clip")
  })

  test("a non-video file on the blob host stays an image", () => {
    const html = render(`![shot](${BLOB}/a.webp)`)
    expect(html).toContain("<img")
    expect(html).not.toContain("<video")
  })

  test("javascript: and data: media are still stripped", () => {
    const html = render("![a](javascript:alert(1)) ![b](data:video/mp4;base64,AAAA) ![c](data:image/svg+xml,x)")
    expect(html).not.toContain("<video")
    expect(html).not.toContain("<img")
    expect(html.toLowerCase()).not.toContain("javascript:")
    expect(html).not.toContain("data:")
  })

  test("title becomes a figcaption for images and videos", () => {
    const img = render('![alt](https://example.com/a.png "A caption")')
    expect(img).toContain("<figure>")
    expect(img).toContain("<figcaption>A caption</figcaption>")
    expect(img).not.toContain("<p>")
    const video = render(`![alt](${BLOB}/v.mp4 "Moving map poster=${BLOB}/v.webp")`)
    expect(video).toContain("<figure>")
    expect(video).toContain("<figcaption>Moving map</figcaption>")
    expect(video).not.toContain("Moving map poster")
    expect(video).toContain(`poster="${BLOB}/v.webp"`)
  })

  test("plain images stay without a figure", () => {
    const html = render("![alt](https://example.com/a.png)")
    expect(html).not.toContain("<figure")
    expect(html).not.toContain("figcaption")
    expect(html).toContain("<p><img")
  })

  test("poster must be https on the same blob host", () => {
    const other = render(`![a](${BLOB}/v.mp4 "Cap poster=https://example.com/p.webp")`)
    expect(other).toContain("<video")
    expect(other).not.toContain(" poster=")
    expect(other).not.toContain("example.com")
    const js = render(`![a](${BLOB}/v.mp4 "Cap poster=javascript:alert(1)")`)
    expect(js).not.toContain("javascript:")
    const http = render(`![a](${BLOB}/v.mp4 "poster=http://x.public.blob.vercel-storage.com/p.webp")`)
    expect(http).not.toContain(" poster=")
  })

  test("captions do not leak into the meta description", () => {
    expect(markdownToPlainText(`Text\n\n![a](${BLOB}/v.mp4 "Caption")`)).toBe("Text")
  })
})
