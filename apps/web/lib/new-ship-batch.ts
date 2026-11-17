import { emptyShipFields, validateShip, type ImportErrorKey, type ImportResult, type ShipFields, type ShipIssues } from "@/lib/new-ship-draft"
import type { DraftRef } from "@/lib/publish-ship"

/** The API allows 20 Ship mutations per member per UTC minute (apps/api/src/rate-limit.ts). */
export const MUTATION_WINDOW_MS = 60_000

export type RowPhase = "importing" | "importFailed" | "idle" | "queued" | "publishing" | "published" | "inReview" | "failed"

export type BatchRow = {
  /** `owner/name` in lowercase. */
  id: string
  repo: string
  fields: ShipFields | null
  provenance: string[]
  hasTopic: boolean | null
  phase: RowPhase
  importError: ImportErrorKey | null
  /** The API's message for a failed publish. */
  message: string | null
  /** The API refused the slug because the member already has a Ship with it. */
  slugTaken: boolean
  draft: DraftRef | null
  /** The draft already holds the row's current fields, so a retry only has to publish it. */
  draftSaved: boolean
  /** The public address once the Ship is published. */
  slug: string | null
}

export type BatchAction =
  | { type: "add"; id: string; repo: string }
  | { type: "imported"; id: string; result: ImportResult }
  | { type: "importFailed"; id: string; key: ImportErrorKey }
  | { type: "retryImport"; id: string }
  | { type: "remove"; id: string }
  | { type: "edit"; id: string; patch: Partial<ShipFields> }
  | { type: "queueReady" }
  | { type: "start"; id: string }
  | { type: "drafted"; id: string; draft: DraftRef }
  | { type: "published"; id: string; status: "published" | "pending"; slug: string }
  | { type: "requeue"; id: string }
  | { type: "failed"; id: string; message: string }
  | { type: "slugTaken"; id: string; message: string }
  | { type: "stop" }

export function newRow(id: string, repo: string): BatchRow {
  return { id, repo, fields: null, provenance: [], hasTopic: null, phase: "importing", importError: null, message: null, slugTaken: false, draft: null, draftSaved: false, slug: null }
}

const EDITABLE: readonly RowPhase[] = ["idle", "failed"]
const REMOVABLE: readonly RowPhase[] = ["importing", "importFailed", "idle", "failed"]

/** Ids of editable rows whose slug is also used by another row in the batch. */
export function duplicateSlugIds(rows: readonly BatchRow[]): Set<string> {
  const counts = new Map<string, number>()
  for (const row of rows) {
    const slug = row.fields?.slug ?? ""
    if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1)
  }
  return new Set(rows.filter((row) => EDITABLE.includes(row.phase) && row.fields?.slug && (counts.get(row.fields.slug) ?? 0) > 1).map((row) => row.id))
}

export type RowProblems = { issues: ShipIssues; duplicateSlug: boolean; slugTaken: boolean }

export function rowProblems(row: BatchRow, rows: readonly BatchRow[]): RowProblems {
  return {
    issues: row.fields ? validateShip(row.fields) : {},
    duplicateSlug: duplicateSlugIds(rows).has(row.id),
    slugTaken: row.slugTaken,
  }
}

/** A row can be published when it was read, passes the API's field rules and its slug is not taken. */
export function isRowReady(row: BatchRow, rows: readonly BatchRow[]): boolean {
  if (!row.fields || !EDITABLE.includes(row.phase)) return false
  const problems = rowProblems(row, rows)
  return Object.keys(problems.issues).length === 0 && !problems.duplicateSlug && !problems.slugTaken
}

export function needsDetails(row: BatchRow, rows: readonly BatchRow[]): boolean {
  return Boolean(row.fields) && EDITABLE.includes(row.phase) && !isRowReady(row, rows)
}

export function batchReducer(rows: BatchRow[], action: BatchAction): BatchRow[] {
  const map = (id: string, change: (row: BatchRow) => BatchRow) => rows.map((row) => (row.id === id ? change(row) : row))
  switch (action.type) {
    case "add":
      return rows.some((row) => row.id === action.id) ? rows : [...rows, newRow(action.id, action.repo)]
    case "imported":
      return map(action.id, (row) =>
        row.phase !== "importing"
          ? row
          : { ...row, phase: "idle", importError: null, fields: { ...emptyShipFields(), ...action.result.fields }, provenance: [action.result.provenance], hasTopic: action.result.hasTopic },
      )
    case "importFailed":
      return map(action.id, (row) => (row.phase === "importing" ? { ...row, phase: "importFailed", importError: action.key } : row))
    case "retryImport":
      return map(action.id, (row) => (row.phase === "importFailed" ? { ...row, phase: "importing", importError: null } : row))
    case "remove":
      return rows.filter((row) => row.id !== action.id || !REMOVABLE.includes(row.phase))
    case "edit":
      return map(action.id, (row) => {
        if (!row.fields || !EDITABLE.includes(row.phase)) return row
        const slugChanged = action.patch.slug !== undefined && action.patch.slug !== row.fields.slug
        return { ...row, phase: "idle", message: null, slugTaken: slugChanged ? false : row.slugTaken, draftSaved: false, fields: { ...row.fields, ...action.patch } }
      })
    case "queueReady":
      return rows.map((row) => (isRowReady(row, rows) ? { ...row, phase: "queued", message: null } : row))
    case "start":
      return map(action.id, (row) => (row.phase === "queued" ? { ...row, phase: "publishing" } : row))
    case "drafted":
      return map(action.id, (row) => (row.phase === "publishing" ? { ...row, draft: action.draft, draftSaved: true } : row))
    case "published":
      return map(action.id, (row) => (row.phase === "publishing" ? { ...row, phase: action.status === "pending" ? "inReview" : "published", slug: action.slug, message: null } : row))
    case "requeue":
      return map(action.id, (row) => (row.phase === "publishing" ? { ...row, phase: "queued" } : row))
    case "failed":
      return map(action.id, (row) => (row.phase === "publishing" ? { ...row, phase: "failed", message: action.message } : row))
    case "slugTaken":
      return map(action.id, (row) => (row.phase === "publishing" ? { ...row, phase: "idle", slugTaken: true, message: action.message } : row))
    case "stop":
      return rows.map((row) => (row.phase === "queued" ? { ...row, phase: "idle" } : row))
  }
}

export function nextQueued(rows: readonly BatchRow[]): BatchRow | null {
  return rows.find((row) => row.phase === "queued") ?? null
}

export type BatchCounts = { ready: number; skipped: number; published: number; inReview: number; notPublished: number; active: number }

export function batchCounts(rows: readonly BatchRow[]): BatchCounts {
  const ready = rows.filter((row) => isRowReady(row, rows)).length
  const published = rows.filter((row) => row.phase === "published").length
  const inReview = rows.filter((row) => row.phase === "inReview").length
  const active = rows.filter((row) => row.phase === "queued" || row.phase === "publishing").length
  const unfinished = rows.filter((row) => row.phase !== "published" && row.phase !== "inReview")
  return { ready, skipped: unfinished.filter((row) => !isRowReady(row, rows) && row.phase !== "queued" && row.phase !== "publishing").length, published, inReview, notPublished: unfinished.length - active, active }
}

/** Milliseconds from `now` until the next UTC minute, when the API's mutation window resets. */
export function msUntilNextUtcMinute(now: number): number {
  return (MUTATION_WINDOW_MS - (now % MUTATION_WINDOW_MS)) % MUTATION_WINDOW_MS
}

export function secondsUntilNextUtcMinute(now: number): number {
  return Math.ceil(msUntilNextUtcMinute(now) / 1000)
}

export type PublishFailure = { kind: "wait" } | { kind: "slugTaken" } | { kind: "failed" }

/** Decides what a failed publish means for the batch. A 409 `conflict` is a slug clash only while creating the draft. */
export function classifyPublishFailure(error: { status: number; code: string | null } | null, draftExists: boolean): PublishFailure {
  if (error?.status === 429) return { kind: "wait" }
  if (error?.status === 409 && error.code === "conflict" && !draftExists) return { kind: "slugTaken" }
  return { kind: "failed" }
}
