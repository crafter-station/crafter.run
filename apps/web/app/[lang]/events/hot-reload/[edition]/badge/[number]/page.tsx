import { currentUser } from "@clerk/nextjs/server"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadBadgeShare } from "@/components/hot-reload-badge-share"
import { HotReloadBadgeView } from "@/components/hot-reload-badge-view"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { findEdition } from "@/lib/hot-reload"
import { editionBadge, isBadgeVariant } from "@/lib/hot-reload-badge"
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
  const badgeDesign = editionBadge(edition)!
  const t = hotReloadCopy[lang]
  const b = hotReloadBadgeCopy[lang]
  const user = await currentUser()
  const number = String(badge.number).padStart(3, "0")
  const values = { name: badge.name, number, edition: edition.number, city: edition.city }
  const path = `/${lang}/events/hot-reload/${edition.number}/badge`

  return (
    <HotReloadTheme locale={lang} fit>
      <section className="hot-reload-badge-page" data-editor="">
        <HotReloadBadgeView
          design={badgeDesign.design}
          prints={{ front: badgeImagePath(badge, "front"), back: badgeImagePath(badge, "back") }}
          variant={isBadgeVariant(badge.variant) ? badge.variant : "a"}
          name={badge.name}
          labels={b}
        >
          <header className="hot-reload-badge-head">
            <nav aria-label={t.agenda} className="hot-reload-caps hot-reload-crumbs">
              <Link href={withLocale("/events", lang)}>{t.agenda}</Link> / <Link href={withLocale("/events/hot-reload", lang)}>Hot Reload</Link> /{" "}
              <Link href={withLocale(`/events/hot-reload/${edition.number}`, lang)}>#{edition.number}</Link> / <span aria-current="page">Nº {number}</span>
            </nav>
            <h1>{badge.name}</h1>
          </header>
          <HotReloadBadgeShare
            url={`https://crafter.run${path}/${badge.number}`}
            image={badgeImagePath(badge, "front")}
            fileName={`hot-reload-${edition.number}-${number}.jpg`}
            text={hotReloadText(b.shareText, values)}
            linkedInText={hotReloadText(b.shareTextLinkedIn, values)}
            editPath={user?.id === badge.clerkUserId ? path : null}
            description={hotReloadText(b.shareDescription, values)}
            labels={b}
          />
        </HotReloadBadgeView>
      </section>
    </HotReloadTheme>
  )
}
