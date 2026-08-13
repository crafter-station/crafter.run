const productionIssuer = "https://clerk.crafter.run"
const productionClientId = "9U4JdcAfQEXxE6Wi"

export type OAuthEnvironment = {
  oauthClientId: string
  authorizationUrl: string
  tokenUrl: string
  revocationUrl: string
}

function endpoints(issuer: string, oauthClientId: string): OAuthEnvironment {
  const origin = issuer.replace(/\/+$/, "")
  return {
    oauthClientId,
    authorizationUrl: `${origin}/oauth/authorize`,
    tokenUrl: `${origin}/oauth/token`,
    revocationUrl: `${origin}/oauth/token/revoke`,
  }
}

// An OAuth client only exists on the issuer that registered it, so the CLI takes the pair or
// neither. Overriding one alone produced `invalid_client` at sign-in with nothing pointing at the
// cause. These names are CLI-only: `CRAFTER_OAUTH_CLIENT_ID` belongs to the API and must not
// reconfigure the CLI when both run in the same shell.
export function resolveOAuthEnvironment(env: Record<string, string | undefined> = process.env): OAuthEnvironment {
  const issuer = env.CRAFTER_CLI_OAUTH_ISSUER?.trim()
  const oauthClientId = env.CRAFTER_CLI_OAUTH_CLIENT_ID?.trim()
  if (!issuer && !oauthClientId) return endpoints(productionIssuer, productionClientId)
  if (!issuer || !oauthClientId) {
    const missing = issuer ? "CRAFTER_CLI_OAUTH_CLIENT_ID" : "CRAFTER_CLI_OAUTH_ISSUER"
    const present = issuer ? "CRAFTER_CLI_OAUTH_ISSUER" : "CRAFTER_CLI_OAUTH_CLIENT_ID"
    throw new Error(
      `${present} is set but ${missing} is not. An OAuth client only exists on the issuer that registered it, so set both or unset both to use the production Crafter OAuth application.`,
    )
  }
  let origin: string
  try {
    origin = new URL(issuer).origin
  } catch {
    throw new Error(`CRAFTER_CLI_OAUTH_ISSUER must be an absolute URL such as ${productionIssuer}, received ${issuer}`)
  }
  return endpoints(origin, oauthClientId)
}

export const config = {
  apiUrl: process.env.CRAFTER_API_URL ?? "https://api.crafter.run",
  webUrl: process.env.CRAFTER_WEB_URL ?? "https://crafter.run/en",
  get oauthClientId(): string {
    return resolveOAuthEnvironment().oauthClientId
  },
  get authorizationUrl(): string {
    return resolveOAuthEnvironment().authorizationUrl
  },
  get tokenUrl(): string {
    return resolveOAuthEnvironment().tokenUrl
  },
  get revocationUrl(): string {
    return resolveOAuthEnvironment().revocationUrl
  },
}

export function webPath(path: string): string {
  return new URL(`${config.webUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`).toString()
}
