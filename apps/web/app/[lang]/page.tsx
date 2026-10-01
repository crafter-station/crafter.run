import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Capabilities } from "@/components/capabilities"
import { CTA, type CtaCopy } from "@/components/cta"
import { FeaturedProducts } from "@/components/featured-products"
import { SectionGap } from "@/components/grid-container"
import { StationEvents, StationFamily } from "@/components/station-sections"
import { HeroContent } from "@/components/hero"
import { StationOpenSource } from "@/components/station-open-source"
import {
  CommunityPreview,
  CommunityQrCode,
  EventsResearchPreview,
  InstagramFollow,
  OpenCalendars,
  ProofStats,
} from "@/components/home-sections"
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
    <>

      <main className="flex-1">
        <HeroContent
          locale={lang}
          eventsCta={t("eventsCta")}
          eventsHref={withLocale("/events", lang)}
          ossCta={t("ossCta")}
          ossHref={withLocale("/oss", lang)}
        />
        <SectionGap />
        <StationOpenSource locale={lang} />
        <SectionGap />
        <ProofStats locale={lang} />
        <SectionGap />
        <FeaturedProducts locale={lang} />
        <SectionGap />
        <StationEvents locale={lang} />
        <SectionGap />
        <StationFamily locale={lang} />
        <SectionGap />
        <CommunityPreview locale={lang} />
        <SectionGap />
        <OpenCalendars locale={lang} />
        <SectionGap />
        <Capabilities locale={lang} />
        <SectionGap />
        <EventsResearchPreview locale={lang} />
        <SectionGap />
        <CTA copy={ctaCopy} />
        <SectionGap />
        <InstagramFollow locale={lang} />
        <SectionGap />
        <CommunityQrCode locale={lang} />
      </main>

    </>
  )
}
