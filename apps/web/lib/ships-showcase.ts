import type { MemberProfile, ShipLink, ShipSummary } from "@crafter/contracts"

import { crafterAffiliation, lastActivityAt } from "@/lib/ship-activity"

export const shipSorts = ["recent", "votes"] as const
export type ShipSort = (typeof shipSorts)[number]

export type ShipsView = { sort: ShipSort; live: boolean; page: number }

type RawParams = { sort?: string | string[]; live?: string | string[]; page?: string | string[] }

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

/** Search params to a view. Unknown values fall back to the default view so every URL renders. */
export function parseShipsView(params: RawParams): ShipsView {
  const sort = shipSorts.find((candidate) => candidate === first(params.sort)) ?? "recent"
  const requested = Number.parseInt(first(params.page) ?? "1", 10)
  const page = Number.isInteger(requested) && requested > 1 ? Math.min(requested, 10_000) : 1
  return { sort, live: first(params.live) === "1", page }
}

/** Canonical query string for a view; the default view has none. */
export function shipsQuery(view: Partial<ShipsView>): string {
  const query = new URLSearchParams()
  if (view.sort && view.sort !== "recent") query.set("sort", view.sort)
  if (view.live) query.set("live", "1")
  if (view.page && view.page > 1) query.set("page", String(view.page))
  const text = query.toString()
  return text ? `?${text}` : ""
}

export const isDefaultView = (view: ShipsView) => view.sort === "recent" && !view.live && view.page === 1

const byActivity = (a: ShipSummary, b: ShipSummary) =>
  Date.parse(lastActivityAt(b)) - Date.parse(lastActivityAt(a)) || a.id.localeCompare(b.id)

export function sortShips(ships: ShipSummary[], sort: ShipSort): ShipSummary[] {
  const copy = [...ships]
  if (sort === "votes") return copy.sort((a, b) => b.voteCount - a.voteCount || byActivity(a, b))
  return copy.sort(byActivity)
}

/** A Ship with a live website, as opposed to a repository only. */
export const hasLiveLink = (ship: Pick<ShipSummary, "links">) =>
  ship.links.some((link) => link.type === "website" || link.type === "demo")

/** The most upvoted Ship; ties go to the most recent activity. */
export function pickFeatured(ships: ShipSummary[]): ShipSummary | null {
  return sortShips(ships, "votes")[0] ?? null
}

export type Maker = {
  handle: string
  displayName: string
  avatarUrl: string | null
  ships: number
  affiliation: "core" | "crew" | null
}

/** One entry per crafter who shipped, most Ships first, then most recent. */
export function buildMakers(ships: ShipSummary[], profiles: MemberProfile[] | null): Maker[] {
  const github = new Map((profiles ?? []).map((profile) => [profile.handle, profile.githubUrl]))
  const makers = new Map<string, Maker & { latest: number }>()
  for (const ship of ships) {
    const { handle, displayName, avatarUrl } = ship.owner
    const seen = makers.get(handle)
    const at = Date.parse(lastActivityAt(ship))
    if (seen) {
      seen.ships += 1
      seen.latest = Math.max(seen.latest, at)
    } else {
      makers.set(handle, {
        handle,
        displayName,
        avatarUrl,
        ships: 1,
        latest: at,
        affiliation: crafterAffiliation({ handle, githubUrl: github.get(handle) ?? null }),
      })
    }
  }
  return [...makers.values()]
    .sort((a, b) => b.ships - a.ships || b.latest - a.latest || a.handle.localeCompare(b.handle))
    .map(({ latest: _latest, ...maker }) => maker)
}

export type ShipLinkKind = ShipLink["type"]

/** Totals shown in the hero. */
export function shipTotals(ships: ShipSummary[]) {
  return {
    ships: ships.length,
    updates: ships.reduce((sum, ship) => sum + (ship.updateCount ?? 0), 0),
    votes: ships.reduce((sum, ship) => sum + ship.voteCount, 0),
  }
}

const palettes = [
  { from: "#c9b8f0", to: "#8f78d4", ink: "#1c1433" },
  { from: "#f4d56d", to: "#e79a4b", ink: "#2b1d0a" },
  { from: "#a9d8b8", to: "#4fa37a", ink: "#0f2a1c" },
  { from: "#9fc7ef", to: "#5b8fd6", ink: "#0e2238" },
  { from: "#f2b6b0", to: "#d9726b", ink: "#35120f" },
  { from: "#d8c9a8", to: "#a68b5b", ink: "#2a2112" },
] as const

/** Deterministic cover for a Ship without an image: palette and monogram come from its name. */
export function fallbackCover(name: string) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + (char.codePointAt(0) ?? 0)) >>> 0
  const words = name.trim().split(/[\s\-_]+/).filter(Boolean)
  const letters = (words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? "?").slice(0, 2)).toUpperCase()
  return { palette: palettes[hash % palettes.length], letters, angle: 120 + (hash % 5) * 18 }
}
