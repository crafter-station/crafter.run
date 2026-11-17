"use client"

import { Building2, Github, Loader2, RotateCw } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { RepoPicker, type RepoSelection } from "@/components/new-ship/repo-picker"
import { GITHUB_LOGIN, markShipped, type OwnerKind, type RepoOption } from "@/lib/github-repos"
import type { NewShipCopy } from "@/lib/new-ship-copy"
import { fill } from "@/lib/onboarding-copy"

export type Owner = { login: string; kind: OwnerKind }
type Load = { status: "loading" } | { status: "ready"; repos: RepoOption[] } | { status: "notFound" } | { status: "error" }

const ownerKey = (owner: Owner) => owner.login.toLowerCase()

/** Repositories per GitHub owner, fetched on first use and kept for the session. Nothing is requested until an owner is chosen. */
export function useOwnerRepos(shipUrls: readonly string[]) {
  const [loads, setLoads] = useState<Record<string, Load>>({})
  const inflight = useRef(new Map<string, Promise<RepoOption[]>>())

  const load = useCallback(
    (owner: Owner, force = false): Promise<RepoOption[]> => {
      const key = ownerKey(owner)
      const running = inflight.current.get(key)
      if (running && !force) return running
      setLoads((current) => ({ ...current, [key]: { status: "loading" } }))
      const request = fetch(`/api/ship-import/repos?owner=${encodeURIComponent(owner.login)}&kind=${owner.kind}`)
        .then(async (response) => {
          if (response.status === 404) {
            setLoads((current) => ({ ...current, [key]: { status: "notFound" } }))
            return []
          }
          const body = (await response.json().catch(() => null)) as { repos?: RepoOption[] } | null
          if (!response.ok || !Array.isArray(body?.repos)) throw new Error("repos")
          const repos = markShipped(body.repos, shipUrls)
          setLoads((current) => ({ ...current, [key]: { status: "ready", repos } }))
          return repos
        })
        .catch(() => {
          inflight.current.delete(key)
          setLoads((current) => ({ ...current, [key]: { status: "error" } }))
          return []
        })
      inflight.current.set(key, request)
      return request
    },
    [shipUrls],
  )

  const known = Object.values(loads).flatMap((entry) => (entry.status === "ready" ? entry.repos : []))
  return { loads, load, known }
}

type Props = {
  githubLogin: string | null
  owner: Owner | null
  onOwner: (owner: Owner) => void
  loads: Record<string, Load>
  load: (owner: Owner, force?: boolean) => Promise<RepoOption[]>
  copy: NewShipCopy["link"]
  batch: NewShipCopy["batch"]
  busy: boolean
  loading: string | null
  onPick: (repo: RepoOption) => void
  selection?: RepoSelection
  onStartSelection?: () => void
  /** Hides the divider when the section stands alone, as in selection mode. */
  standalone?: boolean
}

/** Import from GitHub: choose your account or an organization first, then pick from its latest repositories. */
export function GithubImport({ githubLogin, owner, onOwner, loads, load, copy, batch, busy, loading, onPick, selection, onStartSelection, standalone }: Props) {
  const [orgsOpen, setOrgsOpen] = useState(owner?.kind === "org")
  const [orgs, setOrgs] = useState<string[] | null>(null)
  const [orgName, setOrgName] = useState("")

  useEffect(() => {
    if (owner) void load(owner)
  }, [owner, load])

  function openOrgs() {
    setOrgsOpen(true)
    if (orgs !== null) return
    fetch("/api/ship-import/orgs")
      .then((response) => (response.ok ? response.json() : { orgs: [] }))
      .then((body: { orgs?: string[] }) => setOrgs(Array.isArray(body.orgs) ? body.orgs : []))
      .catch(() => setOrgs([]))
  }

  function submitOrg() {
    const name = orgName.trim().replace(/^@/, "").replace(/^https?:\/\/github\.com\//i, "").split("/")[0] ?? ""
    if (GITHUB_LOGIN.test(name)) onOwner({ login: name, kind: "org" })
  }

  const current = owner ? loads[ownerKey(owner)] : undefined
  const isOwner = (login: string) => owner?.login.toLowerCase() === login.toLowerCase()

  return (
    <section className="ns-gh" aria-label={copy.orGithub}>
      {standalone ? null : <p className="ns-or">{copy.orGithub}</p>}
      <div className="ns-owners" role="group" aria-label={copy.owners}>
        {githubLogin ? (
          <button type="button" className="ns-owner" aria-pressed={isOwner(githubLogin)} onClick={() => onOwner({ login: githubLogin, kind: "user" })}>
            <Github aria-hidden="true" />@{githubLogin}
          </button>
        ) : null}
        {orgsOpen && orgs
          ? orgs.map((org) => (
              <button type="button" key={org} className="ns-owner" aria-pressed={isOwner(org)} onClick={() => onOwner({ login: org, kind: "org" })}>
                <Building2 aria-hidden="true" />{org}
              </button>
            ))
          : null}
        {orgsOpen ? null : (
          <button type="button" className="ns-owner" aria-expanded={false} onClick={openOrgs}>
            <Building2 aria-hidden="true" />{copy.orgChip}
          </button>
        )}
      </div>
      {orgsOpen ? (
        <div className="ns-org-row">
          {orgs === null ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
          <div className="ob-affix ns-link">
            <Building2 aria-hidden="true" />
            <input
              type="text"
              value={orgName}
              aria-label={copy.orgChip}
              placeholder={copy.orgPlaceholder}
              autoCapitalize="none"
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setOrgName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return
                event.preventDefault()
                submitOrg()
              }}
            />
          </div>
          <button type="button" className="ob-btn ob-btn-ghost" onClick={submitOrg} disabled={!orgName.trim()}>
            {copy.orgGo}
          </button>
          {orgs?.length === 0 ? <p className="ob-hint ns-org-hint">{copy.noOrgs}</p> : null}
        </div>
      ) : null}

      {owner && current?.status === "loading" ? (
        <p className="ob-hint ns-gh-state" aria-live="polite"><Loader2 className="animate-spin" aria-hidden="true" />{copy.loadingRepos}</p>
      ) : null}
      {owner && current?.status === "notFound" ? <p className="ob-error" role="alert">{copy.ownerNotFound}</p> : null}
      {owner && current?.status === "error" ? (
        <p className="ob-error ns-gh-state" role="alert">
          {copy.reposFailed}
          <button type="button" className="ns-inline" onClick={() => void load(owner, true)}><RotateCw aria-hidden="true" />{copy.retry}</button>
        </p>
      ) : null}
      {owner && current?.status === "ready" ? (
        current.repos.length === 0 ? (
          <p className="ob-hint">{copy.noRepos}</p>
        ) : (
          <RepoPicker
            key={ownerKey(owner)}
            title={owner.kind === "user" && owner.login === githubLogin ? copy.yourRepos : fill(copy.orgRepos, { owner: owner.login })}
            repos={current.repos}
            copy={copy}
            batch={batch}
            busy={busy}
            loading={loading}
            onPick={onPick}
            selection={selection}
            onStartSelection={onStartSelection}
          />
        )
      ) : null}
    </section>
  )
}
