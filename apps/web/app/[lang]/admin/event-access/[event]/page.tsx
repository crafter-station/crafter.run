import { notFound } from "next/navigation"
import { CopyEmailsButton } from "@/components/copy-emails-button"
import { getAdmin } from "@/lib/admin"
import { type AccessEvent, findAccessEvent } from "@/lib/access-events"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { listAccessDashboard, listAccessForAdmin } from "@/lib/event-access-store"
import { isLocale, type Locale } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const metadata = { title: "Event entry · Admin", robots: { index: false, follow: false } }

type Entry = NonNullable<Awaited<ReturnType<typeof listAccessDashboard>>>["completed"][number]

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
  const header = <>
    <p className="station-label text-muted-foreground">{t.admin}</p>
    <h1 className="mt-4 text-[clamp(32px,4vw,56px)]">{event.title}</h1>
    <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{t.adminHelp}</p>
  </>

  if (event.lumaCalendar === "list") {
    const data = await listAccessDashboard(event)
    if (!data) return <main className="py-12">{header}<p className="mt-8" role="alert">{t.adminUnavailable}</p></main>
    const done = data.completed.length
    const percent = data.total ? Math.round((done / data.total) * 100) : 0
    return <main className="py-12">
      {header}
      <section className="mt-10">
        <p className="text-[clamp(28px,3vw,44px)]">{done} / {data.total} <span className="text-muted-foreground">· {percent}%</span></p>
        <p className="mt-2 text-muted-foreground">{t.progress}</p>
        <div className="mt-4 h-2 w-full max-w-xl bg-line" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-foreground" style={{ width: `${percent}%` }} />
        </div>
        {data.syncedAt ? <p className="mt-3 text-sm text-muted-foreground">{t.lastSync}: {new Date(data.syncedAt).toLocaleString(lang, { timeZone: event.timeZone })}</p> : null}
        <a className="station-button mt-6" href={`/${lang}/admin/event-access/${slug}/export`} download>{t.export}</a>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl">{t.missing} · {data.missing.length}</h2>
          <CopyEmailsButton emails={data.missing.map(guest => guest.email)} label={t.copyEmails} copiedLabel={t.copied} />
        </div>
        {data.missing.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left">
          <thead><tr>{[t.fullName, t.email].map(label => <th key={label} className="p-4 font-medium">{label}</th>)}</tr></thead>
          <tbody>{data.missing.map(guest => <tr key={guest.email} className="border-t border-line"><td className="p-4">{guest.name ?? "—"}</td><td className="p-4">{guest.email}</td></tr>)}</tbody>
        </table></div> : <p className="py-6 text-muted-foreground">{t.none}</p>}
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">{t.completed} · {done}</h2>
        <div className="mt-4"><EntryTable rows={data.completed} lang={lang} event={event} /></div>
      </section>

      {data.notListed.length ? <section className="mt-12">
        <h2 className="text-3xl">{t.notListed} · {data.notListed.length}</h2>
        <div className="mt-4"><EntryTable rows={data.notListed} lang={lang} event={event} /></div>
      </section> : null}
    </main>
  }

  const rows = await listAccessForAdmin(event)
  return <main className="py-12">
    {header}
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
