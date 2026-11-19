import type { ShipUpdate } from "@crafter/contracts"

import { ShipMarkdown } from "@/components/ships/ship-markdown"
import type { Locale } from "@/lib/i18n"
import { relativeTime } from "@/lib/ship-activity"

const versionLike = /^v?\d+(\.\d+)+/i

/** Updates as a vertical timeline, newest first. Each body is member markdown, rendered as prose. */
export function ShipTimeline({ updates, locale, now, socialLabel }: {
  updates: ShipUpdate[]
  locale: Locale
  now: number
  socialLabel: string
}) {
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" })
  return (
    <ol className="ship-timeline">
      {updates.map((update) => (
        <li key={update.id} id={`update-${update.id}`}>
          <time dateTime={update.publishedAt} title={date.format(new Date(update.publishedAt))}>
            {relativeTime(update.publishedAt, locale, now)}
          </time>
          <h3 data-version={versionLike.test(update.title.trim()) ? "" : undefined}>{update.title}</h3>
          {update.imageUrl ? <img src={update.imageUrl} alt="" loading="lazy" decoding="async" className="ship-timeline-image" /> : null}
          <ShipMarkdown source={update.description} className="ship-prose-compact" />
          {update.socialPostUrl ? (
            <a href={update.socialPostUrl} target="_blank" rel="ugc nofollow noopener noreferrer" className="home-secondary-link">
              {socialLabel}
            </a>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
