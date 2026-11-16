import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { ChangelogCta } from "@/components/changelog/cta"
import { ChangelogCard } from "@/components/changelog/entry-card"
import { ChangelogFilter } from "@/components/changelog/filter"
import { toView } from "@/components/changelog/format"
import { ChangelogHero } from "@/components/changelog/hero"
import { changelogLabels } from "@/components/changelog/labels"
import { JsonLd } from "@/components/json-ld"
import { CHANGELOG_AREAS, filterByArea, getIndexEntries, parseArea, type ChangelogArea } from "@/lib/changelog"
import { changelogFeedPath, changelogSitemapMdPath } from "@/lib/changelog-paths"
import { isLocale } from "@/lib/i18n"
import { baseUrl, localizedUrl, pageMetadata } from "@/lib/seo"
import { changelogIndexSchema } from "@/lib/structured-data"

/**
 * Changelog index.
 *
 * Rendered per request because the area filter lives in `?area=`. Every
 * filtered view canonicalizes to the unfiltered page, so the filter creates no
 * new URLs for a crawler to index.
 */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const base = await pageMetadata({ params, path: "/changelog", namespace: "pages.changelog" })
  return {
    ...base,
    alternates: {
      ...base.alternates,
      types: {
        "application/atom+xml": `${baseUrl}${changelogFeedPath(lang)}`,
        "text/markdown": `${baseUrl}${changelogSitemapMdPath(lang)}`,
      },
    },
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ area?: string | string[] }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const area = parseArea((await searchParams).area)

  const page = await getTranslations({ locale: lang, namespace: "pages.changelog" })
  const t = changelogLabels(page, lang)

  const all = getIndexEntries(lang)
  const counts = Object.fromEntries([
    ["all", all.length],
    ...CHANGELOG_AREAS.map((a) => [a, filterByArea(all, a).length]),
  ]) as Record<ChangelogArea | "all", number>
  const views = filterByArea(all, area).map((entry) => toView(entry, lang))

  return (
    <>
      <JsonLd
        data={changelogIndexSchema({
          locale: lang,
          url: localizedUrl("/changelog", lang),
          title: page("title"),
          description: page("description"),
          entries: all.map((entry) => ({ title: entry.title, url: localizedUrl(`/changelog/${entry.slug}`, entry.locale) })),
        })}
      />
      <main className="journal-page changelog-page">
        <ChangelogHero locale={lang} eyebrow={page("eyebrow")} title={page("title")} description={page("description")} t={t} />
        <ChangelogFilter locale={lang} active={area} counts={counts} t={t} />
        <p className="sr-only" role="status">{t.results(views.length)}</p>
        {views.length === 0 ? (
          <div className="journal-empty"><p>{t.empty}</p></div>
        ) : (
          <div className="changelog-list">
            {views.map((entry) => (
              <ChangelogCard key={`${entry.locale}-${entry.slug}`} entry={entry} t={t} locale={lang} />
            ))}
          </div>
        )}
        <ChangelogCta locale={lang} t={t} />
      </main>
    </>
  )
}
