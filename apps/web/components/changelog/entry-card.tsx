import Image from "next/image"
import Link from "next/link"

import { AvatarGroup } from "@/components/blog/avatar"
import type { ChangelogView } from "@/components/changelog/format"
import type { ChangelogLabels } from "@/components/changelog/labels"
import { type Locale, withLocale } from "@/lib/i18n"

/** One entry in the timeline. Whole card is plain server HTML: no client state. */
export function ChangelogCard({ entry, t, locale }: { entry: ChangelogView; t: ChangelogLabels; locale: Locale }) {
  const note =
    entry.entryLocale && (entry.entryLocale === "en" || entry.entryLocale === "es")
      ? t.availableIn(t.languages[entry.entryLocale])
      : null

  return (
    <article className="changelog-entry" data-area={entry.area}>
      <div className="changelog-rail">
        <time dateTime={entry.date}>{entry.dateShort}</time>
      </div>
      <div className="changelog-entry-main">
        {entry.image && (
          <Link href={entry.href} hrefLang={entry.locale} tabIndex={-1} aria-hidden className="changelog-cover">
            <Image src={entry.image} alt="" width={1600} height={1000} sizes="(min-width: 1024px) 720px, 100vw" />
          </Link>
        )}
        <p className="changelog-tag">
          <span className="changelog-area">{t.areas[entry.area]}</span>
          <span aria-hidden="true">/</span>
          <span>{t.kinds[entry.kind]}</span>
        </p>
        <h3>
          <Link href={entry.href} hrefLang={entry.locale}>
            {entry.title}
          </Link>
        </h3>
        <p className="changelog-summary">{entry.summary}</p>
        {note && <span className="journal-language">{note}</span>}
        <div className="changelog-foot">
          {entry.crafters.length > 0 && (
            <div className="changelog-crafters">
              <AvatarGroup authors={entry.crafters} size={24} />
              <span>{entry.byline}</span>
            </div>
          )}
          {entry.ships.length > 0 && (
            <ul className="changelog-ships" aria-label={t.ships}>
              {entry.ships.map((ship) => (
                <li key={ship}>
                  <Link href={withLocale(`/ships/${ship}`, locale)}>{ship}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}
