import { describe, expect, test } from "bun:test"

import {
  assertConsistent,
  entryLocales,
  filterByArea,
  getIndexEntries,
  getNeighbors,
  getSlugs,
  parseArea,
  parseEntry,
  sortEntries,
} from "./changelog"

const valid = (extra = "") => `---
title: A title
summary: A summary.
date: 2026-11-15
area: station
kind: ship
crafters:
  - railly
evidence:
  - https://github.com/crafter-station/pulse/pull/5
${extra}---

Body.
`

const FILE = "2026-11-15-example.en.mdx"

describe("changelog entry validation", () => {
  test("accepts a well-formed entry and keeps the body without frontmatter", () => {
    const entry = parseEntry(FILE, valid())
    expect(entry).toMatchObject({ slug: "example", locale: "en", date: "2026-11-15", crafters: ["railly"], body: "Body." })
  })

  test("fails on an unknown crafter username", () => {
    expect(() => parseEntry(FILE, valid().replace("- railly", "- nobody"))).toThrow(/unknown crafter "nobody"/)
  })

  test("fails on an alumni username", () => {
    expect(() => parseEntry(FILE, valid().replace("- railly", "- shiara"))).toThrow(/alumni/)
  })

  test("allows an entry with no crafters", () => {
    expect(parseEntry(FILE, valid().replace("crafters:\n  - railly", "crafters: []")).crafters).toEqual([])
  })

  test("rejects a locale the changelog does not publish", () => {
    expect(() => parseEntry("2026-11-15-example.pt.mdx", valid())).toThrow(/only in en, es/)
  })

  test("rejects a filename date that disagrees with the frontmatter", () => {
    expect(() => parseEntry("2026-11-14-example.en.mdx", valid())).toThrow(/does not match the filename date/)
  })

  test("rejects an unknown area, a non-https source and a malformed repo", () => {
    expect(() => parseEntry(FILE, valid().replace("area: station", "area: moon"))).toThrow(/area/)
    expect(() => parseEntry(FILE, valid().replace("https://github", "http://github"))).toThrow(/https/)
    expect(() => parseEntry(FILE, valid("repos:\n  - not-a-repo\n"))).toThrow(/repos/)
  })

  test("rejects a cover that does not exist", () => {
    const withCover = valid("image: /changelog/example/cover.webp\n")
    expect(() => parseEntry(FILE, withCover, () => false)).toThrow(/does not exist/)
    expect(parseEntry(FILE, withCover, () => true).image).toBe("/changelog/example/cover.webp")
  })

  test("rejects body media that does not exist", () => {
    const withClip = `${valid()}\n<Clip src="/changelog/example/demo.mp4" poster="/changelog/example/demo.webp" size="1280x800" alt="Demo" />\n`
    expect(() => parseEntry(FILE, withClip, () => false)).toThrow(/demo\.mp4/)
    expect(() => parseEntry(FILE, withClip, (asset) => asset !== "/changelog/example/demo.webp")).toThrow(/demo\.webp/)
    expect(() => parseEntry(FILE, withClip, () => true)).not.toThrow()
  })

  test("refuses slugs that collide with a changelog route", () => {
    expect(() => parseEntry("2026-11-15-rss.en.mdx", valid())).toThrow(/reserved/)
  })

  test("a slug cannot change date between locales", () => {
    const en = parseEntry("2026-11-15-example.en.mdx", valid())
    const es = parseEntry("2026-11-14-example.es.mdx", valid().replace("2026-11-15", "2026-11-14"))
    expect(() => assertConsistent([en, es])).toThrow(/has date/)
  })
})

describe("changelog ordering and filters", () => {
  test("sorts newest first, then order, then slug", () => {
    const rows = [
      { date: "2026-10-06", slug: "a" },
      { date: "2026-11-15", slug: "z" },
      { date: "2026-11-15", slug: "b", order: 5 },
      { date: "2026-11-15", slug: "a" },
    ]
    expect(sortEntries(rows).map((row) => row.slug)).toEqual(["b", "a", "z", "a"])
  })

  test("parses the area query and ignores garbage", () => {
    expect(parseArea("lab")).toBe("lab")
    expect(parseArea(["games", "lab"])).toBe("games")
    expect(parseArea("nope")).toBeUndefined()
    expect(parseArea(undefined)).toBeUndefined()
    expect(filterByArea([{ area: "lab" as const }, { area: "games" as const }], "lab")).toHaveLength(1)
  })
})

describe("seed entries", () => {
  test("load in both languages, newest first, and every locale index lists them all", () => {
    expect(getSlugs()).toEqual(["pulse-2", "crafter-sans-specimen", "crafter-run-redesign"])
    expect(entryLocales("pulse-2")).toEqual(["en", "es"])
    expect(getIndexEntries("es").map((entry) => entry.locale)).toEqual(["es", "es", "es"])
    // pt, zh and ja have no files: they list the English entries.
    for (const locale of ["pt", "zh", "ja"] as const) {
      expect(getIndexEntries(locale).map((entry) => entry.locale)).toEqual(["en", "en", "en"])
    }
  })

  test("neighbours follow the timeline", () => {
    expect(getNeighbors("crafter-sans-specimen", "en")).toMatchObject({
      newer: { slug: "pulse-2" },
      older: { slug: "crafter-run-redesign" },
    })
    expect(getNeighbors("pulse-2", "en").newer).toBeUndefined()
  })
})
