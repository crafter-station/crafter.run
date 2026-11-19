import type { ShipDetail, ShipLink } from "@crafter/contracts"
import { shipTone } from "@/lib/ship-tone-server"
import { ArrowUpRight, Github, Globe, MessageCircle, Package, Play, Plus, Share2 } from "lucide-react"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { BandChrome } from "@/components/blog/band-chrome"
import { ShipUpvote } from "@/components/ship-upvote"
import { ShipCover } from "@/components/ships/ship-cover"
import { ShipMarkdown } from "@/components/ships/ship-markdown"
import { MakerAvatar } from "@/components/ships/ship-meta"
import { ShipOwnerTools } from "@/components/ships/ship-owner-tools"
import { ShipTimeline } from "@/components/ships/ship-timeline"
import { ShipUpdateComposer } from "@/components/ships/ship-update-composer"
import { isLocale, type Locale } from "@/lib/i18n"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, buildMetadata, communityLocales, ogImageUrl } from "@/lib/seo"
import { crafterAffiliation, relativeTime } from "@/lib/ship-activity"
import { shipDetailCopy } from "@/lib/ship-detail-copy"
import { shipMetaDescription } from "@/lib/ship-markdown"
import { breadcrumbList, shipSchema } from "@/lib/structured-data"
import { getCrafterProfile, getPublishedShip, listPublishedShips } from "@/lib/ships"

// Public ship data is cached for an hour; owner-only controls are client components, so the HTML is the same for everyone.
export const revalidate = 3600
// Ships and crafters are created at runtime, so unknown params render on demand.
export const dynamicParams = true

// No pages are built ahead of time: each is rendered on first request, then cached. New ones need no deploy.
export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const ship = await getPublishedShip(slug, { revalidate })
  if (!ship) return {}
  const path = `/ships/${ship.slug}`
  const description = shipMetaDescription(ship.tagline, ship.description)
  return buildMetadata({
    locale: lang, path, title: ship.name, description, indexLocales: communityLocales,
    image: { url: ogImageUrl(ship.name, lang, undefined, { path, description: ship.tagline }), alt: `${ship.name}: ${ship.tagline}` },
  })
}

const linkIcons: Record<ShipLink["type"], ReactNode> = {
  repository: <Github aria-hidden="true" />,
  website: <Globe aria-hidden="true" />,
  demo: <Play aria-hidden="true" />,
  package: <Package aria-hidden="true" />,
  social: <Share2 aria-hidden="true" />,
}

type ActionLink = { key: string; url: string; type: ShipLink["type"] | "post"; label: string; icon: ReactNode }

/** The site (or demo) is the primary action; repository, package and posts follow. */
function actionLinks(ship: ShipDetail, t: (typeof shipDetailCopy)[Locale]): { primary: ActionLink | null; rest: ActionLink[] } {
  const label = { website: t.visit, demo: t.demo, repository: t.repository, package: t.package, social: t.post }
  const all: ActionLink[] = ship.links.map((link) => ({
    key: `${link.type}-${link.url}`, url: link.url, type: link.type, label: label[link.type], icon: linkIcons[link.type],
  }))
  if (ship.socialPostUrl && !all.some((link) => link.url === ship.socialPostUrl)) {
    all.push({ key: `post-${ship.socialPostUrl}`, url: ship.socialPostUrl, type: "post", label: t.post, icon: linkIcons.social })
  }
  const primary = all.find((link) => link.type === "website") ?? all.find((link) => link.type === "demo") ?? null
  const order = ["repository", "package", "demo", "social", "post", "website"]
  const rest = all.filter((link) => link !== primary).sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type))
  return { primary, rest }
}

export default async function ShipPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const ship = await getPublishedShip(slug, { revalidate })
  if (!ship) notFound()

  const [site, profile, ownerShips] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.ships" }),
    getCrafterProfile(ship.owner.handle, { revalidate }),
    listPublishedShips({ handle: ship.owner.handle, revalidate }),
  ])
  const t = shipDetailCopy[lang]
  const now = Date.now()
  const affiliation = crafterAffiliation({ handle: ship.owner.handle, githubUrl: profile?.githubUrl ?? null })
  const others = (ownerShips ?? []).filter((other) => other.id !== ship.id).slice(0, 3)
  const publishedAt = ship.publishedAt ?? ship.createdAt
  const publishedLabel = t.published.replace("{date}", new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date(publishedAt)))
  const { primary, rest } = actionLinks(ship, t)
  // A prefilled message for the community WhatsApp group: the web is the source, the group is distribution.
  const shareText = `${ship.name}: ${ship.tagline}\nhttps://crafter.run/${lang}/ships/${ship.slug}`
  const chip = affiliation ? <span className="ship-chip" data-kind={affiliation}>{site(affiliation)}</span> : null

  const modifiedAt = [ship.updatedAt, ...ship.updates.map((update) => update.publishedAt)].sort().at(-1) ?? publishedAt
  const schema = shipSchema({
    name: ship.name,
    description: shipMetaDescription(ship.tagline, ship.description),
    slug: ship.slug,
    imageUrl: ship.imageUrl ?? absoluteUrl(ogImageUrl(ship.name, lang, undefined, { path: `/ships/${ship.slug}`, description: ship.tagline })),
    owner: ship.owner,
    links: ship.links,
    socialPostUrl: ship.socialPostUrl,
    publishedAt,
    modifiedAt,
  }, lang)
  const tone = await shipTone(ship)

  return (
    <main className="journal-page ships-page ship-detail" data-tone={tone}>
      <JsonLd data={[schema, breadcrumbList(lang, [{ name: t.crumb, path: "/ships" }, { name: ship.name, path: `/ships/${ship.slug}` }])]} />
      <BandChrome />
      <header className="journal-band ships-band ship-hero">
        <div className="ships-band-grid ship-hero-grid">
          <div className="ships-band-copy">
            <nav aria-label="Breadcrumb" className="journal-band-crumbs">
              <Link href={`/${lang}/ships`}>{t.crumb}</Link>
            </nav>
            <h1>{ship.name}</h1>
            <p className="journal-band-summary">{ship.tagline}</p>
            <p className="ship-hero-maker">
              <Link href={`/${lang}/crafters/${ship.owner.handle}`}>
                <MakerAvatar owner={ship.owner} />
                <span>{ship.owner.displayName}</span>
              </Link>
              {chip}
              <time dateTime={publishedAt} title={publishedLabel}>{relativeTime(publishedAt, lang, now)}</time>
            </p>
            <div className="ship-actions">
              {primary ? (
                <a href={primary.url} target="_blank" rel="ugc nofollow noopener noreferrer" className="ships-button ships-button-band">
                  {primary.icon}
                  {primary.label}
                  <ArrowUpRight className="ship-actions-out" aria-hidden="true" />
                </a>
              ) : null}
              {rest.map((link) => (
                <a key={link.key} href={link.url} target="_blank" rel="ugc nofollow noopener noreferrer" className="ships-button ships-button-quiet">
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
            <div className="ship-actions ship-actions-social">
              <ShipUpvote shipId={ship.id} slug={ship.slug} initialVoteCount={ship.voteCount} locale={lang} variant="pill" />
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="ships-band-link">
                <MessageCircle aria-hidden="true" />
                {t.share}
              </a>
            </div>
          </div>
          <div className="ship-hero-cover">
            <ShipCover name={ship.name} imageUrl={ship.imageUrl} eager />
          </div>
        </div>
      </header>

      <div className="ship-body">
        <div className="ship-main">
          <article aria-labelledby="ship-about-title">
            <h2 id="ship-about-title" className="ship-section-label">{t.about}</h2>
            <ShipMarkdown source={ship.description} />
          </article>

          <div className="ship-made-by">
            <section className="ship-maker" aria-label={t.maker}>
              <p className="station-label">{t.maker}</p>
              <Link href={`/${lang}/crafters/${ship.owner.handle}`} className="ship-maker-head">
                <MakerAvatar owner={ship.owner} />
                <span className="ship-maker-who">
                  <strong>{ship.owner.displayName}</strong>
                  <small>@{ship.owner.handle}</small>
                </span>
                {chip}
              </Link>
              {profile?.bio ? <p className="ship-maker-bio">{profile.bio}</p> : null}
              <Link href={`/${lang}/crafters/${ship.owner.handle}`} className="ship-inline-link">
                {t.profile}
                <ArrowUpRight aria-hidden="true" />
              </Link>
              {others.length > 0 ? (
                <div className="ship-maker-more">
                  <h2>{t.moreFrom.replace("{name}", ship.owner.displayName)}</h2>
                  <ul>
                    {others.map((other) => (
                      <li key={other.id}>
                        <Link href={`/${lang}/ships/${other.slug}`}>
                          <span className="ship-maker-thumb"><ShipCover name={other.name} imageUrl={other.imageUrl} /></span>
                          <span>
                            <strong>{other.name}</strong>
                            <small>{other.tagline}</small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
            <ShipOwnerTools locale={lang} ownerHandle={ship.owner.handle} slug={ship.slug} copy={t} />
          </div>

          <section className="ship-updates" aria-labelledby="ship-updates-title">
            <header>
              <div>
                <h2 id="ship-updates-title">{t.updates}</h2>
                <p>{t.updatesLead}</p>
              </div>
              {ship.updates.length > 0 ? <span className="ship-updates-count">{ship.updates.length}</span> : null}
            </header>
            <ShipUpdateComposer ownerHandle={ship.owner.handle} slug={ship.slug} copy={t.composer} />
            {ship.updates.length === 0 ? (
              <p className="ship-updates-empty">{t.noUpdates}</p>
            ) : (
              <ShipTimeline updates={ship.updates} locale={lang} now={now} socialLabel={t.updateSocial} />
            )}
          </section>
        </div>

      </div>

      <section className="ships-cta ship-cta" aria-labelledby="ship-cta-title">
        <div className="ships-cta-copy">
          <p className="station-label">{site("ctaEyebrow")}</p>
          <h2 id="ship-cta-title">{site("ctaTitle")}</h2>
          <p>{site("ctaLead")}</p>
          <Link href={`/${lang}/ships/new`} className="ships-button ships-button-band">
            <Plus aria-hidden="true" />
            {site("publish")}
          </Link>
        </div>
      </section>
    </main>
  )
}
