import type { ShipDetail, ShipSummary } from "@crafter/contracts"

import { crewMembers } from "@/lib/crew"
import type { Locale } from "@/lib/i18n"
import { teamMembers } from "@/lib/team"

export type ActivityEvent = {
  /** Stable per event: `<ship id>` for a publication, `<ship id>:<update id>` for an update. */
  id: string
  kind: "published" | "update"
  at: string
  title: string
  description: string
  ship: { slug: string; name: string; ownerHandle: string; ownerName: string }
}

/**
 * Every publication (from the summaries) and update (from the details of ships that have any)
 * as one stream, newest first.
 */
export function buildActivity(ships: ShipSummary[], details: ShipDetail[]): ActivityEvent[] {
  const events: ActivityEvent[] = []
  for (const ship of ships) {
    events.push({
      id: ship.id,
      kind: "published",
      at: ship.publishedAt,
      title: ship.name,
      description: ship.tagline,
      ship: { slug: ship.slug, name: ship.name, ownerHandle: ship.owner.handle, ownerName: ship.owner.displayName },
    })
  }
  for (const ship of details) {
    const ref = { slug: ship.slug, name: ship.name, ownerHandle: ship.owner.handle, ownerName: ship.owner.displayName }
    for (const update of ship.updates) {
      events.push({ id: `${ship.id}:${update.id}`, kind: "update", at: update.publishedAt, title: update.title, description: update.description, ship: ref })
    }
  }
  return events.sort((a, b) => Date.parse(b.at) - Date.parse(a.at) || a.id.localeCompare(b.id))
}

export function lastActivityAt(ship: Pick<ShipSummary, "publishedAt" | "lastActivityAt">): string {
  return ship.lastActivityAt ?? ship.publishedAt
}

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 86_400_000],
  ["month", 30 * 86_400_000],
  ["week", 7 * 86_400_000],
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
]

/** "3 days ago" in the reader's locale. Under a minute reads as "now". */
export function relativeTime(iso: string, locale: Locale, now: number = Date.now()): string {
  const diff = Date.parse(iso) - now
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })
  for (const [unit, size] of units) {
    if (Math.abs(diff) >= size) return formatter.format(Math.trunc(diff / size), unit)
  }
  return formatter.format(0, "second")
}

const githubUser = (url: string | null | undefined) => url?.replace(/\/+$/, "").split("/").pop()?.toLowerCase() ?? ""

/** Core (active team roster) or Crew, matched by GitHub account or by a username equal to the handle. */
export function crafterAffiliation(member: { handle: string; githubUrl: string | null }): "core" | "crew" | null {
  const handle = member.handle.toLowerCase()
  const github = githubUser(member.githubUrl)
  const matches = (username: string, url?: string) =>
    username.toLowerCase() === handle || (github !== "" && githubUser(url) === github)
  if (teamMembers.some((person) => !person.alumni && matches(person.username, person.github))) return "core"
  if (crewMembers.some((person) => matches(person.username, person.link))) return "crew"
  return null
}
