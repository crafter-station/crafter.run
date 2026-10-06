import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { homeCopy } from "@/lib/home-copy"
import { bucleCopy } from "@/lib/bucle-copy"

function CoffeeArt() {
  return <svg viewBox="0 0 430 310" className="home-coffee-art" fill="none" aria-hidden="true">
    <g className="home-coffee-steam" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M167 101c-58-47 66-45 16-96M220 98c55-49-66-49-13-93M258 107c-35-30 47-36 23-69" />
    </g>
    <ellipse cx="212" cy="271" rx="142" ry="22" stroke="currentColor" strokeWidth="2" />
    <path d="M307 137h34c64 0 52 89-21 85" stroke="currentColor" strokeWidth="22" />
    <path d="M102 129h213l-18 106c-5 53-166 53-178 0Z" fill="currentColor" />
    <ellipse cx="208" cy="130" rx="107" ry="26" fill="#e8ebdd" stroke="currentColor" strokeWidth="3" />
    <ellipse cx="208" cy="134" rx="86" ry="16" fill="currentColor" />
    <path d="m178 172-22 22 22 22m58-44 22 22-22 22m-19-54-15 67" stroke="#e8ebdd" strokeWidth="6" />
  </svg>
}

function BoatArt() {
  return <svg className="home-boat-art" viewBox="0 0 460 310" fill="none" aria-hidden="true">
    <g className="home-paper-boat" stroke="#f8e9a4" strokeWidth="1.5" strokeLinejoin="round">
      <path d="m49 199 190-84 176 84-164 86Z" fill="#25291f" />
      <path d="m49 199 142 9 48-93Z" fill="#f8e9a4" />
      <path d="m191 208 48-174 49 174Z" fill="#f8e9a4" />
      <path d="m239 34 49 174 127-9Z" fill="#b4a56c" />
      <path d="m49 199 202 86 164-86-164 30Z" fill="#f8e9a4" />
      <path d="m49 199 202 30 164-30M239 34v195" stroke="#25291f" />
    </g>
    <g stroke="#f8e9a4" opacity=".4">
      <path d="M0 272q58-20 115 0t115 0 115 0 115 0M0 292q58-20 115 0t115 0 115 0 115 0" />
    </g>
  </svg>
}

export function StationEvents({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  return (
    <section className="home-events" aria-labelledby="home-events-title">
      <div className="home-events-heading">
        <h2 id="home-events-title">{bucleCopy[locale].encounter}</h2>
        <p className="home-events-intro">{t.eventsBody}</p>
        <div className="home-section-actions">
          <Link href={withLocale("/events",locale)} className="home-action-link">{t.calendar}</Link>
          <Link href={withLocale("/events/sponsors",locale)} className="home-secondary-link">{t.sponsor}</Link>
        </div>
      </div>
      <div className="home-posters">
        <Link href={withLocale("/events#hot-reload",locale)} className="home-poster home-poster-brew">
          <div className="home-poster-meta station-label">CRAFTER PRESENTS</div>
          <h3>Hot<br />Reload<span className="home-poster-star" aria-hidden="true">✳</span></h3>
          <CoffeeArt />
          <p className="home-poster-line">{t.brew}</p>
          <div className="home-poster-bottom station-label">COFFEE / CODE / COMMUNITY</div>
        </Link>
        <Link href={withLocale("/hackathons",locale)} className="home-poster home-poster-ship">
          <div className="home-poster-meta station-label">CRAFTER HACKATHONS</div>
          <h3><span>Ship</span><em>or</em><span className="home-sink">Sink</span></h3>
          <BoatArt />
          <p className="home-poster-line">{t.ship}</p>
          <div className="home-poster-bottom station-label">MAKE SOMETHING REAL.</div>
        </Link>
      </div>
    </section>
  )
}
