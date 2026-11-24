import { HomeHead } from "@/components/home-head"
import { CommunityShipsPanel } from "@/components/home-community-ships"
import { StationReleasesPanel } from "@/components/changelog/home-shipped"
import type { Locale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"

export function HomeShippedSection({ locale, index }: { locale: Locale; index: number }) {
  const t = landingCopy[locale]
  return (
    <section className="home-shipped home-shipped-bento" aria-labelledby="home-shipped-title">
      <HomeHead id="home-shipped-title" index={index} label={t.sections.shipped} title={t.shippedTitle} lede={t.shippedLede} />
      <div className="home-shipped-groups">
        <StationReleasesPanel locale={locale} label={t.tabStation} sub={t.stationSub} />
        <CommunityShipsPanel locale={locale} label={t.tabCommunity} sub={t.communitySub} />
      </div>
    </section>
  )
}
