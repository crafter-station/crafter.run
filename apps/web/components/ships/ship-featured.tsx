import type { ShipSummary } from "@crafter/contracts"
import { ArrowUpRight, Star } from "lucide-react"
import Link from "next/link"

import { ShipCover } from "@/components/ships/ship-cover"
import { MakerAvatar, type ShipLabels } from "@/components/ships/ship-meta"
import type { Locale } from "@/lib/i18n"
import { lastActivityAt, relativeTime } from "@/lib/ship-activity"

/** The hero Ship: big cover, maker, tagline, why it is featured and the latest update. */
export function FeaturedShip({ ship, locale, now, labels, votesLabel, latestLabel }: {
  ship: ShipSummary
  locale: Locale
  now: number
  labels: ShipLabels
  votesLabel: string
  latestLabel: string | null
}) {
  return (
    <article className="ship-featured">
      <p className="ship-featured-badge">
        <Star aria-hidden="true" />
        {labels.featuredLabel}
        {ship.voteCount > 0 ? <span>{votesLabel}</span> : null}
      </p>
      <div className="ship-featured-cover">
        <ShipCover name={ship.name} imageUrl={ship.imageUrl} eager />
      </div>
      <div className="ship-featured-body">
        <h2>
          <Link href={`/${locale}/ships/${ship.slug}`}>
            {ship.name}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </h2>
        <p className="ship-featured-tagline">{ship.tagline}</p>
        <p className="ship-featured-maker">
          <MakerAvatar owner={ship.owner} />
          <span>{ship.owner.displayName}</span>
          <time dateTime={lastActivityAt(ship)}>{relativeTime(lastActivityAt(ship), locale, now)}</time>
        </p>
        {latestLabel ? <p className="ship-featured-update">{latestLabel}</p> : null}
      </div>
    </article>
  )
}
