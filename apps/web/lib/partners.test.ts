import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"

import { partnerEvents, partners, partnersByEvent } from "./partners"

describe("partners", () => {
  test("every logo is a local file in public", () => {
    for (const partner of partners) {
      expect(partner.logo.startsWith("/")).toBe(true)
      expect(existsSync(join(import.meta.dir, "..", "public", partner.logo))).toBe(true)
    }
  })

  test("every partner backs at least one known event", () => {
    const ids = new Set(partnerEvents.map((event) => event.id))
    for (const partner of partners) {
      expect(partner.events.length).toBeGreaterThan(0)
      for (const id of partner.events) expect(ids.has(id)).toBe(true)
    }
  })

  test("newest event first, repeat backers first, then by name", () => {
    const groups = partnersByEvent()
    expect(groups.map((group) => group.event.id)).toEqual(["the-next-craft-2026", "ia-hackathon-peru-2025"])
    const names = groups[0].partners.map((partner) => partner.name)
    const repeat = names.filter((name) => partners.find((partner) => partner.name === name)!.events.length > 1)
    expect(names.slice(0, repeat.length)).toEqual([...repeat].sort((a, b) => a.localeCompare(b)))
  })
})
