"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Search, Star } from "lucide-react"
import { ProjectArt } from "@/components/project-art"
import type { Locale } from "@/lib/i18n"
import type { OssRepo } from "@/lib/oss"
import { filterOssRepos } from "@/lib/oss-filter"
import { stationCopy } from "@/lib/station-copy"

export function OssRepoGrid({ repos, eyebrow, title, intro, allLabel, filterLabel, descriptionPending, repoCta, locale }: {
  repos: (OssRepo & { openIssuesLabel: string })[]; eyebrow: string; title: string; intro: string;
  allLabel: string; filterLabel: string; descriptionPending: string; repoCta: string; locale: Locale;
}) {
  const t = stationCopy[locale]
  const [owner, setOwner] = useState("all")
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState("all")
  const owners = useMemo(() => {
    const counts = new Map<string, number>()
    for (const repo of repos) { const key = repo.repo.split("/")[0]; counts.set(key, (counts.get(key) ?? 0) + 1) }
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [repos])
  const languages = useMemo(() => [...new Set(repos.flatMap((repo) => repo.language ? [repo.language] : []))].sort(), [repos])
  const visible = useMemo(() => filterOssRepos(repos, { query, owner, language }), [repos, query, owner, language])
  const reset = () => { setQuery(""); setOwner("all"); setLanguage("all") }
  return (
    <section className="station-section" id="repositories">
      <div className="station-section-heading"><div><p className="station-eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>
      <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{intro}</p>
      <div className="station-filter-bar" role="search" aria-label={t.search}>
        <div className="station-search"><Search size={16} aria-hidden="true" />
          <label className="sr-only" htmlFor="oss-search">{t.search}</label>
          <input id="oss-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} />
        </div>
        <div><label className="sr-only" htmlFor="oss-owner">{filterLabel}</label>
          <select id="oss-owner" value={owner} onChange={(e) => setOwner(e.target.value)}>
            <option value="all">{allLabel} ({repos.length})</option>
            {owners.map(([name, count]) => <option key={name} value={name}>{name} ({count})</option>)}
          </select>
        </div>
        <div><label className="sr-only" htmlFor="oss-language">{t.language}</label>
          <select id="oss-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="all">{t.allLanguages}</option>
            {languages.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-6 flex min-h-6 items-center justify-between gap-4">
        <p role="status" aria-live="polite" aria-atomic="true" className="station-label text-muted-foreground">{visible.length} / {repos.length} {t.results}</p>
        {(query || owner !== "all" || language !== "all") && <button type="button" className="station-text-link" onClick={reset}>{t.reset} ×</button>}
      </div>
      <div className="station-project-grid">
        {visible.map((repo) => <article key={repo.repo} className="station-project-card">
          <ProjectArt name={repo.name} label={repo.language ?? "Open source"} />
          <div className="station-project-info">
            <div className="station-project-repo">{repo.repo}</div>
            <h3><Link href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{repo.name}</Link></h3>
            <p className="text-muted-foreground">{repo.description ?? descriptionPending}</p>
            <div className="station-project-meta">
              <span className="inline-flex items-center gap-1.5"><Star size={12} aria-hidden="true" />{repo.stars.toLocaleString(locale)}</span>
              <span>{repo.openIssuesLabel}</span>
              {repo.language && <span className="ml-auto">{repo.language}</span>}
            </div>
            <div className="station-project-foot"><Link className="station-text-link" href={repo.url} target="_blank" rel="noopener noreferrer">{repoCta}<ArrowUpRight size={15} aria-hidden="true" /></Link></div>
          </div>
        </article>)}
        {visible.length === 0 && <div className="station-empty"><p>{t.empty}</p><button className="station-button" onClick={reset} type="button">{t.reset}</button></div>}
      </div>
    </section>
  )
}
