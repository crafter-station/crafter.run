import { afterEach, describe, expect, test } from "bun:test"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { createDraftBroadcast, type DigestEntry, readEntries, renderDigest } from "@/lib/digest"

const entries: DigestEntry[] = [
  { slug: "pulse-v2", locale: "es", title: "Pulse v2 <beta>", summary: "Nuevo tablero & métricas.", date: "2026-11-12", area: "lab", kind: "ship", crafters: ["railly", "unknown-handle"], image: "/changelog/pulse.png" },
  { slug: "meetup", locale: "es", title: "Meetup", summary: "Nos vimos.", date: "2026-11-03", area: "station", kind: "event", crafters: [], image: "https://cdn.example.com/m.png" },
]
const metrics = { monthCommits: 1214, monthAdditions: 1376009, monthDeletions: 189025, totalCommits: 15533, teamStreak: 23, weekTop: [{ name: "Ada", commits: 88 }], asOf: "2026-11-15" }

describe("renderDigest", () => {
  const out = renderDigest({ month: "2026-11", locale: "es", entries, metrics, nameFor: u => (u === "railly" ? "Railly Hugo" : u) })

  test("renders entries, credits and absolute cover URLs", () => {
    expect(out.subject).toBe("Crafter Station, noviembre de 2026")
    expect(out.html).toContain('src="https://crafter.run/changelog/pulse.png"')
    expect(out.html).toContain('src="https://cdn.example.com/m.png"')
    expect(out.html).toContain("Railly Hugo, unknown-handle")
    expect(out.html).not.toMatch(/src="\//)
  })

  test("escapes entry copy", () => {
    expect(out.html).toContain("Pulse v2 &lt;beta&gt;")
    expect(out.html).toContain("Nuevo tablero &amp; métricas.")
  })

  test("keeps the Resend unsubscribe placeholder intact in html and text", () => {
    expect(out.html).toContain('href="{{{RESEND_UNSUBSCRIBE_URL}}}"')
    expect(out.text).toContain("{{{RESEND_UNSUBSCRIBE_URL}}}")
  })

  test("uses inline styles on a light theme, no scripts or style blocks", () => {
    expect(out.html).toContain('content="light only"')
    expect(out.html).not.toMatch(/<style|<script/)
  })

  test("includes metrics and the honest perks line, with no em dashes", () => {
    expect(out.html).toContain(">1214<")
    expect(out.text).toContain("acceso anticipado a Crafter Perks cuando abra")
    expect(out.html + out.text).not.toContain("—")
  })

  test("renders an empty month and missing metrics without breaking", () => {
    const empty = renderDigest({ month: "2026-11", locale: "en", entries: [], metrics: null })
    expect(empty.html).toContain("No entries for this month yet.")
    expect(empty.html).not.toContain("The numbers")
  })

  test("every locale renders", () => {
    for (const locale of ["en", "es", "pt", "zh", "ja"] as const) {
      expect(renderDigest({ month: "2026-11", locale, entries, metrics }).html).toContain(`<html lang="${locale}">`)
    }
  })
})

describe("readEntries", () => {
  const dirs: string[] = []
  const makeDir = (files: Record<string, string>) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "digest-"))
    dirs.push(dir)
    for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), body)
    return dir
  }
  afterEach(() => { for (const d of dirs.splice(0)) fs.rmSync(d, { recursive: true, force: true }) })

  const mdx = (title: string, date: string) => `---\ntitle: ${title}\nsummary: S\ndate: ${date}\narea: lab\nkind: ship\ncrafters: [railly]\nevidence: []\n---\nBody\n`

  test("a missing or empty directory is an empty month", () => {
    expect(readEntries("/nonexistent/changelog", "2026-11", "en")).toEqual([])
    expect(readEntries(makeDir({}), "2026-11", "en")).toEqual([])
  })

  test("filters by month, prefers the locale, falls back to English, sorts newest first", () => {
    const dir = makeDir({
      "2026-11-02-a.en.mdx": mdx("A en", "2026-11-02"), "2026-11-02-a.es.mdx": mdx("A es", "2026-11-02"),
      "2026-11-09-b.en.mdx": mdx("B en", "2026-11-09"), "2026-10-30-old.en.mdx": mdx("Old", "2026-10-30"),
    })
    expect(readEntries(dir, "2026-11", "es").map(e => e.title)).toEqual(["B en", "A es"])
  })

  test("rejects malformed frontmatter with the file name", () => {
    const dir = makeDir({ "2026-11-02-a.en.mdx": "---\ntitle: x\n---\n" })
    expect(() => readEntries(dir, "2026-11", "en")).toThrow("2026-11-02-a.en.mdx")
  })
})

describe("createDraftBroadcast", () => {
  const realFetch = globalThis.fetch
  afterEach(() => { globalThis.fetch = realFetch })

  test("creates one draft: POST /broadcasts without send or scheduled_at", async () => {
    const calls: { url: string; method?: string; body: Record<string, unknown> }[] = []
    globalThis.fetch = (async (url: string, init: RequestInit) => {
      calls.push({ url, method: init.method, body: JSON.parse(String(init.body)) })
      return Response.json({ id: "bc_1" })
    }) as unknown as typeof fetch
    const id = await createDraftBroadcast({ name: "n", from: "A <a@b.c>", subject: "s", html: "<p>x</p>", text: "x" }, { apiKey: "re_k", segmentId: "seg_1" })
    expect(id).toBe("bc_1")
    expect(calls).toHaveLength(1)
    expect(calls[0].url).toBe("https://api.resend.com/broadcasts")
    expect(calls[0].method).toBe("POST")
    expect(calls[0].body.segment_id).toBe("seg_1")
    expect("send" in calls[0].body).toBe(false)
    expect("scheduled_at" in calls[0].body).toBe(false)
  })

  test("surfaces Resend errors", async () => {
    globalThis.fetch = (async () => Response.json({ message: "bad segment" }, { status: 422 })) as unknown as typeof fetch
    await expect(createDraftBroadcast({ name: "n", from: "f", subject: "s", html: "h", text: "t" }, { apiKey: "k", segmentId: "x" })).rejects.toThrow("422: bad segment")
  })
})
