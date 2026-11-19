import type { ShipDetail, ShipLink } from "@crafter/contracts"
import { ArrowUpRight, Github, Globe, Package, Play, Share2 } from "lucide-react"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { HomeHead } from "@/components/home-head"
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

  return (
    <main className="station-home ships-page ship-detail flex-1">
      <JsonLd data={[schema, breadcrumbList(lang, [{ name: t.crumb, path: "/ships" }, { name: ship.name, path: `/ships/${ship.slug}` }])]} />
      <section className="inner-hero ship-hero" aria-labelledby="ship-title">
        <nav aria-label="Breadcrumb" className="home-label">
          <Link href={`/${lang}/ships`}>{t.crumb}</Link>
        </nav>
        <div className="inner-hero-grid">
          <h1 id="ship-title">{ship.name}</h1>
          <div className="inner-hero-side">
            <p>{ship.tagline}</p>
            <div className="inner-hero-actions">
              {primary ? (
                <a href={primary.url} target="_blank" rel="ugc nofollow noopener noreferrer" className="hero-cta">
                  {primary.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
              {rest.map((link) => (
                <a key={link.key} href={link.url} target="_blank" rel="ugc nofollow noopener noreferrer" className="hero-cta-ghost">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="inner-hero-extra">
            <div className="ship-hero-meta">
              <Link href={`/${lang}/crafters/${ship.owner.handle}`} className="ship-hero-maker">
                <MakerAvatar owner={ship.owner} />
                <span>{ship.owner.displayName}</span>
              </Link>
              {chip}
              <time className="home-label-sm" dateTime={publishedAt} title={publishedLabel}>{relativeTime(publishedAt, lang, now)}</time>
              <span className="ship-hero-meta-end">
                <ShipUpvote shipId={ship.id} slug={ship.slug} initialVoteCount={ship.voteCount} locale={lang} variant="pill" />
                <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="home-secondary-link">{t.share}</a>
              </span>
            </div>
            <div className="ship-hero-cover home-frame">
              <ShipCover name={ship.name} imageUrl={ship.imageUrl} eager />
            </div>
          </div>
        </div>
      </section>

      <section className="ship-body">
        <article aria-labelledby="ship-about-title">
          <h2 id="ship-about-title" className="home-label ship-section-label">{t.about}</h2>
          <ShipMarkdown source={ship.description} />
        </article>

        <div className="ship-made-by">
          <section className="ship-maker" aria-label={t.maker}>
            <p className="home-label">{t.maker}</p>
            <Link href={`/${lang}/crafters/${ship.owner.handle}`} className="ship-maker-head">
              <MakerAvatar owner={ship.owner} />
              <span className="ship-maker-who">
                <strong>{ship.owner.displayName}</strong>
                <small>@{ship.owner.handle}</small>
              </span>
              {chip}
            </Link>
            {profile?.bio ? <p className="ship-maker-bio">{profile.bio}</p> : null}
            <Link href={`/${lang}/crafters/${ship.owner.handle}`} className="home-secondary-link">
              {t.profile}
            </Link>
            {others.length > 0 ? (
              <div className="ship-maker-more">
                <h2 className="home-label">{t.moreFrom.replace("{name}", ship.owner.displayName)}</h2>
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
      </section>

      <section className="ship-updates" aria-labelledby="ship-updates-title">
        <HomeHead id="ship-updates-title" index={1} label={ship.name} title={t.updates} lede={t.updatesLead}>
          {ship.updates.length > 0 ? <span className="home-label">{site("updateCount", { count: ship.updates.length })}</span> : null}
        </HomeHead>
        <ShipUpdateComposer ownerHandle={ship.owner.handle} slug={ship.slug} copy={t.composer} />
        {ship.updates.length === 0 ? (
          <p className="ship-updates-empty">{t.noUpdates}</p>
        ) : (
          <ShipTimeline updates={ship.updates} locale={lang} now={now} socialLabel={t.updateSocial} />
        )}
      </section>

      <section className="ship-cta" aria-labelledby="ship-cta-title">
        <div className="ship-cta-box home-frame">
          <div>
            <p className="home-label">{site("ctaEyebrow")}</p>
            <h2 id="ship-cta-title">{t.ctaTitle}</h2>
            <p>{site("ctaLead")}</p>
          </div>
          <div className="ship-cta-actions">
            <Link href={`/${lang}/ships/new`} className="hero-cta">{site("publish")}</Link>
            <Link href={`/${lang}/ships`} className="home-secondary-link">{t.ctaAll}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
