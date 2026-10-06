"use client"

/**
 * Index filter row: topic pills and title search. The masthead owns the feed link.
 *
 * Filters in place rather than routing each topic to its own page: the kinds
 * are a display label, not a taxonomy, so there are no per-kind URLs for a
 * crawler to spend budget on. Every entry is still in the server-rendered
 * HTML; the filter starts empty, so the markup a crawler reads is the full
 * list.
 */
import { SearchIcon, XIcon } from "lucide-react"

import type { BlogCopy } from "@/components/blog/copy"
import type { BlogKind } from "@/lib/blog"

export type KindFilter = BlogKind | "all"

export type NavCopy = BlogCopy["nav"] & {
  kinds: BlogCopy["kinds"]
}


export function BlogNav({
  active,
  onChange,
  query,
  onQueryChange,
  order,
  counts,
  t,
}: {
  active: KindFilter
  onChange: (kind: KindFilter) => void
  query: string
  onQueryChange: (query: string) => void
  /** Kinds present on this page, in display order. A pill for a kind nobody
      has published would only ever empty the list. */
  order: readonly BlogKind[]
  counts: Record<string, number>
  t: NavCopy
}) {
  const options: { key: KindFilter; label: string; count: number }[] = [
    { key: "all", label: t.all, count: counts.all ?? 0 },
    ...order.map((kind) => ({ key: kind as KindFilter, label: t.kinds[kind], count: counts[kind] ?? 0 })),
  ]

  return (
    <nav
      aria-label={t.filterLabel}
      className="journal-nav"
    >
      <div role="group" aria-label={t.filterLabel} className="journal-nav-topics">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            aria-pressed={option.key === active}
            onClick={() => onChange(option.key)}
            className="journal-filter"
          >
            {option.label}
            <span className="opacity-60 tabular-nums">{option.count}</span>
          </button>
        ))}
      </div>

      <div className="journal-search-group">
        <label className="journal-search">
          <span className="sr-only">{t.searchLabel}</span>
          <SearchIcon aria-hidden className="ml-3 size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.8} />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t.searchPlaceholder}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="h-full w-full min-w-0 appearance-none bg-transparent px-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label={t.clear}
              className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            >
              <XIcon aria-hidden className="size-3.5" strokeWidth={1.8} />
            </button>
          )}
        </label>
      </div>
    </nav>
  )
}
