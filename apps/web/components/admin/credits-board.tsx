"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Tile = { id: string; code: string; reserve: boolean; status: "free" | "assigned" | "burned"; owner: string | null; assignedAt: string | null; claimedAt: string | null }

/* Minutes an assigned code may sit unopened before its tile turns amber, then red. */
const WARN_MIN = 3
const ALERT_MIN = 10
const REFRESH_MS = 5000

const label = (code: string) => code.replace(/\/+$/, "").split("/").pop()?.slice(-6) ?? code

function age(from: string, now: number) {
  const seconds = Math.max(0, Math.floor((now - Date.parse(from)) / 1000))
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

function tone(tile: Tile, now: number) {
  if (tile.status === "burned") return "border-dashed opacity-40 line-through"
  if (tile.status === "free") return tile.reserve ? "border-dashed" : ""
  if (tile.claimedAt) return "bg-muted text-muted-foreground opacity-60"
  const minutes = (now - Date.parse(tile.assignedAt ?? "")) / 60_000
  if (minutes >= ALERT_MIN) return "border-red-500 bg-red-500/15"
  if (minutes >= WARN_MIN) return "border-amber-500 bg-amber-500/15"
  return "border-emerald-500 bg-emerald-500/15"
}

/** Live board of every code: free, waiting to be opened (colored by wait), taken (grayed) or burned. */
export function CreditsBoard({ tiles }: { tiles: Tile[] }) {
  const router = useRouter()
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000)
    const refresh = setInterval(() => router.refresh(), REFRESH_MS)
    return () => { clearInterval(tick); clearInterval(refresh) }
  }, [router])

  const order = { assigned: 0, free: 1, burned: 2 }
  const sorted = [...tiles].sort((a, b) =>
    order[a.status] - order[b.status] || Number(Boolean(a.claimedAt)) - Number(Boolean(b.claimedAt)) || (a.assignedAt ?? "").localeCompare(b.assignedAt ?? ""))
  const pending = tiles.filter(tile => tile.status === "assigned" && !tile.claimedAt).length
  const claimed = tiles.filter(tile => tile.claimedAt && tile.status === "assigned").length

  return <div className="mt-10">
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
      <h3 className="text-2xl">Códigos en vivo</h3>
      <p className="text-muted-foreground">{claimed} tomados · {pending} pendientes · {tiles.length} en total</p>
    </div>
    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
      <span><i className="mr-1 inline-block size-3 rounded-sm border border-emerald-500 bg-emerald-500/15" />pendiente &lt; {WARN_MIN} min</span>
      <span><i className="mr-1 inline-block size-3 rounded-sm border border-amber-500 bg-amber-500/15" />{WARN_MIN}–{ALERT_MIN} min</span>
      <span><i className="mr-1 inline-block size-3 rounded-sm border border-red-500 bg-red-500/15" />&gt; {ALERT_MIN} min</span>
      <span><i className="mr-1 inline-block size-3 rounded-sm bg-muted opacity-60" />tomado</span>
      <span><i className="mr-1 inline-block size-3 rounded-sm border border-dashed border-line" />libre / reserva</span>
    </div>
    <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
      {sorted.map(tile => <div key={tile.id} className={`rounded-md border border-line p-3 text-sm ${tone(tile, now)}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono">{label(tile.code)}</span>
          {tile.reserve ? <span className="text-xs text-muted-foreground">reserva</span> : null}
        </div>
        <p className="mt-1 truncate">{tile.owner ?? (tile.status === "free" ? "libre" : "—")}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {tile.status === "assigned" && tile.assignedAt ? tile.claimedAt ? `tomado en ${age(tile.assignedAt, Date.parse(tile.claimedAt))}` : `esperando ${age(tile.assignedAt, now)}` : tile.status === "burned" ? "quemado" : " "}
        </p>
      </div>)}
    </div>
  </div>
}
