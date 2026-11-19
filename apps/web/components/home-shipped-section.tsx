import { CommunityShipsPanel } from "@/components/home-community-ships"
import { StationReleasesPanel } from "@/components/changelog/home-shipped"
import { HomeShippedTabs } from "@/components/home-shipped-tabs"
import type { Locale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"

export function HomeShippedSection({ locale, index }: { locale: Locale; index: number }) {
  const t = landingCopy[locale]
  return (
    <HomeShippedTabs index={index} label={t.sections.shipped} title={t.shippedTitle} lede={t.shippedLede}
      tabs={[
        { id: "community", label: t.tabCommunity, panel: <CommunityShipsPanel locale={locale} /> },
        { id: "station", label: t.tabStation, panel: <StationReleasesPanel locale={locale} /> },
      ]} />
  )
}
