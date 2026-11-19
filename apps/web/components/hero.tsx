import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"
import { bucleCopy } from "@/lib/bucle-copy"
import { navCopy } from "@/lib/navigation-copy"
import { agendaCopy } from "@/lib/agenda-copy"
import { agendaCity } from "@/lib/agenda-cities"
import { listAllShips } from "@/lib/ships"
import { landingCopy } from "@/lib/landing-copy"
import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { partitionHack0Events } from "@/lib/hack0-calendar-data"
import { BRAND_MARK_PATH } from "@/lib/brand"
import { HeroField } from "@/components/hero-field"
import { HeroCursor } from "@/components/hero-cursor"
import { partnerEvents, partners } from "@/lib/partners"

export async function HeroContent({
  locale, eventsHref,
}: {
  locale: Locale; eventsCta: string; eventsHref: string; ossCta: string; ossHref: string;
}) {
  const t = stationCopy[locale]
  const b = bucleCopy[locale]
  const nav = navCopy[locale]
  const agenda = agendaCopy[locale]
  const [shipsPage, calendar] = await Promise.all([listAllShips({ revalidate: 300 }), fetchHack0Calendar()])
  const ships = shipsPage?.ships ?? []
  const crafters = new Set(ships.map(ship => ship.owner.handle)).size
  const l = landingCopy[locale]
  const cities = new Set(calendar.events.map(event => agendaCity(event.location)?.key).filter(Boolean))
  const next = partitionHack0Events(calendar.events).upcoming[0]
  const raised = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 0 })
    .format(partnerEvents.reduce((sum, event) => sum + event.raised, 0))
  const backerNames = featuredBackers.filter(name => partners.some(partner => partner.name === name)).join(", ")
  return (
      <section className="station-masthead hero-name" aria-labelledby="station-title">
        <HeroField />
        <HeroCursor />
        <svg className="hero-knot" viewBox="-8 -8 273 273" aria-hidden="true"><path d={BRAND_MARK_PATH} pathLength={1} /></svg>
        <p className="hero-eyebrow"><span className="hero-eyebrow-name">{siteConfig.name}</span><span>{t.place}</span><span>{t.builders}</span></p>
        <h1 id="station-title">{t.claim}</h1>
        <div className="hero-claim">
          <p>{b.hero}</p>
          <div className="hero-actions">
            <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer" className="hero-cta"><WhatsAppGlyph />{t.join}</a>
            <Link href={withLocale("/events/sponsors", locale)} className="hero-cta-ghost">{t.sponsorEvent}</Link>
          </div>
        </div>
        <div className="hero-proof">
          <Link href={withLocale("/ships", locale)} className="hero-cell">
            <span className="hero-cell-label">{nav.ships}</span>
            <strong>{`${ships.length} ${l.shipsLabel}`}</strong>
            <span className="hero-cell-meta">{l.shipsMeta(crafters)}</span>
          </Link>
          <Link href={eventsHref} className="hero-cell">
            <span className="hero-cell-label">{nav.events}</span>
            <strong>{agenda.results.replace("{count}", String(calendar.events.length))}</strong>
            <span className="hero-cell-meta">{agenda.stamps.replace("{count}", String(cities.size))}{next ? ` · ${agenda.next}: ${eventTitle(next.title, locale)}` : ""}</span>
          </Link>
          <Link href={withLocale("/events/sponsors", locale)} className="hero-cell">
            <span className="hero-cell-label">{t.backedBy}</span>
            <strong>{`${raised} ${t.raised}`}</strong>
            <span className="hero-cell-meta">{`${partners.length} ${t.backers} · ${backerNames}`}</span>
          </Link>
        </div>
      </section>
  )
}

// Names a sponsor recognizes first; each must exist in lib/partners.
const featuredBackers = ["Clerk", "Cursor", "ElevenLabs", "v0"]

// hack0 titles arrive as typed by organizers: emoji, extra spaces, sometimes all caps.
function eventTitle(title: string, locale: Locale) {
  const clean = title.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s+/g, " ").trim()
  if (clean !== clean.toLocaleUpperCase(locale) || !/\p{Lu}/u.test(clean)) return clean
  const lower = clean.toLocaleLowerCase(locale)
  return lower.charAt(0).toLocaleUpperCase(locale) + lower.slice(1)
}

function WhatsAppGlyph() {
  return (
    <svg className="hero-cta-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.8 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
    </svg>
  )
}
