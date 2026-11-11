import { describe, expect, test } from "bun:test"

import { assetInput, slugify } from "./core-inventory-input"

const base = { slug: "crafter-tiktok", kind: "social", name: "Crafter TikTok", url: "", status: "unknown", visibility: "core", owner: "", access: [], perk: "", notes: "", secretRef: "" }

describe("assetInput", () => {
  test("empty optional fields become null", () => {
    const asset = assetInput.parse(base)
    expect(asset.url).toBeNull()
    expect(asset.owner).toBeNull()
    expect(asset.notes).toBeNull()
  })

  test("omitted optional fields become null too, so a seed file can leave them out", () => {
    const asset = assetInput.parse({ slug: "demo", kind: "tool", name: "Demo", status: "alive", visibility: "core" })
    expect(asset).toMatchObject({ url: null, owner: null, perk: null, notes: null, secretRef: null, access: [] })
  })

  test("owner and access must be active team members, and access is deduplicated", () => {
    expect(assetInput.parse({ ...base, owner: "liz", access: ["railly", "liz", "railly"] }).access).toEqual(["railly", "liz"])
    expect(assetInput.safeParse({ ...base, owner: "someone-else" }).success).toBe(false)
    expect(assetInput.safeParse({ ...base, access: ["shiara"] }).success).toBe(false)
  })

  test("refuses anything that looks like a credential", () => {
    for (const notes of ["password: hunter2", "contraseña = abc123", "key sk_live_abcdefgh1234", "ghp_abcdefghijklmnopqrstuvwxyz"]) {
      expect(assetInput.safeParse({ ...base, notes }).success).toBe(false)
    }
    expect(assetInput.safeParse({ ...base, secretRef: "password=abc" }).success).toBe(false)
    expect(assetInput.parse({ ...base, secretRef: "bitwarden:Crafter/tiktok", notes: "cambiar la contraseña del correo" }).secretRef).toBe("bitwarden:Crafter/tiktok")
  })

  test("rejects unknown kinds, statuses, visibilities and bad slugs", () => {
    expect(assetInput.safeParse({ ...base, kind: "repo" }).success).toBe(false)
    expect(assetInput.safeParse({ ...base, status: "maybe" }).success).toBe(false)
    expect(assetInput.safeParse({ ...base, visibility: "everyone" }).success).toBe(false)
    expect(assetInput.safeParse({ ...base, slug: "Crafter TikTok" }).success).toBe(false)
  })
})

test("slugify strips accents and punctuation", () => {
  expect(slugify("Correo compartido (Gmail)")).toBe("correo-compartido-gmail")
  expect(slugify("Diseño · Figma")).toBe("diseno-figma")
})
