import { describe, expect, test } from "bun:test"

import { communityLocales, languageAlternates } from "@/lib/seo"
import { shipMetaDescription } from "@/lib/ship-markdown"
import { crafterSchema, eventSchema, shipSchema } from "@/lib/structured-data"

const ship = {
  name: "Demo",
  description: "d",
  slug: "demo",
  imageUrl: "https://crafter.run/x.png",
  owner: { handle: "ana", displayName: "Ana" },
  links: [{ type: "website", url: "https://demo.dev" }],
  socialPostUrl: null,
  publishedAt: "2026-01-01T00:00:00Z",
  modifiedAt: "2026-01-02T00:00:00Z",
}

describe("shipMetaDescription", () => {
  test("a long tagline stands alone", () => {
    const tagline = "A tiny tool that turns your terminal history into a searchable, shareable timeline."
    expect(shipMetaDescription(tagline, "Una descripción en español.")).toBe(tagline.replace(/\.$/, ""))
  })
  test("a short tagline gets the body, capped at 160", () => {
    const out = shipMetaDescription("Short one", "word ".repeat(80))
    expect(out.startsWith("Short one. word")).toBe(true)
    expect(out.length).toBeLessThanOrEqual(160)
  })
})

describe("shipSchema", () => {
  test("no repository: CreativeWork", () => {
    expect(shipSchema(ship, "en")["@type"]).toBe("CreativeWork")
  })
  test("repository: SoftwareSourceCode with codeRepository", () => {
    const out = shipSchema({ ...ship, links: [{ type: "repository", url: "https://github.com/a/b" }] }, "en")
    expect(out["@type"]).toBe("SoftwareSourceCode")
    expect(out.codeRepository).toBe("https://github.com/a/b")
  })
})

describe("eventSchema", () => {
  test("omits fields the data lacks", () => {
    const out = eventSchema({ name: "E", url: "https://crafter.run/en/events/e" })
    expect("startDate" in out).toBe(false)
    expect("location" in out).toBe(false)
    expect(out.offers.price).toBe("0")
  })
})

describe("crafterSchema", () => {
  test("ProfilePage with Person and deduplicated sameAs", () => {
    const out = crafterSchema({ handle: "ana", displayName: "Ana", bio: null, currentRole: null, avatarUrl: null, createdAt: "2026-01-01T00:00:00Z", links: ["https://github.com/ana", null, "https://github.com/ana"] }, "en")
    expect(out["@type"]).toBe("ProfilePage")
    expect(out.mainEntity.sameAs).toEqual(["https://github.com/ana"])
  })
})

describe("community alternates", () => {
  test("en, es and x-default only", () => {
    expect(Object.keys(languageAlternates("/ships/demo", communityLocales)).sort()).toEqual(["en", "es", "x-default"])
  })
})
