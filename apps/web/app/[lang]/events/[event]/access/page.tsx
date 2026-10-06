import Link from "next/link"
import { notFound } from "next/navigation"
import { AccessEventHeader } from "@/components/access-event-header"
import { EventAccessForm } from "@/components/event-access-form"
import { LinkLumaEmail } from "@/components/link-luma-email"
import { accessEventDate, accessOpen, findAccessEvent } from "@/lib/access-events"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { readOwnAccess } from "@/lib/event-access-store"
import { getEventGuest } from "@/lib/event-guest"
import { hotReloadCopy } from "@/lib/hot-reload-copy"
import { isLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import "@/app/station-event-access.css"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event) return { robots: { index: false, follow: false } }
  return { ...buildMetadata({ locale: lang, path: `/events/${slug}/access`, title: `${eventAccessCopy[lang].formTitle} · ${event.title}`, description: eventAccessCopy[lang].entryIntro }), robots: { index: false, follow: false } }
}

function Notice({ title, body, children }: { title: string; body: string; children?: React.ReactNode }) {
  return <div className="entry-notice"><h2>{title}</h2><p>{body}</p>{children}</div>
}

export default async function Page({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event) notFound()
  const t = eventAccessCopy[lang]
  const path = `/${lang}/events/${slug}/access`
  let content: React.ReactNode
  if (!accessOpen(event)) {
    content = <Notice title={t.closedTitle} body={t.closedBody}><Link href={`/${lang}/events/${slug}`}>{t.viewEvent}</Link></Notice>
  } else {
    const { user, check } = await getEventGuest(event.lumaEventId, event.lumaCalendar)
    if (!user) {
      content = <Notice title={t.signInTitle} body={t.signInBody}><Link className="station-button" href={`/${lang}/sign-in?redirect_url=${encodeURIComponent(path)}`}>{t.signIn}</Link></Notice>
    } else if (check?.status === "approved") {
      try {
        const existing = await readOwnAccess(slug, user.id)
        content = <EventAccessForm locale={lang} slug={slug} email={check.email} defaultName={check.name ?? [user.firstName, user.lastName].filter(Boolean).join(" ")} existing={existing} closesAt={event.accessClosesAt} />
      } catch {
        content = <Notice title={t.unavailableTitle} body={t.unavailableBody}><a href={path}>{t.retry}</a></Notice>
      }
    } else if (check?.status === "not-found" || check?.status === "not-approved") {
      content = <Notice title={check.status === "not-found" ? t.missingTitle : t.pendingTitle} body={check.status === "not-found" ? t.missingBody : t.pendingBody}>
        <div className="entry-actions"><a href={event.lumaUrl} target="_blank" rel="noopener noreferrer">Luma</a><a href={path}>{t.retry}</a></div>
        <LinkLumaEmail locale={lang} />
      </Notice>
    } else {
      content = <Notice title={t.unavailableTitle} body={hotReloadCopy[lang].unavailableBody}>
        <a href={path}>{t.retry}</a>
        <LinkLumaEmail locale={lang} />
      </Notice>
    }
  }
  return <main className="event-entry-page">
    <AccessEventHeader event={event} locale={lang} entry />
    <section className="entry-access-content">
      <p className="entry-deadline">{t.deadline} <strong>{accessEventDate(event, lang, true)}</strong> ({t.lima}).</p>
      {content}
    </section>
  </main>
}
