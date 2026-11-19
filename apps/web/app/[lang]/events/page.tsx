import Link from "next/link"
import { notFound } from "next/navigation"
import { AgendaCalendar } from "@/components/agenda-calendar"
import { HeroField } from "@/components/hero-field"
import { navCopy } from "@/lib/navigation-copy"
import { Hack0Mark, Hack0Wordmark } from "@/components/hack0-mark"
import { JsonLd } from "@/components/json-ld"
import { agendaCity } from "@/lib/agenda-cities"
import { agendaCopy } from "@/lib/agenda-copy"
import { accessEventDay, accessEvents } from "@/lib/access-events"
import { fetchHack0Calendar, fetchHack0EventImage } from "@/lib/hack0-calendar"
import { HACK0_CALENDAR_URL, HACK0_ICAL_URL, HACK0_LUMA_URL, HACK0_SITE_URL, hack0DateParts, partitionHack0Events, teaserHack0Event } from "@/lib/hack0-calendar-data"
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
  // The featured event is the same one the sidebar ticket promotes.
  const next = teaserHack0Event(partitionHack0Events(calendar.events, now).upcoming)
  const nextCity = next ? agendaCity(next.location) : null
  const nextDate = next ? hack0DateParts(next, lang) : null
  const nextImage = next ? await fetchHack0EventImage(next.url) : null
  // Emoji read as decoration in the list but swamp a display title.
  const nextTitle = next ? next.title.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s+/g, " ").trim() : ""
  const titleSize = nextTitle.length > 44 ? "s" : nextTitle.length > 24 ? "m" : "l"
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
        <div className="ev-field" aria-hidden="true">
          <HeroField shape="hack0" />
          <svg className="ev-mark" viewBox="0 0 64 64"><rect x="17" y="6" width="30" height="52" rx="15" /><line x1="10" y1="60" x2="54" y2="4" /></svg>
        </div>
        <div className="home-head ev-head">
          <div className="home-head-copy">
            <p className="home-label">{navCopy[lang].events}</p>
            <h1><span className="sr-only">{t.name}. </span>{t.title[0]} {withWordmark(t.title[1])}</h1>
            <p className="home-head-lede">{t.description}</p>
          </div>
          <div className="home-head-action"><a className="ev-secondary" href={HACK0_CALENDAR_URL} target="_blank" rel="noopener">{t.follow} ↗</a></div>
        </div>
        {next && nextDate ? <article className="ev-feature home-frame" aria-label={t.next}>
          <a className="ev-cover" href={next.href} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
            {nextImage
              ? <>
                  <img className="ev-cover-blur" src={nextImage} alt="" width={1200} height={630} decoding="async" />
                  <img className="ev-cover-img" src={nextImage} alt="" width={1200} height={630} fetchPriority="high" decoding="async" />
                </>
              : <div className="ev-cover-type">
                <Hack0Mark size={28} />
                <strong>{nextDate.day}</strong>
                <span>{nextDate.month}</span>
              </div>}
          </a>
          <div className="ev-feature-body">
            <div className="ev-feature-copy">
              <p className="ev-kicker">{Date.parse(next.startAt) <= now ? t.happening : t.next}</p>
              <h2 data-size={titleSize}>{nextTitle}</h2>
            </div>
            <dl className="ev-facts">
              <div><dt className="home-label-sm">{t.dateLabel}</dt><dd className="ev-date"><time dateTime={next.startAt}>{nextDate.full}</time></dd></div>
              <div><dt className="home-label-sm">{t.timeLabel}</dt><dd>{nextDate.time ?? t.allDay}</dd></div>
              <div><dt className="home-label-sm">{t.cityLabel}</dt><dd>{nextCity ? `${nextCity.name} · ${nextCity.code}` : t.locationPending}</dd></div>
              <div><dt className="home-label-sm">{t.organizerLabel}</dt><dd>{next.host || "hack0"}</dd></div>
            </dl>
            <a className="ev-primary" href={next.href} target="_blank" rel="noopener">{t.details} ↗</a>
          </div>
        </article> : <p className="ev-empty-feature home-frame">{t.noUpcoming}</p>}
      </header>

      <AgendaCalendar events={calendar.events} initialNow={now} available={calendar.status === "available"} locale={lang} t={t} />

      {/* Calendar subscriptions and hosting, as one framed panel; site-wide links live in the global footer. */}
      <section className="ev-foot home-frame" aria-label={t.subscribeLabel}>
        <div className="ev-foot-cell">
          <p className="home-label">{t.subscribeLabel}</p>
          <ul className="ev-foot-subs">{subscriptionLinks.map(link => <li key={link.label}><a className="ev-secondary" href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}</ul>
          <p className="ev-foot-more">{gatherings.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<a href={`${HACK0_SITE_URL}/ecosistema/peru`}>{t.ecosystem}</a></p>
        </div>
        <div className="ev-foot-cell">
          <p className="home-label">{t.submitLabel}</p>
          <a className="ev-primary" href={HACK0_LUMA_URL} target="_blank" rel="noopener noreferrer">{t.propose} ↗</a>
          <p className="ev-foot-more"><Link href={withLocale("/services", lang)}>{t.collaborate}</Link></p>
        </div>
      </section>
    </main>
  </>
}
