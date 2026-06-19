import type { MetadataRoute } from "next"

import { locales } from "@/lib/i18n"
import { indexablePaths, languageAlternates, localizedUrl } from "@/lib/seo"
import { teamMembers } from "@/lib/team"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [...indexablePaths]
  const memberPaths = teamMembers.map((member) => `/team/${member.username}`)
  const paths = [...staticPaths, ...memberPaths]

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: path.startsWith("/team/") ? "monthly" : "weekly",
      priority: path === "/" ? 1 : path.startsWith("/team/") ? 0.5 : 0.8,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  )
}
