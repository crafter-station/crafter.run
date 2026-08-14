import { describe, expect, test } from "bun:test"

import fallback from "@/data/oss-radar.json"
import { ossRadarSchema } from "@/lib/oss-radar"

describe("oss radar contract", () => {
  test("accepts the versioned fallback snapshot", () => {
    const result = ossRadarSchema.parse(fallback)
    expect(result.schemaVersion).toBe(1)
    expect(result.summary.successful).toBe(result.summary.repoCount)
  })

  test("rejects a producer that mutates GitHub", () => {
    expect(
      ossRadarSchema.safeParse({ ...fallback, githubMutations: true }).success,
    ).toBe(false)
  })
})
