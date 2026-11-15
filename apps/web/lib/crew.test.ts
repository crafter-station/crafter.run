import { describe, expect, test } from "bun:test"
import { findCoreMember } from "./core-members"
import { crewAreas, crewByArea, crewMembers } from "./crew"
import { teamMembers } from "./team"

const githubAccount = (username: string) =>
  ({
    externalAccounts: [{ provider: "oauth_github", username }],
    emailAddresses: [],
    publicMetadata: {},
  }) as unknown as Parameters<typeof findCoreMember>[0]

describe("crew", () => {
  test("never grants Core access", () => {
    for (const member of crewMembers) {
      expect(teamMembers.some((core) => core.username === member.username)).toBe(false)
      expect(findCoreMember(githubAccount(member.username))).toBeNull()
    }
  })

  test("every area has an active Core lead and at least one member", () => {
    const groups = crewByArea()
    expect(groups.map((group) => group.area)).toEqual([...crewAreas])
    for (const group of groups) {
      expect(group.lead.alumni).toBeFalsy()
      expect(group.members.length).toBeGreaterThan(0)
    }
  })

  test("keeps /team/core and /team/crew free for static pages", () => {
    const usernames = [...teamMembers, ...crewMembers].map((member) => member.username)
    expect(usernames).not.toContain("core")
    expect(usernames).not.toContain("crew")
  })
})
