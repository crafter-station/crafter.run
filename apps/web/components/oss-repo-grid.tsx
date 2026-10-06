"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronDown, Code2, Search, Star, Users, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import type { OssRepo } from "@/lib/oss"
import { filterOssRepos } from "@/lib/oss-filter"
import { stationCopy } from "@/lib/station-copy"
import { OssProjectArt } from "@/components/oss-art"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const featuredArt: Record<string, string> = {
  "crafter-station/petdex": "petdex",
  "Railly/agentfiles": "agentfiles",
  "Railly/tinte": "tinte",
  "crafter-station/elements": "elements",
}

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

  return (
    <section className="oss-catalog" id="repositories" aria-labelledby="oss-catalog-title">
      <div className="oss-catalog-heading">
        <p className="station-label">{eyebrow}</p>
        <h2 id="oss-catalog-title">{title}</h2>
        <p className="oss-catalog-intro">{intro}</p>
      </div>
      <div className="oss-filter-bar" role="search" aria-label={t.search}>
        <div className="oss-search"><Search size={17} aria-hidden="true" />
          <label className="sr-only" htmlFor="oss-search">{t.search}</label>
          <input id="oss-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.searchPlaceholder} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="oss-filter-control" aria-label={filterLabel}><Users size={15} aria-hidden="true" /><span>{owner === "all" ? allLabel : owner}</span><ChevronDown size={14} aria-hidden="true" /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} collisionPadding={16} className="station-preference-menu oss-filter-menu">
            <DropdownMenuLabel>{filterLabel}</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={owner} onValueChange={setOwner}>
              <DropdownMenuRadioItem value="all">{allLabel}<span className="oss-option-count">{repos.length}</span></DropdownMenuRadioItem>
              {owners.map(([name, count]) => <DropdownMenuRadioItem key={name} value={name}>{name}<span className="oss-option-count">{count}</span></DropdownMenuRadioItem>)}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="oss-filter-control" aria-label={t.language}><Code2 size={15} aria-hidden="true" /><span>{language === "all" ? t.allLanguages : language}</span><ChevronDown size={14} aria-hidden="true" /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} collisionPadding={16} className="station-preference-menu oss-filter-menu">
            <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
              <DropdownMenuRadioItem value="all">{t.allLanguages}</DropdownMenuRadioItem>
              {languages.map(name => <DropdownMenuRadioItem key={name} value={name}>{name}</DropdownMenuRadioItem>)}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="oss-results">
        <p role="status" aria-live="polite" aria-atomic="true">{visible.length} / {repos.length} {t.results}</p>
        {filtered && <button type="button" onClick={reset}>{t.reset}<X size={13} aria-hidden="true" /></button>}
      </div>
      <div className={`oss-repo-grid${filtered ? " is-filtered" : ""}`}>
        {visible.map(repo => {
          const art = featuredArt[repo.repo]
          return (
            <article key={repo.repo} className={`oss-repo-card${art ? ` oss-card-${art} has-art` : ""}`}>
              <Link className="oss-repo-card-link" href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={`${repoCta}: ${repo.repo}`}>
                <div className="oss-card-top"><span>{repo.repo.split("/")[0]}</span><span className="oss-star-count"><Star size={12} aria-hidden="true" /><span>{repo.stars.toLocaleString(locale)}<span className="sr-only"> {starsLabel}</span></span></span></div>
                {art && <div className="oss-project-art"><OssProjectArt name={art} /></div>}
                <h3>{repo.name}</h3>
                <p className="oss-card-description">{repo.description ?? descriptionPending}</p>
                <div className="oss-card-footer">
                  {repo.language && <span className="oss-language-tag"><i aria-hidden="true" />{repo.language}</span>}
                  <span className="oss-issues" title={repo.openIssuesLabel}>{repo.openIssuesLabel}</span>
                </div>
                <span className="oss-card-action">{repoCta}</span>
              </Link>
            </article>
          )
        })}
        {visible.length === 0 && <div className="oss-empty"><Search size={28} strokeWidth={1} aria-hidden="true" /><p>{t.empty}</p><button className="oss-button" onClick={reset} type="button">{t.reset}</button></div>}
      </div>
    </section>
  )
}
