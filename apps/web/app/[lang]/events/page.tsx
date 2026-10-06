import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarPlus } from "lucide-react"
import { AgendaCalendar } from "@/components/agenda-calendar"
import { JsonLd } from "@/components/json-ld"
import { agendaCopy } from "@/lib/agenda-copy"
import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { HACK0_CALENDAR_URL, HACK0_ICAL_URL, hack0DateParts, partitionHack0Events } from "@/lib/hack0-calendar-data"
import { isLocale, locales, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbList } from "@/lib/structured-data"
import { participationCopy } from "@/lib/participation-copy"

export const revalidate = 1800
export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return buildMetadata({ locale: lang, path: "/events", title: agendaCopy[lang].name, description: agendaCopy[lang].description })
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = agendaCopy[lang]
  const participation = participationCopy[lang]
  const calendar = await fetchHack0Calendar()
  const now = Date.now()
  const { upcoming } = partitionHack0Events(calendar.events, now)
  const featured = upcoming[0]
  const date = featured ? hack0DateParts(featured, lang) : null
  const subscriptionLinks = [
    { label: "Google Calendar", href: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(HACK0_ICAL_URL)}` },
    { label: "Apple Calendar", href: HACK0_ICAL_URL.replace("https:", "webcal:") },
    { label: "Outlook", href: `https://outlook.live.com/calendar/0/addcalendar?url=${encodeURIComponent(HACK0_ICAL_URL)}` },
    { label: t.ical, href: HACK0_ICAL_URL },
  ]
  return <>
    <JsonLd data={breadcrumbList(lang, [{ name: "Crafter Station", path: "/" }, { name: t.name, path: "/events" }])} />
    <main className="agenda-page">
      <header className="agenda-hero">
        <div className="agenda-topline"><p className="station-label">{t.eyebrow}</p><a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer">luma.com/hack0</a></div>
        <div className="agenda-hero-layout">
          <div className="agenda-intro"><h1>{t.title[0]}<span>{t.title[1]}</span></h1><p>{t.description}</p>
            <div className="agenda-hero-actions"><a href="#calendar">{t.explore}</a><a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer">{t.follow}</a></div>
          </div>
          {featured && date ? <a className="agenda-ticket" href={featured.url} target="_blank" rel="noopener noreferrer">
            <div className="agenda-ticket-top"><span>{Date.parse(featured.startAt) <= now ? t.happening : t.next}</span></div>
            <div className="agenda-ticket-date" aria-hidden="true"><span>{date.day}</span><span>{date.month}<i>✳</i></span></div>
            <h2>{featured.title}</h2><p>{featured.location || t.locationPending}</p>
            <div className="agenda-ticket-bottom"><time dateTime={featured.startAt}>{date.full}<br />{date.time ?? t.allDay}{!featured.allDay && " · Lima (UTC−5)"}</time><span className="agenda-barcode" aria-hidden="true" /></div>
          </a> : <div className="agenda-ticket agenda-ticket-empty"><span className="station-label">hack0 / calendar</span><span className="agenda-empty-mark" aria-hidden="true">✳</span>
            <p>{calendar.status === "unavailable" ? t.unavailable : t.noUpcoming}</p><a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer">{t.follow}</a></div>}
        </div>
      </header>
      <section id="hot-reload" className="agenda-program" aria-labelledby="hot-reload-title">
        <div>
          <p className="station-label">{participation.hotReload.eyebrow}</p>
          <h2 id="hot-reload-title">Hot Reload</h2>
        </div>
        <div>
          <p>{participation.hotReload.body}</p>
          <a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer">{participation.hotReload.action}</a>
        </div>
      </section>
      <AgendaCalendar events={calendar.events} initialNow={now} available={calendar.status === "available"} locale={lang} t={t} />
      <section className="agenda-subscribe" aria-labelledby="agenda-subscribe-title">
        <CalendarPlus size={30} strokeWidth={1.3} aria-hidden="true" /><div><h2 id="agenda-subscribe-title">{t.subscribe}</h2><p>{t.subscribeBody}</p>
          <div className="agenda-subscribe-links">{subscriptionLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div></div>
      </section>
      <section className="agenda-invitation"><h2>{t.invite}</h2><p>{t.inviteBody}</p>
        <div className="agenda-invitation-actions"><a href={HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer">{t.propose}</a><Link href={withLocale("/events/sponsors", lang)}>{t.collaborate}</Link><Link href={withLocale("/hackathons", lang)}>{participation.history}</Link></div>
      </section>
    </main>
  </>
}
