"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  adminAssignCode, adminCloseRound, adminImportCodes, adminMarkPresent, adminOpenRound, adminResetRound,
} from "@/app/[lang]/admin/events/[slug]/credits-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { RoundState } from "@/lib/event-credits"

type Result = { ok: true; detail?: string } | { ok: false }

function useAction() {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)
  const act = (label: string, action: () => Promise<Result>) => start(async () => {
    const result = await action()
    setMessage(result.ok ? `${label}${result.detail ? `: ${result.detail}` : ""}` : `${label}: falló`)
    router.refresh()
  })
  return { pending, message, act }
}

export function CreditsControls({ slug, state, code }: { slug: string; state: RoundState; code: string | null }) {
  const { pending, message, act } = useAction()
  const [codes, setCodes] = useState("")
  const [reserve, setReserve] = useState(false)
  return <div className="mt-8 grid gap-8">
    <div className="flex flex-wrap items-center gap-3">
      <span className="station-label">Ventana: {state}{state === "open" && code ? ` · código ${code}` : ""}</span>
      <Button disabled={pending || state === "open"} onClick={() => act("Ventana abierta", () => adminOpenRound(slug))}>Abrir ventana</Button>
      <Button disabled={pending || state !== "open"} onClick={() => {
        if (confirm("¿Cerrar la ventana y repartir los créditos?")) act("Asignados", () => adminCloseRound(slug))
      }}>Cerrar y repartir</Button>
      <Button variant="outline" disabled={pending} onClick={() => {
        if (confirm("Borra check-ins, ventana y asignaciones. Solo para ensayos. ¿Seguir?")) act("Reiniciado", () => adminResetRound(slug))
      }}>Reiniciar (ensayo)</Button>
    </div>
    <form className="grid max-w-xl gap-3" onSubmit={event => {
      event.preventDefault()
      act("Importados", async () => {
        const result = await adminImportCodes(slug, codes, reserve)
        if (result.ok) setCodes("")
        return result
      })
    }}>
      <Textarea value={codes} onChange={event => setCodes(event.target.value)} rows={4} placeholder="Un código por línea" className="font-mono" />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={reserve} onChange={event => setReserve(event.target.checked)} />Importar como reserva (no entran al reparto)</label>
      <Button type="submit" disabled={pending || !codes.trim()}>Importar códigos</Button>
    </form>
    {message ? <p role="status">{message}</p> : null}
  </div>
}

type Row = { userId: string; name: string; email: string; kind: string; present: boolean; reported: boolean; code: string | null }

export function CreditsTable({ slug, entries }: { slug: string; entries: Row[] }) {
  const { pending, message, act } = useAction()
  const [query, setQuery] = useState("")
  const rows = useMemo(() => {
    const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    const sorted = [...entries].sort((a, b) => Number(b.reported) - Number(a.reported))
    return terms.length ? sorted.filter(row => terms.every(term => normalize(`${row.name} ${row.email}`).includes(term))) : sorted
  }, [entries, query])
  return <div className="mt-10">
    <Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar por nombre o correo" className="max-w-md" />
    {message ? <p role="status" className="mt-3">{message}</p> : null}
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[820px] text-left">
        <thead><tr>{["Nombre", "Correo", "Tipo", "Presente", "Código", ""].map(label => <th key={label} className="p-3 font-medium">{label}</th>)}</tr></thead>
        <tbody>{rows.map(row => <tr key={row.userId} className="border-t border-line align-top">
          <td className="p-3">{row.name}{row.reported ? " · reportó falla" : ""}</td>
          <td className="p-3">{row.email}</td>
          <td className="p-3">{row.kind}</td>
          <td className="p-3">{row.present ? "sí" : "no"}</td>
          <td className="p-3 font-mono">{row.code ?? "—"}</td>
          <td className="p-3"><div className="flex flex-wrap gap-2">
            {!row.present ? <Button size="sm" variant="outline" disabled={pending} onClick={() => act(`${row.name} presente`, () => adminMarkPresent(slug, row.userId))}>Marcar presente</Button> : null}
            {row.code
              ? <Button size="sm" variant="outline" disabled={pending} onClick={() => act(`Nuevo código para ${row.name}`, () => adminAssignCode(slug, row.userId, true))}>Quemar y reasignar</Button>
              : <Button size="sm" variant="outline" disabled={pending} onClick={() => act(`Código para ${row.name}`, () => adminAssignCode(slug, row.userId, false))}>Asignar código</Button>}
          </div></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>
}
