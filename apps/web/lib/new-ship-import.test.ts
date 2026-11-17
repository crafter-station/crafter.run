import { describe, expect, test } from "bun:test"

import { parseLink, tokenizeLinks } from "./new-ship-import"

describe("link validation", () => {
  test("repositories and websites become canonical URLs", () => {
    expect(parseLink("github.com/me/seats")).toBe("https://github.com/me/seats")
    expect(parseLink("me/tinte")).toBe("https://github.com/me/tinte")
    expect(parseLink("https://github.com/Me/Seats.git")).toBe("https://github.com/Me/Seats")
    expect(parseLink("polmarza.com")).toBe("https://polmarza.com/")
    expect(parseLink("https://x.dev/app?ref=1")).toBe("https://x.dev/app?ref=1")
  })

  test("anything we cannot import is rejected", () => {
    for (const value of ["", "hola", "foo bar", "localhost:3000", "http://", "ftp://x.dev", "javascript:alert(1)", "https://user:pw@x.dev", "github.com", "https://github.com/railly", "x.d3v", "-bad.com"]) {
      expect(parseLink(value)).toBeNull()
    }
  })
})

describe("several links", () => {
  test("splits on lines, spaces and commas, keeps invalid parts apart", () => {
    expect(tokenizeLinks("github.com/me/seats\npolmarza.com, hola  https://x.dev/")).toEqual({
      valid: ["https://github.com/me/seats", "https://polmarza.com/", "https://x.dev/"],
      invalid: ["hola"],
    })
  })

  test("the same project counts once, including links already added", () => {
    expect(tokenizeLinks("https://github.com/Me/Seats.git github.com/me/seats/ x.dev https://x.dev/").valid).toHaveLength(2)
    expect(tokenizeLinks("me/seats polmarza.com", ["https://github.com/me/seats"]).valid).toEqual(["https://polmarza.com/"])
  })

  test("blank input has nothing", () => {
    expect(tokenizeLinks("  \n , ")).toEqual({ valid: [], invalid: [] })
  })
})

describe("unreachable sites", () => {
  test("a site that does not answer fails the import instead of becoming a Ship named after its host", async () => {
    const { ImportError, importShipFromLink } = await import("./new-ship-draft")
    const unreachable = async () => {
      throw new ImportError("siteUnreachable")
    }
    await expect(importShipFromLink("asdfgithub.com/railly/x", { pageMeta: unreachable })).rejects.toMatchObject({ key: "siteUnreachable" })
    const reachable = await importShipFromLink("polmarza.com", { pageMeta: async () => null })
    expect(reachable.fields.website).toBe("https://polmarza.com")
  })
})
