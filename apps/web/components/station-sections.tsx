import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { homeCopy } from "@/lib/home-copy"
import { bucleCopy } from "@/lib/bucle-copy"
import { StationBackers } from "@/components/station-backers"
import { BountyArtwork } from "@/components/bounty-artwork"
import { bountyCopy } from "@/lib/bounty-copy"

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
      <StationBackers locale={locale} />
    </section>
  )
}
