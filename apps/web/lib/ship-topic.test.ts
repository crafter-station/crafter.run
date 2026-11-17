import { describe, expect, test } from "bun:test"

import {
  AUTO_SYNC_WINDOW_DAYS,
  githubFullName,
  hasTopic,
  MANUAL_SYNC_LIMIT,
  planReleaseUpdates,
  repoSkipReason,
  verifyOwnerGithub,
  type Contributor,
  type GithubRelease,
  type TopicRepo,
} from "./ship-topic"

const repo = (over: Partial<TopicRepo> = {}): TopicRepo => ({
  full_name: "ana/cool-tool",
  name: "cool-tool",
  html_url: "https://github.com/ana/cool-tool",
  stargazers_count: 3,
  fork: false,
  archived: false,
  size: 10,
  topics: ["crafter-ship"],
  owner: { login: "ana", type: "User" },
  ...over,
})

describe("owner verification", () => {
  test("personal repo: the linked login must be the repo owner", () => {
    expect(verifyOwnerGithub({ ownerLogin: "Ana", ownerType: "User", contributors: [], linkedLogins: ["ana"] })).toEqual({ ok: true })
    expect(verifyOwnerGithub({ ownerLogin: "ana", ownerType: "User", contributors: [{ login: "bob", contributions: 9 }], linkedLogins: ["bob"] })).toEqual({
      ok: false,
      reason: "not-repo-owner-or-contributor",
    })
  })

  test("org repo: any non-bot contributor counts, bots do not", () => {
    const contributors: Contributor[] = [
      { login: "ci[bot]", type: "Bot", contributions: 50 },
      { login: "bob", contributions: 1 },
    ]
    const org = { ownerLogin: "acme", ownerType: "Organization", contributors }
    expect(verifyOwnerGithub({ ...org, linkedLogins: ["BOB"] })).toEqual({ ok: true })
    expect(verifyOwnerGithub({ ...org, linkedLogins: ["ci[bot]"] }).ok).toBe(false)
    expect(verifyOwnerGithub({ ...org, linkedLogins: ["zed"] }).ok).toBe(false)
  })

  test("no linked GitHub account", () => {
    expect(verifyOwnerGithub({ ownerLogin: "ana", ownerType: "User", contributors: [], linkedLogins: [] })).toEqual({ ok: false, reason: "github-not-linked" })
  })
})

describe("release updates", () => {
  const now = Date.parse("2026-02-10T12:00:00Z")
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
  const base = { shipPublishedAt: "2026-01-01T00:00:00Z", existingUrls: new Set<string>(), now }

  test("the automatic window is two days", () => {
    expect(AUTO_SYNC_WINDOW_DAYS).toBe(2)
    const plan = planReleaseUpdates({
      ...base,
      windowDays: AUTO_SYNC_WINDOW_DAYS,
      releases: [release("old", "2026-02-07T12:00:00Z"), release("edge", "2026-02-08T11:59:00Z"), release("new", "2026-02-09T12:00:00Z")],
    })
    expect(plan.map((u) => u.title)).toEqual(["new"])
  })

  test("never imports releases from before the Ship was published", () => {
    const plan = planReleaseUpdates({ ...base, shipPublishedAt: "2026-02-09T13:00:00Z", windowDays: 2, releases: [release("v1", "2026-02-09T12:00:00Z"), release("v2", "2026-02-10T01:00:00Z")] })
    expect(plan.map((u) => u.title)).toEqual(["v2"])
  })

  test("skips prereleases, drafts, and already imported URLs", () => {
    const plan = planReleaseUpdates({
      ...base,
      existingUrls: new Set(["https://github.com/ana/cool-tool/releases/tag/v2"]),
      releases: [
        release("v2", "2026-02-09T00:00:00Z"),
        release("v3", "2026-02-09T01:00:00Z", { body: "", name: "Third" }),
        release("v4", "2026-02-09T02:00:00Z", { prerelease: true }),
        release("v5", "2026-02-09T03:00:00Z", { draft: true }),
      ],
    })
    expect(plan).toHaveLength(1)
    expect(plan[0]).toMatchObject({ title: "Third", description: "Released v3.", socialPostUrl: "https://github.com/ana/cool-tool/releases/tag/v3" })
  })

  test("a manual sync keeps the newest 10, oldest first, without a window", () => {
    expect(MANUAL_SYNC_LIMIT).toBe(10)
    const releases = Array.from({ length: 14 }, (_, i) => release(`v${i + 1}`, `2026-01-${String(i + 2).padStart(2, "0")}T00:00:00Z`))
    const plan = planReleaseUpdates({ ...base, releases, limit: MANUAL_SYNC_LIMIT })
    expect(plan).toHaveLength(10)
    expect(plan[0].title).toBe("v5")
    expect(plan[9].title).toBe("v14")
  })

  test("long titles are cut to 100", () => {
    const [update] = planReleaseUpdates({ ...base, releases: [release("v1", "2026-02-02T00:00:00Z", { name: "n".repeat(150) })] })
    expect(update.title).toHaveLength(100)
  })
})

describe("repos", () => {
  test("skips forks, archived and empty repos", () => {
    expect(repoSkipReason(repo({ fork: true }))).toBe("fork")
    expect(repoSkipReason(repo({ archived: true }))).toBe("archived")
    expect(repoSkipReason(repo({ size: 0 }))).toBe("empty")
    expect(repoSkipReason(repo())).toBeNull()
  })

  test("topic and URL helpers", () => {
    expect(hasTopic(repo())).toBe(true)
    expect(hasTopic(repo({ topics: [] }))).toBe(false)
    expect(githubFullName("https://github.com/ana/cool-tool.git")).toBe("ana/cool-tool")
    expect(githubFullName("https://example.com/ana/cool-tool")).toBeNull()
  })
})
