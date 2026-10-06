import { describe, expect, test } from "bun:test"
import { OG_VERSION, socialImageUrl, socialText } from "./og"
import { resolveSocialCard } from "./og-data"
import { buildMetadata, indexablePaths } from "./seo"
import { locales } from "./i18n"

describe("social previews", () => {
  test("every indexable page advertises the same localized image on OG and Twitter", () => {
    for (const locale of locales) for (const path of indexablePaths) {
      const metadata = buildMetadata({ locale, path, title: "Ideas & código / 你好", description: "Una comunidad que construye." })
      const og = metadata.openGraph!.images as Array<{ url: string; width: number; height: number }>
      const twitter = metadata.twitter!.images as string[]
      expect(og[0].url).toBe(twitter[0])
      const url = new URL(og[0].url, "https://crafter.run")
      expect(url.pathname).toBe("/og")
      expect(url.searchParams.get("lang")).toBe(locale)
      expect(url.searchParams.get("path")).toBe(path)
      expect(url.searchParams.get("v")).toBe(OG_VERSION)
      expect([og[0].width, og[0].height]).toEqual([1200, 630])
    }
  })

  test("query values cannot become additional image parameters", () => {
    const url = new URL(socialImageUrl("Hello & path=/team/liz ?lang=ja", "es", { path: "/docs/cli" }), "https://crafter.run")
    expect(url.searchParams.get("path")).toBe("/docs/cli")
    expect(url.searchParams.get("lang")).toBe("es")
    expect(url.searchParams.getAll("title")).toEqual(["Hello & path=/team/liz ?lang=ja"])
  })

  test("normalizes control characters and truncates without splitting Unicode code points", () => {
    expect(socialText("  hello\u0000\nworld\t  ", 40)).toBe("hello world")
    expect(socialText("🚀你好abc", 4)).toBe("🚀你好…")
  })

  test("team cards keep the approved portraits even when query copy is stale", async () => {
    const liz = await resolveSocialCard(new URLSearchParams({ path: "/team/liz", lang: "es", title: "Old portrait" }))
    const cris = await resolveSocialCard(new URLSearchParams({ path: "/team/cris", lang: "en" }))
    expect(liz.title).toBe("Liz Riveros")
    expect(liz.portrait).toBe("/team/station-ink/liz-cutout-v3.webp")
    expect(cris.portrait).toBe("/team/station-ink/cris-cutout-v5.webp")
  })

  test("alumni and hidden members cannot be presented as current team profiles", async () => {
    for (const member of ["shiara", "gabriel", "unknown"]) {
      const data = await resolveSocialCard(new URLSearchParams({ path: `/team/${member}`, lang: "es" }))
      expect(data.portrait).toBeUndefined()
      expect(data.unavailable).toBe(true)
    }
  })

  test("bounty cards use canonical translated content and the preserved campaign asset", async () => {
    const data = await resolveSocialCard(new URLSearchParams({ path: "/bounties/1", lang: "es", title: "Fake reward", image: "https://example.com/fake.png" }))
    expect(data.title).toContain("5 entradas gratis")
    expect(data.eyebrow).toBe("Bounty #01")
    expect(data.poster).toBe("/bounties/bounty-1-frontier-og-v1.jpg")
    expect(data.status).toBeDefined()
    expect(data.maxAge).toBeLessThanOrEqual(3600)
  })

  test("old title-only and profile URLs still resolve instead of becoming home cards", async () => {
    const legacy = await resolveSocialCard(new URLSearchParams({ title: "Existing article", eyebrow: "Crafter Station · Blog" }))
    expect(legacy.title).toBe("Existing article")
    expect(legacy.kind).toBe("journal")
  })

  test("unknown locales and invalid paths have a renderable home fallback", async () => {
    const data = await resolveSocialCard(new URLSearchParams({ lang: "not-a-locale", path: "//other.example" }))
    expect(data.locale).toBe("en")
    expect(data.title).toBe("Craft. Ship. Repeat.")
    expect(data.kind).toBe("home")
  })
})
