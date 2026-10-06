import { notFound } from "next/navigation"
import { AccessEventHeader } from "@/components/access-event-header"
import { findAccessEvent } from "@/lib/access-events"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { isLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import "@/app/station-event-access.css"

export async function generateMetadata({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event) return { robots: { index: false } }
  return buildMetadata({ locale: lang, path: `/events/${event.slug}`, title: event.title, description: eventAccessCopy[lang].intro })
}

export default async function Page({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event) notFound()
  const t = eventAccessCopy[lang]
  return <main className="event-entry-page">
    <AccessEventHeader event={event} locale={lang} />
    <section className="entry-steps">
      <h2>{t.flowTitle}</h2>
      <ol>{t.steps.map((step, i) => <li key={step}><span className="entry-step-number">0{i + 1}</span><div><h3>{step}</h3><p>{t.stepBodies[i]}</p></div></li>)}</ol>
    </section>
    <section className="entry-bring">
      <div><p className="station-label">18:00–21:00 · Lima</p><h2>{t.bring}</h2><p>{t.bringBody}</p></div>
      <div className="entry-location"><h3>{event.venue}</h3><p>{event.address}</p><p>{t.disclaimer}</p></div>
    </section>
  </main>
}
