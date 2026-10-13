import { notFound } from "next/navigation"
import { GuestProgress } from "@/components/guest-progress"
import { getAdmin } from "@/lib/admin"
import { type AccessEvent, findAccessEvent } from "@/lib/access-events"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { listAccessRows } from "@/lib/event-access-store"
import { guestProgress, listApprovedGuests } from "@/lib/approved-guests"
import { isLocale, type Locale } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const metadata = { title: "Event entry · Admin", robots: { index: false, follow: false } }

type Entry = NonNullable<Awaited<ReturnType<typeof listAccessRows>>>[number]

const maskDocument = (value: string) => value.length > 3 ? `${"•".repeat(value.length - 3)}${value.slice(-3)}` : value

function EntryTable({ rows, lang, event }: { rows: Entry[]; lang: Locale; event: AccessEvent }) {
  const t = eventAccessCopy[lang]
  if (!rows.length) return <p className="py-6 text-muted-foreground">{t.none}</p>
  return <div className="overflow-x-auto">
    <table className="w-full min-w-[900px] text-left">
      <thead><tr>{[t.fullName, t.email, t.documentNumber, t.plate, t.equipment, t.updated].map(label => <th key={label} className="p-4 font-medium">{label}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={row.id} className="border-t border-line align-top">
        <td className="p-4">{row.fullName}</td><td className="p-4">{row.email}</td>
        <td className="p-4 font-mono">{t[row.documentType as "dni" | "foreign" | "passport"]} {maskDocument(row.documentNumber)}</td>
        <td className="p-4">{row.vehiclePlate ?? "—"}</td>
        <td className="p-4 whitespace-pre-line">{row.equipment.join("\n") || "—"}</td>
        <td className="p-4">{new Date(row.updatedAt).toLocaleString(lang, { timeZone: event.timeZone })}</td>
      </tr>)}</tbody>
    </table>
  </div>
}

export default async function Page({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event || !(await getAdmin())) notFound()
  const t = eventAccessCopy[lang]
  const [approved, rows] = await Promise.all([listApprovedGuests(event.lumaEventId, event.lumaCalendar), listAccessRows(event)])
  const data = approved && rows && guestProgress(approved, rows)
  return <main className="py-12">
    <p className="station-label text-muted-foreground">{t.admin}</p>
    <h1 className="mt-4 text-[clamp(32px,4vw,56px)]">{event.title}</h1>
    <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{t.adminHelp}</p>
    {!data ? <p className="mt-8" role="alert">{t.adminUnavailable}</p> : <>
      <a className="station-button mt-8" href={`/${lang}/admin/event-access/${slug}/export`} download>{t.export}</a>
      <GuestProgress done={data.completed.length} total={data.total} missing={data.missing} syncedAt={data.syncedAt}
        labels={{ ...t, name: t.fullName }} locale={lang} timeZone={event.timeZone} />
      <section className="mt-12">
        <h2 className="text-3xl">{t.completed} · {data.completed.length}</h2>
        <div className="mt-4"><EntryTable rows={data.completed} lang={lang} event={event} /></div>
      </section>
      {data.notListed.length ? <section className="mt-12">
        <h2 className="text-3xl">{t.notListed} · {data.notListed.length}</h2>
        <div className="mt-4"><EntryTable rows={data.notListed} lang={lang} event={event} /></div>
      </section> : null}
    </>}
  </main>
}
