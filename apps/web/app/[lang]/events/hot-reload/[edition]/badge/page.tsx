import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadBadgeEditor } from "@/components/hot-reload-badge-editor"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { LinkLumaEmail } from "@/components/link-luma-email"
import { isAdminUser } from "@/lib/admin"
import { getEventGuest } from "@/lib/event-guest"
import { findEdition } from "@/lib/hot-reload"
import { editionBadge, isBadgeVariant } from "@/lib/hot-reload-badge"
import { getUserBadge } from "@/lib/hot-reload-badge-store"
import { hotReloadBadgeCopy } from "@/lib/hot-reload-badge-copy"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import { isLocale, withLocale } from "@/lib/i18n"

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

export default async function Page({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  const badge = edition && editionBadge(edition)
  if (!isLocale(lang) || !edition || !badge || !edition.lumaEventId) notFound()
  const t = hotReloadCopy[lang]
  const b = hotReloadBadgeCopy[lang]
  const path = `/${lang}/events/hot-reload/${edition.number}/badge`
  const { user, emails, check } = await getEventGuest(edition.lumaEventId)

  const head = (
    <header className="hot-reload-badge-head">
      <nav aria-label={t.agenda} className="hot-reload-caps hot-reload-crumbs">
        <Link href={withLocale("/events", lang)}>{t.agenda}</Link> / <Link href={withLocale("/events/hot-reload", lang)}>Hot Reload</Link> /{" "}
        <Link href={withLocale(`/events/hot-reload/${edition.number}`, lang)}>#{edition.number}</Link> / <span aria-current="page">{b.badge}</span>
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
    const saved = await getUserBadge(edition.number, user.id)
    editing = true
    content = (
      <HotReloadBadgeEditor
        badge={badge}
        portrait={user.hasImage ? user.imageUrl : null}
        person={{
          name: saved?.name ?? check.name ?? [user.firstName, user.lastName].filter(Boolean).join(" "),
          role: b.role,
          eventName: `Hot Reload #${edition.number}`,
        }}
        edition={String(edition.number)}
        number={saved?.number ?? null}
        variant={isBadgeVariant(saved?.variant) ? saved.variant : "a"}
        badgeUrl={`https://crafter.run${path}`}
        // Same rule as the server action: checked in on Luma, or the edition has started.
        stampLocked={check.checkedIn || isAdminUser(user) || (edition.startsAt !== undefined && Date.now() >= Date.parse(edition.startsAt))
          ? null
          : hotReloadText(b.stampLocked, { date: edition.startsAt ? new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", timeZone: edition.timeZone }).format(new Date(edition.startsAt)) : "" })}
        labels={b}
      >
        {head}
        <p className="hot-reload-badge-hint">{hotReloadText(b.intro, { number: edition.number })}</p>
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
        {edition.lumaUrl ? <a className="mt-3 inline-block underline underline-offset-4" href={edition.lumaUrl} target="_blank" rel="noopener noreferrer">{t.requestSpot}</a> : null}
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
    <HotReloadTheme locale={lang} fit>
      <section className="hot-reload-badge-page" data-editor={editing ? "" : undefined}>
        {editing ? null : head}
        {content}
      </section>
    </HotReloadTheme>
  )
}
