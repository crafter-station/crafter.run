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

// Static and ISR routes (the sitemap) pass a revalidate window; a no-store fetch there throws
// a dynamic-usage error that the catch below would swallow, dropping every Ship.
type FetchCaching = { revalidate?: number }

function cacheOption(revalidate: number | undefined): RequestInit {
  return revalidate === undefined ? { cache: "no-store" } : { next: { revalidate } }
}

export async function listShipsPage(
  options: { limit?: number; offset?: number; handle?: string } & FetchCaching = {},
): Promise<ShipsPage | null> {
  try {
    const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
    if (!apiUrl) throw new Error("API_URL is required outside development.")

    const url = new URL("/v1/ships", apiUrl)
    if (options.limit !== undefined) url.searchParams.set("limit", String(options.limit))
    if (options.offset) url.searchParams.set("offset", String(options.offset))
    if (options.handle) url.searchParams.set("handle", options.handle)
    const response = await fetch(url, cacheOption(options.revalidate))

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

/** Every published Ship, read page by page so the showcase can sort and filter the whole set. */
export async function listAllShips(options: FetchCaching = {}): Promise<ShipsPage | null> {
  const first = await listShipsPage({ limit: 100, revalidate: options.revalidate })
  if (!first) return null
  const ships = [...first.ships]
  let offset = first.pagination?.nextOffset ?? null
  while (offset !== null) {
    const next = await listShipsPage({ limit: 100, offset, revalidate: options.revalidate })
    if (!next) break
    ships.push(...next.ships)
    offset = next.pagination?.nextOffset ?? null
  }
  return { ships, pagination: first.pagination }
}

export async function listPublishedShips(options: { handle?: string } & FetchCaching = {}): Promise<ShipSummary[] | null> {
  return (await listShipsPage({ handle: options.handle, revalidate: options.revalidate }))?.ships ?? null
}

/** Full details (with updates) for the ships that have any; ships without updates are fetched as-is from the summaries. */
export async function listShipsWithUpdates(ships: ShipSummary[], options: FetchCaching = {}): Promise<ShipDetail[]> {
  const details = await Promise.all(
    ships.filter((ship) => (ship.updateCount ?? 0) > 0).map((ship) => getPublishedShip(ship.slug, options)),
  )
  return details.filter((ship): ship is ShipDetail => ship !== null)
}

export async function listCrafters(options: FetchCaching = {}): Promise<MemberProfile[] | null> {
  try {
    const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
    if (!apiUrl) throw new Error("API_URL is required outside development.")

    const response = await fetch(new URL("/v1/members", apiUrl), cacheOption(options.revalidate))
    if (!response.ok) return null

    const parsed = listMembersResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.members : null
  } catch (error) {
    console.warn("Crafters API is unavailable.", error)
    return null
  }
}

export async function getPublishedShip(slug: string, options: { signal?: AbortSignal } & FetchCaching = {}): Promise<ShipDetail | null> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return null
  try {
    const response = await fetch(new URL(`/v1/ships/${encodeURIComponent(slug)}`, apiUrl), {
      ...cacheOption(options.revalidate),
      signal: options.signal,
    })
    if (!response.ok) return null
    const parsed = shipResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.ship : null
  } catch {
    return null
  }
}

export async function getCrafterProfile(handle: string, options: { signal?: AbortSignal } & FetchCaching = {}): Promise<MemberProfile | null> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return null
  try {
    const response = await fetch(new URL(`/v1/members/${encodeURIComponent(handle)}`, apiUrl), {
      ...cacheOption(options.revalidate),
      signal: options.signal,
    })
    if (!response.ok) return null
    const parsed = memberResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.member : null
  } catch {
    return null
  }
}

export async function listCrafterShips(handle: string, options: FetchCaching = {}): Promise<ShipSummary[]> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return []
  try {
    const response = await fetch(new URL(`/v1/members/${encodeURIComponent(handle)}/ships`, apiUrl), cacheOption(options.revalidate))
    if (!response.ok) return []
    const parsed = listShipsResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.ships : []
  } catch {
    return []
  }
}
