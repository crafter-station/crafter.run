export const config = {
  apiUrl: process.env.CRAFTER_API_URL ?? "https://api.crafter.run",
  webUrl: process.env.CRAFTER_WEB_URL ?? "https://crafter.run/en",
  oauthClientId: process.env.CRAFTER_OAUTH_CLIENT_ID ?? "ZvJqTLZaMx1hvFzz",
  authorizationUrl:
    process.env.CRAFTER_OAUTH_AUTHORIZATION_URL ??
    "https://nice-pelican-88.clerk.accounts.dev/oauth/authorize",
  tokenUrl:
    process.env.CRAFTER_OAUTH_TOKEN_URL ??
    "https://nice-pelican-88.clerk.accounts.dev/oauth/token",
  revocationUrl:
    process.env.CRAFTER_OAUTH_REVOCATION_URL ??
    "https://nice-pelican-88.clerk.accounts.dev/oauth/token/revoke",
}

export function webPath(path: string): string {
  return new URL(`${config.webUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`).toString()
}
