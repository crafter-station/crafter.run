import {
  meResponseSchema,
  privateMemberResponseSchema,
  upsertMemberRequestSchema,
  type PrivateMemberProfile,
  type UpsertMemberRequest,
} from "@crafter/contracts"

export const profileHelp = `crafter profile - Read and update your crafter.run profile

Usage:
  crafter profile get [--json]
  crafter profile update --file <path|-> [--confirm] [--json]

Commands:
  get                 Print your profile. Says so when you have none yet.
  update              Validate a JSON file against the API contract and show a
                      dry-run diff. Writes nothing without --confirm.

Options:
  --file <path|->     JSON file, or - to read stdin
  --confirm           Apply the change (default is a dry run)
  --json              Machine-readable output; errors are JSON on stderr

Update semantics:
  - With an existing profile the file is partial: only the keys you give change.
    Set a nullable key to null to clear it. originLocation and basedLocation are
    replaced as a whole.
  - Without a profile the file creates one: handle and displayName are required.
  - Unknown keys are rejected.

Exit codes:
  0  success (including a dry run and "no profile yet")
  1  runtime or API error (not signed in, network, rate limit, handle taken)
  2  usage or validation error (fix the file or flags; the message names each field)

Examples:
  crafter profile get --json
  crafter profile update --file patch.json
  echo '{"bio":"Building agents."}' | crafter profile update --file - --confirm`

export interface ProfileIO {
  out: (text: string) => void
  err: (text: string) => void
}

export interface ProfileDeps {
  getMe: () => Promise<unknown>
  putMe: (input: UpsertMemberRequest) => Promise<unknown>
  readFile: (path: string) => Promise<string>
  readStdin: () => Promise<string>
  profileUrl: (handle: string) => string
  onboardingUrl: () => string
}

export interface FieldIssue {
  field: string
  message: string
}

export interface FieldChange {
  field: string
  from: unknown
  to: unknown
}

class ProfileError extends Error {
  constructor(
    message: string,
    readonly exitCode: 1 | 2,
    readonly code: string,
    readonly issues: FieldIssue[] = [],
  ) {
    super(message)
  }
}

const ALLOWED_KEYS = new Set(Object.keys(upsertMemberRequestSchema.shape))

function formatIssues(error: { issues: { path: PropertyKey[]; message: string }[] }): FieldIssue[] {
  return error.issues.map((issue) => ({ field: issue.path.map(String).join(".") || "(root)", message: issue.message }))
}

/** Maps a stored profile to the shape the upsert contract accepts. */
export function memberToInput(member: PrivateMemberProfile): Record<string, unknown> {
  const location = (value: PrivateMemberProfile["originLocation"]) =>
    value ? { city: value.city, region: value.region, country: value.country, countryCode: value.countryCode } : null
  return {
    handle: member.handle,
    displayName: member.displayName,
    bio: member.bio,
    avatarUrl: member.avatarUrl,
    githubUrl: member.githubUrl,
    gitlabUrl: member.gitlabUrl,
    linkedinUrl: member.linkedinUrl,
    instagramUrl: member.instagramUrl,
    xUrl: member.xUrl,
    primaryWebsiteUrl: member.primaryWebsiteUrl,
    secondaryWebsiteUrl: member.secondaryWebsiteUrl,
    currentRole: member.currentRole,
    rolesOpenTo: member.rolesOpenTo,
    isJobSeeking: member.isJobSeeking,
    salaryRange: member.salaryRange,
    workArrangements: member.workArrangements,
    onsiteCity: member.onsiteCity,
    resumeUrl: member.resumeUrl,
    originLocation: location(member.originLocation),
    basedLocation: location(member.basedLocation),
  }
}

function parsePatch(text: string, source: string): Record<string, unknown> {
  let value: unknown
  try {
    value = JSON.parse(text)
  } catch (error) {
    throw new ProfileError(`${source} is not valid JSON: ${(error as Error).message}`, 2, "invalid_json")
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ProfileError(`${source} must contain a JSON object of profile fields`, 2, "invalid_json")
  }
  const unknown = Object.keys(value).filter((key) => !ALLOWED_KEYS.has(key))
  if (unknown.length > 0) {
    throw new ProfileError(
      `Unknown profile field${unknown.length > 1 ? "s" : ""}: ${unknown.join(", ")}. Allowed: ${[...ALLOWED_KEYS].join(", ")}`,
      2,
      "unknown_fields",
      unknown.map((field) => ({ field, message: "Unknown field" })),
    )
  }
  return value as Record<string, unknown>
}

function parseInput(candidate: Record<string, unknown>): UpsertMemberRequest {
  const result = upsertMemberRequestSchema.safeParse(candidate)
  if (!result.success) {
    const issues = formatIssues(result.error)
    throw new ProfileError(
      `Profile is invalid:\n${issues.map((issue) => `  ${issue.field}: ${issue.message}`).join("\n")}`,
      2,
      "validation_failed",
      issues,
    )
  }
  return result.data
}

export function diffProfile(before: Record<string, unknown> | null, after: Record<string, unknown>): FieldChange[] {
  const changes: FieldChange[] = []
  for (const field of Object.keys(after)) {
    const to = after[field]
    const from = before ? (before[field] ?? null) : null
    if (to === undefined) continue
    if (JSON.stringify(from) !== JSON.stringify(to ?? null)) changes.push({ field, from, to: to ?? null })
  }
  return changes
}

/** Resolves the final request and the diff against the stored profile (if any). */
export function planUpdate(
  current: PrivateMemberProfile | null,
  patch: Record<string, unknown>,
): { mode: "create" | "update"; request: UpsertMemberRequest; changes: FieldChange[] } {
  if (!current) {
    const request = parseInput(patch)
    return { mode: "create", request, changes: diffProfile(null, request as Record<string, unknown>) }
  }
  const base = memberToInput(current)
  const baseParsed = upsertMemberRequestSchema.safeParse(base)
  const before = baseParsed.success ? (baseParsed.data as Record<string, unknown>) : base
  const request = parseInput({ ...base, ...patch })
  const after: Record<string, unknown> = {}
  for (const key of Object.keys(base)) after[key] = (request as Record<string, unknown>)[key] ?? null
  return { mode: "update", request, changes: diffProfile(before, after) }
}

function show(value: unknown): string {
  return value === null || value === undefined ? "(empty)" : typeof value === "string" ? JSON.stringify(value) : JSON.stringify(value)
}

function profileLines(member: PrivateMemberProfile): string[] {
  const place = (value: PrivateMemberProfile["originLocation"]) =>
    value ? [value.city, value.region, value.country].filter(Boolean).join(", ") || null : null
  const rows: [string, unknown][] = [
    ["handle", member.handle],
    ["displayName", member.displayName],
    ["bio", member.bio],
    ["currentRole", member.currentRole],
    ["isJobSeeking", member.isJobSeeking],
    ["rolesOpenTo", member.rolesOpenTo.length ? member.rolesOpenTo.join(", ") : null],
    ["workArrangements", member.workArrangements.length ? member.workArrangements.join(", ") : null],
    ["onsiteCity", member.onsiteCity],
    ["salaryRange", member.salaryRange ? `${member.salaryRange.min}-${member.salaryRange.max} ${member.salaryRange.currency}` : null],
    ["originLocation", place(member.originLocation)],
    ["basedLocation", place(member.basedLocation)],
    ["githubUrl", member.githubUrl],
    ["gitlabUrl", member.gitlabUrl],
    ["linkedinUrl", member.linkedinUrl],
    ["instagramUrl", member.instagramUrl],
    ["xUrl", member.xUrl],
    ["primaryWebsiteUrl", member.primaryWebsiteUrl],
    ["secondaryWebsiteUrl", member.secondaryWebsiteUrl],
    ["resumeUrl", member.resumeUrl],
    ["avatarUrl", member.avatarUrl],
  ]
  return rows.map(([key, value]) => `${key.padEnd(20)} ${value === null || value === undefined ? "-" : String(value)}`)
}

interface Flags {
  json: boolean
  confirm: boolean
  file?: string
}

function parseFlags(args: string[], allowed: string[]): Flags {
  const flags: Flags = { json: false, confirm: false }
  for (let index = 0; index < args.length; index++) {
    const arg = args[index]!
    if (!allowed.includes(arg)) throw new ProfileError(`Unexpected argument: ${arg}\n\n${profileHelp}`, 2, "usage")
    if (arg === "--json") flags.json = true
    else if (arg === "--confirm") flags.confirm = true
    else if (arg === "--file") {
      const value = args[++index]
      if (!value) throw new ProfileError("--file needs a path, or - for stdin", 2, "usage")
      flags.file = value
    }
  }
  return flags
}

export async function runProfile(args: string[], deps: ProfileDeps, io: ProfileIO): Promise<number> {
  const [sub, ...rest] = args
  let json = rest.includes("--json")
  try {
    if (!sub || sub === "help" || sub === "--help" || sub === "-h") {
      io.out(profileHelp)
      return 0
    }
    if (sub === "get") {
      const flags = parseFlags(rest, ["--json"])
      json = flags.json
      const { member } = meResponseSchema.parse(await deps.getMe())
      if (flags.json) {
        io.out(JSON.stringify(member ? { member, profileUrl: deps.profileUrl(member.handle) } : { member: null, onboardingUrl: deps.onboardingUrl() }, null, 2))
      } else if (!member) {
        io.out(`No profile yet. Create one with: crafter profile update --file <json-file> --confirm\n(needs at least handle and displayName; run \`crafter profile update --help\` for the fields)`)
      } else {
        io.out(`${profileLines(member).join("\n")}\n\n${deps.profileUrl(member.handle)}`)
      }
      return 0
    }
    if (sub === "update") {
      const flags = parseFlags(rest, ["--file", "--confirm", "--json"])
      json = flags.json
      if (!flags.file) throw new ProfileError("Usage: crafter profile update --file <path|-> [--confirm] [--json]", 2, "usage")
      const text = flags.file === "-" ? await deps.readStdin() : await readInput(deps, flags.file)
      const patch = parsePatch(text, flags.file === "-" ? "stdin" : flags.file)
      const { member } = meResponseSchema.parse(await deps.getMe())
      const plan = planUpdate(member, patch)
      if (plan.changes.length === 0) {
        io.out(json ? JSON.stringify({ mode: plan.mode, applied: false, changes: [] }, null, 2) : "No changes: the profile already matches this file.")
        return 0
      }
      if (!flags.confirm) {
        if (json) io.out(JSON.stringify({ mode: plan.mode, applied: false, dryRun: true, changes: plan.changes, next: "Re-run with --confirm to apply." }, null, 2))
        else {
          io.out(`Dry run: would ${plan.mode === "create" ? "create your profile" : "update your profile"}. Nothing was written.`)
          for (const change of plan.changes) io.out(`  ${change.field}: ${show(change.from)} -> ${show(change.to)}`)
          io.out("Re-run with --confirm to apply.")
        }
        return 0
      }
      const saved = privateMemberResponseSchema.parse(await deps.putMe(plan.request))
      const profileUrl = deps.profileUrl(saved.member.handle)
      if (json) io.out(JSON.stringify({ mode: plan.mode, applied: true, changes: plan.changes, member: saved.member, profileUrl }, null, 2))
      else {
        io.out(`${plan.mode === "create" ? "Created" : "Updated"} profile: ${plan.changes.map((change) => change.field).join(", ")}`)
        io.out(profileUrl)
      }
      return 0
    }
    throw new ProfileError(`Unknown profile command: ${sub}\n\n${profileHelp}`, 2, "usage")
  } catch (error) {
    const profileError = error instanceof ProfileError ? error : undefined
    const message = error instanceof Error ? error.message : String(error)
    if (json) {
      io.err(JSON.stringify({ error: { code: profileError?.code ?? "request_failed", message, issues: profileError?.issues ?? [] } }, null, 2))
    } else {
      io.err(message)
    }
    return profileError?.exitCode ?? 1
  }
}

async function readInput(deps: ProfileDeps, path: string): Promise<string> {
  try {
    return await deps.readFile(path)
  } catch (error) {
    throw new ProfileError(`Cannot read ${path}: ${(error as Error).message}`, 2, "file_unreadable")
  }
}
