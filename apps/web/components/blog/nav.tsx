"use client"

/**
 * Index filter row: topic pills, title search, feed link.
 *
 * Filters in place rather than routing each topic to its own page: the kinds
 * are a display label, not a taxonomy, so there are no per-kind URLs for a
 * crawler to spend budget on. Every entry is still in the server-rendered
 * HTML; the filter starts empty, so the markup a crawler reads is the full
 * list.
 */
import { RssIcon, SearchIcon, XIcon } from "lucide-react"

import type { BlogCopy } from "@/components/blog/copy"
import type { BlogKind } from "@/lib/blog"

export type KindFilter = BlogKind | "all"

export type NavCopy = BlogCopy["nav"] & {
  kinds: BlogCopy["kinds"]
  subscribe: string
}

const PILL =
  "inline-flex h-8 cursor-pointer items-center gap-2 border border-line px-3 font-mono text-[10px] " +
  "uppercase tracking-[0.2em] transition-colors hover:bg-accent-surface/10 " +
  "aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

const ICON_BUTTON =
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center border border-line " +
  "text-muted-foreground transition-colors hover:bg-accent-surface/10 hover:text-foreground " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export function BlogNav({
  active,
  onChange,
  query,
  onQueryChange,
  order,
  counts,
  feedHref,
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
  feedHref: string
  t: NavCopy
}) {
  const options: { key: KindFilter; label: string; count: number }[] = [
    { key: "all", label: t.all, count: counts.all ?? 0 },
    ...order.map((kind) => ({ key: kind as KindFilter, label: t.kinds[kind], count: counts[kind] ?? 0 })),
  ]

  return (
    <nav
      aria-label={t.filterLabel}
      className="flex flex-col gap-4 px-6 py-5 md:px-10 lg:flex-row lg:items-center lg:justify-between"
    >
      <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            aria-pressed={option.key === active}
            onClick={() => onChange(option.key)}
            className={PILL}
          >
            {option.label}
            <span className="opacity-60 tabular-nums">{option.count}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="flex h-9 w-full items-center border border-line transition-colors focus-within:border-foreground lg:w-64">
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
              aria-label="Clear"
              className="mr-1 inline-flex size-7 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <XIcon aria-hidden className="size-3.5" strokeWidth={1.8} />
            </button>
          )}
        </label>

        <a href={feedHref} aria-label={t.subscribe} title={t.subscribe} className={ICON_BUTTON}>
          <RssIcon aria-hidden className="size-4" strokeWidth={1.8} />
        </a>
      </div>
    </nav>
  )
}
