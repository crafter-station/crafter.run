"use client"

import { useState } from "react"
import { ArrowUp } from "lucide-react"
import { ShipCover } from "@/components/ships/ship-cover"

export type WorkbenchShip = { slug: string | null; name: string; tagline: string; imageUrl: string | null; voteCount: number; maker: string; avatarUrl: string | null }

/** A community Ship card from the live API. The upvote is a local toggle: nothing is sent anywhere. */
export function ShipDemo({ ship, copy }: { ship: WorkbenchShip; copy: { upvote: string; unvote: string; localOnly: string; by: string } }) {
  const [voted, setVoted] = useState(false)
  const count = ship.voteCount + (voted ? 1 : 0)
  return (
    <div className="wb-ship">
      <div className="wb-ship-cover">
        <ShipCover name={ship.name} imageUrl={ship.imageUrl} />
      </div>
      <div className="wb-ship-body">
        <p className="wb-ship-maker">
          {ship.avatarUrl ? <img src={ship.avatarUrl} alt="" width={20} height={20} /> : <span aria-hidden="true">{ship.maker.slice(0, 1).toUpperCase()}</span>}
          {copy.by} {ship.maker}
        </p>
        <h3>{ship.name}</h3>
        <p className="wb-ship-tagline">{ship.tagline}</p>
        <div className="wb-ship-foot">
          <button type="button" className="wb-vote" aria-pressed={voted} aria-label={voted ? copy.unvote : copy.upvote} onClick={() => setVoted(value => !value)}>
            <ArrowUp aria-hidden="true" size={14} strokeWidth={2.2} /><span>{count}</span>
          </button>
          <span className="wb-ship-note">{copy.localOnly}</span>
        </div>
      </div>
    </div>
  )
}
