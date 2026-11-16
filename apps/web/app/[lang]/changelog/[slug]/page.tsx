import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { AuthorList, AvatarGroup } from "@/components/blog/avatar"
import { BandChrome } from "@/components/blog/band-chrome"
import { blogCopy } from "@/components/blog/copy"
import { dateLabel } from "@/components/blog/format"
import { BlogBody } from "@/components/blog/mdx"
import { ChangelogCta } from "@/components/changelog/cta"
import { crafterAuthors, crafterByline, evidenceLabel } from "@/components/changelog/format"
import { changelogLabels } from "@/components/changelog/labels"
import { JsonLd } from "@/components/json-ld"
import {
  entryLanguageAlternates,
  entryLocales,
  getEntry,
  getNeighbors,
  getSlugs,
} from "@/lib/changelog"
import {
  changelogEntryMarkdownPath,
  changelogFeedPath,
  changelogPath,
} from "@/lib/changelog-paths"
import { isLocale, withLocale } from "@/lib/i18n"
import { absoluteUrl, baseUrl, localizedUrl, ogImageUrl, serpDescription } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { breadcrumbList, changelogEntrySchema } from "@/lib/structured-data"

export const dynamic = "force-static"
export const dynamicParams = false

/** Only the (slug, locale) pairs that have a file. Nothing else is published. */
export function generateStaticParams() {
  return getSlugs().flatMap((slug) => entryLocales(slug).map((lang) => ({ lang, slug })))
}

/** Band colour by area, so an entry reads as belonging to its organization. */
const AREA_BAND: Record<string, string> = {
  station: "#f4d56d",
  research: "#cdbde0",
  lab: "#c3d9a8",
  games: "#adc8e2",
}

function cardImage(entry: { slug: string; title: string; summary: string }, locale: Parameters<typeof ogImageUrl>[1]) {
  return absoluteUrl(
    ogImageUrl(entry.title, locale, "Crafter Changelog", { path: `/changelog/${entry.slug}`, description: entry.summary }),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const entry = getEntry(slug, lang)
  if (!entry) return {}

  const url = localizedUrl(`/changelog/${slug}`, lang)
  const image = cardImage(entry, lang)
  const title = `${entry.title} | ${siteConfig.name}`
  const names = entry.crafters.map((id) => crafterAuthors([id])[0]!.name)

  return {
    metadataBase: new URL(baseUrl),
    title,
    description: serpDescription(entry.summary),
    ...(names.length > 0 ? { authors: names.map((name) => ({ name })) } : {}),
    alternates: {
      canonical: url,
      languages: entryLanguageAlternates(slug),
      types: {
        "text/markdown": `${baseUrl}${changelogEntryMarkdownPath(lang, slug)}`,
        "application/atom+xml": `${baseUrl}${changelogFeedPath(lang)}`,
      },
    },
    openGraph: {
      title,
      description: entry.summary,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: entry.date,
      ...(names.length > 0 ? { authors: names } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: entry.title }],
    },
    twitter: { card: "summary_large_image", title, description: entry.summary, images: [image] },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const entry = getEntry(slug, lang)
  if (!entry) notFound()

  const page = await getTranslations({ locale: lang, namespace: "pages.changelog" })
  const t = changelogLabels(page, lang)
  const url = localizedUrl(`/changelog/${slug}`, lang)
  const crafters = crafterAuthors(entry.crafters)
  const { newer, older } = getNeighbors(slug, lang)
  const hasFacts = (entry.ships?.length ?? 0) + (entry.repos?.length ?? 0) + (entry.links?.length ?? 0) > 0

  return (
    <>
      <JsonLd
        data={[
          changelogEntrySchema({
            entry,
            crafters: crafters.map((c) => ({ username: c.id, name: c.name, role: c.role, image: c.avatar })),
            locale: lang,
            url,
            imageUrl: entry.image ? absoluteUrl(entry.image) : cardImage(entry, lang),
          }),
          breadcrumbList(lang, [
            { name: page("title"), path: "/changelog" },
            { name: entry.title, path: `/changelog/${slug}` },
          ]),
        ]}
      />

      <main className="journal-article changelog-article" data-area={entry.area}>
        <BandChrome />
        <header
          className="journal-band"
          data-chrome-band
          style={{ "--band": AREA_BAND[entry.area] } as CSSProperties}
        >
          <nav aria-label="Breadcrumb" className="journal-band-crumbs">
            <Link href={changelogPath(lang)}>{page("title")}</Link>
            <span aria-hidden>/</span>
            <Link href={`${changelogPath(lang)}?area=${entry.area}`}>{t.areas[entry.area]}</Link>
            <span aria-hidden>/</span>
            <span>{t.kinds[entry.kind]}</span>
          </nav>
          <h1>{entry.title}</h1>
          <p className="journal-band-summary">{entry.summary}</p>
          <div className="journal-band-meta">
            {crafters.length > 0 && (
              <span className="journal-band-byline">
                <AvatarGroup authors={crafters} size={32} />
                <span>{crafterByline(entry.crafters, lang)}</span>
              </span>
            )}
            <time dateTime={entry.date}>{dateLabel(entry.date, lang)}</time>
          </div>
          {entry.video ? (
            <video
              className="journal-band-art"
              src={entry.video}
              poster={entry.image}
              controls
              playsInline
              preload="metadata"
            />
          ) : entry.image ? (
            <Image
              src={entry.image}
              alt=""
              width={1600}
              height={1000}
              priority
              sizes="(min-width: 1024px) 1040px, 100vw"
              className="journal-band-art"
            />
          ) : null}
        </header>

        <article className="journal-article-body">
          <BlogBody source={entry.body} article={blogCopy[lang].article} locale={lang} />
        </article>

        <div className="changelog-facts">
          {crafters.length > 0 && (
            <section>
              <h2>{t.crafters}</h2>
              <AuthorList authors={crafters} locale={lang} />
            </section>
          )}
          {hasFacts && (
            <section>
              {(entry.ships?.length ?? 0) > 0 && (
                <>
                  <h2>{t.ships}</h2>
                  <ul>
                    {entry.ships!.map((ship) => (
                      <li key={ship}>
                        <Link href={withLocale(`/ships/${ship}`, lang)}>{ship}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {(entry.repos?.length ?? 0) > 0 && (
                <>
                  <h2>{t.repos}</h2>
                  <ul>
                    {entry.repos!.map((repo) => (
                      <li key={repo}>
                        <a href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer">{repo}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {(entry.links?.length ?? 0) > 0 && (
                <>
                  <h2>{t.links}</h2>
                  <ul>
                    {entry.links!.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}
        </div>

        {entry.evidence.length > 0 && (
          <aside className="changelog-sources" aria-label={t.sources}>
            <h2>{t.sources}</h2>
            <ul>
              {entry.evidence.map((source) => (
                <li key={source}>
                  <a href={source} target="_blank" rel="noopener noreferrer">{evidenceLabel(source)}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <nav className="changelog-pager" aria-label={t.allChanges}>
          {newer ? (
            <Link href={withLocale(`/changelog/${newer.slug}`, newer.locale)} hrefLang={newer.locale} rel="next">
              <span>{t.newer}</span>
              <strong>{newer.title}</strong>
            </Link>
          ) : <span />}
          <Link href={changelogPath(lang)} className="changelog-pager-all">{t.allChanges}</Link>
          {older ? (
            <Link href={withLocale(`/changelog/${older.slug}`, older.locale)} hrefLang={older.locale} rel="prev" className="changelog-pager-older">
              <span>{t.older}</span>
              <strong>{older.title}</strong>
            </Link>
          ) : <span />}
        </nav>

        <ChangelogCta locale={lang} t={t} markdownHref={changelogEntryMarkdownPath(lang, slug)} />
      </main>
    </>
  )
}
