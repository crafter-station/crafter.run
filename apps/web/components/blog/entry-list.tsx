"use client"

import Link from "next/link"
import { useMemo, useState, type ReactNode } from "react"
import { AuthorByline } from "@/components/blog/avatar"
import { JournalArtwork, journalCover } from "@/components/blog/artwork"
import type { EntryView } from "@/components/blog/entry-view"
import { BlogNav, type KindFilter, type NavCopy } from "@/components/blog/nav"
import type { BlogKind } from "@/lib/blog"

/** Every article is server-rendered. Only search and topic filters hydrate. */
export function BlogIndex({ entries, kindOrder, t, children }: {
  entries: EntryView[]; kindOrder: readonly BlogKind[]
  t: NavCopy & { searchEmpty: string; readPost: string; empty: string }; children?: ReactNode
}) {
  const [kind, setKind] = useState<KindFilter>("all")
  const [query, setQuery] = useState("")
  const kinds = useMemo(() => kindOrder.filter(k => entries.some(e => e.kind === k)), [entries, kindOrder])
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: entries.length }
    for (const entry of entries) result[entry.kind] = (result[entry.kind] ?? 0) + 1
    return result
  }, [entries])
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return entries.filter(entry => (kind === "all" || entry.kind === kind) &&
      (!needle || `${entry.title} ${entry.summary} ${entry.byline}`.toLowerCase().includes(needle)))
  }, [entries, kind, query])
  const filtered = kind !== "all" || query.trim() !== ""
  return <section className="journal-index">
    <BlogNav active={kind} onChange={setKind} query={query} onQueryChange={setQuery} order={kinds} counts={counts} t={t} />
    <p className="journal-results" role="status" aria-live="polite">{visible.length === 1 ? t.resultOne : t.results.replace("{count}", String(visible.length))}</p>
    {visible.length === 0 ? <div className="journal-empty"><p>{entries.length ? t.searchEmpty : t.empty}</p>
      {filtered && <button type="button" onClick={() => { setKind("all"); setQuery("") }}>{t.reset}</button>}
    </div> : <div className={`journal-grid${filtered ? " journal-grid-filtered" : ""}`}>
      {visible.map((entry, index) => <article key={`${entry.locale}-${entry.slug}`}
        className={`journal-card journal-cover-${journalCover(entry.slug)}${!filtered && index === 0 ? " journal-card-lead" : ""}${!filtered && index === 3 ? " journal-card-wide" : ""}`}>
        <Link href={entry.href} hrefLang={entry.locale} className="journal-card-link">
          <div className="journal-card-visual"><span className="journal-topic">{entry.kindLabel}</span>
            <JournalArtwork slug={entry.slug} /></div>
          <div className="journal-card-body">
            <div className="journal-card-meta"><time dateTime={entry.date}>{entry.dateShort}</time><span>{entry.reading}</span></div>
            <h2>{entry.title}</h2><p className="journal-summary">{entry.summary}</p>
            {entry.languageNote && <span className="journal-language">{entry.languageNote}</span>}
            <div className="journal-card-foot"><AuthorByline authors={entry.authors} label={entry.byline} /><span>{t.readPost}</span></div>
          </div>
        </Link>
      </article>)}
    </div>}
    {!filtered && children}
  </section>
}
