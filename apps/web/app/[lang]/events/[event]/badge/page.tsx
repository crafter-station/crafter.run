import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { notFound } from "next/navigation"

import { EventBadgeTheme } from "@/components/event-badge-theme"
import { HotReloadBadgeEditor } from "@/components/hot-reload-badge-editor"
import { MakeablesWall } from "@/components/hot-reload-badge-stage"
import { isAdminUser } from "@/lib/admin"
import { findAccessEvent } from "@/lib/access-events"
import { findEventBadge } from "@/lib/event-badge"
import { eventBadgeCopy } from "@/lib/event-badge-copy"
import { getUserEventBadge } from "@/lib/event-badge-store"
import { readAttendance } from "@/lib/event-credits"
import { eventCreditsCopy } from "@/lib/event-credits-copy"
import { isBadgeVariant } from "@/lib/hot-reload-badge"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import { isLocale, withLocale } from "@/lib/i18n"
import { claimEventBadge, uploadEventBadge } from "./actions"

export const dynamic = "force-dynamic"
export const metadata = { robots: { index: false } }

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="hot-reload-ticket">
      <h2>{title}</h2>
      <div className="hot-reload-ticket-body">{children}</div>
    </div>
  )
}

export default async function Page({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  const badge = event && findEventBadge(event.slug)
  if (!isLocale(lang) || !event || !badge) notFound()
  const t = hotReloadCopy[lang]
  const b = eventBadgeCopy(lang, badge.name)
  const path = `/${lang}/events/${event.slug}/badge`
  const user = await currentUser()

  const head = (
    <header className="hot-reload-badge-head">
      <nav aria-label={t.agenda} className="hot-reload-caps hot-reload-crumbs">
        <Link href={withLocale("/events", lang)}>{t.agenda}</Link> / <Link href={withLocale(`/events/${event.slug}`, lang)}>{badge.name}</Link> /{" "}
        <span aria-current="page">{b.badge}</span>
      </nav>
      <h1>{b.titleLead}<br />{b.titleName}</h1>
    </header>
  )
  let editing = false
  let content: React.ReactNode
  if (!user) {
    content = (
      <Notice title={b.title}>
        <p>{b.signInBody}</p>
        <Link className="hot-reload-display hot-reload-cta" href={`/${lang}/sign-in?redirect_url=${encodeURIComponent(path)}`}>{t.signIn}</Link>
      </Notice>
    )
  } else {
    // The badge proves attendance: it unlocks once the account claimed the credit code handed out in the room.
    const attended = isAdminUser(user) ? { name: [user.firstName, user.lastName].filter(Boolean).join(" ") } : await readAttendance(event.slug, user.id).catch(() => undefined)
    if (attended === undefined) {
      content = <Notice title={t.unavailableTitle}>
        <p>{t.unavailableBody}</p>
        <a className="mt-3 inline-block underline underline-offset-4" href={path}>{t.checkAgain}</a>
      </Notice>
    } else if (!attended) {
      content = <Notice title={b.title}>
        <p>{eventCreditsCopy[lang].badgeLocked}</p>
        <Link className="hot-reload-display hot-reload-cta" href={`/${lang}/events/${event.slug}/credits`}>{eventCreditsCopy[lang].title}</Link>
      </Notice>
    } else {
      const saved = await getUserEventBadge(event.slug, user.id)
      editing = true
      content = (
        <HotReloadBadgeEditor
          badge={badge}
          variants={badge.variants}
          placeholderPortrait={badge.placeholder}
          portrait={user.hasImage ? user.imageUrl : null}
          person={{
            name: saved?.name ?? attended?.name ?? [user.firstName, user.lastName].filter(Boolean).join(" "),
            role: b.role,
            eventName: badge.name,
          }}
          claim={claimEventBadge.bind(null, event.slug)}
          upload={uploadEventBadge.bind(null, event.slug)}
          number={saved?.number ?? null}
          variant={isBadgeVariant(saved?.variant) ? saved.variant : "a"}
          badgeUrl={`https://crafter.run${path}`}
          stampLocked={null}
          labels={b}
        >
          {head}
          <p className="hot-reload-badge-hint">{b.intro}</p>
        </HotReloadBadgeEditor>
      )
    }
  }

  return (
    <EventBadgeTheme locale={lang} event={event} fit>
      <MakeablesWall />
      <section className="hot-reload-badge-page" data-editor={editing ? "" : undefined}>
        {editing ? null : head}
        {content}
      </section>
    </EventBadgeTheme>
  )
}
