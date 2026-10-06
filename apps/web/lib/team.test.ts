import { describe, expect, test } from "bun:test"
import { GET as links } from "@/app/links.json/route"
import { entryAuthors } from "@/components/blog/format"
import { type BlogPost, getAuthor } from "@/lib/blog"
import { blogPostingSchema } from "@/lib/structured-data"
import { activeTeamMembers, alumniTeamMembers, featuredTeamMembers, getTeamMember } from "./team"

const formerUsernames = ["cuevaio", "emmy", "gabriel", "juan", "shiara"]

describe("current team and historical credits", () => {
  test("features Railly, Jibaru, Liz and Edward in the requested homepage order", () => {
    expect(featuredTeamMembers.map((member) => member.username)).toEqual([
      "railly", "ignacio", "liz", "edward",
    ])
    expect(featuredTeamMembers[1].github).toBe("https://github.com/Jibaru")
    expect(featuredTeamMembers.every((member) => !member.alumni)).toBe(true)
  })

  test("keeps former members available for historical authorship, outside the active roster", () => {
    expect(alumniTeamMembers.map((member) => member.username).sort()).toEqual([
      "cuevaio", "emmy", "juan", "shiara",
    ])
    expect(alumniTeamMembers.some((member) => member.username === "gabriel")).toBe(false)
    for (const username of formerUsernames) {
      expect(activeTeamMembers.some((member) => member.username === username)).toBe(false)
      expect(getAuthor(username)).toBe(getTeamMember(username)!)
    }
  })

  test("exports only current members to the public links directory", async () => {
    const body = await (await links()).json()
    expect(body.members.map((member: { username: string }) => member.username)).toEqual(
      activeTeamMembers.map((member) => member.username),
    )
    expect(body.org.products).toEqual([])
    expect(body.org.network.map((area: { name: string }) => area.name)).toEqual(["Research", "Lab", "Games", "Station"])
    expect(JSON.stringify(body)).not.toMatch(/visagente|normal\.fast|cuevaio\/normal/i)
  })

  test("historical bylines lead to an external profile and never claim current employment", () => {
    for (const username of formerUsernames) {
      const member = getAuthor(username)
      const author = entryAuthors({ authors: [username] } as BlogPost)[0]
      expect(author.name).toBe(member.name)
      expect(author.path).toMatch(/^https:\/\//)
      const schema = blogPostingSchema({
        post: { title: "Historical post", summary: "A past contribution", date: "2026-01-01", kind: "community" },
        authors: [member],
        locale: "es",
        url: "https://crafter.run/es/blog/example",
        imageUrl: "https://crafter.run/og/example.png",
      })
      expect(schema.author[0].url).toBe(author.path)
      expect(schema.author[0]).not.toHaveProperty("worksFor")
    }
  })
})
