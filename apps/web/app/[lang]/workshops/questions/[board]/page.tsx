import { StationPageHero } from "@/components/station-page-hero"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { Container, SectionGap } from "@/components/grid-container"
import { WorkshopQuestionsBoard } from "@/components/workshop-questions-board"
import { isLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

const boardSlugPattern = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/
const retiredBoards = new Set(["opencode", "claude-code", "n8n"])

function isAvailableBoard(board: string) {
  return boardSlugPattern.test(board) && !retiredBoards.has(board)
}

export function generateMetadata({ params }: { params: Promise<{ lang: string; board: string }> }) {
  return params.then(({ lang, board }) => {
    if (!isLocale(lang) || !isAvailableBoard(board)) return {}

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
  if (!isLocale(lang) || !isAvailableBoard(board)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.workshopQuestions" })
  const label = board.replaceAll("-", " ")

  return (
    <>

      <main className="flex-1">
        <StationPageHero eyebrow={t("eyebrow")} title={`${label} questions`} description={t("description")} art="conversation" />
        <SectionGap />
        <Container innerClassName="px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-8">
          <WorkshopQuestionsBoard boardSlug={board} heading={`${label} questions`} />
        </Container>
      </main>

    </>
  )
}
