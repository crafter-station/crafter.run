import { spawn } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { basename, join, resolve } from "node:path"
import {
  CHANGELOG_AREAS,
  CHANGELOG_ISO_DATE,
  CHANGELOG_KINDS,
  CHANGELOG_LOCALES,
  CHANGELOG_RESERVED_SLUGS,
  CHANGELOG_SLUG,
  changelogFrontmatterSchema,
  type ChangelogFrontmatter,
} from "@crafter/contracts"
import matter from "gray-matter"
import { config } from "./config"

export const ORG = "crafter-station"
export const REPO = `${ORG}/crafter.run`
const BASE_BRANCH = "main"
const WARN_BYTES = 2 * 1024 * 1024
const EM_DASH = "—"

// ---------------------------------------------------------------- gh runner

export type GhResult = { stdout: string }
export type GhOptions = { input?: string }
/** Runs `gh <args>`. Rejects with GhError when gh is missing or exits non-zero. */
export type Gh = (args: string[], options?: GhOptions) => Promise<GhResult>

export class GhError extends Error {
  constructor(
    message: string,
    readonly kind: "missing" | "failed",
    readonly stderr = "",
  ) {
    super(message)
  }
  get notFound(): boolean {
    return /\b404\b|Not Found/i.test(this.stderr)
  }
}

export const realGh: Gh = (args, options) =>
  new Promise((resolvePromise, reject) => {
    const child = spawn("gh", args, { stdio: ["pipe", "pipe", "pipe"], env: { ...process.env, GH_PROMPT_DISABLED: "1" } })
    let stdout = ""
    let stderr = ""
    child.stdout.on("data", (chunk) => (stdout += chunk))
    child.stderr.on("data", (chunk) => (stderr += chunk))
    child.on("error", (error: NodeJS.ErrnoException) =>
      reject(new GhError(error.message, error.code === "ENOENT" ? "missing" : "failed", error.message)),
    )
    child.on("close", (code) =>
      code === 0
        ? resolvePromise({ stdout })
        : reject(new GhError(`gh ${args.slice(0, 3).join(" ")} exited with ${code}: ${stderr.trim()}`, "failed", stderr)),
    )
    child.stdin.on("error", () => {})
    child.stdin.end(options?.input ?? "")
  })

async function ghJson<T>(gh: Gh, path: string): Promise<T> {
  return JSON.parse((await gh(["api", path])).stdout) as T
}

async function ghPost<T>(gh: Gh, path: string, body: unknown): Promise<T> {
  const { stdout } = await gh(["api", "-X", "POST", path, "--input", "-"], { input: JSON.stringify(body) })
  return JSON.parse(stdout) as T
}

// ---------------------------------------------------------------- team

export type TeamEntry = { username: string; name: string; github: string | null; alumni?: boolean }
export type FetchTeam = () => Promise<TeamEntry[]>

export const fetchTeam: FetchTeam = async () => {
  const response = await fetch(config.mcpUrl, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "list_team", arguments: {} } }),
  })
  if (!response.ok) throw new Error(`Crafter MCP list_team returned ${response.status}`)
  let text = await response.text()
  if (text.startsWith("event:")) text = text.split("\n").find((line) => line.startsWith("data:"))?.slice(5) ?? ""
  const parsed = JSON.parse(text) as { result?: { structuredContent?: { members?: TeamEntry[] } } }
  const members = parsed.result?.structuredContent?.members
  if (!members) throw new Error("Crafter MCP list_team returned no members")
  return members
}

function githubHandle(url: string | null): string | null {
  if (!url) return null
  try {
    return new URL(url).pathname.replace(/\/+$/, "").split("/").pop()?.toLowerCase() || null
  } catch {
    return url.toLowerCase()
  }
}

// ---------------------------------------------------------------- identity

export type Identity = { login: string; username: string; name: string; team: TeamEntry[] }

export type Deps = {
  gh: Gh
  fetchTeam: FetchTeam
  log: (line: string) => void
  today: () => string
}

export const realDeps: Deps = {
  gh: realGh,
  fetchTeam,
  log: (line) => console.log(line),
  today: () => new Date().toLocaleDateString("en-CA"),
}

const GH_HELP =
  "Install the GitHub CLI from https://cli.github.com, then run `gh auth login` and `gh auth refresh -s read:org`."

/**
 * Who is running the CLI: the `gh` login, checked against org membership, mapped
 * to a crafter username through the public roster. Alumni never match.
 */
export async function resolveIdentity(deps: Pick<Deps, "gh" | "fetchTeam">): Promise<Identity> {
  let login: string
  try {
    login = (await ghJson<{ login: string }>(deps.gh, "user")).login
  } catch (error) {
    if (error instanceof GhError && error.kind === "missing") throw new Error(`The GitHub CLI (gh) is not installed. ${GH_HELP}`)
    throw new Error(`The GitHub CLI is not signed in. ${GH_HELP}`)
  }

  try {
    await deps.gh(["api", `orgs/${ORG}/members/${login}`])
  } catch (error) {
    if (error instanceof GhError && error.kind === "failed" && /\b(404|302)\b|Not Found/i.test(error.stderr)) {
      throw new Error(
        `@${login} is not a member of the ${ORG} GitHub organization (or the membership is private; try \`gh auth refresh -s read:org\`). ` +
          "Community projects go through `crafter ship` instead.",
      )
    }
    throw new Error(`Could not check ${ORG} membership for @${login}: ${error instanceof Error ? error.message : String(error)}`)
  }

  const team = (await deps.fetchTeam()).filter((member) => !member.alumni)
  const match = team.find((member) => githubHandle(member.github) === login.toLowerCase())
  if (!match) {
    throw new Error(
      `@${login} is in the ${ORG} organization but is not on the Crafter Station core team page (alumni are excluded). ` +
        "Community projects go through `crafter ship` instead.",
    )
  }
  return { login, username: match.username, name: match.name, team }
}

// ---------------------------------------------------------------- new

const BODY: Record<"en" | "es", (slug: string) => string> = {
  en: (slug) => `TODO: lead. Say what it is and link it, in one or two sentences.

<Clip src="/changelog/${slug}/demo.mp4" poster="/changelog/${slug}/demo.webp" size="1280x800" alt="TODO what the clip shows" caption="TODO one line." />

## TODO first section

TODO: what it does and why it matters, in two or three sentences.

<Figure src="/changelog/${slug}/first.webp" alt="TODO what the figure shows" size="1280x800" caption="TODO one line." />

## Try it

TODO: the exact command or link.

## What changed

- TODO ([#1](https://github.com/org/repo/pull/1)).
`,
  es: (slug) => `TODO: entrada. Di que es y enlazalo, en una o dos frases.

<Clip src="/changelog/${slug}/demo.mp4" poster="/changelog/${slug}/demo.webp" size="1280x800" alt="TODO que muestra el clip" caption="TODO una linea." />

## TODO primera seccion

TODO: que hace y por que importa, en dos o tres frases.

<Figure src="/changelog/${slug}/first.webp" alt="TODO que muestra la figura" size="1280x800" caption="TODO una linea." />

## Pruebalo

TODO: el comando o enlace exacto.

## Que cambio

- TODO ([#1](https://github.com/org/repo/pull/1)).
`,
}

function frontmatterText(locale: "en" | "es", input: { date: string; area: string; kind: string; crafters: string[] }): string {
  const crafters = input.crafters.length ? `\n${input.crafters.map((id) => `  - ${id}`).join("\n")}` : " []"
  return `---
title: TODO title
summary: TODO one sentence ${locale === "en" ? "in English" : "en espanol"}.
date: ${input.date}
area: ${input.area}
kind: ${input.kind}
crafters:${crafters}
# repos:
#   - org/name
# links:
#   - label: Open it
#     url: https://example.com
# image: /changelog/SLUG/cover.webp
evidence:
  - https://github.com/org/repo
---
`
}

export async function scaffold(
  slug: string,
  options: { area?: string; kind?: string; cwd?: string },
  deps: Deps,
): Promise<string> {
  if (!CHANGELOG_SLUG.test(slug) || CHANGELOG_RESERVED_SLUGS.has(slug)) {
    throw new Error(`Invalid slug "${slug}": use lowercase letters, digits and hyphens, and avoid ${[...CHANGELOG_RESERVED_SLUGS].join(", ")}.`)
  }
  const area = options.area ?? "station"
  const kind = options.kind ?? "ship"
  if (!(CHANGELOG_AREAS as readonly string[]).includes(area)) throw new Error(`Unknown area "${area}"; use ${CHANGELOG_AREAS.join(", ")}.`)
  if (!(CHANGELOG_KINDS as readonly string[]).includes(kind)) throw new Error(`Unknown kind "${kind}"; use ${CHANGELOG_KINDS.join(", ")}.`)

  const dir = resolve(options.cwd ?? process.cwd(), "crafter-changelog", slug)
  if (existsSync(dir)) throw new Error(`${dir} already exists.`)

  let crafters: string[] = []
  try {
    crafters = [(await resolveIdentity(deps)).username]
  } catch (error) {
    deps.log(`Warning: could not resolve your crafter username, so \`crafters\` is empty. ${error instanceof Error ? error.message : String(error)}`)
  }

  mkdirSync(dir, { recursive: true })
  const date = deps.today()
  for (const locale of CHANGELOG_LOCALES) {
    const head = frontmatterText(locale, { date, area, kind, crafters }).replace("SLUG", slug)
    writeFileSync(join(dir, `${locale}.mdx`), `${head}\n${BODY[locale](slug)}`)
  }
  deps.log(`Created ${dir}/en.mdx and es.mdx
Next:
  1. Write the copy in both files and put the media (demo.mp4, demo.webp, first.webp, ...) in the same folder.
  2. crafter changelog check ${join("crafter-changelog", slug)}
  3. crafter changelog submit ${join("crafter-changelog", slug)}`)
  return dir
}

// ---------------------------------------------------------------- check

export type CheckFile = { name: string; bytes: number }
export type CheckReport = {
  ok: boolean
  slug: string
  date?: string
  errors: string[]
  warnings: string[]
  files: CheckFile[]
  locales: Partial<Record<"en" | "es", { frontmatter: ChangelogFrontmatter; body: string }>>
}

const MEDIA_REF = /(?:src|poster)="([^"]+)"/g

export function checkEntry(dirInput: string): CheckReport {
  const dir = resolve(dirInput)
  const slug = basename(dir)
  const report: CheckReport = { ok: false, slug, errors: [], warnings: [], files: [], locales: {} }
  const error = (message: string) => report.errors.push(message)
  const warn = (message: string) => report.warnings.push(message)

  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    error(`${dir} is not a directory.`)
    return report
  }
  if (!CHANGELOG_SLUG.test(slug)) error(`Slug "${slug}" (the folder name) must be lowercase letters, digits and hyphens.`)
  if (CHANGELOG_RESERVED_SLUGS.has(slug)) error(`Slug "${slug}" is reserved by a changelog route.`)

  const names = readdirSync(dir).filter((name) => !name.startsWith(".")).sort()
  report.files = names.filter((name) => statSync(join(dir, name)).isFile()).map((name) => ({ name, bytes: statSync(join(dir, name)).size }))
  for (const file of report.files) {
    if (file.bytes > WARN_BYTES) warn(`${file.name} is ${(file.bytes / 1024 / 1024).toFixed(1)} MB; keep media under 2 MB.`)
  }
  const present = new Set(report.files.map((file) => file.name))
  const prefix = `/changelog/${slug}/`
  const referenced = new Set<string>()

  for (const locale of CHANGELOG_LOCALES) {
    const file = `${locale}.mdx`
    if (!present.has(file)) {
      error(`${file} is missing; every entry needs en.mdx and es.mdx.`)
      continue
    }
    const raw = readFileSync(join(dir, file), "utf8")
    const { data, content } = matter(raw)
    if (data.date instanceof Date) data.date = data.date.toISOString().slice(0, 10)
    const parsed = changelogFrontmatterSchema.safeParse(data)
    if (!parsed.success) {
      for (const issue of parsed.error.issues) error(`${file}: ${issue.path.join(".") || "(root)"} ${issue.message}`)
      continue
    }
    const frontmatter = parsed.data
    report.locales[locale] = { frontmatter, body: content }

    if (Number.isNaN(Date.parse(`${frontmatter.date}T00:00:00Z`)) || !CHANGELOG_ISO_DATE.test(frontmatter.date)) {
      error(`${file}: date "${frontmatter.date}" is not a real YYYY-MM-DD date.`)
    }
    if (/\bTODO\b/.test(raw)) error(`${file}: placeholder TODO text is still in the file.`)
    if (raw.includes(EM_DASH)) warn(`${file}: contains em dashes; rewrite them with commas, colons or periods.`)
    if (frontmatter.crafters.length === 0) warn(`${file}: crafters is empty; credit at least yourself.`)
    if (frontmatter.evidence.length === 0) warn(`${file}: evidence is empty; link the repos, PRs or pages that prove it.`)

    const refs = [frontmatter.image, frontmatter.video, ...[...content.matchAll(MEDIA_REF)].map((match) => match[1])]
    for (const ref of refs) {
      if (!ref) continue
      if (!ref.startsWith("/changelog/")) {
        if (ref.startsWith("/")) error(`${file}: ${ref} must live under ${prefix}.`)
        continue
      }
      if (!ref.startsWith(prefix) || ref.slice(prefix.length).includes("/")) {
        error(`${file}: ${ref} must be ${prefix}<file>, flat in the entry folder.`)
        continue
      }
      const name = ref.slice(prefix.length)
      referenced.add(name)
      if (!present.has(name)) error(`${file}: ${ref} is not in the folder; add ${name} next to the .mdx files.`)
    }
  }

  const en = report.locales.en?.frontmatter
  const es = report.locales.es?.frontmatter
  if (en && es) {
    if (en.date !== es.date) error(`en.mdx has date ${en.date} but es.mdx has ${es.date}; they must match.`)
    if ((en.order ?? 0) !== (es.order ?? 0)) error("en.mdx and es.mdx have a different order.")
  }
  report.date = (en ?? es)?.date

  for (const file of report.files) {
    if (!file.name.endsWith(".mdx") && !referenced.has(file.name) && file.name !== "shot.png") {
      warn(`${file.name} is not referenced by either .mdx file.`)
    }
  }
  const hasCover = [en, es].some((front) => front?.image)
  if (!hasCover && present.has("shot.png")) warn("No cover image: shot.png will be framed into the cover by a reviewer with the crafter.run generator.")
  if (!hasCover && !present.has("shot.png")) warn("No cover image and no shot.png; the entry will render without a cover.")

  report.ok = report.errors.length === 0
  return report
}

export function formatCheck(report: CheckReport): string {
  const lines = [`Entry: ${report.slug}${report.date ? ` (${report.date})` : ""}`, "Files:"]
  for (const file of report.files) lines.push(`  ${file.name}  ${formatBytes(file.bytes)}`)
  for (const message of report.errors) lines.push(`error: ${message}`)
  for (const message of report.warnings) lines.push(`warning: ${message}`)
  lines.push(report.ok ? `OK: ${report.warnings.length} warning(s).` : `FAILED: ${report.errors.length} error(s), ${report.warnings.length} warning(s).`)
  return lines.join("\n")
}

function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`
}

// ---------------------------------------------------------------- submit

export type PlanFile = { source: string; path: string; bytes: number }
export type Plan = {
  slug: string
  branch: string
  title: string
  commitMessage: string
  files: PlanFile[]
  body: string
  login: string
  username: string
}

export function buildPlan(dirInput: string, report: CheckReport, identity: Identity): Plan {
  const dir = resolve(dirInput)
  const { slug, date } = report
  const en = report.locales.en!
  const files: PlanFile[] = report.files.map((file) => {
    const locale = file.name === "en.mdx" ? "en" : file.name === "es.mdx" ? "es" : null
    return {
      source: join(dir, file.name),
      bytes: file.bytes,
      path: locale
        ? `apps/web/content/changelog/${date}-${slug}.${locale}.mdx`
        : `apps/web/public/changelog/${slug}/${file.name}`,
    }
  })
  const branch = `changelog/${slug}`
  const visual = visualProof(report, branch)
  const body = `## Problem

${en.frontmatter.summary}

## Changes

${files.map((file) => `- \`${file.path}\``).join("\n")}

Submitted by @${identity.login} for crafter \`${identity.username}\`.

## Visual proof

${visual}
`
  return {
    slug,
    branch,
    title: `Changelog: ${en.frontmatter.title}`,
    commitMessage: `docs(changelog): add ${slug}`,
    files,
    body,
    login: identity.login,
    username: identity.username,
  }
}

function visualProof(report: CheckReport, branch: string): string {
  const slug = report.slug
  const candidates = [
    report.locales.en?.frontmatter.image,
    ...[...(report.locales.en?.body.matchAll(/<Figure[^>]*\ssrc="([^"]+)"/g) ?? [])].map((match) => match[1]),
  ].filter((value): value is string => Boolean(value))
  const names = candidates.map((value) => value.replace(`/changelog/${slug}/`, ""))
  const image = names.find((name) => /\.(png|jpe?g|webp|gif)$/i.test(name) && report.files.some((file) => file.name === name)) ??
    (report.files.some((file) => file.name === "shot.png") ? "shot.png" : undefined)
  if (!image) return "No image in this entry."
  return `![${slug}](https://raw.githubusercontent.com/${REPO}/${branch}/apps/web/public/changelog/${slug}/${image})`
}

export function formatPlan(plan: Plan): string {
  return [
    `Dry run: nothing was pushed. Run again with --confirm to open the pull request.`,
    `Repository: ${REPO}`,
    `Branch: ${plan.branch} (from ${BASE_BRANCH})`,
    `Title: ${plan.title}`,
    `Commit: ${plan.commitMessage}`,
    `Author: @${plan.login} (crafter ${plan.username})`,
    "Files:",
    ...plan.files.map((file) => `  ${file.path}  ${formatBytes(file.bytes)}`),
  ].join("\n")
}

async function assertNothingPublished(gh: Gh, slug: string): Promise<string> {
  try {
    await gh(["api", `repos/${REPO}/git/ref/heads/changelog/${slug}`])
    throw new Error(`Branch changelog/${slug} already exists in ${REPO}; pick another slug or ask a maintainer.`)
  } catch (error) {
    if (!(error instanceof GhError && error.kind === "failed" && error.notFound)) throw error
  }
  // The folder does not exist on main until the first entry merges.
  const listing = await ghJson<{ name: string }[]>(gh, `repos/${REPO}/contents/apps/web/content/changelog?ref=${BASE_BRANCH}`).catch(
    (error: unknown) => {
      if (error instanceof GhError && error.kind === "failed" && error.notFound) return []
      throw error
    },
  )
  const clash = listing.find((item) => new RegExp(`^\\d{4}-\\d{2}-\\d{2}-${slug}\\.[a-z]{2}\\.mdx$`).test(item.name))
  if (clash) throw new Error(`An entry with slug "${slug}" already exists on ${BASE_BRANCH} (${clash.name}); pick another slug.`)
  const main = await ghJson<{ object: { sha: string } }>(gh, `repos/${REPO}/git/ref/heads/${BASE_BRANCH}`)
  return main.object.sha
}

export async function submit(dirInput: string, options: { confirm: boolean }, deps: Deps): Promise<string | undefined> {
  const report = checkEntry(dirInput)
  if (!report.ok) throw new Error(`${formatCheck(report)}\n\nFix the errors above before submitting.`)

  const identity = await resolveIdentity(deps)
  const known = new Set(identity.team.map((member) => member.username))
  for (const frontmatter of [report.locales.en!.frontmatter, report.locales.es!.frontmatter]) {
    for (const id of frontmatter.crafters) {
      if (!known.has(id)) throw new Error(`Crafter "${id}" is not an active member on the team page; credit only current core crafters.`)
    }
  }

  const head = await assertNothingPublished(deps.gh, report.slug)
  const plan = buildPlan(dirInput, report, identity)
  deps.log(formatPlan(plan))
  if (!options.confirm) return undefined

  const headCommit = await ghJson<{ tree: { sha: string } }>(deps.gh, `repos/${REPO}/git/commits/${head}`)
  const tree: { path: string; mode: "100644"; type: "blob"; sha: string }[] = []
  for (const file of plan.files) {
    const blob = await ghPost<{ sha: string }>(deps.gh, `repos/${REPO}/git/blobs`, {
      content: readFileSync(file.source).toString("base64"),
      encoding: "base64",
    })
    tree.push({ path: file.path, mode: "100644", type: "blob", sha: blob.sha })
  }
  const newTree = await ghPost<{ sha: string }>(deps.gh, `repos/${REPO}/git/trees`, { base_tree: headCommit.tree.sha, tree })
  const commit = await ghPost<{ sha: string }>(deps.gh, `repos/${REPO}/git/commits`, {
    message: plan.commitMessage,
    tree: newTree.sha,
    parents: [head],
  })
  await ghPost(deps.gh, `repos/${REPO}/git/refs`, { ref: `refs/heads/${plan.branch}`, sha: commit.sha })
  const pull = await ghPost<{ html_url: string }>(deps.gh, `repos/${REPO}/pulls`, {
    title: plan.title,
    head: plan.branch,
    base: BASE_BRANCH,
    body: plan.body,
  })
  deps.log(`Pull request: ${pull.html_url}`)
  return pull.html_url
}

// ---------------------------------------------------------------- command

export const changelogHelp = `Usage:
  crafter changelog new <slug> [--area <research|lab|games|station>] [--kind <ship|update|event|roundup>]
  crafter changelog check <dir> [--json]
  crafter changelog submit <dir> [--confirm]`

export async function runChangelog(args: string[], deps: Deps = realDeps): Promise<number> {
  const [sub, ...rest] = args
  const flag = (name: string) => {
    const index = rest.indexOf(name)
    return index === -1 ? undefined : rest[index + 1]
  }
  const positional = rest.filter((arg, index) => !arg.startsWith("--") && !(index > 0 && rest[index - 1]!.startsWith("--") && ["--area", "--kind"].includes(rest[index - 1]!)))

  if (sub === "new") {
    if (positional.length !== 1) throw new Error(`Usage: crafter changelog new <slug> [--area <a>] [--kind <k>]`)
    await scaffold(positional[0]!, { area: flag("--area"), kind: flag("--kind") }, deps)
    return 0
  }
  if (sub === "check") {
    if (positional.length !== 1) throw new Error("Usage: crafter changelog check <dir> [--json]")
    const report = checkEntry(positional[0]!)
    if (rest.includes("--json")) {
      const { locales: _locales, ...json } = report
      deps.log(JSON.stringify(json, null, 2))
    } else {
      deps.log(formatCheck(report))
    }
    return report.ok ? 0 : 1
  }
  if (sub === "submit") {
    if (positional.length !== 1) throw new Error("Usage: crafter changelog submit <dir> [--confirm]")
    await submit(positional[0]!, { confirm: rest.includes("--confirm") }, deps)
    return 0
  }
  throw new Error(`Unknown changelog command: ${sub ?? "(none)"}\n\n${changelogHelp}`)
}
