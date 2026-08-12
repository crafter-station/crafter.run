import { describe, expect, test } from "bun:test"
import { assertInteractiveLogin, createPkce, macOSCredentialSaveArgs, pkceChallenge, revocationToken, tokenEndpointError } from "../src/auth"

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

describe("OAuth revocation", () => {
  test("revokes only the refresh token when one is available", () => {
    expect(revocationToken({ accessToken: "access", refreshToken: "refresh" })).toBe("refresh")
  })

  test("falls back to the access token", () => {
    expect(revocationToken({ accessToken: "access" })).toBe("access")
  })
})

describe("OAuth errors", () => {
  test("makes a rejected client configuration actionable", () => {
    expect(
      tokenEndpointError(401, {
        error: "invalid_client",
        error_description: "The requested OAuth 2.0 Client does not exist.",
      }).message,
    ).toBe(
      "OAuth client 9U4JdcAfQEXxE6Wi was rejected by https://clerk.crafter.run: The requested OAuth 2.0 Client does not exist. Update @crafter/cli and remove any CRAFTER_OAUTH_* environment overrides.",
    )
  })
})

describe("OAuth login", () => {
  test("rejects agent command runners that cannot keep the callback server alive", () => {
    expect(() => assertInteractiveLogin(false)).toThrow(
      "OAuth login requires an interactive terminal. Run `crafter login` yourself in a local terminal and leave it open until the browser confirms login.",
    )
  })

  test("allows a local interactive terminal", () => {
    expect(() => assertInteractiveLogin(true)).not.toThrow()
  })
})
