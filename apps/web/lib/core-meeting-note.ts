// Turns an Obsidian meeting note into a core_meetings row. Pure: no file or database access.
import { teamMembers } from "./team"

export type ParsedMeeting = {
  slug: string
  title: string
  heldAt: string
  durationMinutes: number | null
  summary: string
  attendees: string[]
  body: string
}

const fold = (value: string) =>
  value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[-_]+/g, " ").trim()

const unwikilink = (text: string) => text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label ?? target)

function splitFrontmatter(note: string) {
  const match = note.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { fields: {} as Record<string, string | string[]>, rest: note }
  const fields: Record<string, string | string[]> = {}
  let list: string | null = null
  for (const line of match[1].split("\n")) {
    const item = line.match(/^\s+-\s+(.*)$/)
    if (item && list) {
      ;(fields[list] as string[]).push(item[1].replace(/^"|"$/g, ""))
      continue
    }
    const pair = line.match(/^([\w-]+):\s*(.*)$/)
    if (!pair) continue
    list = pair[2] === "" ? pair[1] : null
    fields[pair[1]] = list ? [] : pair[2].replace(/^"|"$/g, "")
  }
  return { fields, rest: note.slice(match[0].length) }
}

/** Matches "[[ignacio-velasquez]]" or "[[Liz]]" to a team username by folded name tokens. */
export function matchAttendee(raw: string) {
  const wanted = fold(unwikilink(raw)).split(/\s+/)
  const member = teamMembers.find((candidate) => {
    const name = fold(candidate.name).split(/\s+/)
    return wanted.every((token) => name.includes(token)) || fold(candidate.username) === wanted.join(" ")
  })
  return member?.username ?? null
}

/** Removes the abstract callout and returns its text as the summary. */
function takeAbstract(body: string) {
  const match = body.match(/^> \[!abstract\][^\n]*\n((?:>[^\n]*\n?)+)/m)
  if (!match) return { summary: "", body }
  const summary = match[1].split("\n").map((line) => line.replace(/^>\s?/, "")).join(" ").replace(/\s+/g, " ").trim()
  return { summary, body: body.replace(match[0], "") }
}

export function parseMeetingNote(note: string, slug: string): ParsedMeeting {
  const { fields, rest } = splitFrontmatter(note)
  const title = rest.match(/^# (.+)$/m)?.[1]?.trim()
  if (!title) throw new Error("The note needs a top-level # title.")

  const heldAt = String(fields.held_at ?? fields.created ?? "")
  if (Number.isNaN(Date.parse(heldAt))) throw new Error("The note needs held_at or created in its frontmatter.")
  const duration = String(fields.duration ?? "").match(/\d+/)

  const rawAttendees = Array.isArray(fields.attendees) ? fields.attendees : []
  const attendees = rawAttendees.map(matchAttendee)
  const unknown = rawAttendees.filter((_, index) => !attendees[index])
  if (unknown.length) throw new Error(`No team member matches: ${unknown.join(", ")}`)

  let body = rest.replace(/^# .+\n/m, "")
  body = body.replace(/^## Links\n[\s\S]*$/m, "")
  // Facts table ("| | |" header): the page renders those facts from the row's own columns.
  body = body.replace(/^\| \| \|\n\|---\|---\|\n(?:\|.*\|\n?)*/m, "")
  body = body.replace(/^---\s*$/gm, "")
  const abstract = takeAbstract(unwikilink(body))

  return {
    slug,
    title,
    heldAt: new Date(heldAt).toISOString(),
    durationMinutes: duration ? Number(duration[0]) : null,
    summary: abstract.summary,
    attendees: attendees as string[],
    body: abstract.body.replace(/\n{3,}/g, "\n\n").trim(),
  }
}

/** Splits joined transcript lines into paragraphs at the first sentence end past `size` characters. */
function paragraphs(text: string, size = 480) {
  const out: string[] = []
  let current = ""
  for (const sentence of text.replace(/\s+/g, " ").trim().split(/(?<=[.?!])\s+/)) {
    current = current ? `${current} ${sentence}` : sentence
    if (current.length >= size) {
      out.push(current)
      current = ""
    }
  }
  if (current) out.push(current)
  return out.join("\n\n")
}

/** Keeps the `##` sections only: the frontmatter, the title and the vault notes above them are dropped. */
export function parseTranscriptNote(note: string) {
  const { rest } = splitFrontmatter(note)
  const sections = unwikilink(rest).split(/^(?=## )/m).filter((part) => part.startsWith("## "))
  return sections
    .map((section) => {
      const [heading, ...lines] = section.split("\n")
      return `${heading}\n\n${paragraphs(lines.join(" "))}`
    })
    .join("\n\n")
}
