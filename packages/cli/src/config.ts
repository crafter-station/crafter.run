export const config = {
  apiUrl: process.env.CRAFTER_API_URL ?? "https://api.crafter.run",
  webUrl: process.env.CRAFTER_WEB_URL ?? "https://crafter.run/en",
  oauthClientId: process.env.CRAFTER_OAUTH_CLIENT_ID ?? "9U4JdcAfQEXxE6Wi",
  authorizationUrl:
    process.env.CRAFTER_OAUTH_AUTHORIZATION_URL ??
    "https://clerk.crafter.run/oauth/authorize",
  tokenUrl:
    process.env.CRAFTER_OAUTH_TOKEN_URL ??
    "https://clerk.crafter.run/oauth/token",
  revocationUrl:
    process.env.CRAFTER_OAUTH_REVOCATION_URL ??
    "https://clerk.crafter.run/oauth/token/revoke",
}

export function webPath(path: string): string {
  return new URL(`${config.webUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`).toString()
}
