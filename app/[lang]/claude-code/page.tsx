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
  return pageMetadata({ params, path: "/claude-code", namespace: "pages.claudeCodeQuestions" })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ embed?: string }>
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams])
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.claudeCodeQuestions" })
  const isEmbed = query.embed === "1"

  const content = (
    <main className="flex-1">
      {!isEmbed ? (
        <>
          <Container innerClassName="px-4 py-12 sm:px-6 md:px-10 md:py-24">
            <div className="max-w-4xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t("eyebrow")}</p>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-7xl">{t("title")}</h1>
              <p className="mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{t("description")}</p>
            </div>
          </Container>
          <SectionGap />
        </>
      ) : null}
      <Container innerClassName={isEmbed ? "px-3 py-3 sm:px-4 sm:py-4" : "px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-8"}>
        <WorkshopQuestionsBoard
          boardSlug="claude-code"
          submitLabel="Ask about Claude Code"
          dialogTitle="What should Shiara answer about Claude Code?"
          dialogDescription="Ask about workflows, prompts, context, reviews, handoffs, or anything you want covered live. Add your name only if you want."
          heading="Claude Code questions"
          emptyState="No Claude Code questions yet. Be the first person to steer Shiara's session."
        />
      </Container>
    </main>
  )

  if (isEmbed) {
    return content
  }

  return (
    <>
      <SiteHeader locale={lang} />
      {content}
      <SiteFooter locale={lang} />
    </>
  )
}
