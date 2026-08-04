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
import { languageAlternates, localizedUrl } from "@/lib/seo"

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

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
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

  const path =
    page.slugs.length > 0 ? `/docs/${page.slugs.join("/")}` : "/docs"

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: localizedUrl(path, lang),
      languages: languageAlternates(path),
    },
  }
}
