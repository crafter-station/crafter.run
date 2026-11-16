/**
 * Builds changelog art from one product capture per entry:
 *   cover.webp (1600x1000)       the entry's `image`, a browser window on the area's paper
 *   og-<locale>.jpg (1200x630)   the social card, with the localized title
 * plus the index social card, public/changelog/og-<locale>.jpg.
 *
 *   bun scripts/generate-changelog-covers.ts                 # every entry with a shot, then the index card
 *   bun scripts/generate-changelog-covers.ts pulse-2         # one slug
 *   bun scripts/generate-changelog-covers.ts --capture pulse-2 https://pulse.crafter.run
 *
 * Source: public/changelog/<slug>/shot.webp, a 1280x800 @2x light capture of the product.
 * Needs the agent-browser CLI and ImageMagick on PATH.
 */
import { existsSync, readdirSync, readFileSync, unlinkSync } from "node:fs"
import { join, resolve } from "node:path"
import matter from "gray-matter"

const web = resolve(import.meta.dir, "..")
const contentDir = join(web, "content/changelog")
const publicDir = join(web, "public/changelog")
const coverTemplate = join(web, "scripts/changelog-cover/template.html")
const ogTemplate = join(web, "scripts/changelog-cover/og.html")
const session = "changelog-covers"
const locales = ["en", "es"] as const
type Locale = (typeof locales)[number]

const areaLabel = { station: "Station", research: "Research", lab: "Lab", games: "Games" } as Record<string, string>
const kindLabel: Record<Locale, Record<string, string>> = {
  en: { ship: "Ship", update: "Update", event: "Event", roundup: "Roundup" },
  es: { ship: "Ship", update: "Actualización", event: "Evento", roundup: "Resumen" },
}
const indexTitle: Record<Locale, string> = { en: "What Crafter Station ships", es: "Lo que Crafter Station publica" }

function ab(...args: string[]) {
  const run = Bun.spawnSync(["agent-browser", "--session", session, ...args], { stdout: "pipe", stderr: "pipe" })
  if (run.exitCode !== 0) throw new Error(`agent-browser ${args[0]} failed: ${run.stderr.toString()}`)
  return run.stdout.toString()
}

function magick(...args: string[]) {
  const run = Bun.spawnSync(["magick", ...args], { stdout: "pipe", stderr: "pipe" })
  if (run.exitCode !== 0) throw new Error(`magick failed: ${run.stderr.toString()}`)
}

type Entry = { slug: string; date: string; area: string; kind: string; host: string; titles: Partial<Record<Locale, string>> }

function entries(): Entry[] {
  const bySlug = new Map<string, Entry>()
  for (const file of readdirSync(contentDir).filter((name) => /\.(en|es)\.mdx$/.test(name)).sort()) {
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(en|es)\.mdx$/, "")
    const locale = file.endsWith(".en.mdx") ? "en" : "es"
    const { data } = matter(readFileSync(join(contentDir, file), "utf8"))
    const link = (data.links as { url: string }[] | undefined)?.[0]?.url
    const entry = bySlug.get(slug) ?? {
      slug,
      date: String(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date),
      area: data.area,
      kind: data.kind,
      host: link ? new URL(link).host : "crafter.run",
      titles: {},
    }
    entry.titles[locale] = data.title
    bySlug.set(slug, entry)
  }
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date))
}

function dateLabel(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date}T12:00:00Z`))
}

function shotOf(slug: string) {
  const webp = join(publicDir, slug, "shot.webp")
  const png = join(publicDir, slug, "shot.png")
  if (!existsSync(webp) && existsSync(png)) {
    magick(png, "-quality", "86", webp)
    unlinkSync(png)
  }
  return existsSync(webp) ? webp : null
}

function capture(slug: string, url: string) {
  const png = join("/tmp", `changelog-shot-${slug}.png`)
  ab("set", "viewport", "1280", "800", "2")
  ab("set", "media", "light")
  ab("open", url)
  ab("wait", "3000")
  ab("screenshot", png)
  magick(png, "-quality", "86", join(publicDir, slug, "shot.webp"))
}

function shoot(template: string, width: number, height: number, params: URLSearchParams, out: string, quality: string) {
  const png = join("/tmp", `changelog-art-${Bun.hash(out)}.png`)
  ab("set", "viewport", String(width), String(height), "1")
  ab("open", `file://${template}?${params}`)
  ab("wait", "--fn", "document.body.dataset.ready === '1'")
  ab("wait", "300")
  ab("screenshot", png)
  magick(png, "-quality", quality, out)
}

function render(entry: Entry) {
  const shot = shotOf(entry.slug)
  if (!shot) return false
  shoot(coverTemplate, 1600, 1000, new URLSearchParams({ area: entry.area, host: entry.host, shot: `file://${shot}` }), join(publicDir, entry.slug, "cover.webp"), "84")
  for (const locale of locales) {
    const title = entry.titles[locale] ?? entry.titles.en ?? entry.titles.es
    if (!title) continue
    const tag = `${areaLabel[entry.area] ?? entry.area} · ${kindLabel[locale][entry.kind] ?? entry.kind} · ${dateLabel(entry.date, locale)}`
    shoot(ogTemplate, 1200, 630, new URLSearchParams({ area: entry.area, tag, title, shot: `file://${shot}` }), join(publicDir, entry.slug, `og-${locale}.jpg`), "88")
  }
  return true
}

function renderIndex(all: Entry[]) {
  for (const locale of locales) {
    const items = all.slice(0, 3).map((entry) => ({ date: dateLabel(entry.date, locale), title: entry.titles[locale] ?? entry.titles.en }))
    shoot(ogTemplate, 1200, 630, new URLSearchParams({ area: "station", tag: "Changelog", title: indexTitle[locale], items: JSON.stringify(items) }), join(publicDir, `og-${locale}.jpg`), "88")
  }
}

const args = process.argv.slice(2)
try {
  if (args[0] === "--capture") {
    const [, slug, url] = args
    if (!slug || !url) throw new Error("usage: --capture <slug> <url>")
    capture(slug, url)
    args.splice(0, args.length, slug)
  }
  const all = entries()
  const targets = all.filter((entry) => args.length === 0 || args.includes(entry.slug))
  for (const entry of targets) console.log(render(entry) ? `art ${entry.slug}` : `skip ${entry.slug} (no shot.webp)`)
  if (args.length === 0) {
    renderIndex(all)
    console.log("art index")
  }
} finally {
  Bun.spawnSync(["agent-browser", "--session", session, "close"])
}
