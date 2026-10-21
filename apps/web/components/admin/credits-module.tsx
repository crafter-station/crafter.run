import { CreditsBoard } from "@/components/admin/credits-board"
import { CreditsControls, CreditsTable } from "@/components/admin/credits-controls"
import type { AccessEvent } from "@/lib/access-events"
import { listCreditsForAdmin } from "@/lib/event-credits"

/** Codex credits: import codes, run the presence window and fix single cases by hand. */
export async function CreditsModule({ event }: { event: AccessEvent }) {
  const data = await listCreditsForAdmin(event.slug).catch(() => null)
  return <section className="mt-14 border-t border-line pt-10">
    <h2 className="text-[clamp(28px,3vw,40px)]">Créditos</h2>
    {!data ? <p className="mt-8" role="alert">No se pudo leer la base de datos de créditos.</p> : <>
      <p className="mt-4 text-muted-foreground">
        {data.entries.length} check-in · {data.entries.filter(entry => entry.kind === "luma").length} Luma ·{" "}
        {data.entries.filter(entry => entry.kind === "waitlist").length} waitlist · {data.entries.filter(entry => entry.presentAt).length} presentes
      </p>
      <p className="mt-1 text-muted-foreground">
        Códigos: {data.codes.free} libres · {data.codes.reserve} reserva · {data.codes.assigned} asignados · {data.codes.burned} quemados
      </p>
      <CreditsControls slug={event.slug} state={data.round.state} code={data.round.code} />
      <CreditsBoard tiles={data.board} />
      <CreditsTable slug={event.slug} entries={data.entries.map(entry => ({
        userId: entry.clerkUserId, name: entry.name, email: entry.email, kind: entry.kind,
        present: Boolean(entry.presentAt), reported: Boolean(entry.reportedAt), code: entry.code,
      }))} />
    </>}
  </section>
}
