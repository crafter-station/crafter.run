import Link from "next/link"
import { notFound } from "next/navigation"
import { CreditsPanel, WaitlistForm } from "@/components/event-credits"
import { LinkLumaEmail } from "@/components/link-luma-email"
import { findAccessEvent } from "@/lib/access-events"
import { readEntry, readOwnCode, readRound, saveEntry } from "@/lib/event-credits"
import { eventCreditsCopy } from "@/lib/event-credits-copy"
import { getEventGuest } from "@/lib/event-guest"
import { isLocale } from "@/lib/i18n"
import "@/app/station-event-access.css"

export const dynamic = "force-dynamic"
export const metadata = { robots: { index: false, follow: false } }

function Notice({ title, body, children }: { title: string; body: string; children?: React.ReactNode }) {
  return <div className="entry-notice"><h2>{title}</h2><p>{body}</p>{children}</div>
}

export default async function Page({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event) notFound()
  const t = eventCreditsCopy[lang]
  const path = `/${lang}/events/${slug}/credits`
  const { user, check } = await getEventGuest(event.lumaEventId, event.lumaCalendar)
  let content: React.ReactNode
  if (!user) {
    content = <Notice title={t.signInTitle} body={t.signInBody}><Link className="station-button" href={`/${lang}/sign-in?redirect_url=${encodeURIComponent(path)}`}>{t.signIn}</Link></Notice>
  } else if (check?.status === "unavailable") {
    content = <Notice title={t.unavailable} body=""><a href={path}>{t.retry}</a></Notice>
  } else {
    try {
      let entry = await readEntry(slug, user.id)
      // Listed guests check in by opening the page; a waitlist entry upgrades once a Luma email is linked.
      if (check?.status === "approved" && entry?.kind !== "luma") {
        await saveEntry(slug, user.id, "luma", check.name ?? ([user.firstName, user.lastName].filter(Boolean).join(" ") || check.email), check.email)
        entry = await readEntry(slug, user.id)
      }
      if (!entry) {
        content = <Notice title={t.notListedTitle} body={t.notListedBody}>
          <LinkLumaEmail locale={lang} />
          <WaitlistForm locale={lang} slug={slug} defaultName={[user.firstName, user.lastName].filter(Boolean).join(" ")} />
        </Notice>
      } else {
        const [round, code] = await Promise.all([readRound(slug), readOwnCode(slug, user.id)])
        content = <CreditsPanel locale={lang} slug={slug} kind={entry.kind as "luma" | "waitlist"} state={round.state}
          present={Boolean(entry.presentAt)} code={code} reported={Boolean(entry.reportedAt)} />
      }
    } catch {
      content = <Notice title={t.unavailable} body=""><a href={path}>{t.retry}</a></Notice>
    }
  }
  return <main className="event-entry-page">
    <section className="entry-access-content">
      <p className="station-label text-muted-foreground">{event.title}</p>
      <h1 className="mt-3 text-[clamp(36px,5vw,56px)]">{t.title}</h1>
      <p className="entry-deadline">{t.intro}</p>
      {content}
    </section>
  </main>
}
