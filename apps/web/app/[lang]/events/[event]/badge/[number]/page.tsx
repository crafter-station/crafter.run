import { currentUser } from "@clerk/nextjs/server"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { EventBadgeTheme } from "@/components/event-badge-theme"
import { HotReloadBadgeShare } from "@/components/hot-reload-badge-share"
import { MakeablesWall } from "@/components/hot-reload-badge-stage"
import { HotReloadBadgeView } from "@/components/hot-reload-badge-view"
import { findAccessEvent } from "@/lib/access-events"
import { findEventBadge } from "@/lib/event-badge"
import { eventBadgeCopy } from "@/lib/event-badge-copy"
import { eventBadgeImagePath, getEventBadgeByNumber } from "@/lib/event-badge-store"
import { isBadgeVariant } from "@/lib/hot-reload-badge"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import { isLocale, withLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"

type Params = Promise<{ lang: string; event: string; number: string }>

async function load(params: Params) {
  const { lang, event: slug, number } = await params
  const event = findAccessEvent(slug)
  const design = event && findEventBadge(event.slug)
  if (!isLocale(lang) || !event || !design || !/^\d+$/.test(number)) return null
  const badge = await getEventBadgeByNumber(event.slug, Number(number))
  return badge ? { lang, event, design, badge } : null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await load(params)
  if (!found) return { robots: { index: false } }
  const { lang, design, badge } = found
  const b = eventBadgeCopy(lang, design.name)
  const values = { name: badge.name, number: String(badge.number).padStart(3, "0") }
  const title = hotReloadText(b.shareTitle, values)
  const description = hotReloadText(b.shareDescription, values)
  const image = { url: `https://crafter.run${eventBadgeImagePath(badge, "front")}`, width: 1024, height: 1536, alt: title }
  return {
    title, description, robots: { index: false },
    openGraph: { title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const found = await load(params)
  if (!found) notFound()
  const { lang, event, design, badge } = found
  const t = hotReloadCopy[lang]
  const b = eventBadgeCopy(lang, design.name)
  const user = await currentUser()
  const number = String(badge.number).padStart(3, "0")
  const values = { name: badge.name, number }
  const path = `/${lang}/events/${event.slug}/badge`

  return (
    <EventBadgeTheme locale={lang} event={event} fit>
      <MakeablesWall />
      <section className="hot-reload-badge-page" data-editor="">
        <HotReloadBadgeView
          design={design.design}
          prints={{ front: eventBadgeImagePath(badge, "front"), back: eventBadgeImagePath(badge, "back") }}
          variant={isBadgeVariant(badge.variant) ? badge.variant : "a"}
          variants={design.variants}
          name={badge.name}
          labels={b}
        >
          <header className="hot-reload-badge-head">
            <nav aria-label={t.agenda} className="hot-reload-caps hot-reload-crumbs">
              <Link href={withLocale("/events", lang)}>{t.agenda}</Link> / <Link href={withLocale(`/events/${event.slug}`, lang)}>{design.name}</Link> /{" "}
              <span aria-current="page">Nº {number}</span>
            </nav>
            <h1>{badge.name}</h1>
          </header>
          <HotReloadBadgeShare
            url={`https://crafter.run${path}/${badge.number}`}
            image={eventBadgeImagePath(badge, "front")}
            fileName={`${event.slug}-${number}.jpg`}
            text={hotReloadText(b.shareText, values)}
            linkedInText={hotReloadText(b.shareTextLinkedIn, values)}
            editPath={user?.id === badge.clerkUserId ? path : null}
            description={hotReloadText(b.shareDescription, values)}
            labels={b}
          />
        </HotReloadBadgeView>
      </section>
    </EventBadgeTheme>
  )
}
