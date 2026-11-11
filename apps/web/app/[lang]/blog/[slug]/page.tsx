import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { AvatarGroup } from "@/components/blog/avatar"
import { BandChrome } from "@/components/blog/band-chrome"
import { blogCopy } from "@/components/blog/copy"
import { BlogCta } from "@/components/blog/cta"
import { byline, dateLabel, entryAuthors, readingMinutes, toEntryViews } from "@/components/blog/format"
import { EventPromo } from "@/components/blog/event-promo"
import { BlogBody } from "@/components/blog/mdx"
import { Container, SectionGap } from "@/components/grid-container"
import { JsonLd } from "@/components/json-ld"
import { getIndexPosts, getPost, getSlugs, postLanguageAlternates, postLocales } from "@/lib/blog"
import { blogFeedPath, blogPath, blogPostMarkdownPath } from "@/lib/blog-paths"
import { isLocale, type Locale } from "@/lib/i18n"
import { absoluteUrl, baseUrl, localizedUrl, ogImageUrl, serpDescription } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { blogPostingSchema, breadcrumbList, sourceVideos, videoObjectSchema } from "@/lib/structured-data"

export const dynamic = "force-static"
export const dynamicParams = false

/** Only the (slug, locale) pairs that have a file. Nothing else is published. */
export function generateStaticParams() {
  return getSlugs().flatMap((slug) => postLocales(slug).map((lang) => ({ lang, slug })))
}

function cardImage(post: { slug: string; title: string; summary: string }, locale: Locale) {
  return absoluteUrl(ogImageUrl(post.title, locale, "Crafter Journal", {
    path: `/blog/${post.slug}`, description: post.summary,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const post = getPost(slug, lang)
  if (!post) return {}

  const url = localizedUrl(`/blog/${slug}`, lang)
  const image = cardImage(post, lang)
  const title = `${post.title} | ${siteConfig.name}`
  const authors = post.authors.map((id) => entryAuthors(post).find((a) => a.id === id)!.name)

  return {
    metadataBase: new URL(baseUrl),
    title,
    description: serpDescription(post.summary),
    authors: authors.map((name) => ({ name })),
    alternates: {
      canonical: url,
      // Only the languages this post is written in, so hreflang never points
      // at a URL that 404s.
      languages: postLanguageAlternates(slug),
      types: {
        "text/markdown": `${baseUrl}${blogPostMarkdownPath(lang, slug)}`,
        "application/atom+xml": `${baseUrl}${blogFeedPath(lang)}`,
      },
    },
    openGraph: {
      title,
      description: post.summary,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.summary,
      images: [image],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const post = getPost(slug, lang)
  if (!post) notFound()

  const t = blogCopy[lang]
  const url = localizedUrl(`/blog/${slug}`, lang)
  const authors = entryAuthors(post)
  const minutes = readingMinutes(post.body, lang)
  const updated = post.updated && post.updated !== post.date ? post.updated : null
  // Posts written up from a talk cite the recording; most posts have none.
  const video = sourceVideos[slug]
  const more = toEntryViews(
    getIndexPosts(lang).filter((other) => other.slug !== slug).slice(0, 3),
    lang,
  )

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema({
            post,
            authors: authors.map((a) => ({ username: a.id, name: a.name, role: a.role, image: a.avatar })),
            locale: lang,
            url,
            imageUrl: cardImage(post, lang),
            video,
          }),
          ...(video ? [videoObjectSchema(video)] : []),
          breadcrumbList(lang, [
            { name: t.breadcrumbBlog, path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <main className="journal-article">
        <BandChrome />
        <header className="journal-band" data-chrome-band style={post.band ? ({ "--band": post.band } as CSSProperties) : undefined}>
          <nav aria-label="Breadcrumb" className="journal-band-crumbs">
            <Link href={blogPath(lang)}>{t.breadcrumbBlog}</Link>
            <span aria-hidden>/</span>
            <span>{t.kinds[post.kind]}</span>
          </nav>
          <h1>{post.title}</h1>
          <p className="journal-band-summary">{post.summary}</p>
          <div className="journal-band-meta">
            <span className="journal-band-byline">
              <AvatarGroup authors={authors} size={32} />
              <span>{byline(post.authors, lang)}</span>
            </span>
            <span>
              <time dateTime={post.date}>{dateLabel(post.date, lang)}</time>
              {updated && (
                <>
                  <span aria-hidden> · </span>
                  {t.rail.updated} <time dateTime={updated}>{dateLabel(updated, lang)}</time>
                </>
              )}
              <span aria-hidden> · </span>
              {t.readingTime(minutes)}
            </span>
          </div>
          {post.image && (
            <Image
              src={post.image}
              alt=""
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 1040px, 100vw"
              className="journal-band-art"
            />
          )}
        </header>

        <article className="journal-article-body">
          <BlogBody source={post.body} article={t.article} locale={lang} />
        </article>

        <EventPromo locale={lang} />

        {more.length > 0 && (
          <>
            <SectionGap />
            <Container innerClassName="journal-related-heading">
              <p className="font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.more.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t.more.title}</h2>
            </Container>
            <Container>
              <div className="journal-related-grid">
                {more.map((entry) => (
                  <Link
                    key={`${entry.locale}-${entry.slug}`}
                    href={entry.href}
                    hrefLang={entry.locale}
                    className="journal-related-card"
                  >
                    <p className="font-label text-xs uppercase tracking-[0.3em] text-accent">
                      {entry.kindLabel}
                      {entry.languageNote ? ` · ${entry.languageNote}` : ""}
                    </p>
                    <h3 className="mt-5 text-balance text-lg tracking-tight">{entry.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
                      <time dateTime={entry.date} className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {entry.dateLong}
                      </time>
                      <span className="text-sm">{t.readPost}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </>
        )}

        <BlogCta locale={lang} t={t} markdownHref={blogPostMarkdownPath(lang, slug)} />
      </main>

    </>
  )
}
