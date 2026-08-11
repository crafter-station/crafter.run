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
import { isLocale } from "@/lib/i18n"

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
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: page.data.title,
      description: page.data.description,
      url: localizedUrl(path, lang),
      inLanguage: lang,
      author: {
        "@type": "Organization",
        name: "Crafter Station",
        url: baseUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Docs",
          item: localizedUrl("/docs", lang),
        },
        ...(page.slugs.length > 0
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: page.data.title,
                item: localizedUrl(path, lang),
              },
            ]
          : []),
      ],
    },
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
  const ogImage = ogImageUrl(
    page.data.title,
    isLocale(lang) ? lang : "en",
    "Crafter Station · Docs",
  )

  return {
    metadataBase: new URL(baseUrl),
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: localizedUrl(metaPath, lang),
      languages: languageAlternates(metaPath),
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: localizedUrl(metaPath, lang),
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
