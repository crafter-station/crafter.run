import { describe, expect, test } from "bun:test"
import {
  assertAuthorizationClient,
  assertInteractiveLogin,
  browserCommand,
  createPkce,
  macOSCredentialSaveArgs,
  pkceChallenge,
  revocationToken,
  tokenEndpointError,
  windowsCredentialScript,
} from "../src/auth"

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

describe("Windows credential storage", () => {
  test("loads WinRT credential types before constructing them", () => {
    const script = windowsCredentialScript("save")
    expect(script).toContain(
      "$null=[Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime]",
    )
    expect(script).toContain(
      "$null=[Windows.Security.Credentials.PasswordCredential,Windows.Security.Credentials,ContentType=WindowsRuntime]",
    )
    expect(script.indexOf("ContentType=WindowsRuntime]")).toBeLessThan(script.indexOf("New-Object Windows.Security.Credentials.PasswordVault"))
  })

  test("turns credential errors into process failures for every action", () => {
    for (const action of ["read", "save", "delete"] as const) {
      expect(windowsCredentialScript(action).startsWith("$ErrorActionPreference='Stop';")).toBe(true)
    }
  })

  test("verifies saved credentials can be retrieved", () => {
    const script = windowsCredentialScript("save")
    expect(script).toContain("$saved=$v.Retrieve('run.crafter.cli.oauth','credentials')")
    expect(script).toContain("$saved.RetrievePassword()")
    expect(script).toContain("if($saved.Password-ne$p){throw 'Credential verification failed'}")
  })
})

describe("browser launch", () => {
  test("passes a Windows OAuth URL without cmd.exe interpreting its query string", () => {
    const url = "https://clerk.crafter.run/oauth/authorize?response_type=code&client_id=9U4JdcAfQEXxE6Wi&state=test"
    expect(browserCommand(url, "win32")).toEqual(["rundll32.exe", ["url.dll,FileProtocolHandler", url]])
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

const invalidClientMessage =
  "Crafter's OAuth client 9U4JdcAfQEXxE6Wi is unavailable on https://clerk.crafter.run: The requested OAuth 2.0 Client does not exist. " +
  "Update the CLI with `npm install --global @crafter/cli@latest` and retry. If the latest version still fails, report this at " +
  "https://github.com/crafter-station/crafter.run/issues."

describe("OAuth errors", () => {
  test("makes a rejected client configuration actionable", () => {
    expect(
      tokenEndpointError(401, {
        error: "invalid_client",
        error_description: "The requested OAuth 2.0 Client does not exist.",
      }).message,
    ).toBe(invalidClientMessage)
  })

  test("reports other token endpoint failures with their status", () => {
    expect(tokenEndpointError(400, { error: "invalid_grant", error_description: "Expired." }).message).toBe(
      "OAuth token endpoint returned 400: Expired",
    )
  })
})

describe("authorization preflight", () => {
  const redirect = (location: string) => new Response(null, { status: 302, headers: { location } })

  test("accepts a client the issuer redirects to sign-in", async () => {
    const seen: string[] = []
    const fetchImpl = (async (input: string | URL) => {
      seen.push(String(input))
      if (seen.length === 1) return redirect("https://clerk.crafter.run/oauth/authorize/continue?client_id=ok")
      if (seen.length === 2) return redirect("https://accounts.crafter.run/sign-in")
      return new Response("<html>sign in</html>", { status: 200 })
    }) as unknown as typeof fetch

    await assertAuthorizationClient("https://clerk.crafter.run/oauth/authorize?client_id=ok", fetchImpl)
    expect(seen).toHaveLength(3)
    expect(seen[2]).toBe("https://accounts.crafter.run/sign-in")
  })

  test("rejects an unknown client before a browser opens", async () => {
    const fetchImpl = (async (input: string | URL) =>
      String(input).includes("continue")
        ? new Response(
            JSON.stringify({
              error: "invalid_client",
              error_description: "Client authentication failed. The requested OAuth 2.0 Client does not exist.",
            }),
            { status: 401, headers: { "content-type": "application/json" } },
          )
        : redirect("https://clerk.crafter.run/oauth/authorize/continue?client_id=gone")) as unknown as typeof fetch

    await expect(assertAuthorizationClient("https://clerk.crafter.run/oauth/authorize?client_id=gone", fetchImpl)).rejects.toThrow(
      "Crafter's OAuth client 9U4JdcAfQEXxE6Wi is unavailable on https://clerk.crafter.run",
    )
  })

  test("does not block login when the issuer is unreachable", async () => {
    const fetchImpl = (async () => {
      throw new Error("network down")
    }) as unknown as typeof fetch

    expect(await assertAuthorizationClient("https://clerk.crafter.run/oauth/authorize", fetchImpl)).toBeUndefined()
  })

  test("ignores unrelated authorization failures", async () => {
    const fetchImpl = (async () =>
      new Response(JSON.stringify({ error: "invalid_scope" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })) as unknown as typeof fetch

    expect(await assertAuthorizationClient("https://clerk.crafter.run/oauth/authorize", fetchImpl)).toBeUndefined()
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
