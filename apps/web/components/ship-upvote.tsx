"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { ShipVote } from "@crafter/contracts"
import { SignInButton, useAuth } from "@clerk/nextjs"
import { ArrowUp } from "lucide-react"

import type { Locale } from "@/lib/i18n"
import { shipsApi } from "@/lib/ships-client"

const copy = {
  en: { add: "Upvote this Ship", remove: "Remove your upvote", error: "Could not update your vote." },
  es: { add: "Vota por este Ship", remove: "Quita tu voto", error: "No se pudo actualizar tu voto." },
  pt: { add: "Vote neste Ship", remove: "Remova seu voto", error: "Nao foi possivel atualizar seu voto." },
  zh: { add: "为这个作品投票", remove: "取消你的投票", error: "无法更新你的投票。" },
  ja: { add: "この Ship に投票", remove: "投票を取り消す", error: "投票を更新できませんでした。" },
} as const

type VoteContextValue = {
  loaded: boolean
  votedShipIds: Set<string>
  setVoted: (shipId: string, active: boolean) => void
}

const VoteContext = createContext<VoteContextValue | null>(null)

export function ShipVotesProvider({ children }: { children: ReactNode }) {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [loaded, setLoaded] = useState(false)
  const [votedShipIds, setVotedShipIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setVotedShipIds(new Set())
      setLoaded(isLoaded)
      return
    }
    setLoaded(false)
    let cancelled = false
    void getToken()
      .then((token) => token ? shipsApi<{ shipIds: string[] }>("/v1/me/ship-votes", token) : null)
      .then((response) => {
        if (!cancelled && response) setVotedShipIds(new Set(response.shipIds))
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })
    return () => { cancelled = true }
  }, [getToken, isLoaded, isSignedIn])

  function setVoted(shipId: string, active: boolean) {
    setVotedShipIds((current) => {
      const next = new Set(current)
      if (active) next.add(shipId)
      else next.delete(shipId)
      return next
    })
  }

  return <VoteContext value={{ loaded, votedShipIds, setVoted }}>{children}</VoteContext>
}

export function ShipUpvote({ shipId, slug, initialVoteCount, locale }: {
  shipId: string
  slug: string
  initialVoteCount: number
  locale: Locale
}) {
  const votes = useContext(VoteContext)
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [voteCount, setVoteCount] = useState(initialVoteCount)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const active = votes?.votedShipIds.has(shipId) ?? false
  const t = copy[locale]
  const className = `inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs tabular-nums transition-colors ${active ? "border-accent bg-accent text-accent-foreground" : "border-line hover:border-accent hover:text-accent"}`
  const label = active ? t.remove : t.add

  async function toggleVote() {
    if (!votes || pending) return
    const nextActive = !active
    setPending(true)
    setError(false)
    votes.setVoted(shipId, nextActive)
    setVoteCount((current) => Math.max(0, current + (nextActive ? 1 : -1)))
    try {
      const token = await getToken()
      if (!token) throw new Error("Missing session token")
      const response = await shipsApi<{ vote: ShipVote }>(`/v1/ships/${encodeURIComponent(slug)}/vote`, token, {
        method: "PUT",
        body: JSON.stringify({ active: nextActive }),
      })
      votes.setVoted(shipId, response.vote.active)
      setVoteCount(response.vote.voteCount)
    } catch {
      votes.setVoted(shipId, active)
      setVoteCount((current) => Math.max(0, current + (nextActive ? -1 : 1)))
      setError(true)
    } finally {
      setPending(false)
    }
  }

  const button = (
    <button type="button" className={className} aria-label={label} aria-pressed={active} disabled={!isLoaded || !votes?.loaded || pending} onClick={isSignedIn ? toggleVote : undefined} title={error ? t.error : label}>
      <ArrowUp className="size-3.5" strokeWidth={2} />
      <span>{voteCount}</span>
    </button>
  )

  return !isLoaded || isSignedIn ? button : <SignInButton mode="modal">{button}</SignInButton>
}
