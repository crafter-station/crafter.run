import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page"
import { createRelativeLink } from "fumadocs-ui/mdx"

import { source } from "@/lib/source"
import { getMDXComponents } from "@/components/mdx"
import { JsonLd } from "@/components/json-ld"
import { baseUrl, languageAlternates, localizedUrl, ogImageUrl } from "@/lib/seo"
import { isLocale, defaultLocale } from "@/lib/i18n"
import { organizationRef, softwareApplicationSchema } from "@/lib/structured-data"

type Props = {
  params: Promise<{ lang: string; slug?: string[] }>
}

function markdownUrl(lang: string, slug: string[] = []) {
  const path = slug.length > 0 ? slug.join("/") : "index"
  return `/llms.mdx/${path}?lang=${lang}`
}

export default async function Page(props: Props) {
  const { lang, slug } = await props.params
  const page = source.getPage(slug, lang)
  if (!page) notFound()

  const MDX = page.data.body

  const path =
    page.slugs.length > 0 ? `/docs/${page.slugs.join("/")}` : "/docs"
  const locale = isLocale(lang) ? lang : defaultLocale
  // A page that documents a published package describes the package too, not
  // only the article about it, so the npm install target is machine-readable.
  const software = softwareApplicationSchema({
    slug: page.slugs.join("/"),
    name: page.data.title,
    description: page.data.description ?? "",
    url: localizedUrl(path, locale),
    locale,
  })
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: page.data.title,
      description: page.data.description,
      url: localizedUrl(path, locale),
      inLanguage: locale,
      author: organizationRef,
      publisher: organizationRef,
      ...(software ? { about: { "@id": software["@id"] } } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Docs",
          item: localizedUrl("/docs", locale),
        },
        ...(page.slugs.length > 0
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: page.data.title,
                item: localizedUrl(path, locale),
              },
            ]
          : []),
      ],
    },
    ...(software ? [software] : []),
  ]

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
      tableOfContentPopover={{ style: "clerk" }}
    >
      <JsonLd data={structuredData} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl(lang, page.slugs)} />
        <ViewOptionsPopover markdownUrl={markdownUrl(lang, page.slugs)} />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { lang, slug } = await props.params
  const page = source.getPage(slug, lang)
  if (!page) notFound()

  const metaPath =
    page.slugs.length > 0 ? `/docs/${page.slugs.join("/")}` : "/docs"
  const locale = isLocale(lang) ? lang : defaultLocale
  const ogImage = ogImageUrl(page.data.title, locale, "Crafter Station · Docs")

  return {
    metadataBase: new URL(baseUrl),
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: localizedUrl(metaPath, locale),
      languages: languageAlternates(metaPath),
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: localizedUrl(metaPath, locale),
      siteName: "Crafter Station",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.data.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  }
}
