import fs from "node:fs"
import path from "node:path"

import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { blogCopy } from "@/components/blog/copy"
import { byline, dateLabel, entryAuthors, readingMinutes } from "@/components/blog/format"
import { getPost, getSlugs, postLocales } from "@/lib/blog"
import { isLocale, type Locale } from "@/lib/i18n"
import { isCjk, loadGoogleFont, titleFontFamily } from "@/lib/og-fonts"
import { siteConfig } from "@/lib/site"

/**
 * Per-post social card, generated.
 *
 * The site-wide `/og` route draws a title and an eyebrow, which is right for a
 * page but says nothing about a post. A card for an article has to answer, at a
 * glance in someone else's timeline, three things the title alone does not:
 * what kind of post it is, who wrote it, and how long it takes to read.
 *
 * Deriving it from the frontmatter means it can never disagree with the post,
 * and a post with no card is impossible. A post that deserves bespoke art sets
 * `image` in its frontmatter, and the page's metadata overrides this; that keeps
 * this the default rather than the only option.
 *
 * The composition is the site's own: a hairline box inset on near-black, the
 * mono uppercase tracking the pages use for every piece of metadata, and the
 * cream accent spent only on the label and the tick.
 */

export const dynamic = "force-static"
export const dynamicParams = false

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${siteConfig.name} blog`

const BACKGROUND = "#0d0d0d"
const FOREGROUND = "#f5f5f5"
const MUTED = "#a3a3a3"
const LINE = "#262626"
const ACCENT = "#f1ede4"

/** Faces drawn before the group collapses into a count, as on the site. */
const SHOWN = 3
const AVATAR = 56

export function generateStaticParams() {
  return getSlugs().flatMap((slug) => postLocales(slug).map((lang) => ({ lang, slug })))
}

/**
 * A team portrait as a data URI.
 *
 * Read from disk rather than fetched: these render during the build, when
 * there is no server to fetch from, and a card that silently loses its faces
 * is the kind of failure nobody notices until it is already in someone's
 * timeline.
 */
function portrait(image: string): string | null {
  try {
    const file = path.join(process.cwd(), "public", image.replace(/^\//, ""))
    const ext = path.extname(file).slice(1).toLowerCase()
    const mime = ext === "jpg" ? "jpeg" : ext
    return `data:image/${mime};base64,${fs.readFileSync(file).toString("base64")}`
  } catch {
    return null
  }
}

/**
 * Step the headline down so it holds three lines at most.
 *
 * Thresholds sit below the theoretical capacity at each size because wrapping
 * is greedy: a title that fits on paper still breaks early when the next word
 * is too long for what is left of the row.
 */
function titleSize(title: string, lang: Locale) {
  const n = title.length
  if (isCjk(lang)) return n > 34 ? 52 : n > 20 ? 62 : 72
  return n > 68 ? 52 : n > 46 ? 60 : n > 28 ? 70 : 80
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const post = getPost(slug, lang)
  if (!post) notFound()

  const t = blogCopy[lang]
  const authors = entryAuthors(post)
  const drawn = authors.slice(0, SHOWN)
  const overflow = authors.length > SHOWN ? authors.length - (SHOWN - 1) : 0

  const label = `${siteConfig.name} · ${t.breadcrumbBlog}`.toUpperCase()
  const kind = t.kinds[post.kind].toUpperCase()
  const meta = `${dateLabel(post.date, lang)}  ·  ${t.readingTime(readingMinutes(post.body, lang))}`
  const authorLine = byline(post.authors, lang)

  const titleFont = titleFontFamily(lang)
  // Every glyph the mono face has to draw, so the subset is exact.
  const monoText = `${label}${kind}${meta}${authorLine}${siteConfig.domain}+${overflow}`

  const fonts: {
    name: string
    data: ArrayBuffer
    weight: 400 | 500 | 600 | 700
    style: "normal"
  }[] = []
  try {
    const [titleData, monoData] = await Promise.all([
      loadGoogleFont(titleFont.family, titleFont.weight, post.title),
      loadGoogleFont("JetBrains Mono", 500, monoText),
    ])
    fonts.push(
      { name: "title", data: titleData, weight: titleFont.weight, style: "normal" },
      { name: "mono", data: monoData, weight: 500, style: "normal" },
    )
  } catch {
    // Fall back to the bundled default face (Latin coverage only). A card in
    // the wrong font still beats a build that fails on a font CDN hiccup.
  }

  const hasFonts = fonts.length > 0
  const titleFamily = hasFonts ? "title" : undefined
  const monoFamily = hasFonts ? "mono" : undefined

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: BACKGROUND,
          color: FOREGROUND,
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: `1px solid ${LINE}`,
          }}
        >
          {/* Header: where this came from, and what kind of post it is. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "26px 44px",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: monoFamily,
                fontSize: 21,
                letterSpacing: 6,
                color: ACCENT,
              }}
            >
              {label}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: monoFamily,
                fontSize: 18,
                letterSpacing: 3,
                color: MUTED,
                border: `1px solid ${LINE}`,
                padding: "9px 16px",
              }}
            >
              {kind}
            </div>
          </div>

          {/* The headline fills the frame between the two rules. Centred
              rather than anchored low: a one-line title pinned to the bottom
              leaves a void that reads as a rendering mistake. */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 44px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: titleFamily,
                fontSize: titleSize(post.title, lang),
                fontWeight: titleFont.weight,
                letterSpacing: isCjk(lang) ? 0 : -2.5,
                lineHeight: 1.1,
                maxWidth: 1000,
                textWrap: "balance",
              }}
            >
              {post.title}
            </div>
          </div>

          {/* Footer: who wrote it, and what it costs to read. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 44px",
              borderTop: `1px solid ${LINE}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {drawn.map((author, i) => {
                  const src = portrait(author.avatar)
                  return (
                    <div
                      key={author.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: AVATAR,
                        height: AVATAR,
                        marginLeft: i > 0 ? -14 : 0,
                        borderRadius: 999,
                        // Reads as the gap between circles rather than a border,
                        // the same trick the byline uses on the page.
                        border: `3px solid ${BACKGROUND}`,
                        backgroundColor: LINE,
                        overflow: "hidden",
                        fontFamily: monoFamily,
                        fontSize: 20,
                        color: MUTED,
                      }}
                    >
                      {overflow > 0 && i === drawn.length - 1 ? (
                        `+${overflow}`
                      ) : src ? (
                        <img
                          src={src}
                          alt=""
                          width={AVATAR}
                          height={AVATAR}
                          // Rounded here as well as on the frame: satori
                          // resolves a child's own radius, but does not clip
                          // it against the parent's.
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 999,
                          }}
                        />
                      ) : (
                        author.initials
                      )}
                    </div>
                  )
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: monoFamily,
                  fontSize: 22,
                  letterSpacing: 1,
                  color: FOREGROUND,
                }}
              >
                {authorLine}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: monoFamily,
                fontSize: 19,
                letterSpacing: 2,
                color: MUTED,
              }}
            >
              {meta}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: hasFonts ? fonts : undefined },
  )
}
