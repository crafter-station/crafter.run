import type { Hackathon } from "@/lib/hackathons"
import { defaultLocale, locales, type Locale } from "@/lib/i18n"
import type { OssRepo } from "@/lib/oss"
import type { Product } from "@/lib/products"
import { baseUrl, localizedUrl } from "@/lib/seo"
import { siteConfig, socials } from "@/lib/site"
import { getTeamMember, primaryLink, type TeamMember } from "@/lib/team"

/**
 * schema.org builders. Structured data is the only description of this site a
 * machine gets before it decides to read further, so the shapes live together
 * here and every page composes from the same organization node instead of
 * restating it.
 */

const ORGANIZATION_ID = `${baseUrl}/#organization`
const WEBSITE_ID = `${baseUrl}/#website`

/** A reference to the organization node, for pages that should not repeat it. */
export const organizationRef = { "@id": ORGANIZATION_ID }

export function organizationSchema(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    alternateName: "Crafter",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/brand/logo-liquid.png`,
      caption: siteConfig.name,
    },
    image: `${baseUrl}/brand/logo-liquid.png`,
    slogan: siteConfig.tagline[locale],
    description: siteConfig.description[locale],
    knowsLanguage: [...locales],
    areaServed: { "@type": "Place", name: "Latin America" },
    founder: {
      "@type": "Person",
      name: "Railly Hugo",
      url: localizedUrl("/team/railly", locale),
      sameAs: ["https://railly.dev", "https://github.com/Railly"],
    },
    foundingLocation: {
      "@type": "Place",
      name: "Lima, Peru",
      address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    },
    subOrganization: {
      "@type": "Organization",
      "@id": "https://hack0.dev/#organization",
      name: "hack0",
      alternateName: "hack0.dev",
      url: "https://hack0.dev",
      sameAs: [
        "https://luma.com/hack0",
        "https://www.linkedin.com/company/hack0-dev",
        "https://github.com/crafter-station/hack0",
      ],
    },
    // The Luma calendar is hack0's profile, so it sits on the sub-organization rather than here.
    sameAs: [
      ...socials.filter((social) => social.label !== "Luma").map((social) => social.href),
      "https://www.linkedin.com/company/crafter-station",
      "https://daily.dev/squads/crafterstation",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "General enquiries",
      url: localizedUrl("/contact", locale),
      availableLanguage: [...locales],
    },
  }
}

export function webSiteSchema(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description[locale],
    inLanguage: [...locales],
    publisher: organizationRef,
  }
}

export function breadcrumbList(locale: Locale, trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: localizedUrl(crumb.path, locale),
    })),
  }
}

/**
 * The npm packages documented under /docs. Keyed by doc slug so a docs page
 * can describe the thing it documents, not just the article about it. Versions
 * are deliberately absent: they move on every release and stale structured
 * data is worse than none.
 */
export const documentedPackages: Record<
  string,
  { npm: string; repo: string; operatingSystem: string; category: string; license?: string }
> = {
  awake: {
    npm: "@crafter/awake",
    repo: "https://github.com/crafter-station/awake",
    operatingSystem: "macOS",
    category: "DeveloperApplication",
    license: "https://opensource.org/licenses/MIT",
  },
  mermaid: {
    npm: "@crafter/mermaid",
    repo: "https://github.com/crafter-station/mermaid",
    operatingSystem: "Any",
    category: "DeveloperApplication",
  },
  "neon-cli": {
    npm: "@crafter/neon-cli",
    repo: "https://github.com/crafter-station/neon-cli",
    operatingSystem: "macOS, Linux, Windows",
    category: "DeveloperApplication",
  },
  skillkit: {
    npm: "@crafter/skillkit",
    repo: "https://github.com/crafter-station/skill-kit",
    operatingSystem: "macOS, Linux, Windows",
    category: "DeveloperApplication",
    license: "https://opensource.org/licenses/MIT",
  },
  trx: {
    npm: "@crafter/trx",
    repo: "https://github.com/crafter-station/trx",
    operatingSystem: "macOS, Linux",
    category: "DeveloperApplication",
    license: "https://opensource.org/licenses/MIT",
  },
}

export function softwareApplicationSchema({
  slug,
  name,
  description,
  url,
  locale,
}: {
  slug: string
  name: string
  description: string
  url: string
  locale: Locale
}) {
  const pkg = documentedPackages[slug]
  if (!pkg) return null

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: pkg.npm,
    alternateName: name,
    description,
    url,
    applicationCategory: pkg.category,
    operatingSystem: pkg.operatingSystem,
    softwareHelp: { "@type": "CreativeWork", url },
    codeRepository: pkg.repo,
    downloadUrl: `https://www.npmjs.com/package/${pkg.npm}`,
    installUrl: `https://www.npmjs.com/package/${pkg.npm}`,
    isAccessibleForFree: true,
    inLanguage: locale,
    // Only claimed where the published package actually declares one.
    ...(pkg.license ? { license: pkg.license } : {}),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: organizationRef,
    publisher: organizationRef,
  }
}

/**
 * The products page as an ItemList of SoftwareApplication nodes. Each node reuses
 * the @id its own landing publishes, when there is one, so the product, its
 * maker and this organization resolve to one entity across sites.
 */
export function productListSchema(items: Product[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        ...(product.entityId ? { "@id": product.entityId } : {}),
        name: product.name,
        url: product.url,
        description: product.description[locale],
        applicationCategory: "ProductivityApplication",
        operatingSystem: product.platform,
        ...(product.price ? { offers: { "@type": "Offer", price: product.price, priceCurrency: "USD", url: product.url } } : {}),
        ...(product.maker
          ? { author: { "@type": "Person", "@id": product.maker.id, name: product.maker.name, url: product.maker.url } }
          : { author: organizationRef }),
        publisher: organizationRef,
      },
    })),
  }
}

export function repositoryListSchema({
  repos,
  locale,
  name,
  path,
}: {
  repos: readonly OssRepo[]
  locale: Locale
  name: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: localizedUrl(path, locale),
    numberOfItems: repos.length,
    itemListElement: repos.map((repo, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: repo.name,
        identifier: repo.repo,
        description: repo.description ?? undefined,
        codeRepository: repo.url,
        url: repo.url,
        ...(repo.language ? { programmingLanguage: repo.language } : {}),
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: repo.stars,
        },
      },
    })),
  }
}

export function personSchema(member: TeamMember, locale: Locale) {
  const profileUrl = localizedUrl(`/team/${member.username}`, locale)
  const sameAs = [member.github, member.linkedin, member.x, member.instagram, member.website].filter(
    (link): link is string => Boolean(link),
  )

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileUrl,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": `${profileUrl}#person`,
      name: member.name,
      alternateName: member.username,
      jobTitle: member.role,
      description: member.bio[locale],
      image: `${baseUrl}${member.image}`,
      url: profileUrl,
      knowsAbout: member.skills,
      ...(member.location ? { homeLocation: { "@type": "Place", name: member.location } } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
      worksFor: organizationRef,
    },
  }
}

/**
 * Blog schemas. Two deliberate choices beyond the usual BlogPosting:
 *
 * 1. The index carries structured data too. Most blogs emit it only on posts,
 *    which leaves the page that collects them invisible as an entity. A Blog
 *    with an ItemList is what lets the archive be understood as one thing.
 * 2. Authors resolve to the same Person nodes the team profiles publish, by
 *    `@id`, so a byline and a profile page are one entity in the graph rather
 *    than two people who happen to share a name.
 */

/** Dates are authored as calendar days; schema.org wants a point in time. */
function instant(date: string): string {
  return `${date}T00:00:00+00:00`
}

function blogId(locale: Locale): string {
  return `${localizedUrl("/blog", locale)}#blog`
}

export type BlogAuthorNode = {
  username: string
  name: string
  role: string
  image: string
}

function authorNodes(authors: readonly BlogAuthorNode[], locale: Locale) {
  return authors.map((author) => {
    const member = getTeamMember(author.username)
    const profileUrl = member?.alumni
      ? (primaryLink(member) ?? localizedUrl("/team", locale))
      : localizedUrl(`/team/${author.username}`, locale)
    return {
      "@type": "Person" as const,
      "@id": `${profileUrl}#person`,
      name: author.name,
      jobTitle: author.role,
      url: profileUrl,
      image: `${baseUrl}${author.image}`,
      ...(!member?.alumni ? { worksFor: organizationRef } : {}),
    }
  })
}

/**
 * Talks a post was written from, keyed by blog slug.
 *
 * A post derived from a recording should say so in a way a machine can read:
 * the article carries the claims, the video is the evidence. The map lives here
 * rather than in frontmatter because a series written from one session shares
 * one recording, and its chapter list should not be copied into four posts and
 * five locales to say the same thing.
 */
export type SourceVideo = {
  /** YouTube id. Every URL on the node is derived from it. */
  youtubeId: string
  /** The title as published on YouTube, not a restatement of the post's. */
  name: string
  description: string
  /** When the recording went up, which is not when the post did. */
  uploadDate: string
  /** Total length in seconds; the ISO duration and the last chapter's end
      offset are both derived from it so they cannot disagree. */
  durationSeconds: number
  /** BCP 47 tag for the spoken audio, often not the locale of the post. */
  inLanguage: string
  /** Chapters in order, as seconds from the start. */
  chapters: readonly { name: string; startOffset: number }[]
}

/** Seconds to the ISO 8601 duration schema.org expects: 4286 is `PT1H11M26S`. */
function isoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60
  const parts = `${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}${rest ? `${rest}S` : ""}`
  return `PT${parts || "0S"}`
}

const HACKATHON_STACK_WORKSHOP: SourceVideo = {
  youtubeId: "DaSHOfDQI9E",
  name: "Designing the Tech Stack of your (Hackathon) Product [Workshop]",
  description:
    "How to decide which parts of a hackathon product to build and which to borrow: the three layers every product has, a zero-cost stack, choosing WhatsApp infrastructure, and what the tools cost once the free tier ends.",
  uploadDate: "2026-06-03",
  durationSeconds: 4286,
  inLanguage: "es",
  chapters: [
    { name: "Why your stack choice decides a hackathon", startOffset: 564 },
    { name: "The three layers of a product", startOffset: 802 },
    { name: "Four questions before building anything", startOffset: 908 },
    { name: "The zero-cost stack we recommend", startOffset: 1033 },
    { name: "UI, landing pages, and what judges see first", startOffset: 1126 },
    { name: "Authentication, and when to build it yourself", startOffset: 1355 },
    { name: "Where your data lives: Postgres, Redis, vectors, files", startOffset: 1508 },
    { name: "Adding AI: models, gateways, embeddings, evals", startOffset: 1695 },
    { name: "Building on WhatsApp: official API or web wrapper", startOffset: 1880 },
    { name: "Long running tasks and background jobs", startOffset: 2211 },
    { name: "The small details that make a product feel real", startOffset: 2319 },
    { name: "Deploy on day one, not at 4am", startOffset: 2399 },
    { name: "Stack recommendations by product type", startOffset: 2506 },
    { name: "What to avoid during a hackathon", startOffset: 2694 },
    { name: "How to choose a tool", startOffset: 2985 },
    { name: "Before you start coding", startOffset: 3134 },
    { name: "Q&A: timing, pitching, and what this costs at scale", startOffset: 3247 },
  ],
}

export const sourceVideos: Record<string, SourceVideo> = {
  "build-the-magic-borrow-the-rest": HACKATHON_STACK_WORKSHOP,
  "what-the-free-tier-costs-when-it-stops-being-free": HACKATHON_STACK_WORKSHOP,
  "two-ways-to-build-on-whatsapp": HACKATHON_STACK_WORKSHOP,
  "pick-tools-your-coding-agent-already-knows": HACKATHON_STACK_WORKSHOP,
}

function videoNodeId(video: SourceVideo): string {
  return `https://www.youtube.com/watch?v=${video.youtubeId}#video`
}

/** A reference to a video node, for a post that cites one but does not own it. */
export function videoRef(video: SourceVideo) {
  return { "@id": videoNodeId(video) }
}

export function videoObjectSchema(video: SourceVideo) {
  const url = `https://www.youtube.com/watch?v=${video.youtubeId}`
  const { chapters } = video

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": videoNodeId(video),
    name: video.name,
    description: video.description,
    url,
    // Consumers fetch the thumbnail rather than the page, so it has to be an
    // absolute image URL. YouTube serves one per id at a stable address.
    thumbnailUrl: `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    uploadDate: instant(video.uploadDate),
    duration: isoDuration(video.durationSeconds),
    inLanguage: video.inLanguage,
    publisher: organizationRef,
    // Chapters, which is what a search engine turns into key moments and what
    // lets a model cite the minute a claim was made rather than the whole hour.
    hasPart: chapters.map((chapter, index) => ({
      "@type": "Clip" as const,
      name: chapter.name,
      startOffset: chapter.startOffset,
      endOffset: chapters[index + 1]?.startOffset ?? video.durationSeconds,
      url: `${url}&t=${chapter.startOffset}s`,
    })),
  }
}

export function blogPostingSchema({
  post,
  authors,
  locale,
  url,
  imageUrl,
  video,
}: {
  post: { title: string; summary: string; date: string; updated?: string; kind: string }
  authors: readonly BlogAuthorNode[]
  locale: Locale
  url: string
  imageUrl: string
  /** The talk this post was written from, when there is one. */
  video?: SourceVideo
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.summary,
    url,
    datePublished: instant(post.date),
    dateModified: instant(post.updated ?? post.date),
    image: imageUrl,
    inLanguage: locale,
    articleSection: post.kind,
    author: authorNodes(authors, locale),
    publisher: organizationRef,
    isPartOf: { "@id": blogId(locale) },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(video ? { video: videoRef(video) } : {}),
  }
}

export function blogIndexSchema({
  locale,
  url,
  posts,
  title,
  description,
}: {
  locale: Locale
  url: string
  posts: readonly { title: string; url: string }[]
  title: string
  description: string
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": blogId(locale) },
      },
      {
        "@type": "Blog",
        "@id": blogId(locale),
        name: `${siteConfig.name} Blog`,
        description,
        url: localizedUrl("/blog", locale),
        inLanguage: locale,
        publisher: organizationRef,
      },
      {
        "@type": "ItemList",
        "@id": `${url}#posts`,
        numberOfItems: posts.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: post.url,
          name: post.title,
        })),
      },
    ],
  }
}

/**
 * Changelog schemas. An entry is an `Article` section of the changelog
 * `CollectionPage`; its crafters resolve to the same Person nodes as the
 * blog's bylines and the team profiles.
 */
export function changelogIndexSchema({
  locale,
  url,
  title,
  description,
  entries,
}: {
  locale: Locale
  url: string
  title: string
  description: string
  entries: readonly { title: string; url: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#entries`,
        numberOfItems: entries.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: entries.map((entry, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: entry.url,
          name: entry.title,
        })),
      },
    ],
  }
}

export function changelogEntrySchema({
  entry,
  crafters,
  locale,
  url,
  imageUrl,
}: {
  entry: { title: string; summary: string; date: string; area: string; evidence: readonly string[] }
  crafters: readonly BlogAuthorNode[]
  locale: Locale
  url: string
  imageUrl: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#entry`,
    headline: entry.title,
    description: entry.summary,
    url,
    datePublished: instant(entry.date),
    dateModified: instant(entry.date),
    image: imageUrl,
    inLanguage: locale,
    articleSection: entry.area,
    ...(crafters.length > 0 ? { author: authorNodes(crafters, locale) } : {}),
    publisher: organizationRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(entry.evidence.length > 0 ? { citation: [...entry.evidence] } : {}),
  }
}

export type ShipSchemaInput = {
  name: string
  description: string
  slug: string
  imageUrl: string
  owner: { handle: string; displayName: string }
  links: { type: string; url: string }[]
  socialPostUrl: string | null
  publishedAt: string
  modifiedAt: string
}

/**
 * A community Ship. SoftwareSourceCode when it has a repository link (Google asks for offers or
 * ratings on SoftwareApplication, which a Ship has neither of), else a CreativeWork. Optional fields
 * are left out rather than emitted empty.
 */
export function shipSchema(ship: ShipSchemaInput, locale: Locale) {
  const repository = ship.links.find((link) => link.type === "repository")?.url
  const sameAs = [...new Set([...ship.links.map((link) => link.url), ...(ship.socialPostUrl ? [ship.socialPostUrl] : [])])]
  return {
    "@context": "https://schema.org",
    "@type": repository ? "SoftwareSourceCode" : "CreativeWork",
    name: ship.name,
    description: ship.description,
    url: localizedUrl(`/ships/${ship.slug}`, locale),
    image: ship.imageUrl,
    author: { "@type": "Person", name: ship.owner.displayName, url: localizedUrl(`/crafters/${ship.owner.handle}`, locale) },
    publisher: organizationRef,
    datePublished: ship.publishedAt,
    dateModified: ship.modifiedAt,
    ...(repository ? { codeRepository: repository } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

export type CrafterSchemaInput = {
  handle: string
  displayName: string
  bio: string | null
  currentRole: string | null
  avatarUrl: string | null
  createdAt: string
  links: (string | null | undefined)[]
}

/** A community Crafter profile as a ProfilePage whose main entity is the Person. */
export function crafterSchema(member: CrafterSchemaInput, locale: Locale) {
  const profileUrl = localizedUrl(`/crafters/${member.handle}`, locale)
  const sameAs = [...new Set(member.links.filter((link): link is string => Boolean(link)))]
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileUrl,
    dateCreated: member.createdAt,
    mainEntity: {
      "@type": "Person",
      "@id": `${profileUrl}#person`,
      name: member.displayName,
      alternateName: member.handle,
      url: profileUrl,
      ...(member.currentRole ? { jobTitle: member.currentRole } : {}),
      ...(member.bio ? { description: member.bio } : {}),
      ...(member.avatarUrl ? { image: member.avatarUrl } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
      memberOf: organizationRef,
    },
  }
}

export type EventSchemaInput = {
  name: string
  url: string
  description?: string
  startsAt?: string
  endsAt?: string
  image?: string
  venue?: string
  /** Address parts exactly as the catalog states them. */
  streetAddress?: string
  locality?: string
  /** Where the event is registered; the free offer points here. */
  registerUrl?: string
}

/** An in-person, free event run by the organization. Fields the catalog does not have are omitted. */
export function eventSchema(event: EventSchemaInput) {
  const { venue, streetAddress, locality } = event
  const address = streetAddress || locality
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    url: event.url,
    ...(event.description ? { description: event.description } : {}),
    ...(event.startsAt ? { startDate: event.startsAt } : {}),
    ...(event.endsAt ? { endDate: event.endsAt } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(venue || address
      ? {
          location: {
            "@type": "Place",
            ...(venue ? { name: venue } : {}),
            ...(address
              ? {
                  address: {
                    "@type": "PostalAddress",
                    ...(streetAddress ? { streetAddress } : {}),
                    ...(locality ? { addressLocality: locality } : {}),
                  },
                }
              : {}),
          },
        }
      : {}),
    ...(event.image ? { image: [event.image] } : {}),
    organizer: organizationRef,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PEN",
      url: event.registerUrl ?? event.url,
    },
  }
}

/** An Event for a hackathon Crafter Station organized or co-organized. */
export function hackathonSchema(hackathon: Hackathon, locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: hackathon.name,
    url: localizedUrl(`/events/hackathons/${hackathon.slug}`, locale),
    description,
    startDate: hackathon.startDate,
    ...(hackathon.endDate ? { endDate: hackathon.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: hackathon.places.map((name) => ({
      "@type": "Place",
      name,
      ...(hackathon.country ? { address: { "@type": "PostalAddress", addressCountry: hackathon.country } } : {}),
    })),
    organizer: organizationRef,
    ...(hackathon.officialUrl ? { sameAs: hackathon.officialUrl } : {}),
    ...(hackathon.judges
      ? {
          contributor: hackathon.judges.map((judge) => ({
            "@type": "Person",
            name: judge.name,
            jobTitle: judge.role,
          })),
        }
      : {}),
  }
}
