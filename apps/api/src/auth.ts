import { createClerkClient } from "@clerk/backend"

export type AuthenticatedUser = {
  clerkUserId: string
  tokenType: "session_token" | "oauth_token"
}

export async function authenticateUser(request: Request): Promise<AuthenticatedUser | null> {
  const secretKey = process.env.CLERK_SECRET_KEY
  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  if (!secretKey || !publishableKey) return null

  const clerk = createClerkClient({ secretKey, publishableKey })
  const oauthClientId = process.env.CRAFTER_OAUTH_CLIENT_ID
  const state = await clerk.authenticateRequest(request, {
    acceptsToken: ["session_token", "oauth_token"] as const,
    authorizedParties: [
      ...(process.env.WEB_ORIGINS ?? "http://localhost:3000,https://crafter.run,https://www.crafter.run")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
      ...(oauthClientId ? [oauthClientId] : []),
    ],
  })

  if (!state.isAuthenticated) return null

  const auth = state.toAuth()
  if (auth.tokenType === "oauth_token") {
    if (!oauthClientId || auth.clientId !== oauthClientId) return null
    return { clerkUserId: auth.userId, tokenType: "oauth_token" }
  }

  return { clerkUserId: auth.userId, tokenType: "session_token" }
}
