import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { homeCopy } from "@/lib/home-copy"
import { bucleCopy } from "@/lib/bucle-copy"
import { HomeHead } from "@/components/home-head"
import { landingCopy } from "@/lib/landing-copy"
import { partners } from "@/lib/partners"
import { BountyArtwork } from "@/components/bounty-artwork"
import { bountyCopy } from "@/lib/bounty-copy"
import { agendaCopy } from "@/lib/agenda-copy"
import { agendaCity } from "@/lib/agenda-cities"
import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { HACK0_CALENDAR_URL, hack0DateParts, partitionHack0Events } from "@/lib/hack0-calendar-data"
import { RecapBento } from "@/components/hot-reload-recap"
import { albumPhotos, eventsGalleryCopy, mixedBento } from "@/lib/event-albums"
import { recapCopy } from "@/lib/hot-reload-recap"

export async function StationEvents({ locale, index }: { locale: Locale; index: number }) {
  const t = homeCopy[locale]
  const a = agendaCopy[locale]
  const calendar = await fetchHack0Calendar()
  const upcoming = partitionHack0Events(calendar.events).upcoming.slice(0, 4)
  return (
    <section className="home-events" aria-labelledby="home-events-title">
      <HomeHead id="home-events-title" index={index} label={landingCopy[locale].sections.events} title={bucleCopy[locale].encounter} lede={t.eventsBody}>
        <Link href={withLocale("/events",locale)} className="home-action-link">{t.calendar}</Link>
      </HomeHead>
      <div className="home-posters home-frame">
        <Link href={withLocale("/events/hot-reload",locale)} className="home-poster home-poster-brew">
          <div className="home-poster-meta station-label">CRAFTER STATION PRESENTS</div>
          <h3 className="sr-only">Hot Reload</h3>
          {/* biome-ignore lint/performance/noImgElement: images are unoptimized site-wide */}
          <img className="home-poster-brew-mark" src="/events/hot-reload/wordmark.webp" alt="" width={1024} height={1024} loading="lazy" />
          <p className="home-poster-line">{t.brew}</p>
          <div className="home-poster-bottom station-label">COFFEE · CODE · COMMUNITY</div>
        </Link>
        <Link href={withLocale("/bounties",locale)} className="home-poster home-poster-ship home-poster-bounty">
          <div className="home-poster-meta station-label">CRAFTER BOUNTIES</div>
          <h3>Bounties</h3>
          <BountyArtwork />
          <p className="home-poster-line">{bountyCopy[locale].boardTitle}</p>
          <div className="home-poster-bottom station-label">BUILD / SHARE / WIN</div>
        </Link>
      </div>
      <HomeGallery locale={locale} />
      <div className="home-hack0">
        <div className="home-hack0-head">
          <p className="home-label">{t.hack0Upcoming}</p>
          <Link href={withLocale("/events", locale)} className="home-secondary-link">{t.hack0Calendar}</Link>
        </div>
        {upcoming.length ? (
          <ol className="home-hack0-list home-frame">
            {upcoming.map(event => {
              const date = hack0DateParts(event, locale)
              const city = agendaCity(event.location)
              const meta = [date.time ?? a.allDay, city?.name, event.host].filter(Boolean).join(" · ")
              return (
                <li key={event.id}>
                  <a href={event.href} target="_blank" rel="noopener" className="home-hack0-row">
                    <time className="home-hack0-date" dateTime={event.startAt}><strong>{date.day}</strong><span>{date.month}</span></time>
                    <span className="home-hack0-main">
                      <span className="home-hack0-title">{event.title}</span>
                      <span className="home-hack0-meta">{meta}</span>
                    </span>
                    <span className="home-hack0-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              )
            })}
          </ol>
        ) : (
          <p className="home-hack0-empty home-frame">
            {a.noUpcoming} <a className="home-secondary-link" href={HACK0_CALENDAR_URL} target="_blank" rel="noopener">{a.follow} ↗</a>
          </p>
        )}
      </div>
      <div className="home-panel-links">
        <Link href={withLocale("/services#proof",locale)} className="home-secondary-link">{landingCopy[locale].backersLine(partners.length)}</Link>
      </div>
    </section>
  )
}

function HomeGallery({ locale }: { locale: Locale }) {
  const photos = albumPhotos(locale)
  if (!photos.length) return null
  const t = eventsGalleryCopy(locale)
  const href = withLocale("/events/gallery", locale)
  return (
    <div className="home-gallery ev-photo-scope">
      <div className="home-gallery-head">
        <p className="home-label">{t.title}</p>
        <Link href={href} className="home-secondary-link">{t.viewAll} · {recapCopy[locale].photos.replace("{count}", String(photos.length))}</Link>
      </div>
      <RecapBento items={mixedBento(locale)} total={photos.length} galleryHref={href} locale={locale} />
    </div>
  )
}
