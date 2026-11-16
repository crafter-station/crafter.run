/**
 * Builds the calendar art for monthly roundups: every ship of the period on the
 * day it went live, with a thumbnail of its homepage when it has one.
 *
 *   bun scripts/generate-roundup-art.ts                         # every roundup in roundups.json
 *   bun scripts/generate-roundup-art.ts january-2026-roundup    # one slug
 *
 * Input:  scripts/changelog-cover/roundups.json   ({ slug, ships: [{ name, repo, date, area, thumb }] })
 *         scripts/changelog-cover/thumbs/<name>.webp
 * Output: public/changelog/<slug>/cover-<locale>.webp (1600x1000) and og-<locale>.jpg (1200x630),
 *         and `image:` set in both locale files.
 * Needs the agent-browser CLI and ImageMagick on PATH.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const web = resolve(import.meta.dir, "..")
const coverDir = join(web, "scripts/changelog-cover")
const template = join(coverDir, "roundup.html")
const contentDir = join(web, "content/changelog")
const publicDir = join(web, "public/changelog")
const session = "changelog-roundups"
const locales = ["en", "es"] as const

type Ship = { name: string; repo: string; date: string; area: string; thumb: boolean }
type Roundup = { slug: string; ships: Ship[] }

function run(cmd: string[]) {
  const out = Bun.spawnSync(cmd, { stdout: "pipe", stderr: "pipe" })
  if (out.exitCode !== 0) throw new Error(`${cmd[0]} ${cmd[1] ?? ""} failed: ${out.stderr.toString()}`)
}
const ab = (...args: string[]) => run(["agent-browser", "--session", session, ...args])

function shoot(params: URLSearchParams, width: number, height: number, out: string, quality: string) {
  const png = join("/tmp", `roundup-art-${Bun.hash(out)}.png`)
  ab("set", "viewport", String(width), String(height), "1")
  ab("open", `file://${template}?${params}`)
  ab("wait", "--fn", "document.body.dataset.ready === '1'")
  ab("wait", "300")
  ab("screenshot", png)
  run(["magick", png, "-quality", quality, out])
}

function setImage(slug: string, locale: string, image: string) {
  const file = readdirSync(contentDir).find((name) => name.endsWith(`-${slug}.${locale}.mdx`))
  if (!file) throw new Error(`no ${locale} file for ${slug}`)
  const path = join(contentDir, file)
  const raw = readFileSync(path, "utf8")
  const end = raw.indexOf("\n---", 4)
  let head = raw.slice(0, end)
  head = /^image: .*$/m.test(head) ? head.replace(/^image: .*$/m, `image: ${image}`) : `${head}\nimage: ${image}`
  writeFileSync(path, head + raw.slice(end))
}

const roundups: Roundup[] = JSON.parse(readFileSync(join(coverDir, "roundups.json"), "utf8"))
const only = process.argv.slice(2)
try {
  for (const roundup of roundups.filter((r) => only.length === 0 || only.includes(r.slug))) {
    mkdirSync(join(publicDir, roundup.slug), { recursive: true })
    const data = JSON.stringify({ ships: roundup.ships })
    for (const locale of locales) {
      const base = { data, locale, thumbs: `file://${join(coverDir, "thumbs")}` }
      shoot(new URLSearchParams({ ...base, mode: "cover" }), 1600, 1000, join(publicDir, roundup.slug, `cover-${locale}.webp`), "84")
      shoot(new URLSearchParams({ ...base, mode: "og" }), 1200, 630, join(publicDir, roundup.slug, `og-${locale}.jpg`), "88")
      setImage(roundup.slug, locale, `/changelog/${roundup.slug}/cover-${locale}.webp`)
    }
    console.log(`art ${roundup.slug}`)
  }
} finally {
  Bun.spawnSync(["agent-browser", "--session", session, "close"])
}
