import { notFound } from "next/navigation"
import { getAdmin } from "@/lib/admin"
import { findAccessEvent } from "@/lib/access-events"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { listAccessForAdmin } from "@/lib/event-access-store"
import { isLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const metadata = { title: "Event entry · Admin", robots: { index: false, follow: false } }

export default async function Page({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event || !(await getAdmin())) notFound()
  const t = eventAccessCopy[lang]
  const rows = await listAccessForAdmin(event)
  return <main className="py-12">
    <p className="station-label text-muted-foreground">{t.admin}</p>
    <h1 className="mt-4 text-[clamp(32px,4vw,56px)]">{event.title}</h1>
    <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{t.adminHelp}</p>
    {rows === null ? <p className="mt-8" role="alert">{t.adminUnavailable}</p> : <>
      <a className="station-button mt-8" href={`/${lang}/admin/event-access/${slug}/export`} download>{t.export}</a>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead><tr>{[t.fullName, t.email, t.status, t.updated].map(label => <th key={label} className="p-4 font-medium">{label}</th>)}</tr></thead>
          <tbody>{rows.map(row => <tr key={row.id} className="border-t border-line">
            <td className="p-4">{row.fullName}</td><td className="p-4">{row.email}</td>
            <td className="p-4">{row.approval === "approved" ? t.verified : row.approval === "unavailable" ? t.unverified : t.notApproved}</td>
            <td className="p-4">{new Date(row.updatedAt).toLocaleString(lang, { timeZone: event.timeZone })}</td>
          </tr>)}</tbody>
        </table>
        {rows.length === 0 ? <p className="py-8 text-muted-foreground">{t.empty}</p> : null}
      </div>
    </>}
  </main>
}
