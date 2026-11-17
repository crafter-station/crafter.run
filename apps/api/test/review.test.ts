import { describe, expect, test } from "bun:test"
import type { ShipDetail } from "@crafter/contracts"

import { moderateShip } from "../src/moderation"
import { isTrustedPublisher, notifyShipReview, publishStatus } from "../src/review"

const passed = { review: false }
const unchecked = { review: true }

describe("Ship review decision", () => {
  test("a trusted member publishes directly when moderation ran", () => {
    expect(publishStatus(true, passed)).toBe("published")
  })

  test("a member who is not trusted waits for review", () => {
    expect(publishStatus(false, passed)).toBe("pending")
  })

  test("when moderation could not run, even a trusted member waits for review", () => {
    expect(publishStatus(true, unchecked)).toBe("pending")
  })
})

describe("trusted publishers", () => {
  const deps = (role: string | null) => {
    const changes: string[] = []
    return {
      changes,
      deps: { role: async () => role, trust: async (_id: string, trust: string) => void changes.push(trust) },
    }
  }

  test("a trusted member is trusted without asking Clerk", async () => {
    const { deps: d, changes } = deps(null)
    expect(await isTrustedPublisher({ id: "m", trust: "trusted" }, "u", d)).toBe(true)
    expect(changes).toEqual([])
  })

  test("a blocked member is never trusted, whatever the Clerk role", async () => {
    const { deps: d } = deps("admin")
    expect(await isTrustedPublisher({ id: "m", trust: "blocked" }, "u", d)).toBe(false)
  })

  test("an admin, core or crew role in Clerk makes a new member trusted and saves it", async () => {
    for (const role of ["admin", "core", "crew"]) {
      const { deps: d, changes } = deps(role)
      expect(await isTrustedPublisher({ id: "m", trust: "new" }, "u", d)).toBe(true)
      expect(changes).toEqual(["trusted"])
    }
  })

  test("any other role leaves a new member in review", async () => {
    const { deps: d, changes } = deps("member")
    expect(await isTrustedPublisher({ id: "m", trust: "new" }, "u", d)).toBe(false)
    expect(changes).toEqual([])
  })
})

describe("review notification", () => {
  const ship = { slug: "demo", name: "Demo", tagline: "A demo Ship", owner: { handle: "demo" } } as unknown as ShipDetail

  test("posts the Ship and the admin link when a webhook is set", async () => {
    const previous = process.env.SHIPS_REVIEW_WEBHOOK_URL
    process.env.SHIPS_REVIEW_WEBHOOK_URL = "https://hooks.example.com/ships"
    const calls: Array<{ url: string; body: string }> = []
    try {
      await notifyShipReview(ship, "Moderation passed.", (async (url: RequestInfo | URL, init?: RequestInit) => {
        calls.push({ url: String(url), body: String(init?.body) })
        return new Response("ok")
      }) as typeof fetch)
    } finally {
      if (previous === undefined) delete process.env.SHIPS_REVIEW_WEBHOOK_URL
      else process.env.SHIPS_REVIEW_WEBHOOK_URL = previous
    }
    expect(calls).toHaveLength(1)
    expect(calls[0].url).toBe("https://hooks.example.com/ships")
    expect(JSON.parse(calls[0].body)).toMatchObject({ ship: { slug: "demo", owner: "demo" } })
    expect(JSON.parse(calls[0].body).reviewUrl).toContain("/admin/ships")
  })

  test("a failing webhook never throws", async () => {
    const previous = process.env.SHIPS_REVIEW_WEBHOOK_URL
    process.env.SHIPS_REVIEW_WEBHOOK_URL = "https://hooks.example.com/ships"
    try {
      await expect(
        notifyShipReview(ship, "x", (async (_url: RequestInfo | URL) => {
          throw new Error("down")
        }) as unknown as typeof fetch),
      ).resolves.toBeUndefined()
    } finally {
      if (previous === undefined) delete process.env.SHIPS_REVIEW_WEBHOOK_URL
      else process.env.SHIPS_REVIEW_WEBHOOK_URL = previous
    }
  })
})

describe("moderation fails closed", () => {
  test("without an API key the Ship is sent to review instead of going live unchecked", async () => {
    const previous = process.env.OPENAI_API_KEY
    delete process.env.OPENAI_API_KEY
    try {
      const result = await moderateShip({ name: "Ship", tagline: "A clean tagline", description: "A clean description for this test." })
      expect(result).toMatchObject({ allowed: true, review: true })
    } finally {
      if (previous) process.env.OPENAI_API_KEY = previous
    }
  })
})
