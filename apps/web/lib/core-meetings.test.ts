import { describe, expect, test } from "bun:test"

import { matchAttendee, parseMeetingNote, parseTranscriptNote } from "./core-meeting-note"
import { findCoreMember } from "./core-members"

type Account = Parameters<typeof findCoreMember>[0]

const account = (github: string[] = [], emails: [string, string][] = []) =>
  ({
    externalAccounts: github.map((username) => ({ provider: "oauth_github", username })),
    emailAddresses: emails.map(([emailAddress, status]) => ({ emailAddress, verification: { status } })),
  }) as unknown as Account

describe("findCoreMember", () => {
  test("matches an active member by linked GitHub username, case-insensitively", () => {
    expect(findCoreMember(account(["railly"]))?.username).toBe("railly")
  })

  test("rejects alumni and strangers", () => {
    expect(findCoreMember(account(["shiarauzo"]))).toBeNull()
    expect(findCoreMember(account(["someone-else"]))).toBeNull()
  })

  test("matches a listed email only when it is verified", () => {
    expect(findCoreMember(account([], [["Cristian.Correa.CS@gmail.com", "verified"]]))?.username).toBe("cris")
    expect(findCoreMember(account([], [["cristian.correa.cs@gmail.com", "unverified"]]))).toBeNull()
  })
})

const note = `---
type: meeting
created: 2026-11-08
held_at: 2026-11-08T22:09:00-03:00
duration: 32 min
attendees:
  - "[[Railly Hugo]]"
  - "[[ignacio-velasquez]]"
  - "[[Liz]]"
---
# Core sync · noviembre

> [!abstract] TL;DR
> Primera reunión con **cuatro orgs**.
> Segunda línea.

| | |
|---|---|
| **Deck** | \`~/Programming/talks\` |

---

## 1. Visión

Ver [[crafter-station-context|el contexto]] y [[otra-nota]].

## Links
- [[crafter-station-context]]
`

describe("parseMeetingNote", () => {
  const meeting = parseMeetingNote(note, "2026-11-08-core-sync")

  test("reads the row fields from the frontmatter and title", () => {
    expect(meeting.title).toBe("Core sync · noviembre")
    expect(meeting.heldAt).toBe("2026-11-09T01:09:00.000Z")
    expect(meeting.durationMinutes).toBe(32)
    expect(meeting.attendees).toEqual(["railly", "nacho", "liz"])
  })

  test("lifts the abstract callout into the summary", () => {
    expect(meeting.summary).toBe("Primera reunión con **cuatro orgs**. Segunda línea.")
    expect(meeting.body).not.toContain("[!abstract]")
  })

  test("drops vault-only parts: facts table, rules, links and wikilinks", () => {
    expect(meeting.body).toBe("## 1. Visión\n\nVer el contexto y otra-nota.")
  })

  test("refuses attendees that match nobody", () => {
    expect(() => parseMeetingNote(note.replace("[[Liz]]", "[[Nadie Real]]"), "x")).toThrow("Nadie Real")
  })
})

describe("matchAttendee", () => {
  test("folds accents and slugs", () => {
    expect(matchAttendee("[[Carlos Tarmeño]]")).toBe("tarmeno")
    expect(matchAttendee("[[cristian-olivera]]")).toBe("cristianolivera1")
  })
})

describe("parseTranscriptNote", () => {
  test("keeps only the ## sections and splits long text into paragraphs", () => {
    const sentence = "Una frase que se repite para llenar el párrafo. "
    const transcript = parseTranscriptNote(`---\ntype: x\n---\n# T\n\nNota del vault, ver [[resumen]].\n\n## 00:00 a 01:00\n\n${sentence.repeat(20)}`)
    expect(transcript.startsWith("## 00:00 a 01:00\n\n")).toBe(true)
    expect(transcript).not.toContain("Nota del vault")
    expect(transcript.split("\n\n").length).toBeGreaterThan(2)
  })
})
