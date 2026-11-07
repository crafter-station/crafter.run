import { cache } from "react"
import {
  HACK0_ICAL_URL,
  hack0EventSlug,
  hack0EventUrl,
  parseHack0Calendar,
  type Hack0Event,
} from "@/lib/hack0-calendar-data"

export type Hack0Calendar = {
  events: Hack0Event[]
  status: "available" | "unavailable"
}

// hack0 publishes a page for nearly every Luma event, but new events take a sync
// to appear. Its per-event .ics route is a small cacheable probe: 200 means the
// page exists. Anything else keeps the Luma link, so no event links to a 404.
async function hack0PageExists(slug: string) {
  try {
    const response = await fetch(`${hack0EventUrl(slug)}/ics`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })
    return response.ok
  } catch {
    return false
  }
}

async function linkHack0Pages(events: Hack0Event[]) {
  const linked = [...events]
  let next = 0
  const worker = async () => {
    while (next < linked.length) {
      const index = next++
      const event = linked[index]
      const slug = hack0EventSlug(event.title, event.url)
      if (slug && (await hack0PageExists(slug))) linked[index] = { ...event, href: hack0EventUrl(slug) }
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker))
  return linked
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
    const events = parseHack0Calendar(await response.text())
    return { events: await linkHack0Pages(events), status: "available" }
  } catch {
    console.warn("[hack0] Public calendar unavailable; showing a direct hack0 link")
    return { events: [], status: "unavailable" }
  }
})
