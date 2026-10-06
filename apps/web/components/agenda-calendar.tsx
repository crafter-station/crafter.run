"use client"

import { useEffect, useMemo, useState } from "react"
import { CalendarDays, Search, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import type { AgendaCopy } from "@/lib/agenda-copy"
import { HACK0_CALENDAR_URL, HACK0_TIME_ZONE, hack0DateParts, partitionHack0Events, type Hack0Event } from "@/lib/hack0-calendar-data"

const PAGE_SIZE = 12
const normalize = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

export function AgendaCalendar({ events, initialNow, available, locale, t }: {
  events: Hack0Event[]; initialNow: number; available: boolean; locale: Locale; t: AgendaCopy
}) {
  const [scope, setScope] = useState<"upcoming" | "past" | "all">("upcoming")
  const [query, setQuery] = useState("")
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [timeZone, setTimeZone] = useState(HACK0_TIME_ZONE)
  const [localZone, setLocalZone] = useState<string | null>(null)
  const [now, setNow] = useState(initialNow)
  useEffect(() => {
    setLocalZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(timer)
  }, [])
  const { upcoming, past } = useMemo(() => partitionHack0Events(events, now), [events, now])
  const candidates = scope === "all" ? [...upcoming, ...past] : scope === "past" ? past : upcoming
  const search = normalize(query.trim())
  const filtered = candidates.filter(event => !search || normalize(`${event.title} ${event.location} ${event.host}`).includes(search))
  const visible = filtered.slice(0, limit)

  return <section className="agenda-calendar" id="calendar" aria-label={t.explore}>
    <p className="agenda-source">{t.source}</p>
    <div className="agenda-toolbar">
      <div className="agenda-scopes" role="group" aria-label={t.explore}>
        {(["upcoming", "past", "all"] as const).map(value => <button key={value} type="button" aria-pressed={scope === value} disabled={!available}
          onClick={() => { setScope(value); setLimit(PAGE_SIZE) }}>
          {t[value]}<span>{available ? (value === "all" ? events : value === "past" ? past : upcoming).length : "—"}</span>
        </button>)}
      </div>
      <label className="agenda-search"><Search size={16} aria-hidden="true" />
        <input disabled={!available} aria-label={t.searchLabel} placeholder={t.search} value={query} onChange={e => { setQuery(e.target.value); setLimit(PAGE_SIZE) }} />
        {query && <button type="button" aria-label={t.reset} onClick={() => { setQuery(""); setLimit(PAGE_SIZE) }}><X size={14} /></button>}
      </label>
    </div>
    <div className="agenda-results">
      <p role="status" aria-live="polite">{available ? (filtered.length === 1 ? t.result : t.results).replace("{count}", filtered.length.toLocaleString(locale)) : t.source}</p>
      <label><span>{t.timezone}</span><select aria-label={t.timezone} value={timeZone} onChange={e => setTimeZone(e.target.value)}>
        <option value={HACK0_TIME_ZONE}>Lima · UTC−5</option><option value="UTC">UTC</option>
        {localZone && ![HACK0_TIME_ZONE, "UTC"].includes(localZone) && <option value={localZone}>{t.localTime} · {localZone.replaceAll("_", " ")}</option>}
      </select></label>
    </div>
    {!available ? <div className="agenda-empty"><p>{t.unavailable}</p><a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer">{t.follow}</a></div>
      : !visible.length ? <div className="agenda-empty">
        {query ? <Search className="agenda-empty-icon" size={28} aria-hidden="true" /> : <CalendarDays className="agenda-empty-icon" size={28} aria-hidden="true" />}
        <p>{query ? t.empty : t.noUpcoming}</p>
        {query ? <button type="button" onClick={() => { setQuery(""); setLimit(PAGE_SIZE) }}>{t.reset}</button>
          : <button type="button" onClick={() => { setScope("past"); setLimit(PAGE_SIZE) }}>{t.archive}</button>}</div>
      : <div className={scope === "past" ? "agenda-archive" : "agenda-event-grid"}>
        {visible.map((event, index) => {
          const date = hack0DateParts(event, locale, timeZone)
          const ended = Date.parse(event.endAt) <= now
          return <a key={event.id} href={event.url} target="_blank" rel="noopener noreferrer"
            className={`agenda-event agenda-tone-${index % 3}${ended ? " is-past" : ""}`}>
            <div className="agenda-event-date" aria-hidden="true"><span>{date.month}</span><strong>{date.day}</strong></div>
            <div className="agenda-event-body">
              <time dateTime={event.startAt}>{date.full} · {date.time ?? t.allDay}</time>
              <h3>{event.title}</h3>
              {event.host && <p className="agenda-event-host">{t.by} {event.host}</p>}
              <p className="agenda-event-location">{event.location || t.locationPending}</p>
            </div>
          </a>
        })}
      </div>}
    {visible.length < filtered.length && <button className="agenda-load-more" type="button" onClick={() => setLimit(n => n + PAGE_SIZE)}>
      {t.more}<span>{visible.length} / {filtered.length}</span>
    </button>}
  </section>
}
