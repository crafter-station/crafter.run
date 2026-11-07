import { StationPageHero } from "@/components/station-page-hero"
import { DesignSystemGuide } from "@/components/design-system-guide"
import { LogoSystem } from "@/components/brand/logo-system"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Container, SectionGap } from "@/components/grid-container"
import { isLocale, locales } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/brand", namespace: "pages.brand" })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.brand" })

  return (
    <>

      <main className="flex-1">
        <StationPageHero
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          art="brand"
        />

        <SectionGap />
        <LogoSystem locale={lang} />
        <SectionGap />
        <DesignSystemGuide locale={lang} />
        <SectionGap />

        <Container innerClassName="grid gap-8 px-6 py-14 md:grid-cols-[1fr_2fr] md:px-10 md:py-20">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t("usageTitle")}
          </p>
          <p className="max-w-2xl text-lg leading-8 text-foreground/80">{t("usageDescription")}</p>
        </Container>
      </main>

    </>
  )
}
