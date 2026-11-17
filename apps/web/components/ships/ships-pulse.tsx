import Link from "next/link"

import { MakerAvatar, type ShipLabels } from "@/components/ships/ship-meta"
import type { Locale } from "@/lib/i18n"
import { type ActivityEvent, relativeTime } from "@/lib/ship-activity"

type Avatars = Record<string, string | null>

/** The latest publications and updates as a short feed. */
export function ShipsPulse({ events, avatars, locale, now, labels }: {
  events: ActivityEvent[]
  avatars: Avatars
  locale: Locale
  now: number
  labels: ShipLabels
}) {
  return (
    <section className="ships-pulse" aria-labelledby="ships-pulse-title">
      <header>
        <h2 id="ships-pulse-title"><span className="ships-live" aria-hidden="true" />{labels.pulseTitle}</h2>
        <p>{labels.pulseLead}</p>
      </header>
      <ol>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/${locale}/ships/${event.ship.slug}`}>
              <MakerAvatar owner={{ displayName: event.ship.ownerName, avatarUrl: avatars[event.ship.ownerHandle] ?? null }} />
              <span className="ships-pulse-text">
                <strong>{event.kind === "update" ? `${event.ship.name}: ${event.title}` : event.ship.name}</strong>
                <span>{labels.pulseBy.replace("{name}", event.ship.ownerName)}</span>
              </span>
              <span className="ships-pulse-when">
                <span className="ship-chip" data-kind={event.kind}>{event.kind === "update" ? labels.pulseUpdate : labels.pulsePublished}</span>
                <time dateTime={event.at}>{relativeTime(event.at, locale, now)}</time>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
