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
  return pageMetadata({ params, path: "/n8n", namespace: "pages.n8nQuestions" })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.n8nQuestions" })

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
          <WorkshopQuestionsBoard
            boardSlug="n8n"
            submitLabel="Ask about n8n + MCP"
            dialogTitle="What should Javo answer about n8n MCP + Claude Code?"
            dialogDescription="Ask about automations, flows, MCP servers, Claude Code workflows, integrations, or anything you want covered live. Add your name only if you want."
            heading="n8n MCP + Claude Code questions"
            emptyState="No n8n questions yet. Be the first person to steer Javo's session."
          />
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
