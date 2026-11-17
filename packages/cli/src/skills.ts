import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

export const skillsHelp = `crafter skills - List and retrieve bundled skill content

Usage: crafter skills [subcommand] [options]

Subcommands:
  list                       List all available skills (default)
  get <name> [name...]       Output a skill's SKILL.md
  get <name> --full          Include references
  get <name> --ref <ref>     Output only one reference (repeatable)
  get --all                  Output every skill
  path [name]                Print filesystem path to skill directory

Options:
  --json                     Output as JSON (list)

The skills command serves bundled skill content that always matches the
installed CLI version. Agents should use it rather than cached copies.

Examples:
  crafter skills list
  crafter skills get ship
  crafter skills get changelog --full
  crafter skills get changelog --ref media
  crafter skills get --all
  crafter skills path ship`

export interface SkillInfo {
  name: string
  description: string
  path: string
}

export interface SkillsIO {
  out: (text: string) => void
  err: (text: string) => void
}

/** Skills ship next to `src/` and `dist/`, so the same relative path works from source and from the build. */
export function defaultSkillsDir(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), "..", "skills")
}

function frontmatter(text: string): { name?: string; description?: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
  const result: { name?: string; description?: string } = {}
  if (!match) return result
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^(name|description):\s*(.*)$/.exec(line)
    if (field) result[field[1] as "name" | "description"] = field[2].trim().replace(/^["']|["']$/g, "")
  }
  return result
}

export function listSkills(dir: string = defaultSkillsDir()): SkillInfo[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((entry) => existsSync(join(dir, entry, "SKILL.md")))
    .sort()
    .map((entry) => {
      const meta = frontmatter(readFileSync(join(dir, entry, "SKILL.md"), "utf8"))
      return { name: meta.name ?? entry, description: meta.description ?? "", path: join(dir, entry) }
    })
}

function references(skill: SkillInfo): string[] {
  const dir = join(skill.path, "references")
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((file) => statSync(join(dir, file)).isFile())
    .sort()
}

function resolveReference(skill: SkillInfo, ref: string): string | undefined {
  const file = ref.replace(/^references\//, "")
  const candidates = [file, `${file}.md`].filter((name) => references(skill).includes(name))
  return candidates[0] ? join(skill.path, "references", candidates[0]) : undefined
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 3).trimEnd()}...` : text
}

export function runSkills(args: string[], dir: string = defaultSkillsDir(), io: SkillsIO = { out: console.log, err: console.error }): number {
  const [sub = "list", ...rest] = args
  if (sub === "help" || sub === "--help" || sub === "-h") {
    io.out(skillsHelp)
    return 0
  }
  const skills = listSkills(dir)
  const json = rest.includes("--json") || (sub === "--json")
  const names = skills.map((skill) => skill.name).join(", ")

  if (sub === "list" || sub === "--json") {
    if (json) {
      io.out(JSON.stringify(skills.map(({ name, description }) => ({ name, description })), null, 2))
      return 0
    }
    const width = Math.max(0, ...skills.map((skill) => skill.name.length))
    for (const skill of skills) io.out(`${skill.name.padEnd(width + 2)}${truncate(skill.description, 90)}`)
    return 0
  }

  const find = (name: string): SkillInfo | undefined => skills.find((skill) => skill.name === name)
  const unknown = (name: string): number => {
    io.err(`Unknown skill: ${name}\nAvailable skills: ${names}`)
    return 1
  }

  if (sub === "path") {
    const name = rest.find((arg) => !arg.startsWith("--"))
    if (!name) {
      io.out(dir)
      return 0
    }
    const skill = find(name)
    if (!skill) return unknown(name)
    io.out(skill.path)
    return 0
  }

  if (sub === "get") {
    const wanted: string[] = []
    const refs: string[] = []
    let all = false
    let full = false
    for (let i = 0; i < rest.length; i++) {
      const arg = rest[i]
      if (arg === "--all") all = true
      else if (arg === "--full") full = true
      else if (arg === "--json") continue
      else if (arg === "--ref") {
        const value = rest[++i]
        if (!value) {
          io.err("--ref requires a reference name")
          return 1
        }
        refs.push(value)
      } else if (arg.startsWith("--")) {
        io.err(`Unknown option: ${arg}\n\n${skillsHelp}`)
        return 1
      } else wanted.push(arg)
    }
    if (!all && wanted.length === 0) {
      io.err(`Usage: crafter skills get <name> [name...] [--full | --ref <ref>] | --all\nAvailable skills: ${names}`)
      return 1
    }
    const selected: SkillInfo[] = []
    for (const name of all ? skills.map((skill) => skill.name) : wanted) {
      const skill = find(name)
      if (!skill) return unknown(name)
      selected.push(skill)
    }
    const chunks: string[] = []
    for (const skill of selected) {
      if (refs.length > 0) {
        for (const ref of refs) {
          const file = resolveReference(skill, ref)
          if (!file) {
            const available = references(skill).map((name) => name.replace(/\.md$/, "")).join(", ") || "none"
            io.err(`Unknown reference '${ref}' for skill '${skill.name}'\nAvailable references: ${available}`)
            return 1
          }
          chunks.push(readFileSync(file, "utf8"))
        }
        continue
      }
      chunks.push(readFileSync(join(skill.path, "SKILL.md"), "utf8"))
      if (full) {
        for (const file of references(skill)) {
          chunks.push(`<!-- references/${file} -->\n\n${readFileSync(join(skill.path, "references", file), "utf8")}`)
        }
      }
    }
    io.out(chunks.map((chunk) => chunk.replace(/\n+$/, "")).join("\n\n---\n\n"))
    return 0
  }

  io.err(`Unknown skills subcommand: ${sub}\n\n${skillsHelp}`)
  return 1
}
