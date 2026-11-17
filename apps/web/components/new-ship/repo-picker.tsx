"use client"

import { Check, Loader2, Search, Star } from "lucide-react"
import { useId, useState } from "react"

import { filterRepos, readyRepos, type RepoOption } from "@/lib/github-repos"
import type { NewShipCopy } from "@/lib/new-ship-copy"
import { fill } from "@/lib/onboarding-copy"

export const REPO_PAGE_SIZE = 12

/** The member's own repositories. A click imports the repository; nothing is published from here. */
export type RepoSelection = {
  /** Lowercase `owner/name` keys of the ticked repositories. */
  selected: ReadonlySet<string>
  onToggle: (repo: RepoOption) => void
  onSelectAll: (repos: RepoOption[]) => void
  onReview: () => void
  onExit: () => void
}

export const repoSelectionKey = (repo: RepoOption) => repo.fullName.toLowerCase()

/** The member's own repositories. A click imports the repository; nothing is published from here.
 * In `selection` mode the rows are checkboxes and a bar at the bottom starts the batch review. */
export function RepoPicker({
  repos,
  copy,
  batch,
  busy,
  loading,
  onPick,
  selection,
  onStartSelection,
}: {
  repos: RepoOption[]
  copy: NewShipCopy["link"]
  batch: NewShipCopy["batch"]
  busy: boolean
  loading: string | null
  onPick: (repo: RepoOption) => void
  selection?: RepoSelection
  /** Offered when at least two repositories can still become a Ship. */
  onStartSelection?: () => void
}) {
  const filterId = useId()
  const [query, setQuery] = useState("")
  const [limit, setLimit] = useState(REPO_PAGE_SIZE)
  const matches = filterRepos(repos, query)
  const ready = readyRepos(matches)
  const rest = matches.filter((repo) => !ready.includes(repo))
  const shown = rest.slice(0, limit)
  const canSelect = repos.filter((repo) => !repo.hasShip).length >= 2

  return (
    <section className="ns-repos" aria-label={copy.yourRepos}>
      {ready.length > 0 ? (
        <div className="ns-ready">
          <p className="ns-ready-head">
            <strong>{ready.length === 1 ? copy.readyOne : fill(copy.readyMany, { n: ready.length })}</strong>
            <span>{copy.readyLede}</span>
          </p>
          {selection ? (
            <button type="button" className="ob-btn ob-btn-ghost ns-select-all" onClick={() => selection.onSelectAll(ready)}>
              {fill(batch.selectAll, { n: ready.length })}
            </button>
          ) : null}
          <RepoList repos={ready} copy={copy} busy={busy} loading={loading} onPick={onPick} selection={selection} />
        </div>
      ) : null}
      <div className="ns-repos-head">
        <div className="ns-repos-title">
          <h3>{copy.yourRepos}</h3>
          {selection ? (
            <button type="button" className="ns-inline" onClick={selection.onExit}>{batch.selectCancel}</button>
          ) : canSelect && onStartSelection ? (
            <button type="button" className="ns-inline" onClick={onStartSelection}>{batch.selectToggle}</button>
          ) : null}
        </div>
        <p className="ob-hint">{selection ? batch.selectLede : copy.yourReposLede}</p>
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
      {shown.length > 0 ? <RepoList repos={shown} copy={copy} busy={busy} loading={loading} onPick={onPick} selection={selection} /> : ready.length === 0 ? <p className="ob-hint">{copy.noMatch}</p> : null}
      {rest.length > shown.length ? (
        <button type="button" className="ob-btn ob-btn-ghost ns-more" onClick={() => setLimit(limit + REPO_PAGE_SIZE)}>
          {copy.showMore}
        </button>
      ) : null}
      {selection ? (
        <section className="ns-bar" aria-label={batch.review}>
          <span className="ns-bar-count" aria-live="polite">{fill(batch.selected, { n: selection.selected.size })}</span>
          <button type="button" className="ob-btn ob-btn-primary" disabled={selection.selected.size === 0} onClick={selection.onReview}>
            {batch.review}
          </button>
        </section>
      ) : null}
    </section>
  )
}

function RepoList({ repos, copy, busy, loading, onPick, selection }: { repos: RepoOption[]; copy: NewShipCopy["link"]; busy: boolean; loading: string | null; onPick: (repo: RepoOption) => void; selection?: RepoSelection }) {
  return (
    <ul className="ns-repo-list">
      {repos.map((repo) => (
        <li key={repo.fullName}>
          {selection ? (
            <label className="ns-repo" data-has-ship={repo.hasShip || undefined} data-checked={selection.selected.has(repoSelectionKey(repo)) || undefined}>
              <input
                type="checkbox"
                className="ns-repo-check"
                checked={selection.selected.has(repoSelectionKey(repo))}
                disabled={repo.hasShip}
                onChange={() => selection.onToggle(repo)}
              />
              <RepoBody repo={repo} copy={copy} loading={null} />
            </label>
          ) : (
          <button type="button" className="ns-repo" disabled={busy || repo.hasShip} data-has-ship={repo.hasShip || undefined} onClick={() => onPick(repo)}>
            <RepoBody repo={repo} copy={copy} loading={loading} />
          </button>
          )}
        </li>
      ))}
    </ul>
  )
}

function RepoBody({ repo, copy, loading }: { repo: RepoOption; copy: NewShipCopy["link"]; loading: string | null }) {
  return (
    <>
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
    </>
  )
}
