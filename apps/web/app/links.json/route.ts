import { defaultLocale } from "@/lib/i18n"
import { getProducts, getSiteConfig, siteConfig, socials } from "@/lib/site"
import { teamMembers } from "@/lib/team"

/**
 * Every public Crafter Station link as one JSON document: the org's socials and
 * products, and each member's own profile links.
 *
 * Built for link.crafter.run, which renders this rather than keeping its own
 * copy of the team. `list_team` in the MCP server exposes only `github` and
 * `website`, which is not enough to build a link-in-bio from — half the team
 * would show one link and Liz would show none.
 *
 * Deliberately omits `email`. Two members have one and one of them is a
 * personal Gmail; a JSON endpoint is a meaningfully bigger exposure than a
 * TypeScript file, and nobody needs an inbox to follow a profile.
 */
export const dynamic = "force-static"

const LINK_KINDS = ["website", "github", "x", "linkedin", "instagram", "cal"] as const

export async function GET() {
  const locale = defaultLocale
  const site = getSiteConfig(locale)

  const body = {
    generatedAt: new Date().toISOString(),
    source: "https://github.com/crafter-station/crafter.run",
    org: {
      name: site.name,
      tagline: site.tagline,
      url: site.url,
      socials: socials.map((social) => ({ label: social.label, href: social.href })),
      products: getProducts(locale)
        .filter((product) => Boolean(product.url))
        .map((product) => ({
          slug: product.slug,
          title: product.title,
          tagline: product.tagline,
          url: product.url,
          ...("sourceUrl" in product && product.sourceUrl ? { sourceUrl: product.sourceUrl } : {}),
        })),
    },
    members: teamMembers.map((member) => ({
      username: member.username,
      name: member.name,
      role: member.role,
      location: member.location ?? null,
      image: member.image ? `${siteConfig.url}${member.image}` : null,
      url: `${siteConfig.url}/${locale}/team/${member.username}`,
      joinedYear: member.joinedYear ?? null,
      // Ordered most- to least-identifying, so a consumer can truncate from the
      // end without dropping someone's primary presence.
      links: LINK_KINDS.flatMap((kind) => {
        const href = member[kind]
        return href ? [{ kind, href }] : []
      }),
    })),
  }

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
