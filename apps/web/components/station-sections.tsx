import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { homeCopy } from "@/lib/home-copy"
import { bucleCopy } from "@/lib/bucle-copy"
import { HomeHead } from "@/components/home-head"
import { landingCopy } from "@/lib/landing-copy"
import { partners } from "@/lib/partners"
import { BountyArtwork } from "@/components/bounty-artwork"
import { bountyCopy } from "@/lib/bounty-copy"

export function StationEvents({ locale, index }: { locale: Locale; index: number }) {
  const t = homeCopy[locale]
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
      <div className="home-panel-links">
        <Link href={withLocale("/hackathons",locale)} className="home-secondary-link">{landingCopy[locale].backersLine(partners.length)}</Link>
      </div>
    </section>
  )
}
