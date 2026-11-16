import Link from "next/link"

import type { ChangelogLabels } from "@/components/changelog/labels"
import { CHANGELOG_AREAS, type ChangelogArea } from "@/lib/changelog"
import { changelogPath } from "@/lib/changelog-paths"
import type { Locale } from "@/lib/i18n"

/**
 * Area filter as plain links. State lives in `?area=`, so every filtered view
 * is shareable and nothing hydrates. Areas nobody has shipped in are omitted:
 * a pill that only ever empties the list is noise.
 */
export function ChangelogFilter({
  locale,
  active,
  counts,
  t,
}: {
  locale: Locale
  active: ChangelogArea | undefined
  counts: Record<ChangelogArea | "all", number>
  t: ChangelogLabels
}) {
  const base = changelogPath(locale)
  const options = [
    { key: "all" as const, label: t.all, href: base },
    ...CHANGELOG_AREAS.filter((area) => counts[area] > 0).map((area) => ({
      key: area,
      label: t.areas[area],
      href: `${base}?area=${area}`,
    })),
  ]
  return (
    <nav aria-label={t.filterLabel} className="journal-nav">
      <div className="journal-nav-topics">
        {options.map((option) => (
          <Link
            key={option.key}
            href={option.href}
            scroll={false}
            aria-current={(active ?? "all") === option.key ? "page" : undefined}
            className="journal-filter changelog-filter"
          >
            {option.label}
            <span>{counts[option.key]}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
