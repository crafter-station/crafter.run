import { describe, expect, test } from "bun:test"
import { config } from "../src/config"

describe("production defaults", () => {
  test("uses the production Clerk OAuth application", () => {
    expect(config.oauthClientId).toBe("9U4JdcAfQEXxE6Wi")
    expect(config.authorizationUrl).toBe("https://clerk.crafter.run/oauth/authorize")
    expect(config.tokenUrl).toBe("https://clerk.crafter.run/oauth/token")
    expect(config.revocationUrl).toBe("https://clerk.crafter.run/oauth/token/revoke")
  })
})
