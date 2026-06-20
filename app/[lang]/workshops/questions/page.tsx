import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WorkshopQuestionsBoard } from "@/components/workshop-questions-board"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/workshops/questions", namespace: "pages.workshopQuestions" })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.workshopQuestions" })

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-4 py-12 sm:px-6 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t("eyebrow")}</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-7xl">{t("title")}</h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{t("description")}</p>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-8">
          <WorkshopQuestionsBoard />
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
