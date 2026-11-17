import { describe, expect, test } from "bun:test"

import {
  batchCounts,
  batchReducer,
  classifyPublishFailure,
  duplicateSlugIds,
  isRowReady,
  msUntilNextUtcMinute,
  nextQueued,
  secondsUntilNextUtcMinute,
  type BatchAction,
  type BatchRow,
} from "./new-ship-batch"
import type { ImportResult } from "./new-ship-draft"

const result = (name: string, extra: Partial<ImportResult["fields"]> = {}): ImportResult => ({
  source: "github",
  hasTopic: true,
  complete: true,
  provenance: `metadata URL: https://github.com/a/${name}`,
  fields: { name, slug: name, repository: `https://github.com/a/${name}`, tagline: "Does a useful thing", description: "Does a useful thing for people who need it.", ...extra },
})

function run(actions: BatchAction[], start: BatchRow[] = []) {
  return actions.reduce(batchReducer, start)
}

const loaded = (names: string[], overrides: Record<string, Partial<ImportResult["fields"]>> = {}) =>
  run(names.flatMap<BatchAction>((name) => [{ type: "add", id: name, repo: `https://github.com/a/${name}` }, { type: "imported", id: name, result: result(name, overrides[name]) }]))

const phase = (rows: BatchRow[], id: string) => rows.find((row) => row.id === id)?.phase

describe("import", () => {
  test("adding the same repository twice keeps one row", () => {
    const rows = run([{ type: "add", id: "x", repo: "r" }, { type: "add", id: "x", repo: "r" }])
    expect(rows).toHaveLength(1)
    expect(rows[0]?.phase).toBe("importing")
  })
  test("a failed import can be retried and then imported", () => {
    const rows = run([
      { type: "add", id: "x", repo: "r" },
      { type: "importFailed", id: "x", key: "repoNotFound" },
    ])
    expect(rows[0]).toMatchObject({ phase: "importFailed", importError: "repoNotFound" })
    const again = run([{ type: "retryImport", id: "x" }, { type: "imported", id: "x", result: result("x") }], rows)
    expect(again[0]).toMatchObject({ phase: "idle", importError: null, hasTopic: true })
  })
  test("a late import result does not overwrite a row that already moved on", () => {
    const rows = loaded(["x"])
    const edited = run([{ type: "edit", id: "x", patch: { name: "Mine" } }, { type: "imported", id: "x", result: result("other") }], rows)
    expect(edited[0]?.fields?.name).toBe("Mine")
  })
})

describe("readiness", () => {
  test("only complete rows are ready; incomplete rows are skipped", () => {
    const rows = loaded(["alpha", "beta"], { beta: { tagline: "" } })
    expect(isRowReady(rows[0]!, rows)).toBe(true)
    expect(isRowReady(rows[1]!, rows)).toBe(false)
    expect(batchCounts(rows)).toMatchObject({ ready: 1, skipped: 1 })
  })
  test("a row turns ready as soon as its missing fields are filled", () => {
    const rows = loaded(["alpha"], { alpha: { description: "short" } })
    expect(isRowReady(rows[0]!, rows)).toBe(false)
    const fixed = run([{ type: "edit", id: "alpha", patch: { description: "A description that is long enough." } }], rows)
    expect(isRowReady(fixed[0]!, fixed)).toBe(true)
  })
  test("rows still importing or failed to import are never ready", () => {
    const rows = run([{ type: "add", id: "alpha", repo: "r" }, { type: "add", id: "beta", repo: "r" }, { type: "importFailed", id: "beta", key: "importFailed" }])
    expect(rows.some((row) => isRowReady(row, rows))).toBe(false)
  })
})

describe("duplicate slugs", () => {
  test("every editable row sharing a slug is flagged and is not ready", () => {
    const rows = loaded(["alpha", "beta", "gamma"], { beta: { slug: "alpha" } })
    expect([...duplicateSlugIds(rows)].sort()).toEqual(["alpha", "beta"])
    expect(rows.map((row) => isRowReady(row, rows))).toEqual([false, false, true])
  })
  test("changing one slug clears both", () => {
    const rows = run([{ type: "edit", id: "beta", patch: { slug: "b-two" } }], loaded(["alpha", "beta"], { beta: { slug: "alpha" } }))
    expect(duplicateSlugIds(rows).size).toBe(0)
  })
  test("a slug already published in the batch blocks a new row with the same slug", () => {
    let rows = run([{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "published", id: "alpha", status: "published", slug: "alpha" }], loaded(["alpha"]))
    rows = run([{ type: "add", id: "delta", repo: "r" }, { type: "imported", id: "delta", result: result("delta", { slug: "alpha" }) }], rows)
    expect(isRowReady(rows[1]!, rows)).toBe(false)
    expect([...duplicateSlugIds(rows)]).toEqual(["delta"])
  })
})

describe("publishing state machine", () => {
  test("queueReady queues only ready rows", () => {
    const rows = run([{ type: "queueReady" }], loaded(["alpha", "beta"], { beta: { name: "" } }))
    expect(phase(rows, "alpha")).toBe("queued")
    expect(phase(rows, "beta")).toBe("idle")
    expect(nextQueued(rows)?.id).toBe("alpha")
  })
  test("queued to publishing to published, or in review when the API says pending", () => {
    let rows = run([{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "start", id: "beta" }], loaded(["alpha", "beta"]))
    rows = run([{ type: "published", id: "alpha", status: "published", slug: "alpha" }, { type: "published", id: "beta", status: "pending", slug: "beta" }], rows)
    expect(phase(rows, "alpha")).toBe("published")
    expect(phase(rows, "beta")).toBe("inReview")
    expect(batchCounts(rows)).toMatchObject({ published: 1, inReview: 1, notPublished: 0, active: 0 })
  })
  test("only a publishing row can be published, failed or requeued", () => {
    const rows = loaded(["alpha"])
    expect(run([{ type: "published", id: "alpha", status: "published", slug: "alpha" }], rows)).toEqual(rows)
    expect(run([{ type: "failed", id: "alpha", message: "x" }], rows)).toEqual(rows)
    expect(run([{ type: "requeue", id: "alpha" }], rows)).toEqual(rows)
  })
  test("a 429 puts the row back in the queue and keeps its draft", () => {
    const rows = run(
      [{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "drafted", id: "alpha", draft: { id: "d1", updatedAt: "t" } }, { type: "requeue", id: "alpha" }],
      loaded(["alpha"]),
    )
    expect(rows[0]).toMatchObject({ phase: "queued", draft: { id: "d1", updatedAt: "t" }, draftSaved: true })
  })
  test("a failure keeps the batch going and the row editable, and an edit makes it publishable again", () => {
    let rows = run([{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "failed", id: "alpha", message: "Rejected" }], loaded(["alpha", "beta"]))
    expect(rows[0]).toMatchObject({ phase: "failed", message: "Rejected" })
    expect(phase(rows, "beta")).toBe("queued")
    rows = run([{ type: "edit", id: "alpha", patch: { tagline: "A better tagline" } }], rows)
    expect(rows[0]).toMatchObject({ phase: "idle", message: null })
  })
  test("editing a row marks its saved draft as outdated", () => {
    const rows = run(
      [{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "drafted", id: "alpha", draft: { id: "d1", updatedAt: "t" } }, { type: "failed", id: "alpha", message: "no" }, { type: "edit", id: "alpha", patch: { tagline: "A better tagline" } }],
      loaded(["alpha"]),
    )
    expect(rows[0]).toMatchObject({ draft: { id: "d1", updatedAt: "t" }, draftSaved: false })
  })
  test("a slug conflict reopens the row and blocks it until the slug changes", () => {
    let rows = run([{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "slugTaken", id: "alpha", message: "in use" }], loaded(["alpha"]))
    expect(rows[0]).toMatchObject({ phase: "idle", slugTaken: true })
    expect(isRowReady(rows[0]!, rows)).toBe(false)
    rows = run([{ type: "edit", id: "alpha", patch: { description: "Edited the description only here." } }], rows)
    expect(isRowReady(rows[0]!, rows)).toBe(false)
    rows = run([{ type: "edit", id: "alpha", patch: { slug: "a-two" } }], rows)
    expect(isRowReady(rows[0]!, rows)).toBe(true)
  })
  test("rows that are queued, publishing or finished cannot be edited or removed", () => {
    for (const steps of [[{ type: "queueReady" }], [{ type: "queueReady" }, { type: "start", id: "alpha" }], [{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "published", id: "alpha", status: "published", slug: "alpha" }]] as BatchAction[][]) {
      const rows = run(steps, loaded(["alpha"]))
      expect(run([{ type: "edit", id: "alpha", patch: { name: "Changed" } }, { type: "remove", id: "alpha" }], rows)).toEqual(rows)
    }
  })
  test("stop returns queued rows to idle and leaves finished rows alone", () => {
    const rows = run([{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "published", id: "alpha", status: "published", slug: "alpha" }, { type: "stop" }], loaded(["alpha", "beta"]))
    expect(phase(rows, "alpha")).toBe("published")
    expect(phase(rows, "beta")).toBe("idle")
  })
  test("publishing the remaining rows skips the finished ones", () => {
    let rows = run([{ type: "queueReady" }, { type: "start", id: "alpha" }, { type: "published", id: "alpha", status: "published", slug: "alpha" }, { type: "start", id: "beta" }, { type: "failed", id: "beta", message: "no" }], loaded(["alpha", "beta"]))
    rows = run([{ type: "queueReady" }], rows)
    expect(phase(rows, "alpha")).toBe("published")
    expect(phase(rows, "beta")).toBe("queued")
  })
})

describe("rate limit window", () => {
  test("waits until the next UTC minute", () => {
    expect(msUntilNextUtcMinute(Date.UTC(2026, 10, 17, 12, 0, 45, 0))).toBe(15_000)
    expect(secondsUntilNextUtcMinute(Date.UTC(2026, 10, 17, 12, 0, 45, 250))).toBe(15)
    expect(secondsUntilNextUtcMinute(Date.UTC(2026, 10, 17, 12, 0, 59, 999))).toBe(1)
  })
  test("no wait exactly when a new window starts", () => {
    expect(msUntilNextUtcMinute(Date.UTC(2026, 10, 17, 12, 1, 0, 0))).toBe(0)
  })
  test("the wait never exceeds the window", () => {
    for (let ms = 0; ms < 120_000; ms += 997) expect(msUntilNextUtcMinute(ms)).toBeLessThan(60_000)
  })
})

describe("failure classification", () => {
  test("429 pauses the batch", () => {
    expect(classifyPublishFailure({ status: 429, code: "rate_limited" }, true)).toEqual({ kind: "wait" })
  })
  test("a 409 conflict is a slug clash only before a draft exists", () => {
    expect(classifyPublishFailure({ status: 409, code: "conflict" }, false)).toEqual({ kind: "slugTaken" })
    expect(classifyPublishFailure({ status: 409, code: "conflict" }, true)).toEqual({ kind: "failed" })
    expect(classifyPublishFailure({ status: 409, code: "revision_conflict" }, true)).toEqual({ kind: "failed" })
  })
  test("422 and network errors fail the row only", () => {
    expect(classifyPublishFailure({ status: 422, code: "moderation_rejected" }, false)).toEqual({ kind: "failed" })
    expect(classifyPublishFailure(null, false)).toEqual({ kind: "failed" })
  })
})
