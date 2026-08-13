import { describe, expect, test } from "bun:test"
import { config, resolveOAuthEnvironment } from "../src/config"

describe("production defaults", () => {
  test("uses the production Clerk OAuth application", () => {
    expect(config.oauthClientId).toBe("9U4JdcAfQEXxE6Wi")
    expect(config.authorizationUrl).toBe("https://clerk.crafter.run/oauth/authorize")
    expect(config.tokenUrl).toBe("https://clerk.crafter.run/oauth/token")
    expect(config.revocationUrl).toBe("https://clerk.crafter.run/oauth/token/revoke")
  })

  test("ignores the API's OAuth client variable", () => {
    expect(resolveOAuthEnvironment({ CRAFTER_OAUTH_CLIENT_ID: "ZvJqTLZaMx1hvFzz" }).oauthClientId).toBe("9U4JdcAfQEXxE6Wi")
  })
})

describe("OAuth overrides", () => {
  test("derives every endpoint from the overridden issuer", () => {
    expect(
      resolveOAuthEnvironment({
        CRAFTER_CLI_OAUTH_ISSUER: "https://nice-pelican-88.clerk.accounts.dev",
        CRAFTER_CLI_OAUTH_CLIENT_ID: "ZvJqTLZaMx1hvFzz",
      }),
    ).toEqual({
      oauthClientId: "ZvJqTLZaMx1hvFzz",
      authorizationUrl: "https://nice-pelican-88.clerk.accounts.dev/oauth/authorize",
      tokenUrl: "https://nice-pelican-88.clerk.accounts.dev/oauth/token",
      revocationUrl: "https://nice-pelican-88.clerk.accounts.dev/oauth/token/revoke",
    })
  })

  test("tolerates a trailing slash on the issuer", () => {
    expect(
      resolveOAuthEnvironment({
        CRAFTER_CLI_OAUTH_ISSUER: "https://clerk.crafter.run/",
        CRAFTER_CLI_OAUTH_CLIENT_ID: "9U4JdcAfQEXxE6Wi",
      }).tokenUrl,
    ).toBe("https://clerk.crafter.run/oauth/token")
  })

  test("rejects a client without an issuer", () => {
    expect(() => resolveOAuthEnvironment({ CRAFTER_CLI_OAUTH_CLIENT_ID: "ZvJqTLZaMx1hvFzz" })).toThrow(
      "CRAFTER_CLI_OAUTH_CLIENT_ID is set but CRAFTER_CLI_OAUTH_ISSUER is not.",
    )
  })

  test("rejects an issuer without a client", () => {
    expect(() => resolveOAuthEnvironment({ CRAFTER_CLI_OAUTH_ISSUER: "https://clerk.crafter.run" })).toThrow(
      "CRAFTER_CLI_OAUTH_ISSUER is set but CRAFTER_CLI_OAUTH_CLIENT_ID is not.",
    )
  })

  test("rejects an issuer that is not an absolute URL", () => {
    expect(() =>
      resolveOAuthEnvironment({ CRAFTER_CLI_OAUTH_ISSUER: "clerk.crafter.run", CRAFTER_CLI_OAUTH_CLIENT_ID: "9U4JdcAfQEXxE6Wi" }),
    ).toThrow("CRAFTER_CLI_OAUTH_ISSUER must be an absolute URL")
  })
})
