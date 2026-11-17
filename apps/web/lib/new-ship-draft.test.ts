import { describe, expect, test } from "bun:test"
import { createShipDraftRequestSchema } from "@crafter/contracts"

import { newShipCopy } from "./new-ship-copy"
import {
  clipText,
  emptyShipFields,
  ImportError,
  importShipFromLink,
  parseRepoUrl,
  readmeSummary,
  shipToRequest,
  slugifyShip,
  validateShip,
} from "./new-ship-draft"
import { applyShipFields } from "./new-ship-webmcp"
import { isPrivateAddress, parsePageMeta } from "./ship-og"
import { locales } from "./i18n"

const valid = { ...emptyShipFields(), name: "Cinema Seats", slug: "cinema-seats", tagline: "Find showtimes with good seats", description: "Find showtimes with good seats without checking every cinema." }

describe("fields", () => {
  test("slugs match the API rule", () => {
    expect(slugifyShip("Cinéma Seats!")).toBe("cinema-seats")
    expect(slugifyShip("  --  ")).toBe("")
  })
  test("a valid draft passes and builds a request the API schema accepts", () => {
    expect(validateShip(valid)).toEqual({})
    const request = shipToRequest({ ...valid, repository: "github.com/a/b", socialPostUrl: "https://x.com/a/status/1" }, ["web form"])
    expect(createShipDraftRequestSchema.safeParse(request).success).toBe(true)
    expect(request.links).toEqual([{ type: "repository", url: "https://github.com/a/b" }])
  })
  test("each problem is reported on its own field", () => {
    const issues = validateShip({ ...emptyShipFields(), tagline: "abc", description: "short", website: "not a url" })
    expect(issues).toEqual({ name: "nameRequired", slug: "slugInvalid", tagline: "taglineShort", description: "descriptionShort", website: "urlInvalid" })
  })
  test("an uploaded cover overrides the typed one", () => {
    expect(shipToRequest({ ...valid, imageUrl: "https://a.dev/x.png" }, [], "https://blob/y.png").imageUrl).toBe("https://blob/y.png")
    expect(shipToRequest({ ...valid, imageUrl: "https://a.dev/x.png" }, []).imageUrl).toBe("https://a.dev/x.png")
  })
})

describe("text helpers", () => {
  test("clipText cuts at a sentence", () => {
    expect(clipText("First sentence is here. Second one is long and gets cut off somewhere.", 30)).toBe("First sentence is here.")
    expect(clipText("a".repeat(300), 180).length).toBeLessThanOrEqual(180)
  })
  test("readmeSummary skips headings, badges and code", () => {
    const md = "# Title\n\n[![ci](x)](y)\n\n```sh\nbun i\n```\n\nThis tool turns release notes into updates for your community.\n\n## Install\n"
    expect(readmeSummary(md)).toBe("This tool turns release notes into updates for your community.")
  })
  test("parseRepoUrl only accepts GitHub repositories", () => {
    expect(parseRepoUrl("github.com/vercel/next.js")).toEqual({ owner: "vercel", repo: "next.js" })
    expect(parseRepoUrl("https://github.com/vercel/next.js.git")).toEqual({ owner: "vercel", repo: "next.js" })
    expect(parseRepoUrl("https://github.com/vercel")).toBeNull()
    expect(parseRepoUrl("https://example.com/a/b")).toBeNull()
  })
})

describe("import", () => {
  const github = (repo: object, readme = "", status = 200): typeof fetch =>
    (async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.endsWith("/readme")) return new Response(readme, { status: readme ? 200 : 404 })
      return new Response(JSON.stringify(repo), { status })
    }) as typeof fetch

  test("a GitHub repository fills name, links and topic", async () => {
    const result = await importShipFromLink("github.com/acme/seats", {
      fetchImpl: github({ name: "seats", description: "Find seats", homepage: "https://seats.dev", html_url: "https://github.com/acme/seats", topics: ["crafter-ship"] }, "# seats\n\nA long README paragraph explaining what the project does for people."),
      pageMeta: async () => ({ title: null, description: null, image: "https://seats.dev/og.png", siteName: null }),
    })
    expect(result.source).toBe("github")
    expect(result.hasTopic).toBe(true)
    expect(result.fields).toMatchObject({ name: "seats", slug: "seats", tagline: "Find seats", website: "https://seats.dev", repository: "https://github.com/acme/seats", imageUrl: "https://seats.dev/og.png" })
    expect(result.fields.description).toContain("README paragraph")
  })
  test("a missing repository and rate limits are named", async () => {
    await expect(importShipFromLink("github.com/a/b", { fetchImpl: github({}, "", 404), pageMeta: async () => null })).rejects.toMatchObject({ key: "repoNotFound" })
    await expect(importShipFromLink("github.com/a/b", { fetchImpl: github({}, "", 403), pageMeta: async () => null })).rejects.toMatchObject({ key: "rateLimited" })
  })
  test("a website uses its page metadata, and falls back to the host", async () => {
    const full = await importShipFromLink("https://www.seats.dev/", { pageMeta: async () => ({ title: "Seats | Home", description: "Seats for everyone.", image: null, siteName: null }) })
    expect(full.fields).toMatchObject({ name: "Seats", slug: "seats", website: "https://www.seats.dev", tagline: "Seats for everyone." })
    const bare = await importShipFromLink("seats.dev", { pageMeta: async () => null })
    expect(bare.fields).toMatchObject({ name: "Seats", website: "https://seats.dev" })
    expect(bare.complete).toBe(false)
  })
  test("garbage is rejected", async () => {
    await expect(importShipFromLink("not a link", { pageMeta: async () => null })).rejects.toBeInstanceOf(ImportError)
  })
})

describe("page metadata", () => {
  test("reads Open Graph tags and drops cover URLs with a query", () => {
    const html = `<head><title>Fallback</title><meta property="og:title" content="Seats &amp; Co"><meta name="description" content="Good seats"><meta property="og:image" content="/og.png"></head>`
    expect(parsePageMeta(html, "https://seats.dev/a")).toEqual({ title: "Seats & Co", description: "Good seats", image: "https://seats.dev/og.png", siteName: null })
    expect(parsePageMeta(`<meta property="og:image" content="https://x.dev/o.png?v=1">`, "https://x.dev").image).toBeNull()
  })
  test("private addresses are refused", () => {
    for (const address of ["127.0.0.1", "10.1.2.3", "192.168.0.5", "172.20.0.1", "169.254.169.254", "100.64.0.1", "::1", "fd00::1", "fe80::1", "::ffff:127.0.0.1", "0.0.0.0"]) {
      expect(isPrivateAddress(address)).toBe(true)
    }
    for (const address of ["8.8.8.8", "76.76.21.21", "2606:4700::1111"]) expect(isPrivateAddress(address)).toBe(false)
  })
})

describe("agent tool", () => {
  test("fills validated fields and leaves invalid ones unchanged", () => {
    const result = applyShipFields(emptyShipFields(), { name: "Cinema Seats", tagline: "hi", website: "nope", extra: "ignored" })
    expect(result.applied).toEqual(["name", "slug"])
    expect(result.fields.slug).toBe("cinema-seats")
    expect(result.rejected.map((item) => item.field).sort()).toEqual(["tagline", "website"])
    expect(result.fields.tagline).toBe("")
  })
  test("does not overwrite a slug the member chose", () => {
    const result = applyShipFields({ ...valid, slug: "mine" }, { name: "Other name" })
    expect(result.fields.slug).toBe("mine")
  })
})

describe("copy", () => {
  const keys = (value: unknown, prefix = ""): string[] =>
    value && typeof value === "object" && !Array.isArray(value)
      ? Object.entries(value).flatMap(([key, child]) => keys(child, `${prefix}${key}.`))
      : [prefix]
  test("every locale has the same keys and no empty or dashed text", () => {
    const reference = keys(newShipCopy.en).sort()
    for (const locale of locales) {
      expect(keys(newShipCopy[locale]).sort()).toEqual(reference)
      const text = JSON.stringify(newShipCopy[locale])
      expect(text).not.toContain("—")
      expect(text).not.toContain('""')
    }
  })
  test("the Spanish copy does not use voseo", () => {
    expect(JSON.stringify(newShipCopy.es)).not.toMatch(/\b(pegá|completá|revisá|publicá|tenés|querés|podés|mirá)\b/i)
  })
})
