import Link from "next/link"
import { notFound } from "next/navigation"
import { CreditsPanel } from "@/components/event-credits"
import { findAccessEvent } from "@/lib/access-events"
import { assignCode, markPresent, readAttendance, readEntry, readOwnCode, saveEntry } from "@/lib/event-credits"
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
      // Open door: anyone signed in gets a code on first visit, no Luma listing or room code.
      if (!entry) {
        const email = user.emailAddresses[0]?.emailAddress ?? ""
        await saveEntry(slug, user.id, "waitlist", [user.firstName, user.lastName].filter(Boolean).join(" ") || email, email)
        await markPresent(slug, user.id)
      }
      const code = (await readOwnCode(slug, user.id)) ?? (await assignCode(slug, user.id, false))
      const [current, attended] = await Promise.all([readEntry(slug, user.id), readAttendance(slug, user.id)])
      content = <CreditsPanel locale={lang} slug={slug} kind={(current?.kind ?? "waitlist") as "luma" | "waitlist"} state="closed"
        present code={code} reported={Boolean(current?.reportedAt)} taken={Boolean(attended)} />
    } catch {
      content = <Notice title={t.unavailable} body=""><a href={path}>{t.retry}</a></Notice>
    }
  }
  return <main className="event-entry-page mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
    <section className="entry-access-content grid gap-4">
      <p className="station-label text-muted-foreground">{event.title}</p>
      <h1 className="mt-3 text-[clamp(36px,5vw,56px)]">{t.title}</h1>
      <p className="entry-deadline">{t.intro}</p>
      {content}
    </section>
  </main>
}
