import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLink } from "@/components/arrow-link"
import { AuthorList, AvatarGroup } from "@/components/blog/avatar"
import { blogCopy } from "@/components/blog/copy"
import { CopyActions } from "@/components/blog/copy-menu"
import { BlogCta } from "@/components/blog/cta"
import { byline, dateLabel, entryAuthors, readingMinutes, toEntryViews } from "@/components/blog/format"
import { BlogBody } from "@/components/blog/mdx"
import { Container, SectionGap } from "@/components/grid-container"
import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getIndexPosts, getPost, getSlugs, postLanguageAlternates, postLocales } from "@/lib/blog"
import { blogFeedPath, blogPath, blogPostMarkdownPath } from "@/lib/blog-paths"
import { isLocale, type Locale } from "@/lib/i18n"
import { baseUrl, localizedUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { blogPostingSchema, breadcrumbList } from "@/lib/structured-data"

export const dynamic = "force-static"
export const dynamicParams = false

/** Only the (slug, locale) pairs that have a file. Nothing else is published. */
export function generateStaticParams() {
  return getSlugs().flatMap((slug) => postLocales(slug).map((lang) => ({ lang, slug })))
}

/**
 * A hand-authored card from the frontmatter, if there is one.
 *
 * Returning undefined is the normal case and is deliberate: it leaves
 * `openGraph.images` unset, so Next falls through to `opengraph-image.tsx`
 * in this segment, which draws the post's real card. Setting it here
 * unconditionally would override that file for every post.
 */
function customCard(post: { image?: string }): string | undefined {
  if (!post.image) return undefined
  return post.image.startsWith("/") ? `${baseUrl}${post.image}` : post.image
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
  const custom = customCard(post)
  const title = `${post.title} | ${siteConfig.name}`
  const authors = post.authors.map((id) => entryAuthors(post).find((a) => a.id === id)!.name)

  return {
    metadataBase: new URL(baseUrl),
    title,
    description: post.summary,
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
      ...(custom ? { images: [{ url: custom, width: 1200, height: 630, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.summary,
      ...(custom ? { images: [custom] } : {}),
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
  // The generated card lives at the post's own `opengraph-image` child route;
  // a post that declares bespoke art in its frontmatter names that instead.
  const cardUrl = customCard(post) ?? `${url}/opengraph-image`
  const authors = entryAuthors(post)
  const minutes = readingMinutes(post.body, lang)
  const updated = post.updated && post.updated !== post.date ? post.updated : null
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
            imageUrl: cardUrl,
          }),
          breadcrumbList(lang, [
            { name: t.breadcrumbBlog, path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-12 md:px-10 md:py-20">
          <div className="max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.35em]"
            >
              <Link href={blogPath(lang)} className="text-muted-foreground transition-colors hover:text-foreground">
                {t.breadcrumbBlog}
              </Link>
              <span aria-hidden className="text-muted-foreground">/</span>
              <span className="text-accent">{t.kinds[post.kind]}</span>
            </nav>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.045em] md:text-6xl md:leading-[1.02]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">{post.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="inline-flex items-center gap-2.5">
                <AvatarGroup authors={authors} size={24} />
                <span>{byline(post.authors, lang)}</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <time dateTime={post.date}>{dateLabel(post.date, lang)}</time>
                <span aria-hidden> · </span>
                {t.readingTime(minutes)}
              </span>
            </div>
          </div>
        </Container>

        <SectionGap />

        <Container>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
            <article className="min-w-0 px-6 py-10 md:px-10 md:py-14">
              <div className="max-w-[68ch]">
                <BlogBody source={post.body} article={t.article} locale={lang} />
              </div>
            </article>

            {/* The meta rail. Above the article on a phone, beside it and
                sticky on a desktop, separated by the same hairline the rest
                of the site draws between cells. */}
            <aside className="order-first border-b border-line lg:order-none lg:border-b-0 lg:border-l">
              <div className="flex flex-col gap-8 px-6 py-8 md:px-8 lg:sticky lg:top-24 lg:py-14">
                <div>
                  <p className="label mb-3">{t.rail.authors}</p>
                  <AuthorList authors={authors} locale={lang} />
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
                  <div>
                    <dt className="label mb-1.5">{t.rail.published}</dt>
                    <dd className="text-sm">
                      <time dateTime={post.date}>{dateLabel(post.date, lang)}</time>
                    </dd>
                  </div>
                  {updated && (
                    <div>
                      <dt className="label mb-1.5">{t.rail.updated}</dt>
                      <dd className="text-sm">
                        <time dateTime={updated}>{dateLabel(updated, lang)}</time>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="label mb-1.5">{t.rail.reading}</dt>
                    <dd className="text-sm">{t.readingTime(minutes)}</dd>
                  </div>
                  <div>
                    <dt className="label mb-1.5">{t.rail.kind}</dt>
                    <dd className="text-sm">{t.kinds[post.kind]}</dd>
                  </div>
                </dl>
                <div>
                  <p className="label mb-3">{t.rail.share}</p>
                  <CopyActions title={post.title} t={t.copyMenu} />
                </div>
                <div className="flex flex-col gap-2 border-t border-line pt-6 text-sm">
                  <a
                    href={blogPostMarkdownPath(lang, slug)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.readAsMarkdown}
                  </a>
                  <a href={blogFeedPath(lang)} className="text-muted-foreground transition-colors hover:text-foreground">
                    {t.subscribe}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>

        {more.length > 0 && (
          <>
            <SectionGap />
            <Container innerClassName="border-b px-6 py-10 md:px-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {t.more.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t.more.title}</h2>
            </Container>
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {more.map((entry, i) => (
                  <Link
                    key={`${entry.locale}-${entry.slug}`}
                    href={entry.href}
                    hrefLang={entry.locale}
                    className={`group flex min-h-56 flex-col p-8 transition-colors hover:bg-accent-surface/10 ${
                      i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      {entry.kindLabel}
                      {entry.languageNote ? ` · ${entry.languageNote}` : ""}
                    </p>
                    <h3 className="mt-5 text-balance text-lg tracking-tight">{entry.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                    <div className="mt-auto flex items-center justify-between pt-8">
                      <time dateTime={entry.date} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {entry.dateLong}
                      </time>
                      <ArrowLink>{t.readPost}</ArrowLink>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </>
        )}

        <SectionGap />
        <BlogCta locale={lang} t={t} />
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
