import Link from "next/link"
import { notFound } from "next/navigation"
import { AgendaCalendar } from "@/components/agenda-calendar"
import type { HorizonCity } from "@/components/agenda-horizon"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { Hack0Wordmark } from "@/components/hack0-mark"
import { JsonLd } from "@/components/json-ld"
import { agendaCity, cityLongitude, type AgendaCity } from "@/lib/agenda-cities"
import { agendaCopy } from "@/lib/agenda-copy"
import { accessEventDay, accessEvents } from "@/lib/access-events"
import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { HACK0_CALENDAR_URL, HACK0_ICAL_URL, HACK0_LUMA_URL, hack0DateParts, partitionHack0Events } from "@/lib/hack0-calendar-data"
import { isLocale, locales, withLocale } from "@/lib/i18n"
import { participationCopy } from "@/lib/participation-copy"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbList } from "@/lib/structured-data"

export const revalidate = 1800
export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return buildMetadata({ locale: lang, path: "/events", title: agendaCopy[lang].name, description: agendaCopy[lang].description })
}

// Titles end in "hack0." in every locale; render the name as the hack0 wordmark.
function withWordmark(line: string) {
  const at = line.indexOf("hack0")
  if (at < 0) return line
  return <>{line.slice(0, at)}<Hack0Wordmark />{line.slice(at + 5)}</>
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = agendaCopy[lang]
  const participation = participationCopy[lang]
  const calendar = await fetchHack0Calendar()
  const now = Date.now()
  const visited = new Map<string, AgendaCity & { count: number }>()
  for (const event of calendar.events) {
    const city = agendaCity(event.location)
    if (!city || Date.parse(event.startAt) > now) continue
    visited.set(city.key, { ...city, count: (visited.get(city.key)?.count ?? 0) + 1 })
  }
  const cities = [...visited.values()].sort((a, b) => b.count - a.count)
  const next = partitionHack0Events(calendar.events, now).upcoming[0]
  const nextCity = next ? agendaCity(next.location) : null
  const nextDate = next ? hack0DateParts(next, lang) : null
  const horizon: HorizonCity[] = [...cities]
  if (nextCity && !visited.has(nextCity.key)) horizon.push({ ...nextCity, count: 0 })
  horizon.sort((a, b) => (cityLongitude[a.key] ?? 0) - (cityLongitude[b.key] ?? 0))
  // Emoji read as decoration in the list but swamp a 112px headline.
  const nextTitle = next ? next.title.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s+/g, " ").trim() : ""
  const titleSize = !next ? "m" : nextTitle.length > 44 ? "s" : nextTitle.length > 24 ? "m" : "l"
  const subscriptionLinks = [
    { label: "Google", href: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(HACK0_ICAL_URL)}` },
    { label: "Apple", href: HACK0_ICAL_URL.replace("https:", "webcal:") },
    { label: "Outlook", href: `https://outlook.live.com/calendar/0/addcalendar?url=${encodeURIComponent(HACK0_ICAL_URL)}` },
    { label: "iCal", href: HACK0_ICAL_URL },
  ]
  const gatherings = [
    { href: withLocale("/events/hot-reload", lang), label: "Hot Reload" },
    ...accessEvents.filter(event => Date.parse(event.endsAt) > now)
      .map(event => ({ href: withLocale(`/events/${event.slug}`, lang), label: `${event.title} · ${accessEventDay(event, lang)}` })),
  ]

  return <>
    <JsonLd data={breadcrumbList(lang, [{ name: "Crafter Station", path: "/" }, { name: t.name, path: "/events" }])} />
    <main className="ev-page">
      <header className="ev-hero">
        <p className="ev-lockup">
          <span><CrafterStationLogo decorative />crafter station</span>
          <span className="ev-times" aria-hidden="true">×</span>
          <a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener"><Hack0Wordmark /></a>
        </p>
        <div className="ev-hero-main">
          <p className="ev-kicker">{next ? (Date.parse(next.startAt) <= now ? t.happening : t.next) : t.eyebrow}</p>
          <h1 data-size={titleSize}><span className="sr-only">{t.name}. </span>{next ? nextTitle : <>{t.title[0]} {withWordmark(t.title[1])}</>}</h1>
          <div className="ev-hero-row">
            {next && nextDate ? <p className="ev-data">
              <time dateTime={next.startAt}>{nextDate.full.toUpperCase()}</time>
              <span>{nextDate.time ?? t.allDay}</span>
              {nextCity && <span>{nextCity.code}</span>}
              {next.host && <span>{next.host}</span>}
            </p> : <p className="ev-data">{t.description}</p>}
            <a className="ev-primary" href={next?.href ?? HACK0_CALENDAR_URL} target="_blank" rel="noopener">{next ? t.details : t.follow} ↗</a>
          </div>
        </div>
      </header>

      <AgendaCalendar events={calendar.events} initialNow={now} available={calendar.status === "available"} locale={lang} t={t} cities={horizon} nextCity={nextCity?.key ?? null} />


      <footer className="ev-foot">
        <div>
          <h2>{t.subscribeLabel}</h2>
          <ul>{subscriptionLinks.map(link => <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}</ul>
        </div>
        <div>
          <h2>{t.crafterLabel}</h2>
          <ul>{gatherings.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2>{t.submitLabel}</h2>
          <ul>
            <li><a href={HACK0_LUMA_URL} target="_blank" rel="noopener noreferrer">{t.propose}</a></li>
            <li><Link href={withLocale("/events/sponsors", lang)}>{t.collaborate}</Link></li>
            <li><Link href={withLocale("/hackathons", lang)}>{participation.history}</Link></li>
          </ul>
        </div>
      </footer>
    </main>
  </>
}
