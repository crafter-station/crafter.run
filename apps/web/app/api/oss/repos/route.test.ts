import { describe, expect, test } from "bun:test"

import { ossRepoNames } from "@/lib/oss"

import { GET } from "./route"

describe("OSS repository catalog", () => {
  test("exposes the same unique repositories rendered by the OSS page", async () => {
    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({
      schemaVersion: 1,
      source: "crafter.run/oss",
      repos: ossRepoNames,
    })
    expect(new Set(body.repos).size).toBe(body.repos.length)
  })
})
