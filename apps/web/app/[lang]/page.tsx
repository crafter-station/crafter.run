import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { StationNetwork } from "@/components/crafter-network"
import { StationEvents } from "@/components/station-sections"
import { HeroContent } from "@/components/hero"
import { StationPeople, StationJournal } from "@/components/station-home"
import { StationFaq } from "@/components/station-faq"
import { StationShipped } from "@/components/changelog/home-shipped"
import { StationCommunityShips } from "@/components/home-community-ships"
import { HomeBackersMarquee } from "@/components/home-backers-marquee"
import { HomeServices } from "@/components/home-services"
import { HomeOpenSource } from "@/components/home-open-source"
import { HomeContact } from "@/components/home-contact"
import { isLocale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false
// Community Ships come from the API: regenerate every five minutes, even if the build could not reach it.
export const revalidate = 300

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "pt" }, { lang: "zh" }, { lang: "ja" }]
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/", namespace: "home" })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "home" })

  return (
      <main className="station-home flex-1">
        <HeroContent
          locale={lang}
          eventsCta={t("eventsCta")}
          eventsHref={withLocale("/events", lang)}
          ossCta={t("ossCta")}
          ossHref={withLocale("/oss", lang)}
        />
        <HomeBackersMarquee locale={lang} />
        <StationCommunityShips locale={lang} />
        <StationShipped locale={lang} />
        <HomeServices locale={lang} />
        <HomeOpenSource locale={lang} />
        <StationNetwork locale={lang} />
        <StationEvents locale={lang} />
        <StationPeople locale={lang} />
        <StationJournal locale={lang} />
        <StationFaq locale={lang} />
        <HomeContact locale={lang} />
      </main>
  )
}
