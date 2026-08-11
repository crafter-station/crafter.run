import { describe, expect, test } from "bun:test"
import { createPkce, macOSCredentialSaveArgs, pkceChallenge } from "../src/auth"

describe("PKCE", () => {
  test("matches the RFC 7636 S256 example", () => {
    expect(pkceChallenge("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")).toBe(
      "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
    )
  })

  test("creates a valid high-entropy verifier", () => {
    const first = createPkce()
    const second = createPkce()
    expect(first.verifier).toMatch(/^[A-Za-z0-9_-]{43,128}$/)
    expect(first.challenge).toBe(pkceChallenge(first.verifier))
    expect(first.verifier).not.toBe(second.verifier)
  })
})

describe("macOS credential storage", () => {
  test("passes the credential value after the password flag", () => {
    expect(macOSCredentialSaveArgs("serialized-credential")).toEqual([
      "add-generic-password",
      "-U",
      "-a",
      "credentials",
      "-s",
      "run.crafter.cli.oauth",
      "-w",
      "serialized-credential",
    ])
  })
})
