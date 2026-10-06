export const HACK0_CALENDAR_URL = "https://luma.com/hack0"
// Public subscription URL exposed by hack0's “Add iCal Subscription” control.
export const HACK0_ICAL_URL = "https://api.luma.com/ics/get?entity=calendar&id=cal-HBdmsARYSzYhpuc"
export const HACK0_TIME_ZONE = "America/Lima"

export interface Hack0Event {
  id: string
  title: string
  startAt: string
  endAt: string
  allDay: boolean
  location: string
  host: string
  url: string
}

function unescapeText(text: string) {
  return text.replace(/\\([nN,;\\])/g, (_, char: string) => char.toLowerCase() === "n" ? "\n" : char)
}

function calendarDate(value: string, allDay: boolean): string | null {
  const pattern = allDay ? /^(\d{4})(\d{2})(\d{2})$/ : /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
  const match = value.match(pattern)
  if (!match) return null
  const iso = `${match[1]}-${match[2]}-${match[3]}T${match[4] ?? "00"}:${match[5] ?? "00"}:${match[6] ?? "00"}.000Z`
  const date = new Date(iso)
  return Number.isFinite(date.valueOf()) && date.toISOString() === iso ? iso : null
}

function eventUrl(value: string): string | null {
  try {
    const url = new URL(value)
    if (url.protocol !== "https:" || !["luma.com", "lu.ma"].includes(url.hostname) || url.username || url.password) return null
    return url.toString()
  } catch { return null }
}

/** Luma publishes UTC instants or DATE values (exclusive end for multi-day events).
 * Do not guess time zones for unsupported floating/TZID values. */
export function parseHack0Calendar(ics: string): Hack0Event[] {
  if (!ics.includes("BEGIN:VCALENDAR") || !ics.includes("END:VCALENDAR")) throw new Error("Invalid calendar")
  const unfolded = ics.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "")
  const records = new Map<string, { sequence: number; event: Hack0Event | null }>()

  for (const block of unfolded.split("BEGIN:VEVENT\n").slice(1)) {
    const fields = new Map<string, { value: string; params: string }>()
    // Ignore nested VALARM properties, which may have their own DESCRIPTION.
    let nested = 0
    for (const line of block.split("\n")) {
      if (line === "END:VEVENT") break
      if (line.startsWith("BEGIN:")) { nested++; continue }
      if (line.startsWith("END:")) { nested--; continue }
      if (nested) continue
      const colon = line.indexOf(":")
      if (colon < 0) continue
      const [name, ...params] = line.slice(0, colon).split(";")
      fields.set(name, { value: line.slice(colon + 1), params: params.join(";") })
    }
    const value = (key: string) => fields.get(key)?.value ?? ""
    const id = value("UID")
    if (!id) continue
    const sequence = Number(value("SEQUENCE")) || 0
    if ((records.get(id)?.sequence ?? -1) > sequence) continue
    if (value("STATUS") === "CANCELLED") { records.set(id, { sequence, event: null }); continue }
    const allDay = fields.get("DTSTART")?.params.includes("VALUE=DATE") ?? false
    const startAt = calendarDate(value("DTSTART"), allDay)
    const endAt = calendarDate(value("DTEND"), allDay)
    const title = unescapeText(value("SUMMARY")).trim()
    const description = unescapeText(value("DESCRIPTION"))
    const url = eventUrl(value("URL") || description.match(/https:\/\/(?:luma\.com|lu\.ma)\/[^\s<>"\\]+/)?.[0] || "")
    if (!title || !url || !startAt || !endAt || endAt <= startAt) continue
    const location = unescapeText(value("LOCATION")).trim()
    // A Luma event URL in LOCATION means the location has not been published.
    // Preserve that uncertainty instead of labelling it “Online”.
    const publicLocation = /^https?:\/\//i.test(location) ? "" : location
    records.set(id, { sequence, event: {
      id, title, startAt, endAt, allDay, url, location: publicLocation,
      host: description.match(/(?:^|\n)Hosted by ([^\n]+)/)?.[1]?.trim() ?? "",
    } })
  }
  return [...records.values()].flatMap(record => record.event ? [record.event] : [])
}

export function partitionHack0Events(events: Hack0Event[], now = Date.now()) {
  const upcoming = events.filter(event => Date.parse(event.endAt) > now)
    .sort((a, b) => a.startAt.localeCompare(b.startAt))
  const past = events.filter(event => Date.parse(event.endAt) <= now)
    .sort((a, b) => b.startAt.localeCompare(a.startAt))
  return { upcoming, past }
}

export function hack0DateParts(event: Hack0Event, locale: string, timeZone = HACK0_TIME_ZONE) {
  const zone = event.allDay ? "UTC" : timeZone
  const start = new Date(event.startAt)
  const end = new Date(Date.parse(event.endAt) - (event.allDay ? 86400000 : 0))
  const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: zone })
  // ICU versions differ in their non-breaking spaces; keep SSR and browsers identical.
  const stableSpacing = (value: string) => value.replace(/\s/g, " ")
  return {
    day: new Intl.DateTimeFormat(locale, { day: "numeric", timeZone: zone }).format(start),
    month: new Intl.DateTimeFormat(locale, { month: "short", timeZone: zone }).format(start),
    full: stableSpacing(date.formatRange(start, end)),
    time: event.allDay ? null : stableSpacing(new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: zone }).format(start)),
  }
}
