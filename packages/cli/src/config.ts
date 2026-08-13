export const config = {
  apiUrl: process.env.CRAFTER_API_URL ?? "https://api.crafter.run",
  webUrl: process.env.CRAFTER_WEB_URL ?? "https://crafter.run/en",
  oauthClientId: "9U4JdcAfQEXxE6Wi",
  authorizationUrl: "https://clerk.crafter.run/oauth/authorize",
  tokenUrl: "https://clerk.crafter.run/oauth/token",
  revocationUrl: "https://clerk.crafter.run/oauth/token/revoke",
}

export function webPath(path: string): string {
  return new URL(`${config.webUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`).toString()
}
