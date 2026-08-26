import { notFound } from "next/navigation"

import { blogSitemapMarkdown } from "@/lib/blog-markdown"
import { isLocale, locales } from "@/lib/i18n"

/**
 * Agent-facing index of the whole blog, as markdown.
 *
 * Distinct from `/sitemap.xml`, which exists for crawlers and carries no
 * content: this one carries every post's title, date and summary, so a model
 * can decide what to read without fetching anything first.
 *
 * Not indexed and not listed in the XML sitemap: it duplicates the index
 * page's links, and its audience does not come from search results.
 */

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return new Response(blogSitemapMarkdown(lang), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
    },
  })
}
