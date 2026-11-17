import {
  listShipsResponseSchema,
  listMembersResponseSchema,
  memberResponseSchema,
  shipResponseSchema,
  type MemberProfile,
  type ShipListPagination,
  type ShipDetail,
  type ShipSummary,
} from "@crafter/contracts"

import { env } from "@/env"

export type ShipsPage = { ships: ShipSummary[]; pagination: ShipListPagination | null }

export async function listShipsPage(
  options: { limit?: number; offset?: number; handle?: string } = {},
): Promise<ShipsPage | null> {
  try {
    const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
    if (!apiUrl) throw new Error("API_URL is required outside development.")

    const url = new URL("/v1/ships", apiUrl)
    if (options.limit !== undefined) url.searchParams.set("limit", String(options.limit))
    if (options.offset) url.searchParams.set("offset", String(options.offset))
    if (options.handle) url.searchParams.set("handle", options.handle)
    const response = await fetch(url, { cache: "no-store" })

    if (!response.ok) {
      console.warn(`Ships API returned ${response.status}.`)
      return null
    }

    const parsed = listShipsResponseSchema.safeParse(await response.json())
    if (!parsed.success) {
      console.warn("Ships API returned an invalid response.")
      return null
    }

    return { ships: parsed.data.ships, pagination: parsed.data.pagination ?? null }
  } catch (error) {
    console.warn("Ships API is unavailable.", error)
    return null
  }
}

export async function listPublishedShips(options: { handle?: string } = {}): Promise<ShipSummary[] | null> {
  return (await listShipsPage({ handle: options.handle }))?.ships ?? null
}

/** Full details (with updates) for the ships that have any; ships without updates are fetched as-is from the summaries. */
export async function listShipsWithUpdates(ships: ShipSummary[]): Promise<ShipDetail[]> {
  const details = await Promise.all(
    ships.filter((ship) => (ship.updateCount ?? 0) > 0).map((ship) => getPublishedShip(ship.slug)),
  )
  return details.filter((ship): ship is ShipDetail => ship !== null)
}

export async function listCrafters(): Promise<MemberProfile[] | null> {
  try {
    const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
    if (!apiUrl) throw new Error("API_URL is required outside development.")

    const response = await fetch(new URL("/v1/members", apiUrl), {
      cache: "no-store",
    })
    if (!response.ok) return null

    const parsed = listMembersResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.members : null
  } catch (error) {
    console.warn("Crafters API is unavailable.", error)
    return null
  }
}

export async function getPublishedShip(slug: string, options: { signal?: AbortSignal } = {}): Promise<ShipDetail | null> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return null
  try {
    const response = await fetch(new URL(`/v1/ships/${encodeURIComponent(slug)}`, apiUrl), {
      cache: "no-store",
      signal: options.signal,
    })
    if (!response.ok) return null
    const parsed = shipResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.ship : null
  } catch {
    return null
  }
}

export async function getCrafterProfile(handle: string, options: { signal?: AbortSignal } = {}): Promise<MemberProfile | null> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return null
  try {
    const response = await fetch(new URL(`/v1/members/${encodeURIComponent(handle)}`, apiUrl), {
      cache: "no-store",
      signal: options.signal,
    })
    if (!response.ok) return null
    const parsed = memberResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.member : null
  } catch {
    return null
  }
}

export async function listCrafterShips(handle: string): Promise<ShipSummary[]> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return []
  try {
    const response = await fetch(new URL(`/v1/members/${encodeURIComponent(handle)}/ships`, apiUrl), {
      cache: "no-store",
    })
    if (!response.ok) return []
    const parsed = listShipsResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.ships : []
  } catch {
    return []
  }
}
