import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { execFile } from "node:child_process"
import { promisify } from "node:util"
import {
  handleAvailabilityResponseSchema,
  listOwnedShipsResponseSchema,
  meResponseSchema,
  createShipUpdateRequestSchema,
  privateMemberResponseSchema,
  publishShipRequestSchema,
  shipDraftInputSchema,
  shipResponseSchema,
  shipUpdateResponseSchema,
  upsertMemberRequestSchema,
} from "@crafter/contracts"
import { api, publicApi } from "./api"
import { login, logout, openBrowser } from "./auth"
import { webPath } from "./config"
import { inferShipMetadata } from "./metadata"

const execFileAsync = promisify(execFile)

const help = `Crafter Ships CLI

Usage:
  crafter help
  crafter login
  crafter logout
  crafter onboard [--file <json-file> --confirm]
  crafter handle <handle>
  crafter whoami
  crafter ships
  crafter ship [--file <json-file>]
  crafter publish <id> --revision <updated-at> --confirm
  crafter update <ship-slug> --file <json-file> --confirm

Environment:
  CRAFTER_ACCESS_TOKEN              Use an access token without storing it
  CRAFTER_API_URL                   API origin (default https://api.crafter.run)
  CRAFTER_WEB_URL                   Web locale origin (default https://crafter.run/en)
  CRAFTER_OAUTH_CLIENT_ID           OAuth client ID
  CRAFTER_OAUTH_AUTHORIZATION_URL   OAuth authorization endpoint
  CRAFTER_OAUTH_TOKEN_URL           OAuth token endpoint
  CRAFTER_OAUTH_REVOCATION_URL      OAuth token revocation endpoint`

function print(value: unknown): void {
  console.log(JSON.stringify(value, null, 2))
}

function idempotencyKey(value: unknown): string {
  return `crafter-${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`
}

async function optionalFile(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, "utf8")
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined
    throw error
  }
}

async function gitRemote(): Promise<string | undefined> {
  try {
    const { stdout } = await execFileAsync("git", ["config", "--get", "remote.origin.url"], { encoding: "utf8" })
    return stdout.trim() || undefined
  } catch {
    return undefined
  }
}

async function inferredDraft() {
  const [packageJson, readme, shipConfig, remote] = await Promise.all([
    optionalFile("package.json"),
    optionalFile("README.md"),
    optionalFile("crafter.ship.json"),
    gitRemote(),
  ])
  return inferShipMetadata({
    packageJson: packageJson ? JSON.parse(packageJson) : undefined,
    readme,
    shipConfig: shipConfig ? JSON.parse(shipConfig) : undefined,
    gitRemote: remote,
  })
}

async function main(args: string[]): Promise<void> {
  const [command = "help", ...rest] = args
  if (command === "help" || command === "--help" || command === "-h") {
    console.log(help)
    return
  }
  if (command === "login") {
    await login()
    console.log("Logged in.")
    return
  }
  if (command === "logout") {
    await logout()
    console.log("Logged out.")
    return
  }
  if (command === "whoami") {
    const response = meResponseSchema.parse(await api("/v1/me"))
    print(response.member ? response : { ...response, onboardingUrl: webPath("/onboarding") })
    return
  }
  if (command === "onboard") {
    if (rest.length === 0) {
      const url = webPath("/onboarding")
      console.log(`Opening ${url}`)
      openBrowser(url)
      return
    }
    const [fileFlag, file, confirmFlag] = rest
    if (fileFlag !== "--file" || !file || confirmFlag !== "--confirm") {
      throw new Error("Creating or updating a profile requires explicit confirmation: crafter onboard --file <json-file> --confirm")
    }
    const input = upsertMemberRequestSchema.parse(JSON.parse(await readFile(file, "utf8")))
    const response = privateMemberResponseSchema.parse(
      await api("/v1/me", { method: "PUT", body: JSON.stringify(input) }),
    )
    print({ ...response, profileUrl: webPath(`/crafters/${response.member.handle}`) })
    return
  }
  if (command === "handle") {
    const [handle, ...extra] = rest
    if (!handle || extra.length > 0) throw new Error("Usage: crafter handle <handle>")
    print(handleAvailabilityResponseSchema.parse(await publicApi(`/v1/handles/${encodeURIComponent(handle)}`)))
    return
  }
  if (command === "ships") {
    print(listOwnedShipsResponseSchema.parse(await api("/v1/me/ships")))
    return
  }
  if (command === "ship") {
    const fileIndex = rest.indexOf("--file")
    if ((fileIndex === -1 && rest.length !== 0) || (fileIndex !== -1 && (fileIndex !== 0 || rest.length !== 2))) {
      throw new Error("Usage: crafter ship [--file <json-file>]")
    }
    const input = fileIndex >= 0
      ? shipDraftInputSchema.parse({ ...JSON.parse(await readFile(rest[fileIndex + 1]!, "utf8")), source: "cli" })
      : await inferredDraft()
    const { source: _source, ...request } = input
    const response = shipResponseSchema.parse(
      await api("/v1/ship-drafts", {
        method: "POST",
        headers: { "Idempotency-Key": idempotencyKey(request) },
        body: JSON.stringify(request),
      }),
    )
    print({ ...response, previewUrl: webPath(`/ships/drafts/${response.ship.id}`) })
    return
  }
  if (command === "publish") {
    const [id, revisionFlag, expectedUpdatedAt, confirmFlag] = rest
    if (!id || revisionFlag !== "--revision" || !expectedUpdatedAt || confirmFlag !== "--confirm") {
      throw new Error("Publishing requires the reviewed revision and explicit confirmation: crafter publish <id> --revision <updated-at> --confirm")
    }
    const body = publishShipRequestSchema.parse({ confirm: true, expectedUpdatedAt })
    const response = shipResponseSchema.parse(
      await api(`/v1/ship-drafts/${encodeURIComponent(id)}/publish`, {
        method: "POST",
        headers: { "Idempotency-Key": idempotencyKey({ id, ...body }) },
        body: JSON.stringify(body),
      }),
    )
    print({ ...response, publishedUrl: webPath(`/ships/${response.ship.slug}`) })
    return
  }
  if (command === "update") {
    const [slug, fileFlag, file, confirmFlag] = rest
    if (!slug || fileFlag !== "--file" || !file || confirmFlag !== "--confirm") {
      throw new Error("Publishing an update requires explicit confirmation: crafter update <ship-slug> --file <json-file> --confirm")
    }
    const input = createShipUpdateRequestSchema.parse(JSON.parse(await readFile(file, "utf8")))
    const response = shipUpdateResponseSchema.parse(
      await api(`/v1/ships/${encodeURIComponent(slug)}/updates`, {
        method: "POST",
        headers: { "Idempotency-Key": idempotencyKey({ slug, ...input }) },
        body: JSON.stringify(input),
      }),
    )
    print({ ...response, publishedUrl: webPath(`/ships/${slug}`) })
    return
  }
  throw new Error(`Unknown command: ${command}\n\n${help}`)
}

main(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
