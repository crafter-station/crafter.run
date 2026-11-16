import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { entryLocales, getEntry, getSlugs } from "@/lib/changelog"
import { entryMarkdown, type Tr } from "@/lib/changelog-markdown"
import { isLocale } from "@/lib/i18n"

/**
 * Markdown rendering of one entry. Reached by the `.md` rewrite in
 * next.config.mjs and by `Accept: text/markdown` through proxy.ts; the
 * canonical URL never changes, hence `Vary: Accept`. `noindex` because it
 * duplicates the entry page.
 */

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getSlugs().flatMap((slug) => entryLocales(slug).map((lang) => ({ lang, slug })))
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const entry = getEntry(slug, lang)
  if (!entry) notFound()

  const tr = (await getTranslations({ locale: lang, namespace: "pages.changelog" })) as unknown as Tr

  return new Response(entryMarkdown(entry, lang, tr), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
      Vary: "Accept",
    },
  })
}
