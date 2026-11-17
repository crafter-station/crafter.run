import { describe, expect, test } from "bun:test"

import {
  deriveDraft,
  planReleaseUpdates,
  repoSkipReason,
  resolveOwner,
  type Contributor,
  type GithubRelease,
  type TopicMember,
  type TopicRepo,
} from "./ship-topic"

const member = (id: string, trust: TopicMember["trust"] = "new"): TopicMember => ({ id, handle: id, trust })
const logins: Record<string, TopicMember> = { ana: member("ana"), bob: member("bob"), cy: member("cy", "blocked") }
const byLogin = (login: string) => logins[login.toLowerCase()]
const byHandle = (handle: string) => Object.values(logins).find((m) => m.handle === handle)
const repo = (over: Partial<TopicRepo> = {}): TopicRepo => ({
  full_name: "ana/cool-tool",
  name: "cool-tool",
  html_url: "https://github.com/ana/cool-tool",
  description: "A tool that does cool things for people.",
  homepage: null,
  stargazers_count: 3,
  fork: false,
  archived: false,
  size: 10,
  owner: { login: "ana", type: "User" },
  ...over,
})
const resolve = (over: Partial<Parameters<typeof resolveOwner>[0]> = {}) =>
  resolveOwner({ ownerLogin: "ana", ownerType: "User", contributors: [], memberByLogin: byLogin, memberByHandle: byHandle, ...over })

describe("owner resolution", () => {
  test("personal repo needs its owner as member", () => {
    expect(resolve()).toMatchObject({ ok: true, via: "owner" })
    expect(resolve({ ownerLogin: "nobody" })).toEqual({ ok: false, reason: "owner-has-no-account" })
  })

  test("org picks the top member contributor, excluding bots and non-members", () => {
    const contributors: Contributor[] = [
      { login: "dependabot[bot]", type: "Bot", contributions: 500 },
      { login: "stranger", contributions: 50 },
      { login: "ana", contributions: 30 },
      { login: "bob", contributions: 40 },
    ]
    const result = resolve({ ownerType: "Organization", ownerLogin: "acme", contributors })
    expect(result).toMatchObject({ ok: true, via: "top-contributor" })
    if (result.ok) expect(result.member.id).toBe("bob")
  })

  test("org requires 10 percent of human contributions", () => {
    const contributors: Contributor[] = [
      { login: "stranger", contributions: 95 },
      { login: "ana", contributions: 5 },
    ]
    expect(resolve({ ownerType: "Organization", ownerLogin: "acme", contributors })).toEqual({ ok: false, reason: "top-member-below-10-percent" })
    contributors[1].contributions = 11
    expect(resolve({ ownerType: "Organization", ownerLogin: "acme", contributors }).ok).toBe(true)
  })

  test("a blocked member never gets a draft", () => {
    expect(resolve({ ownerLogin: "cy" })).toEqual({ ok: false, reason: "member-blocked" })
  })

  test("override only counts for the owner or a contributor", () => {
    const org = { ownerType: "Organization", ownerLogin: "acme", overrideHandle: "bob" }
    const contributors: Contributor[] = [{ login: "ana", contributions: 90 }, { login: "bob", contributions: 1 }]
    const honored = resolve({ ...org, contributors })
    expect(honored).toMatchObject({ ok: true, via: "override" })
    const ignored = resolve({ ...org, contributors: [{ login: "ana", contributions: 90 }] })
    expect(ignored).toMatchObject({ ok: true, via: "top-contributor" })
    if (ignored.ok) expect(ignored.member.id).toBe("ana")
    const personal = resolve({ overrideHandle: "bob", contributors: [] })
    if (personal.ok) expect(personal.member.id).toBe("ana")
  })
})

describe("draft derivation", () => {
  test("slug is unique and valid", () => {
    const draft = deriveDraft({ repo: repo(), takenSlugs: new Set(["cool-tool", "cool-tool-2"]) })
    expect(draft.slug).toBe("cool-tool-3")
    expect(deriveDraft({ repo: repo({ name: "x" }), takenSlugs: new Set() }).slug).toMatch(/^[a-z0-9][a-z0-9-]{1,78}[a-z0-9]$/)
    expect(draft.name).toBe("Cool Tool")
  })

  test("tagline falls back to a placeholder with an edit hint", () => {
    const draft = deriveDraft({ repo: repo({ description: null }), takenSlugs: new Set() })
    expect(draft.tagline.length).toBeGreaterThanOrEqual(4)
    expect(draft.reviewNote).toContain("Edit the tagline")
    expect(draft.description).toContain("Edit the tagline")
    expect(draft.description.length).toBeGreaterThanOrEqual(20)
    expect(deriveDraft({ repo: repo({ description: "x".repeat(200) }), takenSlugs: new Set() }).reviewNote).not.toBeNull()
  })

  test("description joins repo description and the README paragraph, always 20+ chars", () => {
    const draft = deriveDraft({ repo: repo({ description: "Short" }), readme: "# Title\n\nThis project helps you ship faster.\n", takenSlugs: new Set() })
    expect(draft.description).toBe("Short\n\nThis project helps you ship faster.")
    expect(deriveDraft({ repo: repo({ description: "Hi!!" }), takenSlugs: new Set() }).description.length).toBeGreaterThanOrEqual(20)
  })

  test("config name wins and the website link is optional", () => {
    const draft = deriveDraft({ repo: repo({ homepage: "https://cool.dev" }), config: { name: "Cool" }, takenSlugs: new Set() })
    expect(draft.name).toBe("Cool")
    expect(draft.links.map((l) => l.type)).toEqual(["repository", "website"])
    expect(deriveDraft({ repo: repo({ homepage: "https://cool.dev" }), takenSlugs: new Set(), websiteTaken: true }).links).toHaveLength(1)
  })
})

describe("release updates", () => {
  const release = (tag: string, at: string, over: Partial<GithubRelease> = {}): GithubRelease => ({
    tag_name: tag,
    name: null,
    body: "Notes here",
    html_url: `https://github.com/ana/cool-tool/releases/tag/${tag}`,
    draft: false,
    prerelease: false,
    published_at: at,
    ...over,
  })

  test("maps releases after publication and dedupes by URL", () => {
    const plan = planReleaseUpdates({
      shipPublishedAt: "2026-01-02T00:00:00Z",
      existingUrls: new Set(["https://github.com/ana/cool-tool/releases/tag/v2"]),
      releases: [
        release("v1", "2026-01-01T00:00:00Z"),
        release("v2", "2026-01-03T00:00:00Z"),
        release("v3", "2026-01-04T00:00:00Z", { body: "", name: "Third" }),
        release("v4", "2026-01-05T00:00:00Z", { prerelease: true }),
        release("v5", "2026-01-06T00:00:00Z", { draft: true }),
      ],
    })
    expect(plan).toHaveLength(1)
    expect(plan[0]).toMatchObject({ title: "Third", description: "Released v3.", socialPostUrl: "https://github.com/ana/cool-tool/releases/tag/v3" })
  })

  test("long titles are cut to 100", () => {
    const [update] = planReleaseUpdates({ shipPublishedAt: "2026-01-01T00:00:00Z", existingUrls: new Set(), releases: [release("v1", "2026-01-02T00:00:00Z", { name: "n".repeat(150) })] })
    expect(update.title).toHaveLength(100)
  })
})

describe("repo skipping", () => {
  test("forks, archived and empty repos", () => {
    expect(repoSkipReason(repo({ fork: true }))).toBe("fork")
    expect(repoSkipReason(repo({ archived: true }))).toBe("archived")
    expect(repoSkipReason(repo({ size: 0 }))).toBe("empty")
    expect(repoSkipReason(repo())).toBeNull()
  })
})
