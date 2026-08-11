import type { MetadataRoute } from "next"

import { locales } from "@/lib/i18n"
import {
  baseUrl,
  indexablePaths,
  languageAlternates,
  localizedUrl,
} from "@/lib/seo"
import { source } from "@/lib/source"
import { teamMembers } from "@/lib/team"
import { CONTENT_UPDATED, DOCS_UPDATED } from "@/lib/freshness"

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
      lastModified: new Date(
        path.startsWith("/docs") ? DOCS_UPDATED : CONTENT_UPDATED,
      ),
      changeFrequency: path.startsWith("/team/")
        ? ("monthly" as const)
        : ("weekly" as const),
      priority: path === "/" ? 1 : path.startsWith("/team/") ? 0.5 : 0.8,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  )

  return localizedEntries
}
