import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadHero } from "@/components/hot-reload-hero"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { findEdition, hotReloadStatus, ordersOpen } from "@/lib/hot-reload"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import { getEventMenu } from "@/lib/event-menu"
import { hotReloadMetadata } from "@/lib/hot-reload-seo"
import { isLocale, withLocale } from "@/lib/i18n"
import { HACK0_CALENDAR_URL } from "@/lib/hack0-calendar-data"

export const dynamic = "force-dynamic"

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  return isLocale(lang) && edition ? hotReloadMetadata(lang, edition) : {}
}

export default async function Page({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  if (!isLocale(lang) || !edition) notFound()
  const t = hotReloadCopy[lang]
  const status = hotReloadStatus(edition)

  return (
    <HotReloadTheme>
      <HotReloadHero
        locale={lang}
        crumbs={[
          { label: t.agenda, href: "/events" },
          { label: "Hot Reload", href: "/events/hot-reload" },
          { label: `#${edition.number}` },
        ]}
        title={hotReloadText(t.edition, { number: String(edition.number).padStart(2, "0") })}
        description={edition.description?.[lang] ?? t.editionDescription}
        edition={edition}
      >
        {getEventMenu(edition) && edition.lumaEventId ? (
          <Link href={withLocale(`/events/hot-reload/${edition.number}/menu`, lang)} className="station-button">
            {ordersOpen(edition) ? t.menu : t.viewOrder}
          </Link>
        ) : null}
        <a href={edition.lumaUrl ?? HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="station-text-link">
          {edition.lumaUrl ? status === "upcoming" ? t.register : t.viewEvent : t.calendar}
        </a>
      </HotReloadHero>
      {edition.announcements?.length ? (
        <section aria-labelledby="hot-reload-posts">
          <h2 id="hot-reload-posts" className="text-2xl">
            {t.announcements}
          </h2>
          <div className="hot-reload-posts">
            {edition.announcements.map((post) => (
              <a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{post.author}</span>
                  <span className="block text-sm text-muted-foreground">{post.role}</span>
                </span>
                <span className="station-label text-muted-foreground">{t.linkedin} ↗</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </HotReloadTheme>
  )
}
