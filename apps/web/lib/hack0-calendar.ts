import { cache } from "react"
import { HACK0_ICAL_URL, parseHack0Calendar, type Hack0Event } from "@/lib/hack0-calendar-data"

export type Hack0Calendar = {
  events: Hack0Event[]
  status: "available" | "unavailable"
}

// All published hack0 events, regardless of organizer or Crafter Station tag.
// Request memoization plus Next's data cache keeps the shared sidebar inexpensive.
export const fetchHack0Calendar = cache(async (): Promise<Hack0Calendar> => {
  try {
    const response = await fetch(HACK0_ICAL_URL, {
      headers: { Accept: "text/calendar" },
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error(`Calendar response ${response.status}`)
    return { events: parseHack0Calendar(await response.text()), status: "available" }
  } catch {
    console.warn("[hack0] Public calendar unavailable; showing a direct Luma link")
    return { events: [], status: "unavailable" }
  }
})
