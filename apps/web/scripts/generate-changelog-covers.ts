/**
 * Builds changelog covers: a product capture framed in a browser window on the
 * area's Station paper. One template keeps every cover in the same family.
 *
 *   bun scripts/generate-changelog-covers.ts                 # every entry with a shot
 *   bun scripts/generate-changelog-covers.ts pulse-2         # one slug
 *   bun scripts/generate-changelog-covers.ts --capture pulse-2 https://pulse.crafter.run
 *
 * Input:  public/changelog/<slug>/shot.png  (a 1280x800 @2x capture of the product)
 * Output: public/changelog/<slug>/cover.webp (1600x1000), the entry's `image`.
 * Needs the agent-browser CLI and ImageMagick on PATH.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import matter from "gray-matter"

const web = resolve(import.meta.dir, "..")
const contentDir = join(web, "content/changelog")
const publicDir = join(web, "public/changelog")
const template = join(web, "scripts/changelog-cover/template.html")
const session = "changelog-covers"

function ab(...args: string[]) {
  const run = Bun.spawnSync(["agent-browser", "--session", session, ...args], { stdout: "pipe", stderr: "pipe" })
  if (run.exitCode !== 0) throw new Error(`agent-browser ${args[0]} failed: ${run.stderr.toString()}`)
  return run.stdout.toString()
}

function magick(...args: string[]) {
  const run = Bun.spawnSync(["magick", ...args], { stdout: "pipe", stderr: "pipe" })
  if (run.exitCode !== 0) throw new Error(`magick failed: ${run.stderr.toString()}`)
}

type Entry = { slug: string; area: string; kind: string; host: string }

function entries(): Entry[] {
  const seen = new Map<string, Entry>()
  for (const file of readdirSync(contentDir).filter((name) => name.endsWith(".en.mdx") || name.endsWith(".es.mdx"))) {
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(en|es)\.mdx$/, "")
    if (seen.has(slug)) continue
    const { data } = matter(readFileSync(join(contentDir, file), "utf8"))
    const link = (data.links as { url: string }[] | undefined)?.[0]?.url
    seen.set(slug, { slug, area: data.area, kind: data.kind, host: link ? new URL(link).host : "crafter.run" })
  }
  return [...seen.values()]
}

function capture(slug: string, url: string) {
  ab("set", "viewport", "1280", "800", "2")
  ab("set", "media", "light")
  ab("open", url)
  ab("wait", "3000")
  ab("screenshot", join(publicDir, slug, "shot.png"))
}

function render(entry: Entry) {
  const shot = join(publicDir, entry.slug, "shot.png")
  if (!existsSync(shot)) return false
  const params = new URLSearchParams({
    area: entry.area,
    host: entry.host,
    shot: `file://${shot}`,
  })
  const png = join("/tmp", `changelog-cover-${entry.slug}.png`)
  ab("set", "viewport", "1600", "1000", "1")
  ab("open", `file://${template}?${params}`)
  ab("wait", "--fn", "document.body.dataset.ready === '1'")
  ab("wait", "300")
  ab("screenshot", png)
  magick(png, "-quality", "84", join(publicDir, entry.slug, "cover.webp"))
  return true
}

const args = process.argv.slice(2)
try {
  if (args[0] === "--capture") {
    const [, slug, url] = args
    if (!slug || !url) throw new Error("usage: --capture <slug> <url>")
    capture(slug, url)
    args.splice(0, args.length, slug)
  }
  const targets = entries().filter((entry) => args.length === 0 || args.includes(entry.slug))
  for (const entry of targets) console.log(render(entry) ? `cover ${entry.slug}` : `skip ${entry.slug} (no shot.png)`)
} finally {
  Bun.spawnSync(["agent-browser", "--session", session, "close"])
}
