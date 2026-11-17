import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { defaultSkillsDir, listSkills, runSkills } from "../src/skills"

function run(args: string[]) {
  let out = ""
  let err = ""
  const code = runSkills(args, defaultSkillsDir(), {
    out: (text) => {
      out += `${text}\n`
    },
    err: (text) => {
      err += `${text}\n`
    },
  })
  return { code, out, err }
}

describe("crafter skills", () => {
  test("lists the bundled skills", () => {
    const { code, out } = run(["list"])
    expect(code).toBe(0)
    expect(out).toMatch(/^changelog\s+Publish a changelog entry/m)
    expect(out).toMatch(/^ship\s+Create a reviewable/m)
    expect(run([]).out).toBe(out)
  })

  test("lists as json", () => {
    const { code, out } = run(["list", "--json"])
    expect(code).toBe(0)
    const parsed = JSON.parse(out) as { name: string; description: string }[]
    expect(parsed.map((skill) => skill.name)).toEqual(["changelog", "profile", "ship"])
    expect(parsed.every((skill) => skill.description.length > 20)).toBe(true)
  })

  test("get prints SKILL.md for one or several skills", () => {
    const one = run(["get", "ship"])
    expect(one.code).toBe(0)
    expect(one.out).toContain("name: ship")
    expect(one.out).toContain("`pending`")
    expect(one.out).not.toContain("name: changelog")
    const two = run(["get", "ship", "changelog"])
    expect(two.out).toContain("name: ship")
    expect(two.out).toContain("name: changelog")
  })

  test("get --full appends references and --ref prints one", () => {
    const base = run(["get", "changelog"]).out
    const full = run(["get", "changelog", "--full"]).out
    expect(full.length).toBeGreaterThan(base.length)
    expect(full).toContain("<!-- references/media.md -->")
    expect(full).toContain("<!-- references/writing.md -->")
    const ref = run(["get", "changelog", "--ref", "media"])
    expect(ref.code).toBe(0)
    expect(ref.out).toBe(readFileSync(join(defaultSkillsDir(), "changelog/references/media.md"), "utf8").replace(/\n+$/, "") + "\n")
    expect(run(["get", "changelog", "--ref", "references/media.md"]).out).toBe(ref.out)
  })

  test("unknown reference fails with the valid ones", () => {
    const { code, err } = run(["get", "changelog", "--ref", "nope"])
    expect(code).toBe(1)
    expect(err).toContain("entry-structure, media, writing")
  })

  test("get --all prints every skill", () => {
    const { out } = run(["get", "--all"])
    expect(out).toContain("name: ship")
    expect(out).toContain("name: changelog")
  })

  test("unknown skill fails with the valid names", () => {
    const { code, out, err } = run(["get", "missing"])
    expect(code).toBe(1)
    expect(out).toBe("")
    expect(err).toContain("Unknown skill: missing")
    expect(err).toContain("Available skills: changelog, profile, ship")
    expect(run(["path", "missing"]).code).toBe(1)
  })

  test("path prints the skill directory", () => {
    const { out } = run(["path", "ship"])
    expect(existsSync(join(out.trim(), "SKILL.md"))).toBe(true)
    expect(run(["path"]).out.trim()).toBe(defaultSkillsDir())
  })
})

describe("published package contents", () => {
  const root = resolve(import.meta.dir, "..")
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as { files: string[] }

  test("package.json files includes the skills directory", () => {
    expect(pkg.files).toContain("skills")
  })

  test("the resolver finds skills next to src and dist inside that directory", () => {
    expect(defaultSkillsDir()).toBe(join(root, "skills"))
    for (const skill of listSkills(join(root, "skills"))) {
      expect(existsSync(join(skill.path, "SKILL.md"))).toBe(true)
    }
    expect(existsSync(join(root, "skills/changelog/references/media.md"))).toBe(true)
  })
})
