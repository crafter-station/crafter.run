import { describe, expect, test } from "bun:test"

import { nextOffset, pageWindow, summarizeActivity } from "../src/activity"

const ship = (id: string, publishedAt: string) => ({ id, publishedAt })

describe("ship activity", () => {
  test("a ship without updates is active at its publication time", () => {
    const result = summarizeActivity([ship("a", "2026-01-01T00:00:00.000Z")], [])
    expect(result.get("a")).toEqual({
      lastActivityAt: "2026-01-01T00:00:00.000Z",
      latestUpdate: null,
      updateCount: 0,
    })
  })

  test("the newest update moves last activity forward and reports its title and count", () => {
    const result = summarizeActivity(
      [ship("a", "2026-01-01T00:00:00.000Z")],
      [
        { shipId: "a", title: "first", publishedAt: new Date("2026-02-01T00:00:00.000Z") },
        { shipId: "a", title: "second", publishedAt: "2026-03-01T00:00:00.000Z" },
        { shipId: "other", title: "ignored", publishedAt: "2026-09-01T00:00:00.000Z" },
      ],
    )
    expect(result.get("a")).toEqual({
      lastActivityAt: "2026-03-01T00:00:00.000Z",
      latestUpdate: { title: "second", publishedAt: "2026-03-01T00:00:00.000Z" },
      updateCount: 2,
    })
  })

  test("an update older than publication never lowers last activity", () => {
    const result = summarizeActivity(
      [ship("a", "2026-05-01T00:00:00.000Z")],
      [{ shipId: "a", title: "backfill", publishedAt: "2026-04-01T00:00:00.000Z" }],
    )
    expect(result.get("a")?.lastActivityAt).toBe("2026-05-01T00:00:00.000Z")
  })
})

describe("ship paging", () => {
  test("clamps limit and offset", () => {
    expect(pageWindow({})).toEqual({ limit: 100, offset: 0 })
    expect(pageWindow({ limit: 5000, offset: -3 })).toEqual({ limit: 100, offset: 0 })
    expect(pageWindow({ limit: 0, offset: 20 })).toEqual({ limit: 1, offset: 20 })
  })

  test("nextOffset is null on the last page", () => {
    expect(nextOffset(0, 24, 50)).toBe(24)
    expect(nextOffset(48, 24, 50)).toBeNull()
    expect(nextOffset(0, 24, 24)).toBeNull()
  })
})
