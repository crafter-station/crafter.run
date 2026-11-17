import { describe, expect, test } from "bun:test"
import type { ShipDetail, ShipSummary } from "@crafter/contracts"

import { crewMembers } from "./crew"
import { buildActivity, crafterAffiliation, lastActivityAt, relativeTime } from "./ship-activity"
import { buildShipsFeed, escapeXml } from "./ship-feed"
import { teamMembers } from "./team"

const owner = { handle: "ada", displayName: "Ada <Lovelace>", avatarUrl: null }
const summary = (id: string, slug: string, publishedAt: string): ShipSummary => ({
  id, slug, name: `Ship ${slug}`, tagline: "A & B", imageUrl: null, socialPostUrl: null, owner, links: [], voteCount: 0, publishedAt,
})
const detail = (base: ShipSummary, updates: { id: string; title: string; publishedAt: string }[]) =>
  ({
    ...base,
    description: "",
    status: "published",
    source: "web",
    updates: updates.map((update) => ({ ...update, description: "did things", imageUrl: null, socialPostUrl: null })),
    provenance: [],
    createdAt: base.publishedAt,
    updatedAt: base.publishedAt,
  }) as unknown as ShipDetail

const one = summary("11111111-1111-4111-8111-111111111111", "one", "2026-01-01T00:00:00.000Z")
const two = summary("22222222-2222-4222-8222-222222222222", "two", "2026-02-01T00:00:00.000Z")

describe("buildActivity", () => {
  test("merges publications and updates newest first", () => {
    const events = buildActivity(
      [one, two],
      [detail(one, [{ id: "u1", title: "v2", publishedAt: "2026-03-01T00:00:00.000Z" }, { id: "u0", title: "beta", publishedAt: "2026-01-15T00:00:00.000Z" }])],
    )
    expect(events.map((event) => [event.kind, event.title])).toEqual([
      ["update", "v2"],
      ["published", "Ship two"],
      ["update", "beta"],
      ["published", "Ship one"],
    ])
    expect(events[0]?.id).toBe(`${one.id}:u1`)
  })

  test("lastActivityAt falls back to publishedAt for older API responses", () => {
    expect(lastActivityAt(one)).toBe(one.publishedAt)
    expect(lastActivityAt({ ...one, lastActivityAt: "2026-05-01T00:00:00.000Z" })).toBe("2026-05-01T00:00:00.000Z")
  })
})

describe("buildShipsFeed", () => {
  const events = buildActivity([one], [detail(one, [{ id: "u1", title: "v2 <fast>", publishedAt: "2026-03-01T00:00:00.000Z" }])])
  const feed = buildShipsFeed({
    locale: "en", baseUrl: "https://crafter.run", siteName: "Crafter Station", title: "Activity", subtitle: "Sub", events,
    labels: { published: "New ship", update: "Update" },
  })

  test("is an Atom feed with one entry per event, newest first, dated by the newest event", () => {
    expect(feed.startsWith('<?xml version="1.0" encoding="utf-8"?>')).toBe(true)
    expect(feed.match(/<entry>/g)).toHaveLength(2)
    expect(feed).toContain('<updated>2026-03-01T00:00:00.000Z</updated>\n  <link rel="self"')
    expect(feed.indexOf("Update: Ship one")).toBeLessThan(feed.indexOf("New ship: Ship one"))
    expect(feed).toContain('href="https://crafter.run/en/ships/one"')
    expect(feed).toContain("https://crafter.run/en/ships/one#update-u1")
  })

  test("escapes markup in titles and author names", () => {
    expect(feed).toContain("v2 &lt;fast&gt;")
    expect(feed).toContain("Ada &lt;Lovelace&gt;")
    expect(escapeXml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&apos;")
  })

  test("an empty feed is dated at the epoch", () => {
    const empty = buildShipsFeed({ locale: "es", baseUrl: "https://crafter.run", siteName: "x", title: "t", subtitle: "s", events: [], labels: { published: "p", update: "u" } })
    expect(empty).toContain("<updated>1970-01-01T00:00:00Z</updated>")
    expect(empty).not.toContain("<entry>")
  })
})

describe("relativeTime", () => {
  const now = Date.parse("2026-06-10T12:00:00Z")
  test("formats in the reader's locale", () => {
    expect(relativeTime("2026-06-07T12:00:00Z", "en", now)).toBe("3 days ago")
    expect(relativeTime("2026-06-07T12:00:00Z", "es", now)).toBe("hace 3 días")
    expect(relativeTime("2026-06-10T11:59:40Z", "en", now)).toBe("now")
  })
})

describe("crafterAffiliation", () => {
  test("matches active Core by username or GitHub account, and Crew by username", () => {
    const core = teamMembers.find((member) => !member.alumni && member.github)!
    expect(crafterAffiliation({ handle: "someone-else", githubUrl: core.github! })).toBe("core")
    expect(crafterAffiliation({ handle: core.username, githubUrl: null })).toBe("core")
    expect(crafterAffiliation({ handle: crewMembers[0]!.username, githubUrl: null })).toBe("crew")
    expect(crafterAffiliation({ handle: "nobody-here", githubUrl: "https://github.com/nobody-here" })).toBeNull()
  })
})
