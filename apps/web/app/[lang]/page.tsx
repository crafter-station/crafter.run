import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { StationNetwork } from "@/components/crafter-network"
import { StationEvents } from "@/components/station-sections"
import { HeroContent } from "@/components/hero"
import { StationOpenSource } from "@/components/station-open-source"
import { StationPeople, StationJournal, StationContact, StationExplore } from "@/components/station-home"
import { StationFaq } from "@/components/station-faq"
import { isLocale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

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
        <StationOpenSource locale={lang} />
        <StationNetwork locale={lang} />
        <StationEvents locale={lang} />
        <StationPeople locale={lang} />
        <StationJournal locale={lang} />
        <StationExplore locale={lang} />
        <StationFaq locale={lang} />
        <StationContact locale={lang} />
      </main>
  )
}
