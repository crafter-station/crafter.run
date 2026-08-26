"use client"

/**
 * The index: a date-railed timeline of posts.
 *
 * The rail is what separates this from a plain list. The date is structure,
 * not metadata, so it gets its own column with the site's hairline running
 * between it and the entries, and a square tick on the line at every rung.
 * Posts published the same day share one rung, which is why the list is
 * grouped rather than flat.
 *
 * Built on the site's bordered grid rather than a nested rail of its own: the
 * vertical line is the same `border-line` every other page uses between cells,
 * so the blog reads as part of the site and not as a widget dropped into it.
 *
 * Client-side for the filter and search state only. First render has no
 * filter and no query, so the server-rendered HTML is the complete list.
 */
import Link from "next/link"
import { Fragment, useMemo, useState } from "react"

import { ArrowLink } from "@/components/arrow-link"
import { AuthorByline } from "@/components/blog/avatar"
import { groupByDate, type EntryView } from "@/components/blog/entry-view"
import { BlogNav, type KindFilter, type NavCopy } from "@/components/blog/nav"
import { Container } from "@/components/grid-container"
import type { BlogKind } from "@/lib/blog"

export function BlogIndex({
  entries,
  kindOrder,
  feedHref,
  t,
  children,
}: {
  entries: EntryView[]
  /** Canonical kind order. Passed in rather than imported: the module that
      declares it also reads the content directory, and `node:fs` has no
      business in a client bundle. */
  kindOrder: readonly BlogKind[]
  feedHref: string
  t: NavCopy & { searchEmpty: string; readPost: string; empty: string }
  /** Pagination, rendered on the server and slotted below the list. */
  children?: React.ReactNode
}) {
  const [kind, setKind] = useState<KindFilter>("all")
  const [query, setQuery] = useState("")

  const kinds = useMemo(
    () => kindOrder.filter((k) => entries.some((e) => e.kind === k)),
    [entries, kindOrder],
  )

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: entries.length }
    for (const entry of entries) result[entry.kind] = (result[entry.kind] ?? 0) + 1
    return result
  }, [entries])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return entries.filter(
      (entry) =>
        (kind === "all" || entry.kind === kind) &&
        (needle === "" ||
          entry.title.toLowerCase().includes(needle) ||
          entry.summary.toLowerCase().includes(needle)),
    )
  }, [entries, kind, query])

  const groups = useMemo(() => groupByDate(visible), [visible])
  const filtered = kind !== "all" || query.trim() !== ""

  return (
    <>
      <Container innerClassName="border-b">
        <BlogNav
          active={kind}
          onChange={setKind}
          query={query}
          onQueryChange={setQuery}
          order={kinds}
          counts={counts}
          feedHref={feedHref}
          t={t}
        />
      </Container>

      <Container>
        {entries.length === 0 ? (
          <p className="px-6 py-24 text-center text-sm text-muted-foreground md:px-10">{t.empty}</p>
        ) : groups.length === 0 ? (
          <p className="px-6 py-24 text-center text-sm text-muted-foreground md:px-10">
            {t.searchEmpty}
          </p>
        ) : (
          <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] md:grid-cols-[11rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)]">
            {groups.map((group, i) => (
              <Fragment key={group.date}>
                {/* The rung. Sticky under the header on wide screens so the
                    date stays in view while a long day scrolls past it. The
                    tick is a 5px square on the shared hairline, in the same
                    pixel language as the site's arrows. */}
                <div
                  className={`relative border-r border-line px-4 py-8 md:px-8 lg:sticky lg:top-24 lg:self-start ${
                    i > 0 ? "border-t" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute -right-[3px] top-[calc(2rem+0.3rem)] size-[5px] bg-foreground"
                  />
                  <time
                    dateTime={group.date}
                    className="block font-mono text-[10px] uppercase leading-5 tracking-[0.25em] text-foreground"
                  >
                    <span className="hidden md:inline">{group.long}</span>
                    <span className="md:hidden">{group.short}</span>
                  </time>
                </div>

                <ul className={`min-w-0 ${i > 0 ? "border-t border-line" : ""}`}>
                  {group.entries.map((entry, j) => (
                    <li key={`${entry.locale}-${entry.slug}`} className={j > 0 ? "border-t border-line" : ""}>
                      <article>
                        <Link
                          href={entry.href}
                          hrefLang={entry.locale}
                          className="group flex flex-col gap-4 px-5 py-8 transition-colors hover:bg-accent-surface/10 focus-visible:bg-accent-surface/10 focus-visible:outline-none md:px-10 md:py-10"
                        >
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                            <span className="text-accent">{entry.kindLabel}</span>
                            <span aria-hidden>·</span>
                            <span>{entry.reading}</span>
                            {entry.languageNote && (
                              <>
                                <span aria-hidden>·</span>
                                <span className="border border-line px-1.5 py-0.5 tracking-[0.15em]">
                                  {entry.languageNote}
                                </span>
                              </>
                            )}
                          </div>
                          <h2 className="max-w-3xl text-balance text-2xl tracking-tight md:text-[2rem] md:leading-[1.15]">
                            {entry.title}
                          </h2>
                          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                            {entry.summary}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                            <AuthorByline authors={entry.authors} label={entry.byline} />
                            <ArrowLink>{t.readPost}</ArrowLink>
                          </div>
                        </Link>
                      </article>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </div>
        )}

        {/* Paging a filtered view would walk the reader into the unfiltered
            page 2 and silently drop their filter. */}
        {!filtered && children}
      </Container>
    </>
  )
}
