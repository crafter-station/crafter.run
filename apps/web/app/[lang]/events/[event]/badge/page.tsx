import Link from "next/link"
import { notFound } from "next/navigation"

import { EventBadgeTheme } from "@/components/event-badge-theme"
import { HotReloadBadgeEditor } from "@/components/hot-reload-badge-editor"
import { MakeablesWall } from "@/components/hot-reload-badge-stage"
import { LinkLumaEmail } from "@/components/link-luma-email"
import { isAdminUser } from "@/lib/admin"
import { findAccessEvent } from "@/lib/access-events"
import { findEventBadge } from "@/lib/event-badge"
import { eventBadgeCopy } from "@/lib/event-badge-copy"
import { getUserEventBadge } from "@/lib/event-badge-store"
import { getEventGuest } from "@/lib/event-guest"
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
  const { user, emails, check } = await getEventGuest(event.lumaEventId, event.lumaCalendar)

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
  } else if (check?.status === "approved") {
    const saved = await getUserEventBadge(event.slug, user.id)
    editing = true
    content = (
      <HotReloadBadgeEditor
        badge={badge}
        variants={badge.variants}
        placeholderPortrait={badge.placeholder}
        portrait={user.hasImage ? user.imageUrl : null}
        person={{
          name: saved?.name ?? check.name ?? [user.firstName, user.lastName].filter(Boolean).join(" "),
          role: b.role,
          eventName: badge.name,
        }}
        claim={claimEventBadge.bind(null, event.slug)}
        upload={uploadEventBadge.bind(null, event.slug)}
        number={saved?.number ?? null}
        variant={isBadgeVariant(saved?.variant) ? saved.variant : "a"}
        badgeUrl={`https://crafter.run${path}`}
        // Same rule as the server action: checked in, or the event has started.
        stampLocked={check.checkedIn || isAdminUser(user) || Date.now() >= Date.parse(event.startsAt)
          ? null
          : hotReloadText(b.stampLocked, { date: new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", timeZone: event.timeZone }).format(new Date(event.startsAt)) })}
        labels={b}
      >
        {head}
        <p className="hot-reload-badge-hint">{b.intro}</p>
      </HotReloadBadgeEditor>
    )
  } else if (check?.status === "not-approved") {
    content = <Notice title={t.pendingTitle}>
      <p>{hotReloadText(t.pendingGuest, { email: check.email })}</p>
      <LinkLumaEmail locale={lang} />
    </Notice>
  } else if (check?.status === "not-found") {
    content = (
      <Notice title={t.missingTitle}>
        <p>{hotReloadText(t.missingGuest, { emails: emails?.join(", ") ?? "" })}</p>
        <a className="mt-3 inline-block underline underline-offset-4" href={event.lumaUrl} target="_blank" rel="noopener noreferrer">{t.requestSpot}</a>
        <LinkLumaEmail locale={lang} />
      </Notice>
    )
  } else {
    content = <Notice title={t.unavailableTitle}>
      <p>{t.unavailableBody}</p>
      <a className="mt-3 inline-block underline underline-offset-4" href={path}>{t.checkAgain}</a>
      <LinkLumaEmail locale={lang} />
    </Notice>
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
