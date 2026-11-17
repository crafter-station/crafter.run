"use client"

import { Check, Loader2, Search, Star } from "lucide-react"
import { useId, useState } from "react"

import { filterRepos, readyRepos, type RepoOption } from "@/lib/github-repos"
import type { NewShipCopy } from "@/lib/new-ship-copy"
import { fill } from "@/lib/onboarding-copy"

export const REPO_PAGE_SIZE = 12

/** The member's own repositories. A click imports the repository; nothing is published from here. */
export function RepoPicker({ repos, copy, busy, loading, onPick }: { repos: RepoOption[]; copy: NewShipCopy["link"]; busy: boolean; loading: string | null; onPick: (repo: RepoOption) => void }) {
  const filterId = useId()
  const [query, setQuery] = useState("")
  const [limit, setLimit] = useState(REPO_PAGE_SIZE)
  const matches = filterRepos(repos, query)
  const ready = readyRepos(matches)
  const rest = matches.filter((repo) => !ready.includes(repo))
  const shown = rest.slice(0, limit)

  return (
    <section className="ns-repos" aria-label={copy.yourRepos}>
      {ready.length > 0 ? (
        <div className="ns-ready">
          <p className="ns-ready-head">
            <strong>{ready.length === 1 ? copy.readyOne : fill(copy.readyMany, { n: ready.length })}</strong>
            <span>{copy.readyLede}</span>
          </p>
          <RepoList repos={ready} copy={copy} busy={busy} loading={loading} onPick={onPick} />
        </div>
      ) : null}
      <div className="ns-repos-head">
        <h3>{copy.yourRepos}</h3>
        <p className="ob-hint">{copy.yourReposLede}</p>
      </div>
      {repos.length > REPO_PAGE_SIZE ? (
        <div className="ob-affix ns-link">
          <Search aria-hidden="true" />
          <input
            id={filterId}
            type="search"
            value={query}
            aria-label={copy.filter}
            placeholder={copy.filterPlaceholder}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => {
              setQuery(event.target.value)
              setLimit(REPO_PAGE_SIZE)
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.preventDefault()
            }}
          />
        </div>
      ) : null}
      {shown.length > 0 ? <RepoList repos={shown} copy={copy} busy={busy} loading={loading} onPick={onPick} /> : ready.length === 0 ? <p className="ob-hint">{copy.noMatch}</p> : null}
      {rest.length > shown.length ? (
        <button type="button" className="ob-btn ob-btn-ghost ns-more" onClick={() => setLimit(limit + REPO_PAGE_SIZE)}>
          {copy.showMore}
        </button>
      ) : null}
    </section>
  )
}

function RepoList({ repos, copy, busy, loading, onPick }: { repos: RepoOption[]; copy: NewShipCopy["link"]; busy: boolean; loading: string | null; onPick: (repo: RepoOption) => void }) {
  return (
    <ul className="ns-repo-list">
      {repos.map((repo) => (
        <li key={repo.fullName}>
          <button type="button" className="ns-repo" disabled={busy || repo.hasShip} data-has-ship={repo.hasShip || undefined} onClick={() => onPick(repo)}>
            <span className="ns-repo-main">
              <span className="ns-repo-name">{repo.name}</span>
              {repo.description ? <span className="ns-repo-desc">{repo.description}</span> : null}
            </span>
            <span className="ns-repo-meta">
              {repo.hasShip ? (
                <span className="ns-repo-state"><Check aria-hidden="true" />{copy.hasShip}</span>
              ) : loading === repo.fullName ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <>
                  {repo.language ? <span>{repo.language}</span> : null}
                  {repo.stars > 0 ? <span className="ns-repo-stars"><Star aria-hidden="true" />{repo.stars}</span> : null}
                </>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
