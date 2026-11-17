import { describe, expect, test } from "bun:test"
import { hack0DateParts, hack0EventSlug, parseHack0Calendar, partitionHack0Events, teaserHack0Event } from "./hack0-calendar-data"

const event = (fields = "") => `BEGIN:VEVENT
UID:evt-test@events.lu.ma
DTSTART:20261002T230000Z
DTEND:20261003T010000Z
SUMMARY:Code\\, coffee\\; together
DESCRIPTION:Get up-to-date information at: https://luma.com/example\\n\\nHosted by Crafter
LOCATION:https://luma.com/event/evt-test
${fields}
END:VEVENT`
const feed = (...events: string[]) => `BEGIN:VCALENDAR\n${events.join("\n")}\nEND:VCALENDAR`

describe("hack0 public calendar", () => {
  test("unfolds content, keeps Unicode, and does not turn unpublished locations into online events", () => {
    const [entry] = parseHack0Calendar(feed(event().replace("Code\\, coffee\\; together", "Código\\, café\\;\n juntos ☕")))
    expect(entry.title).toBe("Código, café;juntos ☕")
    expect(entry.location).toBe("")
    expect(entry.host).toBe("Crafter")
    expect(entry.url).toBe("https://luma.com/example")
  })
  test("uses exclusive DATE ends without shifting calendar dates to the previous day", () => {
    const [entry] = parseHack0Calendar(feed(event().replace("DTSTART:20261002T230000Z", "DTSTART;VALUE=DATE:20261002").replace("DTEND:20261003T010000Z", "DTEND;VALUE=DATE:20261004")))
    const parts = hack0DateParts(entry, "en", "America/Los_Angeles")
    expect(parts.day).toBe("2")
    expect(parts.full).toBe("Oct 2 – 3, 2026")
    expect(parts.time).toBeNull()
    expect(hack0DateParts(parseHack0Calendar(feed(event()))[0], "en").time).toBe("6:00 PM")
  })
  test("retains in-progress events until their end, then sorts the archive newest first", () => {
    const entries = parseHack0Calendar(feed(event()))
    expect(partitionHack0Events(entries, Date.parse("2026-10-03T00:00:00Z")).upcoming).toHaveLength(1)
    expect(partitionHack0Events(entries, Date.parse("2026-10-03T01:00:00Z")).past).toHaveLength(1)
  })
  test("deduplicates by UID and respects newer cancellations", () => {
    expect(parseHack0Calendar(feed(event("SEQUENCE:1"), event("SEQUENCE:2\nSTATUS:CANCELLED"), event("SEQUENCE:0")))).toHaveLength(0)
  })
  test("skips invalid dates, unsupported floating times and non-Luma event links", () => {
    expect(parseHack0Calendar(feed(event("URL:javascript:alert(1)")))).toHaveLength(0)
    expect(parseHack0Calendar(feed(event().replace("20261002T230000Z", "20260231T230000Z")))).toHaveLength(0)
    expect(parseHack0Calendar(feed(event().replace("DTSTART:20261002T230000Z", "DTSTART;TZID=America/Lima:20261002T230000")))).toHaveLength(0)
  })
  test("ignores alarm descriptions and rejects an upstream error page", () => {
    expect(parseHack0Calendar(feed(event("BEGIN:VALARM\nDESCRIPTION:Reminder\nEND:VALARM")))[0].host).toBe("Crafter")
    expect(() => parseHack0Calendar("<html>Unavailable</html>")).toThrow()
  })
})

describe("hack0EventSlug", () => {
  test("matches hack0's public event slug", () => {
    expect(hack0EventSlug("Notion Students Summit", "https://luma.com/p3rwlp1b")).toBe("notion-students-summit-p3rwlp1b")
    expect(hack0EventSlug("Cómo construí un agente", "https://lu.ma/gyp5nbma/")).toBe("como-construi-un-agente-gyp5nbma")
  })
  test("has no slug when the URL is the calendar itself", () => {
    expect(hack0EventSlug("Microsoft Build 2026", "https://luma.com/hack0")).toBeNull()
  })
})

describe("teaserHack0Event", () => {
  const event = (id: string, url: string, startAt: string) => ({
    id, title: id, startAt, endAt: startAt.replace("T00", "T02"), allDay: false, location: "", host: "", url, href: url,
  })
  const featured = { url: "https://luma.com/feat", title: "Featured", href: "https://hack0.dev/featured" }
  const next = event("next", "https://luma.com/next", "2026-11-18T00:00:00.000Z")
  const promoted = event("promoted", "https://luma.com/feat", "2026-11-20T00:00:00.000Z")

  test("promotes the featured event over an earlier one, with its own title and page", () => {
    expect(teaserHack0Event([next, promoted], featured)).toMatchObject({ id: "promoted", title: "Featured", href: "https://hack0.dev/featured" })
  })

  test("falls back to the next event once the featured one is no longer upcoming", () => {
    expect(teaserHack0Event([next], featured)?.id).toBe("next")
    expect(teaserHack0Event([], featured)).toBeUndefined()
  })
})
