import { describe, expect, mock, test } from "bun:test"

mock.module("server-only", () => ({}))
const { rosterHandles } = await import("./ship-review")
const { teamMembers } = await import("./team")

describe("Ship review roster", () => {
  test("trusts the active Core and the Crew by GitHub handle, never alumni", () => {
    const handles = rosterHandles()
    expect(handles).toContain("railly")
    expect(handles).toContain("bdiazc90")
    for (const alumnus of teamMembers.filter((member) => member.alumni && member.github)) {
      const handle = alumnus.github!.match(/github\.com\/([^/?#]+)/i)?.[1]?.toLowerCase()
      if (handle) expect(handles).not.toContain(handle)
    }
    expect(new Set(handles).size).toBe(handles.length)
  })
})
