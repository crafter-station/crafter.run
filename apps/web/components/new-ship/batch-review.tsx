"use client"

import { useAuth } from "@clerk/nextjs"
import { ArrowRight, Check, ChevronDown, ChevronLeft, Github, Loader2, Rocket, Send, Trash2, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"

import { Problem, SlugField } from "@/components/new-ship/fields"
import { ShipPreview } from "@/components/new-ship/ship-preview"
import { TextAreaField, TextField } from "@/components/onboarding/fields"
import { repoKey, type RepoOption } from "@/lib/github-repos"
import type { Locale } from "@/lib/i18n"
import {
  batchCounts,
  batchReducer,
  classifyPublishFailure,
  isRowReady,
  msUntilNextUtcMinute,
  needsDetails,
  rowProblems,
  type BatchRow,
} from "@/lib/new-ship-batch"
import { newShipCopy, type NewShipCopy } from "@/lib/new-ship-copy"
import { ImportError, SHIP_LIMITS, slugifyShip, type ShipFields } from "@/lib/new-ship-draft"
import { importAnyLink } from "@/lib/new-ship-import"
import { fill } from "@/lib/onboarding-copy"
import { publishShip } from "@/lib/publish-ship"
import { ShipsApiError } from "@/lib/ships-client"

/** How many repositories are read from GitHub at once. */
const IMPORT_CONCURRENCY = 3

const rowId = (url: string) => repoKey(url) ?? url.toLowerCase()

type Props = {
  locale: Locale
  handle: string
  firstShip: boolean
  /** Repository URLs to review. New entries are added and read; entries never disappear from here. */
  urls: string[]
  repos: RepoOption[]
  /** Returns to the repository list, with the keys of the rows that are still unfinished. */
  onBack: (unfinished: string[]) => void
}

/** Reviews several repositories, fixes what is missing inline and publishes the ready ones one after another. */
export function BatchReview({ locale, handle, firstShip, urls, repos, onBack }: Props) {
  const copy = newShipCopy[locale]
  const { getToken } = useAuth()
  const router = useRouter()
  const [rows, dispatch] = useReducer(batchReducer, [])
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set())
  const [running, setRunning] = useState(false)
  const [ran, setRan] = useState(false)
  const [waitUntil, setWaitUntil] = useState<number | null>(null)
  const [now, setNow] = useState(0)

  const rowsRef = useRef(rows)
  rowsRef.current = rows
  const alive = useRef(true)
  const seen = useRef(new Set<string>())
  const importQueue = useRef<string[]>([])
  const importing = useRef(0)
  const stopRef = useRef(false)
  const wake = useRef<(() => void) | null>(null)
  const sticky = useRef(new Map<string, Set<keyof ShipFields>>())
  const urlById = useRef(new Map<string, string>())

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])

  const pump = useCallback(() => {
    while (importing.current < IMPORT_CONCURRENCY) {
      const id = importQueue.current.shift()
      if (id === undefined) break
      const repo = urlById.current.get(id)
      if (!repo) continue
      importing.current += 1
      importAnyLink(repo)
        .then((result) => alive.current && dispatch({ type: "imported", id, result }))
        .catch((cause) => alive.current && dispatch({ type: "importFailed", id, key: cause instanceof ImportError ? cause.key : "importFailed" }))
        .finally(() => {
          importing.current -= 1
          pump()
        })
    }
  }, [])

  useEffect(() => {
    for (const url of urls) {
      const id = rowId(url)
      if (seen.current.has(id)) continue
      seen.current.add(id)
      urlById.current.set(id, url)
      dispatch({ type: "add", id, repo: url })
      importQueue.current.push(id)
    }
    pump()
  }, [urls, pump])

  useEffect(() => {
    if (waitUntil === null) return
    setNow(Date.now())
    const timer = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(timer)
  }, [waitUntil])

  useEffect(() => {
    if (!running) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [running])

  function sleep(ms: number) {
    return new Promise<void>((resolve) => {
      const timer = window.setTimeout(resolve, ms)
      wake.current = () => {
        window.clearTimeout(timer)
        resolve()
      }
    })
  }

  async function publishReady() {
    if (running) return
    const ids = rowsRef.current.filter((row) => isRowReady(row, rowsRef.current)).map((row) => row.id)
    if (ids.length === 0) return
    stopRef.current = false
    setRunning(true)
    setRan(true)
    dispatch({ type: "queueReady" })
    let published = 0
    outer: for (const id of ids) {
      while (true) {
        if (stopRef.current) break outer
        // Queued rows cannot be edited, so the fields read here are the ones that were validated.
        const row = rowsRef.current.find((item) => item.id === id)
        if (!row?.fields) break
        dispatch({ type: "start", id })
        let draft = row.draft
        try {
          const ship = await publishShip(
            { getToken, sessionExpired: copy.nav.sessionExpired, fields: row.fields, provenance: ["web form", ...row.provenance], existing: draft, reuseDraft: row.draftSaved },
            (saved) => {
              draft = saved
              if (alive.current) dispatch({ type: "drafted", id, draft: saved })
            },
          )
          if (alive.current) dispatch({ type: "published", id, status: ship.status === "pending" ? "pending" : "published", slug: ship.slug })
          published += 1
          break
        } catch (cause) {
          const api = cause instanceof ShipsApiError ? cause : null
          const failure = classifyPublishFailure(api, Boolean(draft))
          if (!alive.current) break outer
          if (failure.kind === "wait") {
            // The API allows 20 Ship mutations per UTC minute. The window resets on the next minute.
            dispatch({ type: "requeue", id })
            const wait = msUntilNextUtcMinute(Date.now())
            setWaitUntil(Date.now() + wait)
            await sleep(wait)
            setWaitUntil(null)
            continue
          }
          if (failure.kind === "slugTaken") dispatch({ type: "slugTaken", id })
          else dispatch({ type: "failed", id, message: cause instanceof Error ? cause.message : copy.nav.saveFailed })
          break
        }
      }
    }
    if (!alive.current) return
    dispatch({ type: "stop" })
    setWaitUntil(null)
    setRunning(false)
    if (published > 0) router.refresh()
  }

  function stop() {
    stopRef.current = true
    wake.current?.()
  }

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }

  const counts = batchCounts(rows)
  const unfinished = rows.filter((row) => row.phase !== "published" && row.phase !== "inReview")
  const finished = ran && !running
  const missingTopic = rows.filter((row) => (row.phase === "published" || row.phase === "inReview") && repoKey(row.repo) !== null && row.hasTopic !== true && !repos.some((repo) => repo.topic && repoKey(repo.url) === row.id)).length
  const waitSeconds = waitUntil === null ? 0 : Math.max(1, Math.ceil((waitUntil - now) / 1000))
  const importingCount = rows.filter((row) => row.phase === "importing").length

  return (
    <div className="ob">
      <div className="ob-card ns-batch">
        <div className="ob-panel">
          <h2>{copy.batch.reviewTitle}</h2>
          <p className="ob-lede">{copy.batch.reviewLede}</p>
        </div>

        {finished ? (
          <div className="ob-note ns-notice ns-batch-done" data-tone="ready" role="status">
            <Check aria-hidden="true" />
            <span>
              <strong>{copy.batch.doneTitle}</strong>
              <span className="ns-batch-counts">
                <span>{fill(copy.batch.countPublished, { n: counts.published })}</span>
                <span>{fill(copy.batch.countReview, { n: counts.inReview })}</span>
                <span>{fill(copy.batch.countNotPublished, { n: counts.notPublished })}</span>
              </span>
              {counts.inReview > 0 ? copy.done.pendingBody : null}
              {missingTopic > 0 ? (
                <span className="ns-batch-tip">
                  <Github aria-hidden="true" />
                  {fill(copy.batch.topicTip, { n: missingTopic })}
                </span>
              ) : null}
            </span>
          </div>
        ) : null}

        {rows.length === 0 ? <p className="ob-hint">{copy.batch.empty}</p> : null}
        <ul className="ns-brows">
          {rows.map((row) => (
            <BatchRowItem
              key={row.id}
              row={row}
              rows={rows}
              copy={copy}
              locale={locale}
              handle={handle}
              open={expanded.has(row.id)}
              sticky={sticky.current}
              disabled={running}
              onToggle={() => toggle(row.id)}
              onEdit={(patch) => dispatch({ type: "edit", id: row.id, patch })}
              onRetry={() => {
                urlById.current.set(row.id, row.repo)
                dispatch({ type: "retryImport", id: row.id })
                importQueue.current.push(row.id)
                pump()
              }}
              onRemove={() => dispatch({ type: "remove", id: row.id })}
            />
          ))}
        </ul>

        {waitUntil !== null ? (
          <p className="ob-note ns-wait" role="status">
            <Loader2 className="animate-spin" aria-hidden="true" />
            <span>
              <strong>{fill(copy.batch.waiting, { n: waitSeconds })}</strong> {copy.batch.waitingNote}
            </span>
          </p>
        ) : null}

        {firstShip && !ran && counts.ready > 0 ? (
          <p className="ob-note ns-notice" data-tone="review">
            <Send aria-hidden="true" />
            <span>
              <strong>{copy.preview.reviewTitle}</strong>
              {copy.done.pendingBody}
            </span>
          </p>
        ) : null}

        <div className="ob-actions ns-batch-actions">
          {finished && counts.published + counts.inReview > 0 ? (
            <Link className="ob-btn ob-btn-ghost" href={`/${locale}/ships`}>{copy.done.all}</Link>
          ) : (
            <button type="button" className="ob-btn ob-btn-ghost" disabled={running} onClick={() => onBack(unfinished.map((row) => row.id))}>
              <ChevronLeft aria-hidden="true" />
              {copy.batch.back}
            </button>
          )}
          <span className="ob-spacer" />
          {counts.skipped > 0 ? <span className="ns-skipped">{fill(copy.batch.skipped, { n: counts.skipped })}</span> : null}
          {finished ? <a className="ob-btn ob-btn-ghost" href={`/${locale}/ships/new?batch=1`}>{copy.batch.addSeveral}</a> : null}
          {running ? (
            <button type="button" className="ob-btn ob-btn-ghost" onClick={stop}>
              <X aria-hidden="true" />
              {copy.batch.stop}
            </button>
          ) : null}
          {finished && !running && unfinished.length === 0 ? null : (
          <button type="button" className="ob-btn ob-btn-primary" disabled={running || counts.ready === 0} onClick={() => void publishReady()}>
            {running ? (
              <><Loader2 className="animate-spin" aria-hidden="true" />{copy.batch.publishing}</>
            ) : (
              <>{ran ? copy.batch.publishRemaining : fill(copy.batch.publishReady, { n: counts.ready })}<Rocket aria-hidden="true" /></>
            )}
          </button>
          )}
        </div>
        {importingCount > 0 ? <p className="ob-hint" aria-live="polite">{copy.batch.importing}</p> : null}
      </div>
    </div>
  )
}

const FIELD_ORDER: (keyof ShipFields)[] = ["name", "slug", "tagline", "description", "repository", "website", "socialPostUrl", "imageUrl"]

function BatchRowItem({
  row,
  rows,
  copy,
  locale,
  handle,
  open,
  sticky,
  disabled,
  onToggle,
  onEdit,
  onRetry,
  onRemove,
}: {
  row: BatchRow
  rows: BatchRow[]
  copy: NewShipCopy
  locale: Locale
  handle: string
  open: boolean
  sticky: Map<string, Set<keyof ShipFields>>
  disabled: boolean
  onToggle: () => void
  onEdit: (patch: Partial<ShipFields>) => void
  onRetry: () => void
  onRemove: () => void
}) {
  const t = copy.batch
  const { fields } = row
  const problems = rowProblems(row, rows)
  const needs = needsDetails(row, rows)
  const editable = row.phase === "idle" || row.phase === "failed"
  const label = row.repo.replace(/^https?:\/\/(github\.com\/)?/i, "").replace(/\/$/, "")
  const cover = fields?.imageUrl.trim() || null

  // A field stays on screen once it was shown, so it does not vanish under the cursor when it becomes valid.
  const shown = sticky.get(row.id) ?? new Set<keyof ShipFields>()
  sticky.set(row.id, shown)
  if (editable) {
    for (const key of Object.keys(problems.issues) as (keyof ShipFields)[]) shown.add(key)
    if (problems.duplicateSlug || problems.slugTaken) shown.add("slug")
  }

  const state = row.phase === "idle" ? (needs ? "needs" : "ready") : row.phase
  const status: Record<string, string> = {
    importing: t.importing,
    importFailed: t.failed,
    ready: t.ready,
    needs: t.needs,
    queued: t.queued,
    publishing: t.publishing,
    published: t.published,
    inReview: t.inReview,
    failed: t.failed,
  }

  const slugHint = problems.issues.slug ? <Problem text={copy.errors[problems.issues.slug]} /> : problems.duplicateSlug ? <Problem text={t.slugDuplicate} /> : problems.slugTaken ? <Problem text={t.slugTaken} /> : <p className="ob-hint">{copy.details.slugHint}</p>
  const textProps = { autoCapitalize: "none", spellCheck: false, type: "url", inputMode: "url" } as const

  function field(key: keyof ShipFields) {
    if (!fields) return null
    const issue = problems.issues[key]
    const hint = issue ? <Problem text={copy.errors[issue]} /> : undefined
    switch (key) {
      case "name":
        return (
          <TextField
            key={key}
            label={copy.details.name}
            value={fields.name}
            maxLength={SHIP_LIMITS.name}
            aria-invalid={issue ? true : undefined}
            hint={hint}
            onChange={(name) => {
              const auto = fields.slug === "" || fields.slug === slugifyShip(fields.name)
              onEdit({ name, ...(auto ? { slug: slugifyShip(name) } : {}) })
            }}
          />
        )
      case "slug":
        return <SlugField key={key} label={copy.details.slug} value={fields.slug} invalid={Boolean(issue) || problems.duplicateSlug || problems.slugTaken} hint={slugHint} onChange={(slug) => onEdit({ slug: slugifyShip(slug) })} />
      case "tagline":
        return <TextField key={key} label={copy.details.tagline} value={fields.tagline} maxLength={SHIP_LIMITS.tagline + 40} placeholder={copy.details.taglinePlaceholder} aria-invalid={issue ? true : undefined} hint={hint} onChange={(tagline) => onEdit({ tagline })} />
      case "description":
        return <TextAreaField key={key} label={copy.details.description} value={fields.description} maxLength={SHIP_LIMITS.description} rows={4} placeholder={copy.details.descriptionPlaceholder} aria-invalid={issue ? true : undefined} onChange={(description) => onEdit({ description })} />
      case "repository":
        return <TextField key={key} label={copy.details.repository} value={fields.repository} placeholder="https://github.com/..." aria-invalid={issue ? true : undefined} hint={hint} onChange={(repository) => onEdit({ repository })} {...textProps} />
      case "website":
        return <TextField key={key} label={copy.details.website} value={fields.website} placeholder={copy.details.urlPlaceholder} aria-invalid={issue ? true : undefined} hint={hint} onChange={(website) => onEdit({ website })} {...textProps} />
      case "socialPostUrl":
        return <TextField key={key} label={copy.details.social} value={fields.socialPostUrl} placeholder="https://" aria-invalid={issue ? true : undefined} hint={hint} onChange={(socialPostUrl) => onEdit({ socialPostUrl })} {...textProps} />
      case "imageUrl":
        return <TextField key={key} label={copy.details.image} value={fields.imageUrl} placeholder="https://" aria-invalid={issue ? true : undefined} hint={hint} onChange={(imageUrl) => onEdit({ imageUrl })} {...textProps} />
    }
  }

  const description = row.phase === "importFailed" && row.importError ? copy.errors[row.importError] : fields?.tagline || label

  return (
    <li className="ns-brow" data-state={state}>
      <div className="ns-brow-head">
        <button type="button" className="ns-brow-toggle" aria-expanded={open} disabled={!fields} onClick={onToggle}>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="ns-brow-cover" src={cover} alt="" referrerPolicy="no-referrer" />
          ) : (
            <span className="ns-brow-cover" aria-hidden="true" />
          )}
          <span className="ns-brow-main">
            <span className="ns-brow-name">{fields?.name || label}</span>
            <span className="ns-brow-desc">{description}</span>
          </span>
        </button>
        <span className="ns-brow-status" data-state={state}>
          {row.phase === "importing" || row.phase === "publishing" ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
          {row.phase === "published" || row.phase === "inReview" ? <Check aria-hidden="true" /> : null}
          {status[state]}
        </span>
        {fields ? <ChevronDown className="ns-brow-chevron" data-open={open || undefined} aria-hidden="true" /> : null}
      </div>

      {row.phase === "importFailed" ? (
        <div className="ns-brow-body">
          {row.importError ? <Problem text={copy.errors[row.importError]} /> : null}
          <div className="ns-brow-actions">
            <button type="button" className="ob-btn ob-btn-ghost" onClick={onRetry}>{t.retry}</button>
            <button type="button" className="ob-btn ob-btn-ghost" onClick={onRemove}><Trash2 aria-hidden="true" />{t.remove}</button>
          </div>
        </div>
      ) : null}

      {fields && editable && (needs || shown.size > 0 || row.message) ? (
        <div className="ns-brow-body">
          {row.message ? <Problem text={row.message} /> : null}
          {needs ? <p className="ob-hint">{t.needsHint}</p> : null}
          <div className="ns-brow-fields">{FIELD_ORDER.filter((key) => shown.has(key)).map(field)}</div>
        </div>
      ) : null}

      {open && fields ? (
        <div className="ns-brow-body">
          <ShipPreview fields={fields} cover={cover} handle={handle} copy={copy.preview} />
        </div>
      ) : null}

      {row.phase === "published" && row.slug ? (
        <div className="ns-brow-body">
          <Link className="ns-inline" href={`/${locale}/ships/${row.slug}`}>
            {t.view}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      ) : null}

      {editable && fields ? (
        <div className="ns-brow-body ns-brow-tools">
          <button type="button" className="ns-inline" disabled={disabled} onClick={onRemove}>{t.remove}</button>
        </div>
      ) : null}
    </li>
  )
}
