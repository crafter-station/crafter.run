import type { MetadataRoute } from "next"
import { bounties } from "@/lib/bounties"
import { hotReloadEditions } from "@/lib/hot-reload"
import { hotReloadPath } from "@/lib/hot-reload-seo"

import { blogUpdated, getPost, getSlugs, pageCount, postLanguageAlternates, postLocales } from "@/lib/blog"
import { changelogUpdated, entryLanguageAlternates, entryLocales, getEntry, getSlugs as getChangelogSlugs } from "@/lib/changelog"
import { locales } from "@/lib/i18n"
import {
  baseUrl,
  indexablePaths,
  languageAlternates,
  localizedUrl,
} from "@/lib/seo"
import { source } from "@/lib/source"
import { listAllShips } from "@/lib/ships"
import { activeTeamMembers } from "@/lib/team"
import { CONTENT_UPDATED, DOCS_UPDATED, HACKATHONS_UPDATED } from "@/lib/freshness"

function lastModified(path: string): Date {
  if (path.startsWith("/docs")) return new Date(DOCS_UPDATED)
  if (path === "/hackathons") return new Date(HACKATHONS_UPDATED)
  // The blog index moves whenever a post does; stamping it with the site-wide
  // content date would understate it after every publish.
  if (path === "/blog") return new Date(blogUpdated())
  if (path === "/changelog") return new Date(changelogUpdated())
  return new Date(CONTENT_UPDATED)
}

// Community Ships come from the API; refresh the list hourly like the homepage.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [...indexablePaths]
  const memberPaths = activeTeamMembers.map((member) => `/team/${member.username}`)
  const docsPaths = source
    .getPages("en")
    .map((page) =>
      page.slugs.length > 0 ? `/docs/${page.slugs.join("/")}` : "/docs",
    )
  const bountyPaths = bounties.map(bounty => `/bounties/${bounty.slug}`)
  const eventPaths = hotReloadEditions.map(edition => hotReloadPath(edition))
  const paths = [...staticPaths, ...memberPaths, ...docsPaths, ...bountyPaths, ...eventPaths]

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

  const changelogEntries = getChangelogSlugs().flatMap((slug) =>
    entryLocales(slug).map((locale) => ({
      url: localizedUrl(`/changelog/${slug}`, locale),
      lastModified: new Date(getEntry(slug, locale)!.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: entryLanguageAlternates(slug) },
    })),
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

  // Each published Ship page, in every UI language, dated by its latest activity. If the API
  // is down the sitemap still ships without them.
  const ships = (await listAllShips({ revalidate }))?.ships ?? []
  const shipEntries = ships.flatMap((ship) => {
    const path = `/ships/${ship.slug}`
    return locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: new Date(ship.lastActivityAt ?? ship.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
      alternates: { languages: languageAlternates(path) },
    }))
  })

  // Crafter profiles with at least one published Ship. Profiles without one are thin pages.
  const crafterActivity = new Map<string, number>()
  for (const ship of ships) {
    const activity = new Date(ship.lastActivityAt ?? ship.publishedAt).getTime()
    crafterActivity.set(ship.owner.handle, Math.max(crafterActivity.get(ship.owner.handle) ?? 0, activity))
  }
  const crafterEntries = [...crafterActivity].flatMap(([handle, activity]) => {
    const path = `/crafters/${handle}`
    return locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: new Date(activity),
      changeFrequency: "weekly" as const,
      priority: 0.5,
      alternates: { languages: languageAlternates(path) },
    }))
  })

  return [
    ...localizedEntries,
    ...postEntries,
    ...changelogEntries,
    ...archiveEntries,
    ...shipEntries,
    ...crafterEntries,
  ]
}
