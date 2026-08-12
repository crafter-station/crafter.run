import { describe, expect, spyOn, test } from "bun:test"
import {
  countryCodeToFlagEmoji,
  editableShipLinkSchema,
  formatLocationLabel,
  formatProfileLocationLine,
  memberProfileSchema,
  searchProfileCities,
  shipDraftInputSchema,
  updateShipDraftRequestSchema,
  updatePublishedShipRequestSchema,
  upsertMemberRequestSchema,
} from "@crafter/contracts"

import app from "../src/index"
import { moderateShip } from "../src/moderation"

describe("Crafter API", () => {
  test("reports health", async () => {
    const response = await app.request("/health")
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: "ok" })
  })

  test("returns structured validation errors", async () => {
    const response = await app.request("/v1/ship-drafts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: { code: "validation_error" } })
  })

  test("requires explicit publish confirmation", async () => {
    const response = await app.request("/v1/ship-drafts/71fcfa4f-31c8-4660-bad9-0b73875a2580/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ confirm: false }),
    })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: { code: "validation_error" } })
  })

  test("validates Ship updates", async () => {
    const response = await app.request("/v1/ships/example-ship/updates", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "", description: "no" }),
    })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: { code: "validation_error" } })
  })

  test("preserves social post query strings", () => {
    const input = shipDraftInputSchema.parse({
      slug: "video-ship",
      name: "Video Ship",
      tagline: "A Ship announced with a video",
      description: "A sufficiently detailed description for this video-backed Ship.",
      socialPostUrl: "https://www.youtube.com/watch?v=abc123&t=10",
    })
    expect(input.socialPostUrl).toBe("https://www.youtube.com/watch?v=abc123&t=10")
  })

  test("does not default optional URLs on partial draft updates", () => {
    expect(updateShipDraftRequestSchema.parse({ tagline: "An updated Ship tagline" })).toEqual({
      tagline: "An updated Ship tagline",
    })
  })

  test("requires a revision and a change for published Ship edits", () => {
    expect(updatePublishedShipRequestSchema.safeParse({ expectedUpdatedAt: new Date().toISOString() }).success).toBe(false)
    expect(updatePublishedShipRequestSchema.safeParse({
      tagline: "An updated Ship tagline",
      expectedUpdatedAt: new Date().toISOString(),
    }).success).toBe(true)
  })

  test("validates published Ship edits before authentication", async () => {
    const response = await app.request("/v1/ships/example-ship", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ expectedUpdatedAt: new Date().toISOString() }),
    })
    expect(response.status).toBe(400)
  })

  test("validates Ship votes", async () => {
    const response = await app.request("/v1/ships/example-ship/vote", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ active: "yes" }),
    })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: { code: "validation_error" } })
  })

  test("requires authentication to vote for a Ship", async () => {
    const response = await app.request("/v1/ships/example-ship/vote", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ active: true }),
    })
    expect(response.status).toBe(401)
    expect(await response.json()).toMatchObject({ error: { code: "unauthorized" } })
  })

  test("reports an unavailable repository as 503", async () => {
    const previous = process.env.DATABASE_URL
    delete process.env.DATABASE_URL
    const consoleError = spyOn(console, "error").mockImplementation(() => {})
    try {
      const response = await app.request("/v1/ships")
      expect(response.status).toBe(503)
      expect(await response.json()).toMatchObject({ error: { code: "service_unavailable" } })
    } finally {
      consoleError.mockRestore()
      if (previous) process.env.DATABASE_URL = previous
    }
  })

  test("reports an unavailable member directory as 503", async () => {
    const previous = process.env.DATABASE_URL
    delete process.env.DATABASE_URL
    const consoleError = spyOn(console, "error").mockImplementation(() => {})
    try {
      const response = await app.request("/v1/members")
      expect(response.status).toBe(503)
      expect(await response.json()).toMatchObject({ error: { code: "service_unavailable" } })
    } finally {
      consoleError.mockRestore()
      if (previous) process.env.DATABASE_URL = previous
    }
  })
})

describe("Ship moderation", () => {
  test("deterministically rejects exposed credentials", async () => {
    const previous = process.env.OPENAI_API_KEY
    delete process.env.OPENAI_API_KEY
    try {
      const result = await moderateShip({
        name: "Unsafe Ship",
        tagline: "Contains a leaked credential",
        description: "Accidentally included sk_live_1234567890abcdef in this public description.",
      })
      expect(result.allowed).toBe(false)
    } finally {
      if (previous) process.env.OPENAI_API_KEY = previous
    }
  })
})

describe("Ship link identity", () => {
  test("normalizes equivalent repository URLs", () => {
    const first = editableShipLinkSchema.parse({ type: "repository", url: "https://GitHub.com/Crafter/Repo.git/?utm_source=test" })
    const second = editableShipLinkSchema.parse({ type: "repository", url: "https://github.com/crafter/repo" })
    expect(first.url).toBe(second.url)
  })
})

describe("Crafter profiles", () => {
  test("normalizes profile links and roles", () => {
    const profile = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      githubUrl: "https://GitHub.com/Test-Crafter/",
      gitlabUrl: "https://GitLab.com/Test-Crafter/",
      rolesOpenTo: [" Engineer ", "Engineer", "Designer"],
      isJobSeeking: true,
    })

    expect(profile.githubUrl).toBe("https://github.com/test-crafter")
    expect(profile.gitlabUrl).toBe("https://gitlab.com/Test-Crafter")
    expect(profile.rolesOpenTo).toEqual(["Engineer", "Designer"])
    expect(profile.isJobSeeking).toBe(true)
  })

  test("rejects social links from the wrong platform", () => {
    const result = upsertMemberRequestSchema.safeParse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      githubUrl: "https://example.com/test-crafter",
    })

    expect(result.success).toBe(false)
  })

  test("keeps omitted optional profile fields distinguishable from explicit clearing", () => {
    const omitted = upsertMemberRequestSchema.parse({ handle: "test-crafter", displayName: "Test Crafter" })
    const cleared = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      githubUrl: null,
      gitlabUrl: null,
      rolesOpenTo: [],
      isJobSeeking: false,
    })

    expect(Object.hasOwn(omitted, "githubUrl")).toBe(false)
    expect(Object.hasOwn(omitted, "rolesOpenTo")).toBe(false)
    expect(cleared).toMatchObject({ githubUrl: null, gitlabUrl: null, rolesOpenTo: [], isJobSeeking: false })
  })

  test("validates private career preferences", () => {
    const profile = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      salaryRange: { min: 80_000, max: 120_000, currency: "usd" },
      workArrangements: ["remote", "hybrid", "remote"],
      onsiteCity: " Lima, Peru ",
      resumeUrl: "https://example.com/resume.pdf?download=1",
    })

    expect(profile.salaryRange).toEqual({ min: 80_000, max: 120_000, currency: "USD" })
    expect(profile.workArrangements).toEqual(["remote", "hybrid"])
    expect(profile.onsiteCity).toBe("Lima, Peru")
    expect(profile.resumeUrl).toBe("https://example.com/resume.pdf?download=1")
  })

  test("rejects an inverted salary range", () => {
    const result = upsertMemberRequestSchema.safeParse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      salaryRange: { min: 120_000, max: 80_000, currency: "USD" },
    })

    expect(result.success).toBe(false)
  })

  test("requires an onsite city for onsite or hybrid work", () => {
    const missingCity = upsertMemberRequestSchema.safeParse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      workArrangements: ["hybrid"],
    })
    const remoteCity = upsertMemberRequestSchema.safeParse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      workArrangements: ["remote"],
      onsiteCity: "Lima, Peru",
    })

    expect(missingCity.success).toBe(false)
    expect(remoteCity.success).toBe(false)
  })

  test("public profiles strip private career preferences", () => {
    const publicProfile = memberProfileSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      avatarUrl: null,
      bio: null,
      githubUrl: null,
      gitlabUrl: null,
      linkedinUrl: null,
      instagramUrl: null,
      xUrl: null,
      primaryWebsiteUrl: null,
      secondaryWebsiteUrl: null,
      currentRole: null,
      rolesOpenTo: [],
      isJobSeeking: true,
      originLocation: {
        city: "Lima",
        region: "Lima",
        country: "Peru",
        countryCode: "PE",
        latitude: null,
        longitude: null,
        placeId: null,
        provider: null,
        confidence: null,
      },
      basedLocation: null,
      createdAt: new Date().toISOString(),
      salaryRange: { min: 80_000, max: 120_000, currency: "USD" },
      workArrangements: ["remote"],
      onsiteCity: "Lima, Peru",
      resumeUrl: "https://example.com/resume.pdf",
    })

    expect(Object.hasOwn(publicProfile, "salaryRange")).toBe(false)
    expect(Object.hasOwn(publicProfile, "resumeUrl")).toBe(false)
    expect(publicProfile.originLocation).toMatchObject({ city: "Lima", country: "Peru", countryCode: "PE" })
    expect(publicProfile.basedLocation).toBeNull()
  })

  test("accepts structured origin and based locations", () => {
    const profile = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      originLocation: { city: "Lima", countryCode: "pe" },
      basedLocation: { city: "Mexico City", country: "Mexico", countryCode: "MX", region: "Mexico City" },
    })

    expect(profile.originLocation).toEqual({
      city: "Lima",
      region: null,
      country: "Peru",
      countryCode: "PE",
    })
    expect(profile.basedLocation).toEqual({
      city: "Mexico City",
      region: "Mexico City",
      country: "Mexico",
      countryCode: "MX",
    })
  })

  test("keeps a single location and treats empty location objects as cleared", () => {
    const basedOnly = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      basedLocation: { city: "Madrid", country: "Spain" },
    })
    const cleared = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      originLocation: {},
      basedLocation: null,
    })

    expect(Object.hasOwn(basedOnly, "originLocation")).toBe(false)
    expect(basedOnly.basedLocation).toEqual({
      city: "Madrid",
      region: null,
      country: "Spain",
      countryCode: "ES",
    })
    expect(cleared.originLocation).toBeNull()
    expect(cleared.basedLocation).toBeNull()
  })

  test("allows a city-only fallback without guessing the country", () => {
    const profile = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      originLocation: { city: "Córdoba" },
    })

    expect(profile.originLocation).toEqual({
      city: "Córdoba",
      region: null,
      country: null,
      countryCode: null,
    })
    expect(formatLocationLabel(profile.originLocation)).toBe("Córdoba")
    expect(countryCodeToFlagEmoji(profile.originLocation?.countryCode)).toBeNull()
    expect(formatProfileLocationLine(profile.originLocation, null)).toBe("From Córdoba")
  })

  test("keeps ambiguous cities distinct when country context is present", () => {
    const argentina = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      originLocation: { city: "Córdoba", country: "Argentina", countryCode: "AR" },
    })
    const spain = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      basedLocation: { city: "Córdoba", country: "Spain", countryCode: "ES" },
    })
    const matches = searchProfileCities("cordoba")

    expect(formatProfileLocationLine(argentina.originLocation, spain.basedLocation)).toBe(
      "🇦🇷 From Córdoba, Argentina · 🇪🇸 Based in Córdoba, Spain",
    )
    expect(matches.map((city) => `${city.city}, ${city.countryCode}`)).toEqual([
      "Córdoba, AR",
      "Córdoba, ES",
    ])
  })

  test("rejects unreliable country codes instead of inventing flags", () => {
    const invalid = upsertMemberRequestSchema.safeParse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      originLocation: { city: "Nowhere", countryCode: "XX" },
    })

    expect(invalid.success).toBe(false)
    expect(countryCodeToFlagEmoji("XX")).toBeNull()
    expect(countryCodeToFlagEmoji("PE")).toBe("🇵🇪")
  })

  test("strips client-supplied geocoding metadata from profile writes", () => {
    const profile = upsertMemberRequestSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      originLocation: {
        city: "Lima",
        countryCode: "PE",
        latitude: -12.0464,
        longitude: -77.0428,
        placeId: "secret-place",
        provider: "google",
        confidence: 0.9,
      },
    })

    expect(profile.originLocation).toEqual({
      city: "Lima",
      region: null,
      country: "Peru",
      countryCode: "PE",
    })
    expect(profile.originLocation && "latitude" in profile.originLocation).toBe(false)
  })

  test("existing profiles remain valid without location data", () => {
    const omitted = upsertMemberRequestSchema.parse({ handle: "test-crafter", displayName: "Test Crafter" })
    const publicProfile = memberProfileSchema.parse({
      handle: "test-crafter",
      displayName: "Test Crafter",
      avatarUrl: null,
      bio: null,
      githubUrl: null,
      gitlabUrl: null,
      linkedinUrl: null,
      instagramUrl: null,
      xUrl: null,
      primaryWebsiteUrl: null,
      secondaryWebsiteUrl: null,
      currentRole: null,
      rolesOpenTo: [],
      isJobSeeking: false,
      originLocation: null,
      basedLocation: null,
      createdAt: new Date().toISOString(),
    })

    expect(Object.hasOwn(omitted, "originLocation")).toBe(false)
    expect(Object.hasOwn(omitted, "basedLocation")).toBe(false)
    expect(publicProfile.originLocation).toBeNull()
    expect(publicProfile.basedLocation).toBeNull()
    expect(formatProfileLocationLine(publicProfile.originLocation, publicProfile.basedLocation)).toBeNull()
  })
})
