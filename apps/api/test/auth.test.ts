import { describe, expect, test } from "bun:test"
import { authenticateUserWithClerk } from "../src/auth"

const request = new Request("https://api.crafter.run/v1/me", {
  headers: { authorization: "Bearer test-token" },
})

describe("API authentication", () => {
  test("verifies OAuth tokens without session authorized parties", async () => {
    const calls: unknown[] = []
    const clerk = {
      async authenticateRequest(_request: Request, options: unknown) {
        calls.push(options)
        return {
          isAuthenticated: true,
          toAuth: () => ({ clientId: "cli-client", tokenType: "oauth_token" as const, userId: "user_123" }),
        }
      },
    }

    await expect(authenticateUserWithClerk(request, clerk, "cli-client", ["https://crafter.run"])).resolves.toEqual({
      clerkUserId: "user_123",
      tokenType: "oauth_token",
    })
    expect(calls).toEqual([{ acceptsToken: "oauth_token" }])
  })

  test("rejects OAuth tokens issued to another client", async () => {
    const clerk = {
      async authenticateRequest() {
        return {
          isAuthenticated: true,
          toAuth: () => ({ clientId: "other-client", tokenType: "oauth_token" as const, userId: "user_123" }),
        }
      },
    }

    expect(await authenticateUserWithClerk(request, clerk, "cli-client", ["https://crafter.run"])).toBeNull()
  })

  test("keeps authorized-party validation for session tokens", async () => {
    const calls: unknown[] = []
    const clerk = {
      async authenticateRequest(_request: Request, options: { acceptsToken: string }) {
        calls.push(options)
        if (options.acceptsToken === "oauth_token") {
          return {
            isAuthenticated: false,
            toAuth: () => ({ tokenType: "oauth_token" as const, userId: "" }),
          }
        }
        return {
          isAuthenticated: true,
          toAuth: () => ({ tokenType: "session_token" as const, userId: "user_123" }),
        }
      },
    }

    await expect(authenticateUserWithClerk(request, clerk, "cli-client", ["https://crafter.run"])).resolves.toEqual({
      clerkUserId: "user_123",
      tokenType: "session_token",
    })
    expect(calls).toEqual([
      { acceptsToken: "oauth_token" },
      { acceptsToken: "session_token", authorizedParties: ["https://crafter.run"] },
    ])
  })
})
