import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { BlogCta } from "@/components/blog/cta"
import { blogCopy } from "@/components/blog/copy"
import { BlogIndex } from "@/components/blog/entry-list"
import { toEntryViews } from "@/components/blog/format"
import { BlogHero } from "@/components/blog/hero"
import { BlogPager } from "@/components/blog/pagination"
import { SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { BLOG_KINDS, getPage, pageCount } from "@/lib/blog"
import { blogFeedPath } from "@/lib/blog-paths"
import { isLocale, locales, type Locale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

/**
 * Blog archive, page 2 and up.
 *
 * Page 1 is `/blog`, never `/blog/page/1`: two URLs listing the same posts is
 * the classic pagination duplicate, so this route rejects `1` outright.
 *
 * These pages carry no ItemList JSON-LD. The posts are already described on
 * their own URLs, and repeating them here would put the same items in the
 * graph under several @ids. They exist so a crawler can walk the archive.
 */

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    Array.from({ length: pageCount(lang) - 1 }, (_, i) => ({ lang, page: String(i + 2) })),
  )
}

/** Parses the segment and rejects anything that is not a real page above 1. */
function parsePage(raw: string, locale: Locale): number | null {
  if (!/^[2-9]\d*$/.test(raw)) return null
  const page = Number(raw)
  return page <= pageCount(locale) ? page : null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; page: string }>
}): Promise<Metadata> {
  const { lang, page: raw } = await params
  if (!isLocale(lang)) return {}
  const page = parsePage(raw, lang)
  if (page === null) return {}
  const t = blogCopy[lang]

  return buildMetadata({
    locale: lang,
    path: `/blog/page/${page}`,
    title: t.archiveTitle(page),
    description: t.archiveDescription(page),
  })
}

export default async function Page({ params }: { params: Promise<{ lang: string; page: string }> }) {
  const { lang, page: raw } = await params
  if (!isLocale(lang)) notFound()
  const page = parsePage(raw, lang)
  if (page === null) notFound()

  const copy = await getTranslations({ locale: lang, namespace: "pages.blog" })
  const t = blogCopy[lang]
  const total = pageCount(lang)
  const entries = toEntryViews(getPage(lang, page), lang)

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <BlogHero
          locale={lang}
          eyebrow={copy("eyebrow")}
          title={copy("title")}
          description={copy("description")}
          subtitle={t.pageOf(page, total)}
          t={t}
        />
        <SectionGap />
        <BlogIndex
          entries={entries}
          kindOrder={BLOG_KINDS}
          feedHref={blogFeedPath(lang)}
          t={{ ...t.nav, kinds: t.kinds, subscribe: t.subscribe, readPost: t.readPost, empty: t.empty }}
        >
          <BlogPager locale={lang} page={page} pageCount={total} t={t} />
        </BlogIndex>
        <SectionGap />
        <BlogCta locale={lang} t={t} />
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
