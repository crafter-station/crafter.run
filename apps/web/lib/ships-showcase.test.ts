import { describe, expect, test } from "bun:test"
import type { ShipSummary } from "@crafter/contracts"

import {
  buildMakers,
  fallbackCover,
  hasLiveLink,
  isDefaultView,
  parseShipsView,
  pickFeatured,
  shipsQuery,
  sortShips,
} from "./ships-showcase"

const ship = (id: string, handle: string, votes: number, at: string, links: ShipSummary["links"] = []): ShipSummary => ({
  id, slug: id, name: id, tagline: "t", imageUrl: null, socialPostUrl: null,
  owner: { handle, displayName: handle, avatarUrl: null },
  links, voteCount: votes, publishedAt: at, lastActivityAt: at,
})

const a = ship("a", "ada", 0, "2026-01-01T00:00:00.000Z")
const b = ship("b", "ada", 2, "2026-02-01T00:00:00.000Z", [{ type: "website", url: "https://x.dev", verifiedAt: null }])
const c = ship("c", "bob", 2, "2026-03-01T00:00:00.000Z")

describe("view params", () => {
  test("unknown values fall back to the default view", () => {
    expect(parseShipsView({ sort: "nope", live: "yes", page: "-3" })).toEqual({ sort: "recent", live: false, page: 1 })
  })
  test("round trips through the canonical query", () => {
    const view = parseShipsView({ sort: "votes", live: "1", page: "2" })
    expect(view).toEqual({ sort: "votes", live: true, page: 2 })
    expect(shipsQuery(view)).toBe("?sort=votes&live=1&page=2")
    expect(shipsQuery({ sort: "recent" })).toBe("")
    expect(isDefaultView(parseShipsView({}))).toBe(true)
  })
})

describe("sorting and featuring", () => {
  test("recent orders by last activity", () => {
    expect(sortShips([a, b, c], "recent").map((s) => s.id)).toEqual(["c", "b", "a"])
  })
  test("votes break ties by recency, and the featured Ship is the first", () => {
    expect(sortShips([a, b, c], "votes").map((s) => s.id)).toEqual(["c", "b", "a"])
    expect(pickFeatured([a, b, c])?.id).toBe("c")
    expect(pickFeatured([])).toBeNull()
  })
  test("live means a website or demo link", () => {
    expect(hasLiveLink(a)).toBe(false)
    expect(hasLiveLink(b)).toBe(true)
  })
})

describe("makers", () => {
  test("groups by owner, most Ships first", () => {
    const makers = buildMakers([a, b, c], null)
    expect(makers.map((m) => [m.handle, m.ships])).toEqual([["ada", 2], ["bob", 1]])
  })
})

describe("fallbackCover", () => {
  test("is stable and builds a monogram", () => {
    expect(fallbackCover("Wompi SDK")).toEqual(fallbackCover("Wompi SDK"))
    expect(fallbackCover("Wompi SDK").letters).toBe("WS")
    expect(fallbackCover("glyf").letters).toBe("GL")
  })
})
