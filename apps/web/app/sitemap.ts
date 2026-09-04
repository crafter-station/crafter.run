import type { MetadataRoute } from "next"

import { blogUpdated, getPost, getSlugs, pageCount, postLanguageAlternates, postLocales } from "@/lib/blog"
import { locales } from "@/lib/i18n"
import {
  baseUrl,
  indexablePaths,
  languageAlternates,
  localizedUrl,
} from "@/lib/seo"
import { source } from "@/lib/source"
import { teamMembers } from "@/lib/team"
import { CONTENT_UPDATED, DOCS_UPDATED, HACKATHONS_UPDATED } from "@/lib/freshness"

function lastModified(path: string): Date {
  if (path.startsWith("/docs")) return new Date(DOCS_UPDATED)
  if (path === "/hackathons") return new Date(HACKATHONS_UPDATED)
  // The blog index moves whenever a post does; stamping it with the site-wide
  // content date would understate it after every publish.
  if (path === "/blog") return new Date(blogUpdated())
  return new Date(CONTENT_UPDATED)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [...indexablePaths]
  const memberPaths = teamMembers.map((member) => `/team/${member.username}`)
  const docsPaths = source
    .getPages("en")
    .map((page) =>
      page.slugs.length > 0 ? `/docs/${page.slugs.join("/")}` : "/docs",
    )
  const paths = [...staticPaths, ...memberPaths, ...docsPaths]

  const localizedEntries = paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: lastModified(path),
      changeFrequency: path.startsWith("/team/")
        ? ("monthly" as const)
        : ("weekly" as const),
      priority: path === "/" ? 1 : path.startsWith("/team/") ? 0.5 : 0.8,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  )

  // Posts are listed only in the languages they are written in, with an
  // hreflang cluster narrowed to match, and dated from their own frontmatter.
  const postEntries = getSlugs().flatMap((slug) =>
    postLocales(slug).map((locale) => {
      const post = getPost(slug, locale)!
      return {
        url: localizedUrl(`/blog/${slug}`, locale),
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: postLanguageAlternates(slug) },
      }
    }),
  )

  // Archive pages 2..N, so a crawler can walk the whole blog. Page 1 is /blog.
  const archiveEntries = locales.flatMap((locale) =>
    Array.from({ length: pageCount(locale) - 1 }, (_, i) => ({
      url: localizedUrl(`/blog/page/${i + 2}`, locale),
      lastModified: new Date(blogUpdated()),
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  )

  return [...localizedEntries, ...postEntries, ...archiveEntries]
}
