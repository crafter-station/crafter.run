import { describe, expect, test } from "bun:test"
import { config } from "../src/config"

describe("production defaults", () => {
  test("uses the production Clerk OAuth application", () => {
    expect(config.oauthClientId).toBe("9U4JdcAfQEXxE6Wi")
    expect(config.authorizationUrl).toBe("https://clerk.crafter.run/oauth/authorize")
    expect(config.tokenUrl).toBe("https://clerk.crafter.run/oauth/token")
    expect(config.revocationUrl).toBe("https://clerk.crafter.run/oauth/token/revoke")
  })

  test("ignores OAuth environment variables", () => {
    const values = {
      CRAFTER_CLI_OAUTH_ISSUER: "https://nice-pelican-88.clerk.accounts.dev",
      CRAFTER_CLI_OAUTH_CLIENT_ID: "ZvJqTLZaMx1hvFzz",
      CRAFTER_OAUTH_CLIENT_ID: "ZvJqTLZaMx1hvFzz",
      CRAFTER_OAUTH_AUTHORIZATION_URL: "https://example.com/authorize",
      CRAFTER_OAUTH_TOKEN_URL: "https://example.com/token",
      CRAFTER_OAUTH_REVOCATION_URL: "https://example.com/revoke",
    }
    const previous = Object.fromEntries(Object.keys(values).map((name) => [name, process.env[name]]))
    Object.assign(process.env, values)

    try {
      expect(config).toMatchObject({
        oauthClientId: "9U4JdcAfQEXxE6Wi",
        authorizationUrl: "https://clerk.crafter.run/oauth/authorize",
        tokenUrl: "https://clerk.crafter.run/oauth/token",
        revocationUrl: "https://clerk.crafter.run/oauth/token/revoke",
      })
    } finally {
      for (const [name, value] of Object.entries(previous)) {
        if (value === undefined) delete process.env[name]
        else process.env[name] = value
      }
    }
  })
})
