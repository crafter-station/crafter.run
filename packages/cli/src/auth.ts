import { createHash, randomBytes } from "node:crypto"
import { createServer } from "node:http"
import { spawn } from "node:child_process"
import { config } from "./config"

const keychainService = "run.crafter.cli.oauth"
const keychainAccount = "credentials"

export type Credentials = {
  accessToken: string
  refreshToken?: string
  expiresAt?: number
}

type TokenResponse = {
  access_token?: unknown
  refresh_token?: unknown
  expires_in?: unknown
  error?: unknown
  error_description?: unknown
}

export function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url")
}

export function createPkce(): { verifier: string; challenge: string } {
  const verifier = randomBytes(48).toString("base64url")
  return { verifier, challenge: pkceChallenge(verifier) }
}

export function macOSCredentialSaveArgs(value: string): string[] {
  return ["add-generic-password", "-U", "-a", keychainAccount, "-s", keychainService, "-w", value]
}

export function revocationToken(credentials: Credentials): string {
  return credentials.refreshToken ?? credentials.accessToken
}

export function invalidClientError(issuer: string, description: string): Error {
  const detail = description ? `: ${description.replace(/[.\s]+$/, "")}` : ""
  return new Error(
    `Crafter's OAuth client ${config.oauthClientId} is unavailable on ${issuer}${detail}. Update the CLI with \`npm install --global @crafter/cli@latest\` and retry. If the latest version still fails, report this at https://github.com/crafter-station/crafter.run/issues.`,
  )
}

export function tokenEndpointError(status: number, body: TokenResponse): Error {
  const description = typeof body.error_description === "string" ? body.error_description : ""
  if (body.error === "invalid_client") return invalidClientError(new URL(config.tokenUrl).origin, description)
  const detail = description ? `: ${description.replace(/[.\s]+$/, "")}` : ""
  return new Error(`OAuth token endpoint returned ${status}${detail}`)
}

// Clerk accepts the first authorization hop for any client and only rejects an unknown one further
// down the redirect chain, where the failure lands in the browser as raw JSON the CLI never sees.
// Walking the chain first turns that into an actionable terminal error before a browser opens.
export async function assertAuthorizationClient(authorizationUrl: string, fetchImpl: typeof fetch = fetch): Promise<void> {
  let url = authorizationUrl
  for (let hop = 0; hop < 5; hop += 1) {
    let response: Response
    try {
      response = await fetchImpl(url, { redirect: "manual", headers: { accept: "application/json, text/html" } })
    } catch {
      return // A preflight that cannot reach the issuer must not block a login that still might work.
    }
    const location = response.headers.get("location")
    if (response.status >= 300 && response.status < 400 && location) {
      url = new URL(location, url).toString()
      continue
    }
    if (response.ok) return
    const body = (await response.json().catch(() => ({}))) as TokenResponse
    if (body.error === "invalid_client") {
      const description = typeof body.error_description === "string" ? body.error_description : ""
      throw invalidClientError(new URL(config.authorizationUrl).origin, description)
    }
    return
  }
}

export function assertInteractiveLogin(interactive = process.stdin.isTTY === true): void {
  if (!interactive) {
    throw new Error(
      "OAuth login requires an interactive terminal. Run `crafter login` yourself in a local terminal and leave it open until the browser confirms login.",
    )
  }
}

export function windowsCredentialScript(action: "read" | "save" | "delete"): string {
  const loadTypes =
    "$ErrorActionPreference='Stop';" +
    "$null=[Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime];" +
    "$null=[Windows.Security.Credentials.PasswordCredential,Windows.Security.Credentials,ContentType=WindowsRuntime];"
  const prefix = `${loadTypes}$v=New-Object Windows.Security.Credentials.PasswordVault;`
  if (action === "read") {
    return `${prefix}$c=$v.Retrieve('${keychainService}','${keychainAccount}');$c.RetrievePassword();[Console]::Out.Write($c.Password)`
  }
  if (action === "delete") {
    return `${prefix}$c=$v.Retrieve('${keychainService}','${keychainAccount}');$v.Remove($c)`
  }
  return `${prefix}$p=[Console]::In.ReadToEnd().Trim();$v.Add((New-Object Windows.Security.Credentials.PasswordCredential('${keychainService}','${keychainAccount}',$p)));$saved=$v.Retrieve('${keychainService}','${keychainAccount}');$saved.RetrievePassword();if($saved.Password-ne$p){throw 'Credential verification failed'}`
}

async function command(command: string, args: string[], input?: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "pipe"] })
    let stdout = ""
    let stderr = ""
    child.stdout.setEncoding("utf8").on("data", (chunk: string) => (stdout += chunk))
    child.stderr.setEncoding("utf8").on("data", (chunk: string) => (stderr += chunk))
    child.once("error", reject)
    child.once("close", (code) => {
      if (code === 0) resolve(stdout.trim())
      else reject(new Error(stderr.trim() || `${command} exited with status ${code}`))
    })
    child.stdin.end(input)
  })
}

async function credentialStore(action: "read" | "save" | "delete", value?: string): Promise<string> {
  if (process.platform === "darwin") {
    if (action === "read") return command("security", ["find-generic-password", "-a", keychainAccount, "-s", keychainService, "-w"])
    if (action === "delete") return command("security", ["delete-generic-password", "-a", keychainAccount, "-s", keychainService])
    return command("security", macOSCredentialSaveArgs(value ?? ""))
  }
  if (process.platform === "linux") {
    const attributes = ["service", keychainService, "account", keychainAccount]
    if (action === "read") return command("secret-tool", ["lookup", ...attributes])
    if (action === "delete") return command("secret-tool", ["clear", ...attributes])
    return command("secret-tool", ["store", "--label=Crafter CLI", ...attributes], `${value}\n`)
  }
  if (process.platform === "win32") {
    return command("powershell.exe", ["-NoProfile", "-Command", windowsCredentialScript(action)], action === "save" ? `${value}\n` : undefined)
  }
  throw new Error(`Unsupported credential store on ${process.platform}`)
}

async function readCredentials(): Promise<Credentials | null> {
  try {
    const value = await credentialStore("read")
    const parsed = JSON.parse(value) as Partial<Credentials>
    return typeof parsed.accessToken === "string" ? (parsed as Credentials) : null
  } catch {
    return null
  }
}

async function saveCredentials(credentials: Credentials): Promise<void> {
  await credentialStore("save", JSON.stringify(credentials))
}

export async function logout(): Promise<void> {
  const credentials = await readCredentials()
  let revocationError: Error | null = null
  try {
    if (credentials) {
      const response = await fetch(config.revocationUrl, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token: revocationToken(credentials), client_id: config.oauthClientId }),
      })
      if (!response.ok) throw new Error(`OAuth revocation returned ${response.status}`)
    }
  } catch (error) {
    revocationError = error instanceof Error ? error : new Error("OAuth revocation failed")
  }
  try {
    await credentialStore("delete")
  } catch {
    // A missing credential is already logged out locally.
  }
  if (revocationError) throw revocationError
}

function credentialsFromToken(body: TokenResponse, previousRefreshToken?: string): Credentials {
  if (typeof body.access_token !== "string") {
    const detail = typeof body.error_description === "string" ? `: ${body.error_description}` : ""
    throw new Error(`OAuth token exchange failed${detail}`)
  }
  return {
    accessToken: body.access_token,
    refreshToken: typeof body.refresh_token === "string" ? body.refresh_token : previousRefreshToken,
    expiresAt: typeof body.expires_in === "number" ? Date.now() + body.expires_in * 1000 : jwtExpiry(body.access_token),
  }
}

async function tokenRequest(values: Record<string, string>): Promise<TokenResponse> {
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
    body: new URLSearchParams(values),
  })
  const body = (await response.json().catch(() => ({}))) as TokenResponse
  if (!response.ok) throw tokenEndpointError(response.status, body)
  return body
}

async function refresh(credentials: Credentials): Promise<Credentials> {
  if (!credentials.refreshToken) throw new Error("Session expired. Run `crafter login` again.")
  const body = await tokenRequest({
    grant_type: "refresh_token",
    refresh_token: credentials.refreshToken,
    client_id: config.oauthClientId,
  })
  const updated = credentialsFromToken(body, credentials.refreshToken)
  await saveCredentials(updated)
  return updated
}

function jwtExpiry(token: string): number | undefined {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1] ?? "", "base64url").toString()) as { exp?: unknown }
    return typeof payload.exp === "number" ? payload.exp * 1000 : undefined
  } catch {
    return undefined
  }
}

export async function accessToken(forceRefresh = false): Promise<string> {
  if (process.env.CRAFTER_ACCESS_TOKEN) return process.env.CRAFTER_ACCESS_TOKEN
  const credentials = await readCredentials()
  if (!credentials) throw new Error("Not logged in. Run `crafter login`.")
  if (forceRefresh || (credentials.expiresAt !== undefined && credentials.expiresAt <= Date.now() + 30_000)) {
    return (await refresh(credentials)).accessToken
  }
  return credentials.accessToken
}

export function browserCommand(url: string, platform: NodeJS.Platform = process.platform): [string, string[]] {
  if (platform === "darwin") return ["open", [url]]
  if (platform === "win32") return ["rundll32.exe", ["url.dll,FileProtocolHandler", url]]
  return ["xdg-open", [url]]
}

export function openBrowser(url: string): void {
  const [command, args] = browserCommand(url)
  spawn(command, args, { detached: true, stdio: "ignore" }).unref()
}

export async function login(): Promise<void> {
  assertInteractiveLogin()
  const { verifier, challenge } = createPkce()
  const state = randomBytes(24).toString("base64url")
  let finish!: (value: string) => void
  let fail!: (reason: Error) => void
  const code = new Promise<string>((resolve, reject) => {
    finish = resolve
    fail = reject
  })
  const server = createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1")
    if (url.pathname !== "/callback") {
      response.writeHead(404).end("Not found")
      return
    }
    const error = url.searchParams.get("error")
    const authorizationCode = url.searchParams.get("code")
    if (url.searchParams.get("state") !== state || error || !authorizationCode) {
      response.writeHead(400, { "content-type": "text/plain" }).end("Crafter login failed. You can close this window.")
      fail(new Error(error ? `Authorization failed: ${error}` : "Invalid OAuth callback"))
      return
    }
    response.writeHead(200, { "content-type": "text/plain" }).end("Crafter login complete. You can close this window.")
    finish(authorizationCode)
  })
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })
  const address = server.address()
  if (!address || typeof address === "string") throw new Error("Could not start OAuth callback server")
  const redirectUri = `http://127.0.0.1:${address.port}/callback`
  const authorizationUrl = new URL(config.authorizationUrl)
  authorizationUrl.search = new URLSearchParams({
    response_type: "code",
    client_id: config.oauthClientId,
    redirect_uri: redirectUri,
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
    scope: "openid profile offline_access",
  }).toString()
  try {
    await assertAuthorizationClient(authorizationUrl.toString())
  } catch (error) {
    server.close()
    throw error
  }
  console.error(`Sign in here (waiting up to five minutes):\n\n  ${authorizationUrl}\n\nIf the browser did not open automatically, open that URL yourself.`)
  openBrowser(authorizationUrl.toString())
  const timeout = setTimeout(() => fail(new Error("Login timed out after five minutes")), 300_000)
  try {
    const authorizationCode = await code
    const body = await tokenRequest({
      grant_type: "authorization_code",
      client_id: config.oauthClientId,
      code: authorizationCode,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    })
    await saveCredentials(credentialsFromToken(body))
  } finally {
    clearTimeout(timeout)
    server.close()
  }
}
