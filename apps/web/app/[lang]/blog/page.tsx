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
import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { BLOG_KINDS, getPage, pageCount } from "@/lib/blog"
import { blogFeedPath, blogSitemapMdPath } from "@/lib/blog-paths"
import { isLocale, locales } from "@/lib/i18n"
import { baseUrl, localizedUrl, pageMetadata } from "@/lib/seo"
import { blogIndexSchema } from "@/lib/structured-data"

/**
 * Blog index (page 1).
 *
 * Statically generated: every post is a file in the repo, so there is nothing
 * to fetch at request time and the whole archive can be prerendered.
 */

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const base = await pageMetadata({ params, path: "/blog", namespace: "pages.blog" })

  return {
    ...base,
    alternates: {
      ...base.alternates,
      // Feed autodiscovery. Browsers dropped the UI for this years ago;
      // readers and crawlers still look for it.
      types: {
        "application/atom+xml": `${baseUrl}${blogFeedPath(lang)}`,
        "text/markdown": `${baseUrl}${blogSitemapMdPath(lang)}`,
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const page = await getTranslations({ locale: lang, namespace: "pages.blog" })
  const t = blogCopy[lang]
  const posts = getPage(lang, 1)
  const entries = toEntryViews(posts, lang)
  const url = localizedUrl("/blog", lang)

  return (
    <>
      <JsonLd
        data={blogIndexSchema({
          locale: lang,
          url,
          title: page("title"),
          description: page("description"),
          posts: entries.map((entry) => ({ title: entry.title, url: `${baseUrl}${entry.href}` })),
        })}
      />
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <BlogHero
          locale={lang}
          eyebrow={page("eyebrow")}
          title={page("title")}
          description={page("description")}
          t={t}
        />
        <SectionGap />
        <BlogIndex
          entries={entries}
          kindOrder={BLOG_KINDS}
          feedHref={blogFeedPath(lang)}
          t={{ ...t.nav, kinds: t.kinds, subscribe: t.subscribe, readPost: t.readPost, empty: t.empty }}
        >
          <BlogPager locale={lang} page={1} pageCount={pageCount(lang)} t={t} />
        </BlogIndex>
        <SectionGap />
        <BlogCta locale={lang} t={t} />
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
