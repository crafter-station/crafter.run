import { currentUser } from "@clerk/nextjs/server"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadBadgeShare } from "@/components/hot-reload-badge-share"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { findEdition } from "@/lib/hot-reload"
import { editionBadge } from "@/lib/hot-reload-badge"
import { hotReloadBadgeCopy } from "@/lib/hot-reload-badge-copy"
import { badgeImagePath, getBadgeByNumber } from "@/lib/hot-reload-badge-store"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import { isLocale, withLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"

type Params = Promise<{ lang: string; edition: string; number: string }>

async function load(params: Params) {
  const { lang, edition: editionNumber, number } = await params
  const edition = findEdition(editionNumber)
  if (!isLocale(lang) || !edition || !editionBadge(edition) || !/^\d+$/.test(number)) return null
  const badge = await getBadgeByNumber(edition.number, Number(number))
  return badge ? { lang, edition, badge } : null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await load(params)
  if (!found) return { robots: { index: false } }
  const { lang, edition, badge } = found
  const b = hotReloadBadgeCopy[lang]
  const values = { name: badge.name, number: String(badge.number).padStart(3, "0"), edition: edition.number, city: edition.city }
  const title = hotReloadText(b.shareTitle, values)
  const description = hotReloadText(b.shareDescription, values)
  const image = { url: `https://crafter.run${badgeImagePath(badge, "front")}`, width: 1024, height: 1536, alt: title }
  return {
    title, description, robots: { index: false },
    openGraph: { title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const found = await load(params)
  if (!found) notFound()
  const { lang, edition, badge } = found
  const t = hotReloadCopy[lang]
  const b = hotReloadBadgeCopy[lang]
  const user = await currentUser()
  const number = String(badge.number).padStart(3, "0")
  const values = { name: badge.name, number, edition: edition.number, city: edition.city }
  const path = `/${lang}/events/hot-reload/${edition.number}/badge`

  return (
    <HotReloadTheme locale={lang}>
      <section className="hot-reload-menu-head">
        <div className="hot-reload-edition-copy">
          <nav aria-label={t.agenda} className="hot-reload-caps hot-reload-crumbs">
            <Link href={withLocale("/events", lang)}>{t.agenda}</Link> / <Link href={withLocale("/events/hot-reload", lang)}>Hot Reload</Link> /{" "}
            <Link href={withLocale(`/events/hot-reload/${edition.number}`, lang)}>#{edition.number}</Link> / <span aria-current="page">Nº {number}</span>
          </nav>
          <h1>{badge.name}</h1>
          <p className="hot-reload-edition-body">{hotReloadText(b.shareDescription, values)}</p>
        </div>
      </section>
      <section className="hot-reload-menu-body hot-reload-badge-editor">
        <div className="hot-reload-badge-faces">
          {(["front", "back"] as const).map((side) => (
            <figure key={side}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hot-reload-badge-slot hot-reload-badge-face" src={badgeImagePath(badge, side)} width={1024} height={1536}
                alt={`${hotReloadText(b.shareTitle, values)} · ${b[side]}`} />
              <figcaption className="hot-reload-caps">{b[side]}</figcaption>
            </figure>
          ))}
        </div>
        <HotReloadBadgeShare
          url={`https://crafter.run${path}/${badge.number}`}
          image={badgeImagePath(badge, "front")}
          fileName={`hot-reload-${edition.number}-${number}.jpg`}
          text={hotReloadText(b.shareText, values)}
          linkedInText={hotReloadText(b.shareTextLinkedIn, values)}
          editPath={user?.id === badge.clerkUserId ? path : null}
          labels={b}
        />
      </section>
    </HotReloadTheme>
  )
}
