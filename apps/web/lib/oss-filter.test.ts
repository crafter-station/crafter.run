import { describe, expect, test } from "bun:test"
import { filterOssRepos } from "./oss-filter"
import type { OssRepo } from "./oss"
const repos: OssRepo[] = [
  { repo: "crafter-station/petdex", name: "petdex", description: "Agent pets", language: "TypeScript", url: "https://github.com/crafter-station/petdex", stars: 10, openIssues: 2, accent: "" },
  { repo: "Railly/trx", name: "trx", description: "Local transcription", language: "Python", url: "https://github.com/Railly/trx", stars: 3, openIssues: 0, accent: "" },
  { repo: "crafter-station/empty", name: "empty", description: null, language: null, url: "https://github.com/crafter-station/empty", stars: 0, openIssues: 0, accent: "" },
]
describe("OSS discovery", () => {
  test("finds projects across names, descriptions and languages regardless of case or spacing", () => {
    expect(filterOssRepos(repos, { query: "  PETS   typescript " }).map((r) => r.name)).toEqual(["petdex"])
  })
  test("intersects text, owner and language without changing the catalog", () => {
    expect(filterOssRepos(repos, { query: "transcription", owner: "crafter-station", language: "Python" })).toEqual([])
    expect(filterOssRepos(repos, { owner: "Railly", language: "Python" })).toEqual([repos[1]])
    expect(repos).toHaveLength(3)
  })
  test("clearing filters restores original ranking including repositories without metadata", () => {
    expect(filterOssRepos(repos, { query: "  ", owner: "all", language: "all" })).toEqual(repos)
    expect(filterOssRepos(repos, { query: "empty" })).toEqual([repos[2]])
  })
})
