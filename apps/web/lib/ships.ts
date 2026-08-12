import {
  listShipsResponseSchema,
  listMembersResponseSchema,
  memberResponseSchema,
  shipResponseSchema,
  type MemberProfile,
  type ShipDetail,
  type ShipSummary,
} from "@crafter/contracts"

import { env } from "@/env"

export async function listPublishedShips(): Promise<ShipSummary[] | null> {
  try {
    const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
    if (!apiUrl) throw new Error("API_URL is required outside development.")

    const response = await fetch(new URL("/v1/ships", apiUrl), {
      cache: "no-store",
    })

    if (!response.ok) {
      console.warn(`Ships API returned ${response.status}.`)
      return null
    }

    const parsed = listShipsResponseSchema.safeParse(await response.json())
    if (!parsed.success) {
      console.warn("Ships API returned an invalid response.")
      return null
    }

    return parsed.data.ships
  } catch (error) {
    console.warn("Ships API is unavailable.", error)
    return null
  }
}

export async function listCrafters(): Promise<MemberProfile[] | null> {
  try {
    const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
    if (!apiUrl) throw new Error("API_URL is required outside development.")

    const response = await fetch(new URL("/v1/members", apiUrl), {
      next: { revalidate: 60 },
    })
    if (!response.ok) return null

    const parsed = listMembersResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.members : null
  } catch (error) {
    console.warn("Crafters API is unavailable.", error)
    return null
  }
}

export async function getPublishedShip(slug: string): Promise<ShipDetail | null> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return null
  try {
    const response = await fetch(new URL(`/v1/ships/${encodeURIComponent(slug)}`, apiUrl), {
      cache: "no-store",
    })
    if (!response.ok) return null
    const parsed = shipResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.ship : null
  } catch {
    return null
  }
}

export async function getCrafterProfile(handle: string): Promise<MemberProfile | null> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return null
  try {
    const response = await fetch(new URL(`/v1/members/${encodeURIComponent(handle)}`, apiUrl), {
      next: { revalidate: 60 },
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
