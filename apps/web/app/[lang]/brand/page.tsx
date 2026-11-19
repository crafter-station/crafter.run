import { DesignSystemGuide } from "@/components/design-system-guide"
import { BrandHero, LogoSystem } from "@/components/brand/logo-system"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Container, SectionGap } from "@/components/grid-container"
import { HomeHead } from "@/components/home-head"
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
        <BrandHero locale={lang} eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <SectionGap />
        <LogoSystem locale={lang} />
        <SectionGap />
        <DesignSystemGuide locale={lang} />
        <SectionGap />

        <Container>
          <section aria-labelledby="brand-usage-title">
            <HomeHead id="brand-usage-title" index={3} label={t("eyebrow")} title={t("usageTitle")} lede={t("usageDescription")} />
          </section>
        </Container>
      </main>

    </>
  )
}
