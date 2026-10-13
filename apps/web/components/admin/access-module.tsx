import { GuestProgress } from "@/components/guest-progress"
import type { AccessEvent } from "@/lib/access-events"
import type { ApprovedGuests } from "@/lib/approved-guests"
import { guestProgress } from "@/lib/approved-guests"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { listAccessRows } from "@/lib/event-access-store"
import type { Locale } from "@/lib/i18n"

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

/** Venue entry details: who still has to submit and what each person brings. */
export async function AccessModule({ lang, event, approved }: { lang: Locale; event: AccessEvent; approved: ApprovedGuests | null }) {
  const t = eventAccessCopy[lang]
  const rows = await listAccessRows(event)
  const data = approved && rows && guestProgress(approved, rows)
  return <section className="mt-14 border-t border-line pt-10">
    <div className="flex flex-wrap items-end justify-between gap-6">
      <h2 className="text-[clamp(28px,3vw,40px)]">{t.admin}</h2>
      <a className="station-button" href={`/${lang}/admin/event-access/${event.slug}/export`} download>{t.export}</a>
    </div>
    <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{t.adminHelp}</p>
    {!data ? <p className="mt-8" role="alert">{t.adminUnavailable}</p> : <>
      <GuestProgress done={data.completed.length} total={data.total} missing={data.missing} syncedAt={data.syncedAt}
        labels={{ ...t, name: t.fullName }} locale={lang} timeZone={event.timeZone} />
      <h3 className="mt-12 text-3xl">{t.completed} · {data.completed.length}</h3>
      <div className="mt-4"><EntryTable rows={data.completed} lang={lang} event={event} /></div>
      {data.notListed.length ? <>
        <h3 className="mt-12 text-3xl">{t.notListed} · {data.notListed.length}</h3>
        <div className="mt-4"><EntryTable rows={data.notListed} lang={lang} event={event} /></div>
      </> : null}
    </>}
  </section>
}
