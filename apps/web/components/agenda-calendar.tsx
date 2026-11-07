"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import type { AgendaCopy } from "@/lib/agenda-copy"
import { agendaCity } from "@/lib/agenda-cities"
import { HACK0_CALENDAR_URL, HACK0_TIME_ZONE, hack0DateParts, partitionHack0Events, type Hack0Event } from "@/lib/hack0-calendar-data"

const PAGE_SIZE = 12
const normalize = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

export function AgendaCalendar({ events, initialNow, available, locale, t }: {
  events: Hack0Event[]; initialNow: number; available: boolean; locale: Locale; t: AgendaCopy
}) {
  const [scope, setScope] = useState<"upcoming" | "past">("upcoming")
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
  const candidates = scope === "past" ? past : upcoming
  const search = normalize(query.trim())
  const filtered = candidates.filter(event => !search || normalize(`${event.title} ${event.location} ${event.host}`).includes(search))
  const visible = filtered.slice(0, limit)
  const reset = () => { setQuery(""); setLimit(PAGE_SIZE) }

  return <section className="ev-list" id="calendar" aria-label={t.explore}>
    <div className="ev-bar">
      <div className="ev-scopes" role="group" aria-label={t.explore}>
        {(["upcoming", "past"] as const).map(value => <button key={value} type="button" aria-pressed={scope === value} disabled={!available}
          onClick={() => { setScope(value); setLimit(PAGE_SIZE) }}>
          {t[value]}<span>{available ? (value === "past" ? past : upcoming).length : "—"}</span>
        </button>)}
      </div>
      <label className="ev-search"><Search size={15} aria-hidden="true" />
        <input disabled={!available} aria-label={t.searchLabel} placeholder={t.search} value={query} onChange={e => { setQuery(e.target.value); setLimit(PAGE_SIZE) }} />
        {query && <button type="button" aria-label={t.reset} onClick={reset}><X size={14} /></button>}
      </label>
      <select className="ev-zone" aria-label={t.timezone} value={timeZone} onChange={e => setTimeZone(e.target.value)}>
        <option value={HACK0_TIME_ZONE}>Lima UTC−5</option><option value="UTC">UTC</option>
        {localZone && ![HACK0_TIME_ZONE, "UTC"].includes(localZone) && <option value={localZone}>{localZone.replaceAll("_", " ")}</option>}
      </select>
    </div>
    <p className="sr-only" role="status" aria-live="polite">{(filtered.length === 1 ? t.result : t.results).replace("{count}", String(filtered.length))}</p>
    {!available ? <div className="ev-empty"><p>{t.unavailable}</p><a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener">{t.follow}</a></div>
      : !visible.length ? <div className="ev-empty"><p>{query ? t.empty : t.noUpcoming}</p>
        {query ? <button type="button" onClick={reset}>{t.reset}</button>
          : <button type="button" onClick={() => { setScope("past"); setLimit(PAGE_SIZE) }}>{t.archive}</button>}</div>
      : <ol className="ev-rows">
        {visible.map((event, index) => {
          const date = hack0DateParts(event, locale, timeZone)
          const city = agendaCity(event.location)
          const next = scope === "upcoming" && index === 0 && !query
          return <li key={event.id}><a href={event.href} target="_blank" rel="noopener" className="ev-row" data-next={next || undefined}>
            <time className="ev-row-date" dateTime={event.startAt}><span>{date.month}</span><strong>{date.day}</strong></time>
            <span className="ev-row-main">
              <span className="ev-row-title">{event.title}</span>
              <span className="ev-row-meta">{date.time ?? t.allDay}{event.host ? ` · ${event.host}` : ""}</span>
            </span>
            <span className="ev-row-place" title={event.location || t.locationPending}>{city?.code ?? ""}</span>
            <span className="ev-row-arrow" aria-hidden="true">↗</span>
          </a></li>
        })}
      </ol>}
    {visible.length < filtered.length && <button className="ev-more" type="button" onClick={() => setLimit(n => n + PAGE_SIZE)}>
      {t.more}<span>{visible.length} / {filtered.length}</span>
    </button>}
  </section>
}
