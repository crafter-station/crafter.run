import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { changelogSitemapMarkdown, type Tr } from "@/lib/changelog-markdown"
import { isLocale, locales } from "@/lib/i18n"

/** Agent-facing index of the whole changelog, as markdown. Not indexed. */

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const tr = (await getTranslations({ locale: lang, namespace: "pages.changelog" })) as unknown as Tr

  return new Response(changelogSitemapMarkdown(lang, tr), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
    },
  })
}
