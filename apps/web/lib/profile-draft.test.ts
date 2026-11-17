import { describe, expect, test } from "bun:test"
import { upsertMemberRequestSchema } from "@crafter/contracts"

import { orderedCountries, PRIORITY_COUNTRY_CODES } from "./countries"
import { draftFromGithub } from "./github-profile"
import { applyProfileFields } from "./onboarding-webmcp"
import { parsePlaceText } from "./place"
import { draftToRequest, emptyDraft, isDraftReady, linkToUrl, slugifyHandle, socialUsername, validateDraft } from "./profile-draft"

describe("links", () => {
  test("a bare username becomes the profile URL", () => {
    expect(linkToUrl("github", "railly")).toBe("https://github.com/railly")
    expect(linkToUrl("x", "@railly")).toBe("https://x.com/railly")
    expect(linkToUrl("linkedin", "railly-hugo")).toBe("https://www.linkedin.com/in/railly-hugo")
  })
  test("a pasted URL is reduced to its username", () => {
    expect(socialUsername("github", "https://github.com/railly/")).toBe("railly")
    expect(socialUsername("linkedin", "https://www.linkedin.com/in/railly-hugo/")).toBe("railly-hugo")
    expect(socialUsername("x", "twitter.com/railly")).toBe("railly")
  })
  test("websites get a scheme and empty links stay null", () => {
    expect(linkToUrl("website", "railly.dev")).toBe("https://railly.dev")
    expect(linkToUrl("website", "http://a.dev")).toBe("http://a.dev")
    expect(linkToUrl("github", "  ")).toBeNull()
  })
})

describe("draft", () => {
  test("only handle and name are required", () => {
    const draft = { ...emptyDraft(), handle: "ada", displayName: "Ada" }
    expect(isDraftReady(draft)).toBe(true)
    expect(isDraftReady({ ...draft, displayName: "" })).toBe(false)
    expect(isDraftReady({ ...draft, handle: "a" })).toBe(false)
    expect(validateDraft(draft)).toEqual({})
    expect(upsertMemberRequestSchema.safeParse(draftToRequest(draft, null)).success).toBe(true)
  })
  test("a full draft passes the API schema", () => {
    const draft = {
      ...emptyDraft(),
      handle: "ada",
      displayName: "Ada Lovelace",
      bio: "Maths",
      rolesOpenTo: ["Engineer"],
      origin: parsePlaceText("Lima, Peru"),
      based: parsePlaceText("Buenos Aires"),
      links: { ...emptyDraft().links, github: "ada", website: "ada.dev" },
    }
    const parsed = upsertMemberRequestSchema.safeParse(draftToRequest(draft, null))
    expect(parsed.success).toBe(true)
    expect(parsed.success && parsed.data.originLocation?.countryCode).toBe("PE")
    expect(parsed.success && parsed.data.basedLocation?.countryCode).toBe("AR")
  })
  test("handles are slugified or dropped", () => {
    expect(slugifyHandle("Ada Lovelace")).toBe("ada-lovelace")
    expect(slugifyHandle("ñu")).toBe("")
  })
})

describe("places", () => {
  test("parses city and country text", () => {
    expect(parsePlaceText("Lima, Peru")).toMatchObject({ city: "Lima", countryCode: "PE" })
    expect(parsePlaceText("Córdoba, Spain")).toMatchObject({ countryCode: "ES" })
    expect(parsePlaceText("Peru")).toMatchObject({ city: null, countryCode: "PE" })
    expect(parsePlaceText("Atlantis")).toMatchObject({ city: "Atlantis", countryCode: null })
    expect(parsePlaceText("")).toBeNull()
  })
  test("Latin America and Spain lead the country list", () => {
    const codes = orderedCountries("en").map((country) => country.code)
    expect(codes.slice(0, 6)).toEqual(["PE", "AR", "MX", "CO", "CL", "ES"])
    expect(codes.slice(0, PRIORITY_COUNTRY_CODES.length)).toEqual([...PRIORITY_COUNTRY_CODES])
    expect(new Set(codes).size).toBe(codes.length)
  })
})

describe("github prefill", () => {
  test("maps a public profile onto the draft", () => {
    const draft = draftFromGithub("Ada-L", {
      name: "Ada Lovelace",
      bio: "Maths  and\nengines",
      blog: "ada.dev",
      location: "Lima, Peru",
      twitter_username: "ada",
    })
    expect(draft.handle).toBe("ada-l")
    expect(draft.displayName).toBe("Ada Lovelace")
    expect(draft.bio).toBe("Maths and engines")
    expect(draft.based).toMatchObject({ city: "Lima", countryCode: "PE" })
    expect(draft.links).toMatchObject({ github: "Ada-L", website: "ada.dev", x: "ada" })
  })
  test("a failed lookup still yields the username", () => {
    const draft = draftFromGithub("ada", null)
    expect(draft.handle).toBe("ada")
    expect(draft.links?.github).toBe("ada")
  })
})

describe("webmcp fill", () => {
  const base = emptyDraft()
  test("applies valid fields and reports invalid ones without changing them", () => {
    const result = applyProfileFields(base, {
      handle: "Ada L",
      displayName: "Ada",
      bio: "x".repeat(300),
      rolesOpenTo: ["Engineer", "Designer"],
      origin: "Lima, Peru",
      links: { github: "ada", myspace: "ada", linkedin: "bad name with spaces" },
    })
    expect(result.draft.handle).toBe("ada-l")
    expect(result.draft.displayName).toBe("Ada")
    expect(result.draft.bio).toBe("")
    expect(result.draft.origin?.countryCode).toBe("PE")
    expect(result.draft.links.github).toBe("ada")
    expect(result.rejected.map((entry) => entry.field).sort()).toEqual(["bio", "links.linkedin", "links.myspace"])
    expect(result.draft.links.linkedin).toBe("")
  })
  test("rejects wrong types", () => {
    const result = applyProfileFields(base, { isJobSeeking: "yes", rolesOpenTo: "Engineer" })
    expect(result.applied).toEqual([])
    expect(result.rejected).toHaveLength(2)
  })
})
