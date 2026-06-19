import { env } from "@/env"

const LUMA_API_BASE = "https://api.lu.ma/public/v1"
const CS_TAG = "Crafter Station"

export interface LumaEvent {
  id: string
  title: string
  startAt: Date
  endAt: Date
  description: string
  url: string
  coverUrl: string | null
  location: string
  timezone: string
  tags: string[]
}

interface LumaApiTag {
  api_id: string
  name: string
}

interface LumaApiGeo {
  city?: string
  country?: string
  full_address?: string
}

interface LumaApiEvent {
  api_id: string
  name: string
  start_at: string
  end_at: string
  description_md?: string
  url: string
  cover_url?: string | null
  geo_address_json?: LumaApiGeo | null
  timezone?: string
}

interface LumaApiEntry {
  api_id: string
  event: LumaApiEvent
  tags?: LumaApiTag[]
}

interface LumaApiResponse {
  entries: LumaApiEntry[]
  next_cursor?: string | null
}

export interface CrafterStationEvents {
  upcoming: LumaEvent[]
  past: LumaEvent[]
  all: LumaEvent[]
  filterTags: string[]
}

function buildLocation(geo: LumaApiGeo | null | undefined): string {
  if (!geo) return "Online"

  const { city, country } = geo
  if (city && country) return `${city}, ${country}`
  if (city) return city
  if (country) return country

  return "Online"
}

async function fetchPage(apiKey: string, cursor?: string) {
  const url = new URL(`${LUMA_API_BASE}/calendar/list-events`)
  url.searchParams.set("series_mode", "sessions")
  if (cursor) url.searchParams.set("pagination_cursor", cursor)

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "x-luma-api-key": apiKey,
    },
    next: { revalidate: 21600 },
  })

  if (!res.ok) {
    throw new Error(`Luma API error: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<LumaApiResponse>
}

export async function fetchCrafterStationEvents(): Promise<CrafterStationEvents> {
  const apiKey = env.LUMA_API_KEY

  if (!apiKey) {
    console.warn("[luma] LUMA_API_KEY is not set; returning empty events")
    return { upcoming: [], past: [], all: [], filterTags: [] }
  }

  const allEntries: LumaApiEntry[] = []
  let cursor: string | undefined

  do {
    const page = await fetchPage(apiKey, cursor)
    allEntries.push(...page.entries)
    cursor = page.next_cursor ?? undefined
  } while (cursor)

  const now = new Date()
  const events = allEntries
    .filter((entry) => entry.tags?.some((tag) => tag.name === CS_TAG))
    .map((entry): LumaEvent => {
      const event = entry.event
      const tags = (entry.tags ?? [])
        .map((tag) => tag.name)
        .filter((name) => name !== CS_TAG)

      return {
        id: entry.api_id,
        title: event.name,
        startAt: new Date(event.start_at),
        endAt: new Date(event.end_at),
        description: event.description_md ?? "",
        url: event.url,
        coverUrl: event.cover_url ?? null,
        location: buildLocation(event.geo_address_json),
        timezone: event.timezone ?? "UTC",
        tags,
      }
    })

  const upcoming = events
    .filter((event) => event.startAt > now)
    .sort((a, b) => a.startAt.valueOf() - b.startAt.valueOf())
  const past = events
    .filter((event) => event.startAt <= now)
    .sort((a, b) => b.startAt.valueOf() - a.startAt.valueOf())
  const filterTags = Array.from(
    new Set(events.flatMap((event) => event.tags)),
  ).sort()

  return { upcoming, past, all: [...upcoming, ...past], filterTags }
}

export function formatEventDate(date: Date, locale: string) {
  const dateLocale =
    locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US"

  return date.toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
