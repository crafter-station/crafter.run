import { describe, expect, test } from "bun:test"

import { filterRepos, githubFetch, markShipped, orderRepos, readyRepos, repoInputToUrl, repoKey, selectRepos } from "./github-repos"
import { importShipFromLink } from "./new-ship-draft"

const raw = [
  { full_name: "me/old", name: "old", html_url: "https://github.com/me/old", pushed_at: "2025-01-01T00:00:00Z", stargazers_count: 1 },
  { full_name: "me/fresh", name: "fresh", html_url: "https://github.com/me/fresh", pushed_at: "2026-11-01T00:00:00Z", language: "TypeScript" },
  { full_name: "me/forked", name: "forked", html_url: "https://github.com/me/forked", fork: true, pushed_at: "2026-11-02T00:00:00Z" },
  { full_name: "me/dead", name: "dead", html_url: "https://github.com/me/dead", archived: true, pushed_at: "2026-11-03T00:00:00Z" },
  { full_name: "me/secret", name: "secret", html_url: "https://github.com/me/secret", private: true, pushed_at: "2026-11-04T00:00:00Z" },
  { full_name: "me/tagged-old", name: "tagged-old", html_url: "https://github.com/me/tagged-old", topics: ["crafter-ship"], pushed_at: "2025-06-01T00:00:00Z" },
  { full_name: "me/tagged-shipped", name: "tagged-shipped", html_url: "https://github.com/me/tagged-shipped", topics: ["crafter-ship"], pushed_at: "2026-10-01T00:00:00Z" },
]

describe("repo list", () => {
  test("keeps public originals and sorts by last push", () => {
    expect(selectRepos(raw, []).map((repo) => repo.name)).toEqual(["fresh", "tagged-shipped", "tagged-old", "old"])
  })
  test("a repo with a Ship is flagged whatever the link looks like", () => {
    const repos = selectRepos(raw, ["https://GitHub.com/Me/Fresh/", "github.com/me/tagged-shipped.git"])
    expect(repos.filter((repo) => repo.hasShip).map((repo) => repo.name)).toEqual(["fresh", "tagged-shipped"])
    expect(markShipped(repos, []).some((repo) => repo.hasShip)).toBe(false)
  })
  test("tagged repos without a Ship come first", () => {
    const repos = selectRepos(raw, ["https://github.com/me/tagged-shipped"])
    expect(readyRepos(repos).map((repo) => repo.name)).toEqual(["tagged-old"])
    expect(orderRepos(repos).map((repo) => repo.name)).toEqual(["tagged-old", "fresh", "tagged-shipped", "old"])
  })
  test("the filter reads name, description and language", () => {
    const repos = selectRepos(raw, [])
    expect(filterRepos(repos, "typescript").map((repo) => repo.name)).toEqual(["fresh"])
    expect(filterRepos(repos, "  ")).toHaveLength(4)
    expect(filterRepos(repos, "zzz")).toEqual([])
  })
  test("link matching ignores case, trailing slash and .git", () => {
    expect(repoKey("https://github.com/Me/App/")).toBe("me/app")
    expect(repoKey("github.com/me/app.git")).toBe("me/app")
    expect(repoKey("https://example.com/me/app")).toBeNull()
    expect(repoInputToUrl("me/app")).toBe("https://github.com/me/app")
    expect(repoInputToUrl("github.com/me/app.git")).toBe("https://github.com/me/app")
    expect(repoInputToUrl("seats.dev")).toBeNull()
  })
})

describe("server import", () => {
  const seen: (string | null)[] = []
  const base = (async (input: RequestInfo | URL, init?: RequestInit) => {
    seen.push(new Headers(init?.headers).get("Authorization"))
    if (String(input).endsWith("/readme")) return new Response("", { status: 404 })
    return new Response(JSON.stringify({ name: "seats", description: "Find seats", html_url: "https://github.com/me/seats", topics: ["crafter-ship"] }))
  }) as typeof fetch

  test("without a token the call goes out unauthenticated and still imports", async () => {
    seen.length = 0
    const result = await importShipFromLink("github.com/me/seats", { fetchImpl: githubFetch(undefined, base), pageMeta: async () => null })
    expect(result.fields.name).toBe("seats")
    expect(result.hasTopic).toBe(true)
    expect(seen.every((header) => header === null)).toBe(true)
  })
  test("with a token every GitHub call carries it", async () => {
    seen.length = 0
    await importShipFromLink("github.com/me/seats", { fetchImpl: githubFetch("tok", base), pageMeta: async () => null })
    expect(seen).toEqual(["Bearer tok", "Bearer tok"])
  })
  test("a rejected token falls back to an unauthenticated call", async () => {
    const calls: (string | null)[] = []
    const rejecting = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const auth = new Headers(init?.headers).get("Authorization")
      calls.push(auth)
      return new Response("{}", { status: auth ? 401 : 200 })
    }) as typeof fetch
    const response = await githubFetch("bad", rejecting)("https://api.github.com/x")
    expect(response.status).toBe(200)
    expect(calls).toEqual(["Bearer bad", null])
  })
})
