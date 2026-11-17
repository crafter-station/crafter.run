import { describe, expect, test } from "bun:test"
import type { PrivateMemberProfile, UpsertMemberRequest } from "@crafter/contracts"
import { type ProfileDeps, runProfile } from "../src/profile"

const member: PrivateMemberProfile = {
  handle: "ada",
  displayName: "Ada Lovelace",
  avatarUrl: null,
  bio: "Building compilers.",
  githubUrl: "https://github.com/ada",
  gitlabUrl: null,
  linkedinUrl: null,
  instagramUrl: null,
  xUrl: null,
  primaryWebsiteUrl: null,
  secondaryWebsiteUrl: null,
  currentRole: "Engineer",
  rolesOpenTo: ["Staff Engineer"],
  isJobSeeking: false,
  originLocation: { city: "London", region: null, country: "United Kingdom", countryCode: "GB", latitude: 51.5, longitude: -0.1, placeId: null, provider: null, confidence: null },
  basedLocation: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  salaryRange: null,
  workArrangements: [],
  onsiteCity: null,
  resumeUrl: null,
}

function harness(current: PrivateMemberProfile | null, files: Record<string, string> = {}, stdin = "", putError?: Error) {
  const puts: UpsertMemberRequest[] = []
  const deps: ProfileDeps = {
    getMe: async () => ({ member: current }),
    putMe: async (input) => {
      if (putError) throw putError
      puts.push(input)
      return { member: { ...(current ?? member), handle: input.handle, displayName: input.displayName, bio: input.bio ?? null } }
    },
    readFile: async (path) => {
      if (!(path in files)) throw new Error("ENOENT")
      return files[path]!
    },
    readStdin: async () => stdin,
    profileUrl: (handle) => `https://crafter.run/en/crafters/${handle}`,
    onboardingUrl: () => "https://crafter.run/en/onboarding",
  }
  const run = async (args: string[]) => {
    let out = ""
    let err = ""
    const code = await runProfile(args, deps, { out: (t) => (out += `${t}\n`), err: (t) => (err += `${t}\n`) })
    return { code, out, err }
  }
  return { run, puts }
}

describe("crafter profile get", () => {
  test("prints the profile", async () => {
    const { run } = harness(member)
    const { code, out } = await run(["get"])
    expect(code).toBe(0)
    expect(out).toContain("handle               ada")
    expect(out).toContain("originLocation       London, United Kingdom")
    expect(out).toContain("https://crafter.run/en/crafters/ada")
  })

  test("--json prints the member", async () => {
    const { run } = harness(member)
    expect(JSON.parse((await run(["get", "--json"])).out).member.handle).toBe("ada")
  })

  test("points at profile update when there is no profile", async () => {
    const { run } = harness(null)
    const text = await run(["get"])
    expect(text.code).toBe(0)
    expect(text.out).toContain("No profile yet")
    expect(text.out).toContain("crafter profile update")
    expect(JSON.parse((await run(["get", "--json"])).out)).toEqual({ member: null, onboardingUrl: "https://crafter.run/en/onboarding" })
  })
})

describe("crafter profile update", () => {
  test("partial update dry-run shows only changed fields and writes nothing", async () => {
    const { run, puts } = harness(member, { "p.json": JSON.stringify({ bio: "Building agents.", githubUrl: "https://github.com/ada" }) })
    const { code, out } = await run(["update", "--file", "p.json"])
    expect(code).toBe(0)
    expect(out).toContain('bio: "Building compilers." -> "Building agents."')
    expect(out).not.toContain("githubUrl")
    expect(out).toContain("--confirm")
    expect(puts).toHaveLength(0)
  })

  test("--confirm sends the merged profile, keeping untouched fields", async () => {
    const { run, puts } = harness(member, { "p.json": JSON.stringify({ bio: "Building agents.", basedLocation: { city: "Lima", countryCode: "pe" } }) })
    const { code, out } = await run(["update", "--file", "p.json", "--confirm", "--json"])
    expect(code).toBe(0)
    expect(puts).toHaveLength(1)
    expect(puts[0]).toMatchObject({
      handle: "ada",
      displayName: "Ada Lovelace",
      bio: "Building agents.",
      currentRole: "Engineer",
      rolesOpenTo: ["Staff Engineer"],
      githubUrl: "https://github.com/ada",
      originLocation: { city: "London", countryCode: "GB" },
      basedLocation: { city: "Lima", country: "Peru", countryCode: "PE" },
    })
    const parsed = JSON.parse(out)
    expect(parsed.applied).toBe(true)
    expect(parsed.changes.map((c: { field: string }) => c.field).sort()).toEqual(["basedLocation", "bio"])
  })

  test("null clears a field", async () => {
    const { run, puts } = harness(member, { "p.json": '{"currentRole":null}' })
    await run(["update", "--file", "p.json", "--confirm"])
    expect(puts[0]!.currentRole).toBeNull()
  })

  test("no-op update reports no changes and does not write", async () => {
    const { run, puts } = harness(member, { "p.json": '{"bio":"Building compilers."}' })
    const { code, out } = await run(["update", "--file", "p.json", "--confirm"])
    expect(code).toBe(0)
    expect(out).toContain("No changes")
    expect(puts).toHaveLength(0)
  })

  test("creates a profile when none exists, reading stdin", async () => {
    const { run, puts } = harness(null, {}, '{"handle":"Grace","displayName":"Grace Hopper"}')
    const dry = await run(["update", "--file", "-"])
    expect(dry.out).toContain("would create your profile")
    expect(dry.out).toContain('handle: (empty) -> "grace"')
    expect(puts).toHaveLength(0)
    const done = await run(["update", "--file", "-", "--confirm"])
    expect(done.code).toBe(0)
    expect(puts[0]).toMatchObject({ handle: "grace", displayName: "Grace Hopper" })
  })

  test("create without required fields exits 2 and names the fields", async () => {
    const { run, puts } = harness(null, { "p.json": '{"bio":"hi"}' })
    const { code, err } = await run(["update", "--file", "p.json", "--confirm"])
    expect(code).toBe(2)
    expect(err).toContain("handle:")
    expect(err).toContain("displayName:")
    expect(puts).toHaveLength(0)
  })

  test("validation errors name field and reason, as JSON on stderr with --json", async () => {
    const { run } = harness(member, { "p.json": JSON.stringify({ bio: "x".repeat(300), githubUrl: "https://example.com/ada", xUrl: "nope" }) })
    const { code, err, out } = await run(["update", "--file", "p.json", "--json"])
    expect(code).toBe(2)
    expect(out).toBe("")
    const parsed = JSON.parse(err)
    expect(parsed.error.code).toBe("validation_failed")
    const fields = [...new Set(parsed.error.issues.map((i: { field: string }) => i.field))].sort()
    expect(fields).toEqual(["bio", "githubUrl", "xUrl"])
    expect(parsed.error.issues.find((i: { field: string }) => i.field === "githubUrl").message).toContain("github.com")
  })

  test("contract cross-field rules apply to the merged profile", async () => {
    const { run } = harness(member, { "p.json": '{"workArrangements":["hybrid"]}' })
    const { code, err } = await run(["update", "--file", "p.json"])
    expect(code).toBe(2)
    expect(err).toContain("onsiteCity: Add the city")
  })

  test("rejects unknown keys, bad JSON, missing file and bad flags with exit 2", async () => {
    const { run } = harness(member, { "bad.json": "{nope", "typo.json": '{"bioo":"x"}', "arr.json": "[]" })
    const typo = await run(["update", "--file", "typo.json"])
    expect(typo.code).toBe(2)
    expect(typo.err).toContain("Unknown profile field: bioo")
    expect((await run(["update", "--file", "bad.json"])).code).toBe(2)
    expect((await run(["update", "--file", "arr.json"])).code).toBe(2)
    expect((await run(["update", "--file", "missing.json"])).err).toContain("Cannot read missing.json")
    expect((await run(["update"])).code).toBe(2)
    expect((await run(["update", "--file"])).code).toBe(2)
    expect((await run(["update", "--bogus"])).code).toBe(2)
    expect((await run(["frobnicate"])).code).toBe(2)
  })

  test("API failures exit 1 with the API message", async () => {
    const { run } = harness(member, { "p.json": '{"bio":"New bio"}' }, "", new Error("Too many profile updates. Try again in one minute."))
    const { code, err } = await run(["update", "--file", "p.json", "--confirm"])
    expect(code).toBe(1)
    expect(err).toContain("Too many profile updates")
  })

  test("help lists commands and exit codes", async () => {
    const { run } = harness(member)
    const { code, out } = await run(["--help"])
    expect(code).toBe(0)
    expect(out).toContain("crafter profile update --file <path|-> [--confirm] [--json]")
    expect(out).toContain("Exit codes")
  })
})
