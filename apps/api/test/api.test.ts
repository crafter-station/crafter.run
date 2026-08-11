import { describe, expect, spyOn, test } from "bun:test"
import { editableShipLinkSchema } from "@crafter/contracts"

import app from "../src/index"
import { moderateShip } from "../src/moderation"

describe("Crafter API", () => {
  test("reports health", async () => {
    const response = await app.request("/health")
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: "ok" })
  })

  test("returns structured validation errors", async () => {
    const response = await app.request("/v1/ship-drafts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: { code: "validation_error" } })
  })

  test("requires explicit publish confirmation", async () => {
    const response = await app.request("/v1/ship-drafts/71fcfa4f-31c8-4660-bad9-0b73875a2580/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ confirm: false }),
    })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: { code: "validation_error" } })
  })

  test("reports an unavailable repository as 503", async () => {
    const previous = process.env.DATABASE_URL
    delete process.env.DATABASE_URL
    const consoleError = spyOn(console, "error").mockImplementation(() => {})
    try {
      const response = await app.request("/v1/ships")
      expect(response.status).toBe(503)
      expect(await response.json()).toMatchObject({ error: { code: "service_unavailable" } })
    } finally {
      consoleError.mockRestore()
      if (previous) process.env.DATABASE_URL = previous
    }
  })
})

describe("Ship moderation", () => {
  test("deterministically rejects exposed credentials", async () => {
    const previous = process.env.OPENAI_API_KEY
    delete process.env.OPENAI_API_KEY
    try {
      const result = await moderateShip({
        name: "Unsafe Ship",
        tagline: "Contains a leaked credential",
        description: "Accidentally included sk_live_1234567890abcdef in this public description.",
      })
      expect(result.allowed).toBe(false)
    } finally {
      if (previous) process.env.OPENAI_API_KEY = previous
    }
  })
})

describe("Ship link identity", () => {
  test("normalizes equivalent repository URLs", () => {
    const first = editableShipLinkSchema.parse({ type: "repository", url: "https://GitHub.com/Crafter/Repo.git/?utm_source=test" })
    const second = editableShipLinkSchema.parse({ type: "repository", url: "https://github.com/crafter/repo" })
    expect(first.url).toBe(second.url)
  })
})
