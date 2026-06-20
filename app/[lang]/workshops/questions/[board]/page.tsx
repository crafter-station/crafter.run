import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WorkshopQuestionsBoard } from "@/components/workshop-questions-board"
import { isLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

const boardSlugPattern = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/

export function generateMetadata({ params }: { params: Promise<{ lang: string; board: string }> }) {
  return params.then(({ lang, board }) => {
    if (!isLocale(lang) || !boardSlugPattern.test(board)) return {}

    return buildMetadata({
      locale: lang,
      path: `/workshops/questions/${board}`,
      title: `${board} questions`,
      description: "Submit and vote on questions for this Crafter Station workshop.",
    })
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; board: string }>
}) {
  const { lang, board } = await params
  if (!isLocale(lang) || !boardSlugPattern.test(board)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.workshopQuestions" })
  const label = board.replaceAll("-", " ")

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-4 py-12 sm:px-6 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">/workshops/questions/{board}</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold capitalize tracking-[-0.05em] sm:text-5xl md:text-7xl">
              {label} questions
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{t("description")}</p>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-8">
          <WorkshopQuestionsBoard boardSlug={board} heading={`${label} questions`} />
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
