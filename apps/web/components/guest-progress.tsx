import { CopyEmailsButton } from "@/components/copy-emails-button"

export type GuestProgressLabels = { progress: string; missing: string; lastSync: string; copyEmails: string; copied: string; name: string; email: string; none: string }

/** Admin-only summary of approved guests and who has not submitted yet. */
export function GuestProgress({ done, total, missing, syncedAt, labels, locale, timeZone }: {
  done: number; total: number; missing: { email: string; name: string | null }[]; syncedAt: string | null
  labels: GuestProgressLabels; locale: string; timeZone: string
}) {
  const percent = total ? Math.round((done / total) * 100) : 0
  return <>
    <section className="mt-10">
      <p className="text-[clamp(28px,3vw,44px)] tabular-nums">{done} / {total} <span className="text-muted-foreground">· {percent}%</span></p>
      <p className="mt-2 text-muted-foreground">{labels.progress}</p>
      <div className="mt-4 h-2 w-full max-w-xl bg-line" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-foreground" style={{ width: `${percent}%` }} />
      </div>
      {syncedAt ? <p className="mt-3 text-sm text-muted-foreground">{labels.lastSync}: {new Date(syncedAt).toLocaleString(locale, { timeZone })}</p> : null}
    </section>
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl">{labels.missing} · {missing.length}</h2>
        <CopyEmailsButton emails={missing.map(guest => guest.email)} label={labels.copyEmails} copiedLabel={labels.copied} />
      </div>
      {missing.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left">
        <thead><tr>{[labels.name, labels.email].map(label => <th key={label} className="p-4 font-medium">{label}</th>)}</tr></thead>
        <tbody>{missing.map(guest => <tr key={guest.email} className="border-t border-line"><td className="p-4">{guest.name ?? "—"}</td><td className="p-4">{guest.email}</td></tr>)}</tbody>
      </table></div> : <p className="py-6 text-muted-foreground">{labels.none}</p>}
    </section>
  </>
}
