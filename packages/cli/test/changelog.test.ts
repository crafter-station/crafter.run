import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { changelogFrontmatterSchema } from "@crafter/contracts"
import {
  checkEntry,
  GhError,
  resolveIdentity,
  runChangelog,
  scaffold,
  submit,
  type Deps,
  type Gh,
  type TeamEntry,
} from "../src/changelog"

const team: TeamEntry[] = [
  { username: "railly", name: "Railly Hugo", github: "https://github.com/Railly" },
  { username: "liz", name: "Liz Riveros", github: "https://github.com/lizriveros" },
  { username: "gone", name: "Gone Alum", github: "https://github.com/gone", alumni: true },
]

const front = (extra = "") => `---
title: Demo
summary: A demo entry.
date: 2026-11-15
area: station
kind: ship
crafters:
  - railly
evidence:
  - https://github.com/crafter-station/crafter.run
${extra}---

Lead with [a link](https://crafter.run).

<Figure src="/changelog/demo/first.webp" alt="first" size="1280x800" caption="one" />
`

let root: string
let dir: string
let logs: string[]

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "crafter-changelog-"))
  dir = join(root, "demo")
  mkdirSync(dir)
  writeFileSync(join(dir, "en.mdx"), front())
  writeFileSync(join(dir, "es.mdx"), front())
  writeFileSync(join(dir, "first.webp"), Buffer.from([0, 1, 2, 250, 251, 255]))
  logs = []
})
afterEach(() => rmSync(root, { recursive: true, force: true }))

type Call = { args: string[]; input?: unknown }

function fakeGh(options: { noFolder?: boolean; login?: string; member?: boolean; missing?: boolean; branchExists?: boolean; existing?: string[] } = {}) {
  const calls: Call[] = []
  let blobs = 0
  const gh: Gh = async (args, opts) => {
    calls.push({ args, input: opts?.input ? JSON.parse(opts.input) : undefined })
    if (options.missing) throw new GhError("spawn gh ENOENT", "missing", "ENOENT")
    const path = args.find((arg) => !arg.startsWith("-") && arg !== "api" && arg !== "POST")!
    if (path === "user") return { stdout: JSON.stringify({ login: options.login ?? "Railly" }) }
    if (path.startsWith("orgs/")) {
      if (options.member === false) throw new GhError("exit 1", "failed", "gh: Not Found (HTTP 404)")
      return { stdout: "" }
    }
    if (path.endsWith("git/ref/heads/changelog/demo")) {
      if (options.branchExists) return { stdout: "{}" }
      throw new GhError("exit 1", "failed", "gh: Not Found (HTTP 404)")
    }
    if (path.includes("contents/apps/web/content/changelog")) {
      if (options.noFolder) throw new GhError("exit 1", "failed", "gh: Not Found (HTTP 404)")
      return { stdout: JSON.stringify((options.existing ?? ["2026-10-06-crafter-run-redesign.en.mdx"]).map((name) => ({ name }))) }
    }
    if (path.endsWith("git/ref/heads/main")) return { stdout: JSON.stringify({ object: { sha: "head1" } }) }
    if (path.endsWith("git/commits/head1")) return { stdout: JSON.stringify({ tree: { sha: "tree0" } }) }
    if (path.endsWith("git/blobs")) return { stdout: JSON.stringify({ sha: `blob${++blobs}` }) }
    if (path.endsWith("git/trees")) return { stdout: JSON.stringify({ sha: "tree1" }) }
    if (path.endsWith("git/commits")) return { stdout: JSON.stringify({ sha: "commit1" }) }
    if (path.endsWith("git/refs")) return { stdout: "{}" }
    if (path.endsWith("/pulls")) return { stdout: JSON.stringify({ html_url: "https://github.com/crafter-station/crafter.run/pull/999" }) }
    throw new Error(`unexpected gh call ${args.join(" ")}`)
  }
  return { gh, calls }
}

const deps = (gh: Gh): Deps => ({
  gh,
  fetchTeam: async () => team,
  log: (line) => logs.push(line),
  today: () => "2026-11-15",
})

describe("frontmatter contract", () => {
  test("parses a valid entry and rejects a bad area", () => {
    const valid = {
      title: "t", summary: "s", date: "2026-11-15", area: "station", kind: "ship", crafters: ["railly"], evidence: [],
    }
    expect(changelogFrontmatterSchema.safeParse(valid).success).toBe(true)
    expect(changelogFrontmatterSchema.safeParse({ ...valid, area: "nope" }).success).toBe(false)
    expect(changelogFrontmatterSchema.safeParse({ ...valid, evidence: ["http://x.dev"] }).success).toBe(false)
  })
})

describe("check", () => {
  test("passes a valid folder and reports sizes", () => {
    const report = checkEntry(dir)
    expect(report.errors).toEqual([])
    expect(report.ok).toBe(true)
    expect(report.files.map((file) => file.name)).toEqual(["en.mdx", "es.mdx", "first.webp"])
  })

  test("fails on a missing locale", () => {
    rmSync(join(dir, "es.mdx"))
    expect(checkEntry(dir).errors.join("\n")).toContain("es.mdx is missing")
  })

  test("fails on missing media and a foreign slug path", () => {
    rmSync(join(dir, "first.webp"))
    writeFileSync(join(dir, "es.mdx"), front().replace("/changelog/demo/first.webp", "/changelog/other/first.webp"))
    const errors = checkEntry(dir).errors.join("\n")
    expect(errors).toContain("/changelog/demo/first.webp is not in the folder")
    expect(errors).toContain("/changelog/other/first.webp must be /changelog/demo/<file>")
  })

  test("requires the og card when a cover image is set", () => {
    writeFileSync(join(dir, "en.mdx"), front("image: /changelog/demo/cover.webp\n"))
    writeFileSync(join(dir, "cover.webp"), "x")
    expect(checkEntry(dir).errors.join("\n")).toContain("og-en.jpg")
    writeFileSync(join(dir, "og-en.jpg"), "x")
    writeFileSync(join(dir, "og-es.jpg"), "x")
    expect(checkEntry(dir).errors).toEqual([])
  })

  test("fails on a bad area and a date mismatch", () => {
    writeFileSync(join(dir, "es.mdx"), front().replace("area: station", "area: nope"))
    expect(checkEntry(dir).errors.join("\n")).toContain("es.mdx: area")
    writeFileSync(join(dir, "es.mdx"), front().replace("2026-11-15", "2026-11-16"))
    expect(checkEntry(dir).errors.join("\n")).toContain("must match")
  })

  test("fails on a bad slug and TODO placeholders, warns on em dashes and big files", () => {
    const bad = join(root, "Bad_Slug")
    mkdirSync(bad)
    writeFileSync(join(bad, "en.mdx"), front().replace("A demo", "TODO"))
    writeFileSync(join(bad, "es.mdx"), front().replace("Lead", "Lead —"))
    writeFileSync(join(bad, "first.webp"), Buffer.alloc(2 * 1024 * 1024 + 1))
    const report = checkEntry(bad)
    expect(report.errors.join("\n")).toContain('Slug "Bad_Slug"')
    expect(report.errors.join("\n")).toContain("TODO")
    expect(report.warnings.join("\n")).toContain("em dashes")
    expect(report.warnings.join("\n")).toContain("first.webp is 2.0 MB")
  })

  test("--json prints a machine report and exits 1 on errors", async () => {
    rmSync(join(dir, "es.mdx"))
    const code = await runChangelog(["check", dir, "--json"], deps(fakeGh().gh))
    expect(code).toBe(1)
    const json = JSON.parse(logs[0]!)
    expect(json.ok).toBe(false)
    expect(json.errors[0]).toContain("es.mdx is missing")
  })
})

describe("identity", () => {
  test("maps a member to the crafter username, case-insensitive", async () => {
    const identity = await resolveIdentity({ gh: fakeGh({ login: "RAILLY" }).gh, fetchTeam: async () => team })
    expect(identity.username).toBe("railly")
  })

  test("rejects a non-member and points to crafter ship", async () => {
    await expect(resolveIdentity({ gh: fakeGh({ member: false }).gh, fetchTeam: async () => team })).rejects.toThrow("crafter ship")
  })

  test("rejects an org member who is alumni or off the roster", async () => {
    await expect(resolveIdentity({ gh: fakeGh({ login: "gone" }).gh, fetchTeam: async () => team })).rejects.toThrow("not on the Crafter Station core team")
    await expect(resolveIdentity({ gh: fakeGh({ login: "stranger" }).gh, fetchTeam: async () => team })).rejects.toThrow("crafter ship")
  })

  test("explains how to install gh when it is missing", async () => {
    await expect(resolveIdentity({ gh: fakeGh({ missing: true }).gh, fetchTeam: async () => team })).rejects.toThrow("cli.github.com")
  })
})

describe("new", () => {
  test("scaffolds both locales with today's date and your username; the result fails check until edited", async () => {
    const created = await scaffold("fresh-entry", { cwd: root }, deps(fakeGh().gh))
    const en = readFileSync(join(created, "en.mdx"), "utf8")
    expect(en).toContain("date: 2026-11-15")
    expect(en).toContain("  - railly")
    expect(en).toContain("/changelog/fresh-entry/demo.mp4")
    expect(checkEntry(created).errors.join("\n")).toContain("TODO")
    await expect(scaffold("fresh-entry", { cwd: root }, deps(fakeGh().gh))).rejects.toThrow("already exists")
    await expect(scaffold("Bad Slug", { cwd: root }, deps(fakeGh().gh))).rejects.toThrow("Invalid slug")
    await expect(scaffold("ok", { cwd: root, area: "x" }, deps(fakeGh().gh))).rejects.toThrow("Unknown area")
  })

  test("falls back to empty crafters with a warning when gh is missing", async () => {
    const created = await scaffold("no-gh", { cwd: root }, deps(fakeGh({ missing: true }).gh))
    expect(readFileSync(join(created, "en.mdx"), "utf8")).toContain("crafters: []")
    expect(logs.join("\n")).toContain("Warning")
  })
})

describe("submit", () => {
  test("dry run prints the plan and writes nothing remote", async () => {
    const { gh, calls } = fakeGh()
    await submit(dir, { confirm: false }, deps(gh))
    const out = logs.join("\n")
    expect(out).toContain("Dry run")
    expect(out).toContain("Branch: changelog/demo")
    expect(out).toContain("Title: Changelog: Demo")
    expect(out).toContain("apps/web/content/changelog/2026-11-15-demo.en.mdx")
    expect(out).toContain("apps/web/public/changelog/demo/first.webp")
    expect(calls.some((call) => call.args.includes("POST"))).toBe(false)
  })

  test("--confirm creates blobs, tree, commit, ref and the pull request in order", async () => {
    const { gh, calls } = fakeGh()
    const url = await submit(dir, { confirm: true }, deps(gh))
    expect(url).toBe("https://github.com/crafter-station/crafter.run/pull/999")
    const posts = calls.filter((call) => call.args.includes("POST"))
    const targets = posts.map((call) => call.args.find((arg) => arg.startsWith("repos/"))!.replace("repos/crafter-station/crafter.run/", ""))
    expect(targets).toEqual(["git/blobs", "git/blobs", "git/blobs", "git/trees", "git/commits", "git/refs", "pulls"])

    const blobs = posts.slice(0, 3).map((call) => call.input as { content: string; encoding: string })
    expect(blobs.every((blob) => blob.encoding === "base64")).toBe(true)
    expect(blobs.map((blob) => blob.content)).toContain(Buffer.from([0, 1, 2, 250, 251, 255]).toString("base64"))

    const tree = posts[3]!.input as { base_tree: string; tree: { path: string; sha: string }[] }
    expect(tree.base_tree).toBe("tree0")
    expect(tree.tree.map((entry) => entry.path)).toEqual([
      "apps/web/content/changelog/2026-11-15-demo.en.mdx",
      "apps/web/content/changelog/2026-11-15-demo.es.mdx",
      "apps/web/public/changelog/demo/first.webp",
    ])
    expect(posts[4]!.input).toMatchObject({ tree: "tree1", parents: ["head1"] })
    expect(posts[5]!.input).toEqual({ ref: "refs/heads/changelog/demo", sha: "commit1" })
    const pull = posts[6]!.input as { title: string; head: string; base: string; body: string }
    expect(pull).toMatchObject({ title: "Changelog: Demo", head: "changelog/demo", base: "main" })
    expect(pull.body).toContain("## Problem")
    expect(pull.body).toContain("## Visual proof")
    expect(pull.body).toContain("raw.githubusercontent.com/crafter-station/crafter.run/changelog/demo/apps/web/public/changelog/demo/first.webp")
  })

  test("refuses an existing branch, an existing slug on main, a non-member and invalid entries", async () => {
    await expect(submit(dir, { confirm: true }, deps(fakeGh({ branchExists: true }).gh))).rejects.toThrow("already exists in")
    await expect(
      submit(dir, { confirm: true }, deps(fakeGh({ existing: ["2026-01-01-demo.en.mdx"] }).gh)),
    ).rejects.toThrow('slug "demo" already exists')
    await expect(submit(dir, { confirm: true }, deps(fakeGh({ member: false }).gh))).rejects.toThrow("crafter ship")
    rmSync(join(dir, "first.webp"))
    const { gh, calls } = fakeGh()
    await expect(submit(dir, { confirm: true }, deps(gh))).rejects.toThrow("Fix the errors")
    expect(calls).toEqual([])
  })

  test("treats a missing changelog folder on main as empty", async () => {
    const url = await submit(dir, { confirm: true }, deps(fakeGh({ noFolder: true }).gh))
    expect(url).toContain("/pull/999")
  })

  test("refuses a crafter credit that is not on the active roster", async () => {
    writeFileSync(join(dir, "en.mdx"), front().replace("  - railly", "  - railly\n  - gone"))
    await expect(submit(dir, { confirm: false }, deps(fakeGh().gh))).rejects.toThrow('Crafter "gone"')
  })
})
