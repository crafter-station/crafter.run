"use client"

import { type CSSProperties, useMemo, useState } from "react"
import Link from "next/link"
import { ChevronDown, Code2, Search, Star, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import type { OssRepo } from "@/lib/oss"
import { filterOssRepos } from "@/lib/oss-filter"
import { stationCopy } from "@/lib/station-copy"
import { HomeHead } from "@/components/home-head"
import { RepoLogo } from "@/components/oss-logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function OssRepoGrid({ repos, eyebrow, title, intro, starsLabel, allLabel, filterLabel, descriptionPending, repoCta, locale }: {
  repos: (OssRepo & { openIssuesLabel: string })[]; eyebrow: string; title: string; intro: string;
  starsLabel: string; allLabel: string; filterLabel: string; descriptionPending: string; repoCta: string; locale: Locale;
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
  const languages = useMemo(() => [...new Set(repos.flatMap(repo => repo.language ? [repo.language] : []))].sort(), [repos])
  const visible = useMemo(() => filterOssRepos(repos, { query, owner, language }), [repos, query, owner, language])
  const reset = () => { setQuery(""); setOwner("all"); setLanguage("all") }
  const filtered = query.trim() !== "" || owner !== "all" || language !== "all"

  const lastSpan = (columns: number) => 1 + ((columns - (visible.length % columns)) % columns)

  return (
    <section className="oss-catalog" id="repositories" aria-labelledby="oss-catalog-title">
      <HomeHead id="oss-catalog-title" index={1} label={eyebrow} title={title} lede={intro} />
      <div className="oss-filter-bar" role="search" aria-label={t.search}>
        <div className="oss-search"><Search size={17} aria-hidden="true" />
          <label className="sr-only" htmlFor="oss-search">{t.search}</label>
          <input id="oss-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.searchPlaceholder} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="oss-filter-control" aria-label={t.language}><Code2 size={15} aria-hidden="true" /><span>{language === "all" ? t.allLanguages : language}</span><ChevronDown size={14} aria-hidden="true" /></DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} collisionPadding={16} className="station-preference-menu oss-filter-menu">
            <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
              <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
              <DropdownMenuRadioItem value="all">{t.allLanguages}</DropdownMenuRadioItem>
              {languages.map(name => <DropdownMenuRadioItem key={name} value={name}>{name}</DropdownMenuRadioItem>)}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="home-tabs oss-owner-tabs" role="group" aria-label={filterLabel}>
        <button type="button" aria-pressed={owner === "all"} onClick={() => setOwner("all")}>{allLabel}<span>{repos.length}</span></button>
        {owners.map(([name, count]) => <button key={name} type="button" aria-pressed={owner === name} onClick={() => setOwner(owner === name ? "all" : name)}>{name}<span>{count}</span></button>)}
      </div>
      <div className="oss-results home-label-sm">
        <p role="status" aria-live="polite" aria-atomic="true">{visible.length} / {repos.length} {t.results}</p>
        {filtered && <button type="button" onClick={reset}>{t.reset}<X size={13} aria-hidden="true" /></button>}
      </div>
      <div className="oss-repo-grid tile-grid home-frame" style={{ "--s3": lastSpan(3), "--s2": lastSpan(2) } as CSSProperties}>
        {visible.map(repo => (
          <article key={repo.repo} className="oss-repo-card">
            <Link className="oss-repo-card-link" href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={`${repoCta}: ${repo.repo}`}>
              <div className="oss-card-top home-label-sm"><span>{repo.repo.split("/")[0]}</span><span className="oss-star-count"><Star size={12} aria-hidden="true" /><span>{repo.stars.toLocaleString(locale)}<span className="sr-only"> {starsLabel}</span></span></span></div>
              <RepoLogo name={repo.name} size="lg" />
              <h3>{repo.name}</h3>
              <p className="oss-card-description">{repo.description ?? descriptionPending}</p>
              <div className="oss-card-footer home-label-sm">
                {repo.language && <span className="oss-language-tag"><i aria-hidden="true" />{repo.language}</span>}
                <span className="oss-issues" title={repo.openIssuesLabel}>{repo.openIssuesLabel}</span>
              </div>
              <span className="oss-card-action home-secondary-link">{repoCta}</span>
            </Link>
          </article>
        ))}
        {visible.length === 0 && <div className="oss-empty"><Search size={28} strokeWidth={1} aria-hidden="true" /><p>{t.empty}</p><button className="hero-cta" onClick={reset} type="button">{t.reset}</button></div>}
      </div>
    </section>
  )
}
