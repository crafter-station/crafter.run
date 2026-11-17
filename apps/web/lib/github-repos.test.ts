import { describe, expect, test } from "bun:test"

import { filterRepos, githubFetch, listOwnerRepos, markShipped, orderRepos, readyRepos, repoInputToUrl, repoKey, selectRepos } from "./github-repos"
import { importShipFromLink } from "./new-ship-draft"

const raw = [
  { full_name: "me/old", name: "old", html_url: "https://github.com/me/old", pushed_at: "2025-01-01T00:00:00Z", stargazers_count: 1 },
  { full_name: "me/fresh", name: "fresh", html_url: "https://github.com/me/fresh", pushed_at: "2026-11-01T00:00:00Z", language: "TypeScript" },
  { full_name: "me/forked", name: "forked", html_url: "https://github.com/me/forked", fork: true, pushed_at: "2026-11-02T00:00:00Z" },
  { full_name: "me/dead", name: "dead", html_url: "https://github.com/me/dead", archived: true, pushed_at: "2026-11-03T00:00:00Z" },
  { full_name: "me/secret", name: "secret", html_url: "https://github.com/me/secret", private: true, pushed_at: "2026-11-04T00:00:00Z" },
  { full_name: "me/tagged-old", name: "tagged-old", html_url: "https://github.com/me/tagged-old", topics: ["crafter-ship"], pushed_at: "2025-06-01T00:00:00Z" },
  { full_name: "me/Me", name: "Me", html_url: "https://github.com/me/Me", pushed_at: "2026-11-05T00:00:00Z" },
  { full_name: "me/tagged-shipped", name: "tagged-shipped", html_url: "https://github.com/me/tagged-shipped", topics: ["crafter-ship"], pushed_at: "2026-10-01T00:00:00Z" },
]

describe("repo list", () => {
  test("keeps public originals, drops the profile README repo, and sorts by last push", () => {
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

describe("owner repositories", () => {
  const calls: string[] = []
  const github = (async (input: RequestInfo | URL) => {
    const url = String(input)
    calls.push(url.replace("https://api.github.com", ""))
    if (url.includes("/orgs/someone/")) return new Response("{}", { status: 404 })
    if (url.includes("/users/ghost/")) return new Response("{}", { status: 404 })
    if (url.includes("/orgs/down/")) return new Response("{}", { status: 500 })
    return new Response(JSON.stringify(raw))
  }) as typeof fetch

  test("an organization reads the org endpoint, newest push first", async () => {
    calls.length = 0
    const result = await listOwnerRepos("crafter-station", "org", github)
    expect(calls).toEqual(["/orgs/crafter-station/repos?type=public&sort=pushed&per_page=100"])
    expect(result.status === "ok" && result.repos[0]?.name).toBe("fresh")
  })

  test("a typed login that is not an organization falls back to the user endpoint", async () => {
    calls.length = 0
    const result = await listOwnerRepos("someone", "org", github)
    expect(calls).toEqual(["/orgs/someone/repos?type=public&sort=pushed&per_page=100", "/users/someone/repos?type=owner&sort=pushed&per_page=100"])
    expect(result.status).toBe("ok")
  })

  test("an unknown login is notFound, a GitHub failure is error, and an invalid login never calls GitHub", async () => {
    calls.length = 0
    expect((await listOwnerRepos("ghost", "user", github)).status).toBe("notFound")
    expect((await listOwnerRepos("down", "org", github)).status).toBe("error")
    expect((await listOwnerRepos("../etc", "user", github)).status).toBe("notFound")
    expect(calls.some((call) => call.includes("etc"))).toBe(false)
  })
})
