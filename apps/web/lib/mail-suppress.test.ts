import { createHash } from "node:crypto"
import { describe, expect, test } from "bun:test"
import { isSuppressed } from "@/lib/mail-suppress"

const sha = (value: string) => createHash("sha256").update(value).digest("hex")

describe("isSuppressed", () => {
  const list = `${sha("hidden@example.com")}, ${sha("@blocked.dev")}`

  test("matches a hashed email regardless of case and spaces", () => {
    expect(isSuppressed(" Hidden@Example.com ", list)).toBe(true)
  })

  test("matches every address of a hashed domain", () => {
    expect(isSuppressed("anyone@blocked.dev", list)).toBe(true)
  })

  test("lets everyone else through", () => {
    expect(isSuppressed("ada@example.com", list)).toBe(false)
    expect(isSuppressed("ada@example.com", undefined)).toBe(false)
    expect(isSuppressed("ada@example.com", " , ")).toBe(false)
  })
})
