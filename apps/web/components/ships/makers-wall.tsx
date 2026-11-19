"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { MakerAvatar } from "@/components/ships/ship-meta"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { Maker } from "@/lib/ships-showcase"

export type MakersLabels = { wall: string; core: string; crew: string; you: string; publish: string; ships: Record<string, string> }

/** Everyone who has shipped, as faces. Core and Crew carry a ring; the last seat invites the reader. */
export function MakersWall({ makers, locale, labels }: { makers: Maker[]; locale: string; labels: MakersLabels }) {
  return (
    <div className="ships-makers">
      <ul aria-label={labels.wall}>
        {makers.map((maker) => (
          <li key={maker.handle}>
            <Tooltip>
              <TooltipTrigger
                render={<Link href={`/${locale}/crafters/${maker.handle}`} className="ships-maker" data-kind={maker.affiliation ?? undefined} />}
                aria-label={`${maker.displayName}, ${labels.ships[maker.handle]}`}
              >
                <MakerAvatar owner={maker} />
                {maker.ships > 1 ? <span className="ships-maker-count">{maker.ships}</span> : null}
              </TooltipTrigger>
              <TooltipContent>
                {maker.displayName} · {labels.ships[maker.handle]}
                {maker.affiliation ? ` · ${labels[maker.affiliation]}` : ""}
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
        <li>
          <Link href={`/${locale}/ships/new`} className="ships-maker ships-maker-you" aria-label={labels.publish}>
            <Plus aria-hidden="true" />
          </Link>
        </li>
      </ul>
      <p className="ships-makers-key home-label-sm">
        <span data-kind="core">{labels.core}</span>
        <span data-kind="crew">{labels.crew}</span>
        <span>{labels.you}</span>
      </p>
    </div>
  )
}
