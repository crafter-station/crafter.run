import Link from "next/link"
import { notFound } from "next/navigation"

import { getAdmin } from "@/lib/admin"
import { adminEvents, adminEventsCopy, adminEventsUrl } from "@/lib/admin-events"
import { isLocale } from "@/lib/i18n"

export const metadata = { title: "Admin", robots: { index: false } }

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang) || !(await getAdmin())) notFound()

  const t = adminEventsCopy[lang]
  return (
    <main className="flex-1 py-12">
      <p className="station-label text-muted-foreground">Admin</p>
      <h1 className="mt-3 text-[clamp(36px,4vw,56px)]">{t.events}</h1>
      <div className="hot-reload-list mt-8">
        {adminEvents.map((event) => (
          <Link key={event.slug} href={adminEventsUrl(lang, event.slug)}>
            <span className="station-label">{event.access ? "Entry" : "Orders"}</span>
            <span className="min-w-0">
              <h3 className="text-xl">{event.title}</h3>
              <span className="text-muted-foreground">
                {event.startsAt ? new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: event.timeZone }).format(new Date(event.startsAt)) : t.unannounced}
              </span>
            </span>
            <span className="station-label text-muted-foreground">→</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
