import { notFound } from "next/navigation"
import { AccessModule } from "@/components/admin/access-module"
import { BadgesModule } from "@/components/admin/badges-module"
import { OrdersModule } from "@/components/admin/orders-module"
import { getAdmin } from "@/lib/admin"
import { adminEventsCopy, findAdminEvent } from "@/lib/admin-events"
import { listApprovedGuests } from "@/lib/approved-guests"
import { isLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const maxDuration = 60
export const metadata = { title: "Event · Admin", robots: { index: false, follow: false } }

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const event = findAdminEvent(slug)
  if (!isLocale(lang) || !event || !(await getAdmin())) notFound()
  const t = adminEventsCopy[lang]
  // Fetched once and shared by every module of the event.
  const approved = event.lumaEventId ? await listApprovedGuests(event.lumaEventId, event.calendar) : null
  const date = event.startsAt
    ? new Intl.DateTimeFormat(lang, { dateStyle: "long", timeStyle: "short", timeZone: event.timeZone }).format(new Date(event.startsAt))
    : t.unannounced
  return <main className="flex-1 py-12">
    <p className="station-label text-muted-foreground">Admin · {t.events}</p>
    <h1 className="mt-3 text-[clamp(36px,4vw,56px)]">{event.title}</h1>
    <p className="mt-3 text-muted-foreground">{date}{approved ? ` · ${approved.guests.length} ${t.approved}` : ""}</p>
    {event.access ? <AccessModule lang={lang} event={event.access} approved={approved} /> : null}
    {event.orders ? <OrdersModule lang={lang} edition={event.orders} approved={approved} /> : null}
    <BadgesModule lang={lang} event={event} approved={approved} />
  </main>
}
