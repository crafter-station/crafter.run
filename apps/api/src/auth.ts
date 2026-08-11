import { createClerkClient } from "@clerk/backend"

export type AuthenticatedUser = {
  clerkUserId: string
  tokenType: "session_token" | "oauth_token"
}

type AuthState = {
  isAuthenticated: boolean
  toAuth(): {
    clientId?: string
    tokenType: "session_token" | "oauth_token"
    userId: string
  }
}

type ClerkAuthClient = {
  authenticateRequest(
    request: Request,
    options: {
      acceptsToken: "session_token" | "oauth_token"
      authorizedParties?: string[]
    },
  ): Promise<AuthState>
}

export async function authenticateUserWithClerk(
  request: Request,
  clerk: ClerkAuthClient,
  oauthClientId: string | undefined,
  authorizedParties: string[],
): Promise<AuthenticatedUser | null> {
  if (oauthClientId) {
    const oauthState = await clerk.authenticateRequest(request, { acceptsToken: "oauth_token" })
    if (oauthState.isAuthenticated) {
      const auth = oauthState.toAuth()
      if (auth.tokenType !== "oauth_token" || auth.clientId !== oauthClientId) return null
      return { clerkUserId: auth.userId, tokenType: "oauth_token" }
    }
  }

  const sessionState = await clerk.authenticateRequest(request, {
    acceptsToken: "session_token",
    authorizedParties,
  })
  if (!sessionState.isAuthenticated) return null

  const auth = sessionState.toAuth()
  return { clerkUserId: auth.userId, tokenType: "session_token" }
}

export async function authenticateUser(request: Request): Promise<AuthenticatedUser | null> {
  const secretKey = process.env.CLERK_SECRET_KEY
  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  if (!secretKey || !publishableKey) return null

  const clerk = createClerkClient({ secretKey, publishableKey }) as unknown as ClerkAuthClient
  const oauthClientId = process.env.CRAFTER_OAUTH_CLIENT_ID
  const authorizedParties = (process.env.WEB_ORIGINS ?? "http://localhost:3000,https://crafter.run,https://www.crafter.run")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

  return authenticateUserWithClerk(request, clerk, oauthClientId, authorizedParties)
}
