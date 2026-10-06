import { describe, expect, test } from "bun:test"
import { OG_VERSION, socialImageUrl, socialText } from "./og"
import { resolveSocialCard } from "./og-data"
import { buildMetadata, indexablePaths } from "./seo"
import { locales } from "./i18n"
import { hotReloadEditions, type HotReloadEdition } from "./hot-reload"
import { hotReloadMetadata } from "./hot-reload-seo"

describe("social previews", () => {
  test("DevDay entry cards use public event metadata, never query-supplied personal data", async () => {
    for (const locale of locales) for (const suffix of ["", "/access"]) {
      const card = await resolveSocialCard(new URLSearchParams({
        lang: locale, path: `/events/devday-lima${suffix}`, title: "Private attendee",
        description: "Private document", image: "https://example.invalid/personal.jpg",
      }))
      expect(card.title).toBe("DevDay Exchange Community: Lima")
      expect(card.poster).toBe("/events/devday-lima/cover.jpg")
      expect(card.description).not.toContain("Private")
      expect(card.detail).toContain("UNMSM")
    }
    expect(indexablePaths).toContain("/events/devday-lima")
    expect(indexablePaths).not.toContain("/events/devday-lima/access")
  })
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

  test("Hot Reload index, editions and menus have their own localized OG and Twitter metadata", async () => {
    for (const locale of locales) {
      const pages = [
        hotReloadMetadata(locale),
        ...hotReloadEditions.flatMap(edition => [
          hotReloadMetadata(locale, edition),
          ...(edition.menu && edition.lumaEventId ? [hotReloadMetadata(locale, edition, true)] : []),
        ]),
      ]
      const paths = new Set<string>()
      for (const metadata of pages) {
        const images = metadata.openGraph!.images as Array<{ url: string }>
        expect(images[0].url).toBe((metadata.twitter!.images as string[])[0])
        const url = new URL(images[0].url, "https://crafter.run")
        const path = url.searchParams.get("path")!
        paths.add(path)
        expect(metadata.alternates!.canonical).toBe(`https://crafter.run/${locale}${path}`)
        const data = await resolveSocialCard(url.searchParams)
        expect(data.kind).toBe("hot-reload")
        expect(data.art).toBe("hot-reload")
        expect(data.path).toBe(path)
        expect(data.unavailable).toBeUndefined()
        if (path.endsWith("/menu")) expect(metadata.robots).toEqual({ index: false })
      }
      expect(paths.size).toBe(pages.length)
    }
  })

  test("Hot Reload previews read future editions from the public catalog without per-edition OG code", async () => {
    const future: HotReloadEdition = {
      number: 42, venue: "Future venue", city: "Another city", partner: "Community",
      startsAt: "2030-10-17T15:00:00Z", endsAt: "2030-10-17T17:00:00Z", timeZone: "America/Lima",
      poster: "/events/hot-reload/future.avif", menu: "don-salazar", lumaEventId: "future-fixture",
    }
    hotReloadEditions.push(future)
    try {
      const metadata = hotReloadMetadata("es", future)
      const images = metadata.openGraph!.images as Array<{ url: string }>
      const params = new URL(images[0].url, "https://crafter.run").searchParams
      params.set("title", "Old name")
      params.set("description", "Old venue")
      const data = await resolveSocialCard(params)
      expect(data.title).toBe("Hot Reload #42")
      expect(data.description).toContain(future.venue)
      expect(data.detail).toContain("2030")
      expect(data.detail).toContain("10:00")
      expect(data.detail).toContain("Another city")
      expect(data.poster).toBe(future.poster)
      expect(data.eyebrow).toBe("Crafter Station × Community")

      future.socialPoster = "/events/hot-reload/future-social.png"
      const menu = await resolveSocialCard(new URLSearchParams({ path: "/events/hot-reload/42/menu", lang: "es" }))
      expect(menu.title).toBe("Elige tu pedido")
      expect(menu.eyebrow).toBe("Hot Reload #42")
      expect(menu.description).toContain(future.venue)
      expect(menu.poster).toBe(future.socialPoster)

      delete future.startsAt
      delete future.endsAt
      delete future.poster
      delete future.socialPoster
      delete future.partner
      const pending = await resolveSocialCard(params)
      expect(pending.detail).toBe("Fecha por anunciar · Another city")
      expect(pending.poster).toBeUndefined()
      expect(pending.art).toBe("hot-reload")
      expect(pending.eyebrow).not.toContain("Vercel")

      delete future.lumaEventId
      const unavailableMenu = await resolveSocialCard(new URLSearchParams({ path: "/events/hot-reload/42/menu", lang: "es" }))
      expect(unavailableMenu.unavailable).toBe(true)
      future.lumaEventId = "future-fixture"
      delete future.menu
      const disabledMenu = await resolveSocialCard(new URLSearchParams({ path: "/events/hot-reload/42/menu", lang: "es" }))
      expect(disabledMenu.unavailable).toBe(true)
    } finally {
      hotReloadEditions.splice(hotReloadEditions.indexOf(future), 1)
    }
  })

  test("nonexistent Hot Reload routes cannot claim a real edition or accept an arbitrary poster", async () => {
    for (const path of ["/events/hot-reload/9999", "/events/hot-reload/1/private", "/events/hot-reload/1/menu/extra"]) {
      const data = await resolveSocialCard(new URLSearchParams({ path, title: "Invented event", image: "https://example.com/event.png" }))
      expect(data.title).toBe("Hot Reload")
      expect(data.poster).toBeUndefined()
      expect(data.unavailable).toBe(true)
    }
  })
})
