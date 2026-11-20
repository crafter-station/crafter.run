import { describe, expect, test } from "bun:test"

import { hackathons, hackathonUi } from "@/lib/hackathons"
import { locales } from "@/lib/i18n"
import { hackathonSchema, organizationSchema, organizationRef } from "@/lib/structured-data"

describe("hackathons", () => {
  test("every hackathon has copy for every locale, without em dashes", () => {
    for (const hackathon of hackathons) {
      for (const locale of locales) {
        const text = JSON.stringify(hackathon.copy[locale])
        expect(hackathon.copy[locale].summary.length).toBeGreaterThan(0)
        expect(text.includes("—")).toBe(false)
      }
    }
    for (const locale of locales) expect(hackathonUi[locale].eyebrow.length).toBeGreaterThan(0)
  })

  test("schema names the Crafter organization as organizer", () => {
    const [first] = hackathons
    const schema = hackathonSchema(first, "en", first.copy.en.summary)
    expect(schema.organizer).toEqual(organizationRef)
    expect(schema.startDate).toBe("2025-11-29")
    expect(schema.sameAs).toBe("https://peru.ai-hackathon.co")
  })
})

describe("organizationSchema", () => {
  test("names the founder, the founding place and hack0", () => {
    const org = organizationSchema("en")
    expect(org.founder.name).toBe("Railly Hugo")
    expect(org.foundingLocation.name).toBe("Lima, Peru")
    expect(org.subOrganization["@id"]).toBe("https://hack0.dev/#organization")
    expect(org.sameAs).not.toContain("https://hack0.dev")
    expect(org.sameAs).toContain("https://daily.dev/squads/crafterstation")
    expect(org.sameAs).toContain("https://www.linkedin.com/company/crafter-station")
    expect(org.sameAs).not.toContain("https://luma.com/hack0")
  })
})
