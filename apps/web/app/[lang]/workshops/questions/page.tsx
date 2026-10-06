import { StationPageHero } from "@/components/station-page-hero"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { Container, SectionGap } from "@/components/grid-container"
import { WorkshopQuestionsBoard } from "@/components/workshop-questions-board"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
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

      <main className="flex-1">
        <StationPageHero
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          art="conversation"
        />
        <SectionGap />
        <Container innerClassName="px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-8">
          <WorkshopQuestionsBoard />
        </Container>
      </main>

    </>
  )
}
