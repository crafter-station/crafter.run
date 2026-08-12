import { describe, expect, test } from "bun:test"

import { matchesTimelineOrg } from "./project-timeline-org"

describe("matchesTimelineOrg", () => {
  test("keeps every owner when the filter is all", () => {
    expect(matchesTimelineOrg("crafter-research", "all")).toBe(true)
    expect(matchesTimelineOrg("Railly", "all")).toBe(true)
  })

  test("matches Crafter Research repos only", () => {
    expect(matchesTimelineOrg("crafter-research", "crafter-research")).toBe(true)
    expect(matchesTimelineOrg("crafter-station", "crafter-research")).toBe(false)
    expect(matchesTimelineOrg("shiarauzo", "crafter-research")).toBe(false)
  })

  test("treats personal member repos as team", () => {
    expect(matchesTimelineOrg("Railly", "team")).toBe(true)
    expect(matchesTimelineOrg("crafter-station", "team")).toBe(false)
    expect(matchesTimelineOrg("crafter-research", "team")).toBe(false)
  })
})
