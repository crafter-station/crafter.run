import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { CTA, type CtaCopy } from "@/components/cta"
import { FeaturedProducts } from "@/components/featured-products"
import { StationEvents, StationFamily } from "@/components/station-sections"
import { HeroContent } from "@/components/hero"
import { StationOpenSource } from "@/components/station-open-source"
import { StationPeople, StationJournal, StationExplore } from "@/components/station-home"
import { isLocale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "pt" }, { lang: "zh" }, { lang: "ja" }]
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/", namespace: "home" })
}

const ctaKeys = [
  "eyebrow",
  "title",
  "description",
  "emailLabel",
  "emailPlaceholder",
  "submit",
  "sending",
  "successTitle",
  "successDescription",
  "invalidEmail",
  "genericError",
  "networkError",
] as const

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "home" })
  const tCta = await getTranslations({ locale: lang, namespace: "cta" })
  const ctaCopy = Object.fromEntries(
    ctaKeys.map((key) => [key, tCta(key)]),
  ) as CtaCopy

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
        <FeaturedProducts locale={lang} />
        <StationEvents locale={lang} />
        <StationPeople locale={lang} />
        <StationFamily locale={lang} />
        <StationJournal locale={lang} />
        <div className="home-contact theme-scope"><CTA copy={ctaCopy} /></div>
        <StationExplore locale={lang} />
      </main>
  )
}
