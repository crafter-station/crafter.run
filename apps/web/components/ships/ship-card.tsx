import type { ShipSummary } from "@crafter/contracts"
import Link from "next/link"

import { ShipCover } from "@/components/ships/ship-cover"
import { MakerAvatar, ShipLinks, type ShipLabels } from "@/components/ships/ship-meta"
import { ShipUpvote } from "@/components/ship-upvote"
import type { Locale } from "@/lib/i18n"
import { lastActivityAt, relativeTime } from "@/lib/ship-activity"

/** A Ship on the wall: cover, maker, tagline, activity and links. The title link covers the whole card. */
export function ShipCard({ ship, locale, now, labels, affiliation }: {
  ship: ShipSummary
  locale: Locale
  now: number
  labels: ShipLabels
  affiliation: "core" | "crew" | null
}) {
  return (
    <article className="ship-card">
      <div className="ship-card-cover">
        <ShipCover name={ship.name} imageUrl={ship.imageUrl} />
        <div className="ship-card-vote">
          <ShipUpvote shipId={ship.id} slug={ship.slug} initialVoteCount={ship.voteCount} locale={locale} variant="pill" />
        </div>
      </div>
      <div className="ship-card-body">
        <p className="ship-card-maker">
          <MakerAvatar owner={ship.owner} />
          <span>{ship.owner.displayName}</span>
          {affiliation ? <span className="ship-chip" data-kind={affiliation}>{labels[affiliation]}</span> : null}
        </p>
        <h3>
          <Link href={`/${locale}/ships/${ship.slug}`}>{ship.name}</Link>
        </h3>
        <p className="ship-card-tagline">{ship.tagline}</p>
        <div className="ship-card-foot">
          <time dateTime={lastActivityAt(ship)}>{relativeTime(lastActivityAt(ship), locale, now)}</time>
          <ShipLinks links={ship.links} labels={labels} />
        </div>
      </div>
    </article>
  )
}
