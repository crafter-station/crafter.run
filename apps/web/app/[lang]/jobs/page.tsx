import Image from "next/image"
import { notFound } from "next/navigation"
import type { MemberProfile, ShipSummary } from "@crafter/contracts"

import { HomeHead } from "@/components/home-head"
import { LocalizedLink } from "@/components/localized-link"
import { PostRoleForm } from "@/components/post-role-form"
import { isLocale, locales } from "@/lib/i18n"
import { jobsCopy } from "@/lib/jobs-copy"
import { pageMetadata } from "@/lib/seo"
import { listAllShips, listCrafters } from "@/lib/ships"

export const revalidate = 3600
export const dynamicParams = false

const VISIBLE_ROLES = 3
const VISIBLE_SHIPS = 2

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/jobs", namespace: "pages.jobs" })
}

function shipsByOwner(ships: ShipSummary[]) {
  const byOwner = new Map<string, ShipSummary[]>()
  for (const ship of ships) byOwner.set(ship.owner.handle, [...(byOwner.get(ship.owner.handle) ?? []), ship])
  for (const list of byOwner.values()) {
    list.sort((a, b) => Date.parse(b.lastActivityAt ?? b.publishedAt) - Date.parse(a.lastActivityAt ?? a.publishedAt))
  }
  return byOwner
}

/** Hire LATAM builders: companies post a role by email, and see the builders who are open to work with their Ships. */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = jobsCopy[lang]

  const [members, shipsPage] = await Promise.all([listCrafters({ revalidate }), listAllShips({ revalidate })])
  const byOwner = shipsByOwner(shipsPage?.ships ?? [])
  const open: MemberProfile[] = (members ?? [])
    .filter((member) => member.isJobSeeking)
    .sort((a, b) => (byOwner.get(b.handle)?.length ?? 0) - (byOwner.get(a.handle)?.length ?? 0))

  return (
    <main className="station-home jobs flex-1">
      <section className="inner-hero" aria-labelledby="jobs-title">
        <p className="home-label">{t.label}</p>
        <div className="inner-hero-grid">
          <h1 id="jobs-title">{t.claim}</h1>
          <div className="inner-hero-side">
            <p>{t.lede}</p>
            <div className="inner-hero-actions">
              <a href="#post-a-role" className="hero-cta">{t.post}</a>
              <LocalizedLink href="/services#open-source" locale={lang} className="hero-cta-ghost">{t.bounty}</LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      <section id="open-to-work" className="jobs-open" aria-labelledby="jobs-open-title">
        <HomeHead id="jobs-open-title" index={1} label={t.openLabel} title={t.openTitle} lede={t.openLede}>
          {open.length > 0 ? <span className="home-label">{t.openCount(open.length)}</span> : null}
        </HomeHead>
        {open.length === 0 ? (
          <div className="jobs-empty home-frame">
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyBody}</p>
            <LocalizedLink href="/settings/profile" locale={lang} className="hero-cta-ghost">{t.settingsCta}</LocalizedLink>
          </div>
        ) : (
          <ul className="jobs-grid home-frame">
            {open.map((member) => {
              const ships = (byOwner.get(member.handle) ?? []).slice(0, VISIBLE_SHIPS)
              const city = member.basedLocation?.city ?? member.originLocation?.city
              const hidden = member.rolesOpenTo.length - VISIBLE_ROLES
              return (
                <li key={member.handle} className="jobs-tile">
                  <LocalizedLink href={`/crafters/${member.handle}`} locale={lang} className="jobs-person">
                    <span className="jobs-avatar">
                      {member.avatarUrl
                        ? <Image src={member.avatarUrl} alt="" fill sizes="56px" className="object-cover" />
                        : <span aria-hidden="true">{member.displayName.charAt(0).toUpperCase()}</span>}
                    </span>
                    <span className="jobs-name">
                      <strong>{member.displayName}</strong>
                      <span className="home-label-sm">@{member.handle}{city ? ` · ${city}` : ""}</span>
                    </span>
                    <span className="home-backers-arrow" aria-hidden="true">↗</span>
                    <span className="sr-only">{t.profile}</span>
                  </LocalizedLink>
                  {member.rolesOpenTo.length > 0 ? (
                    <ul className="jobs-roles" aria-label={t.openLabel}>
                      {member.rolesOpenTo.slice(0, VISIBLE_ROLES).map((role) => <li key={role}>{role}</li>)}
                      {hidden > 0 ? <li className="jobs-roles-more">{t.moreRoles(hidden)}</li> : null}
                    </ul>
                  ) : null}
                  <div className="jobs-ships">
                    <span className="home-label-sm">{t.latestShips}</span>
                    {ships.length > 0 ? (
                      <ul>
                        {ships.map((ship) => (
                          <li key={ship.slug}>
                            <LocalizedLink href={`/ships/${ship.slug}`} locale={lang}>
                              <strong>{ship.name}</strong>
                              <span>{ship.tagline}</span>
                            </LocalizedLink>
                          </li>
                        ))}
                      </ul>
                    ) : <p>{t.noShips}</p>}
                  </div>
                </li>
              )
            })}
            {[0, 1].map((i) => (
              <li key={`fill-${i}`} aria-hidden="true" className={`jobs-fill${i < (3 - (open.length % 3)) % 3 ? " fill-3" : ""}${i < (2 - (open.length % 2)) % 2 ? " fill-2" : ""}`} />
            ))}
          </ul>
        )}
      </section>

      <section id="post-a-role" className="jobs-post" aria-labelledby="jobs-post-title">
        <HomeHead id="jobs-post-title" index={2} label={t.postLabel} title={t.postTitle} lede={t.postLede}>
          <span className="home-label">{t.freeNote}</span>
        </HomeHead>
        <div className="jobs-post-grid home-frame">
          <div className="jobs-post-form">
            <PostRoleForm copy={{ fields: t.fields, submit: t.submit, sending: t.sending, sent: t.sent, errors: t.errors }} />
          </div>
          <aside className="jobs-pitch">
            <div className="jobs-pitch-item">
              <span className="home-label-sm">{t.soon}</span>
              <h3>{t.featuredTitle}</h3>
              <p>{t.featuredBody}</p>
            </div>
            <div className="jobs-pitch-item">
              <span className="home-label-sm">{t.soon}</span>
              <h3>{t.bountyTitle}</h3>
              <p>{t.bountyBody}</p>
              <LocalizedLink href="/services#open-source" locale={lang} className="jobs-pitch-link">{t.bountyCta} <span aria-hidden="true">↗</span></LocalizedLink>
            </div>
          </aside>
        </div>
      </section>

      <section id="for-builders" className="jobs-builders" aria-labelledby="jobs-builders-title">
        <HomeHead id="jobs-builders-title" index={3} label={t.buildersLabel} title={t.buildersTitle} lede={t.buildersBody}>
          <LocalizedLink href="/settings/profile" locale={lang} className="hero-cta">{t.buildersCta}</LocalizedLink>
        </HomeHead>
      </section>
    </main>
  )
}
