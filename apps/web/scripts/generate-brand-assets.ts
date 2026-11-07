// Generates the downloadable brand assets in public/brand from the same mark and
// Crafter Sans Bucle lockup the site renders in its sidebar. Text is converted to
// outlines so the files do not depend on the font being installed.
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import opentype from "opentype.js"
import sharp from "sharp"

import { BRAND_MARK_PATH, brandPalette } from "../lib/brand"

const ROOT = join(import.meta.dir, "..")
const OUT = join(ROOT, "public", "brand")
const fontFile = readFileSync(join(ROOT, "app", "fonts", "CrafterSansPreview-Medium.ttf"))
const font = opentype.parse(fontFile.buffer.slice(fontFile.byteOffset, fontFile.byteOffset + fontFile.byteLength))

// Sidebar lockup: 32px mark, 10px gap, 21px text, line-height .95, tracking -.035em.
// Horizontal lockup: 32px mark, 10px gap, 25px text on one line (mobile header).
const TRACKING = -0.035

type Box = { x1: number; y1: number; x2: number; y2: number }

function textPath(text: string, x: number, baseline: number, size: number) {
  const scale = size / font.unitsPerEm
  const glyphs = font.stringToGlyphs(text)
  const path = new opentype.Path()
  let cursor = x
  glyphs.forEach((glyph, index) => {
    path.extend(glyph.getPath(cursor, baseline, size))
    const next = glyphs[index + 1]
    const kern = next ? font.getKerningValue(glyph, next) : 0
    cursor += ((glyph.advanceWidth ?? 0) + kern) * scale + TRACKING * size
  })
  return path
}

function lines(texts: string[], x: number, top: number, size: number, lineHeight: number) {
  const scale = size / font.unitsPerEm
  const content = (font.ascender - font.descender) * scale
  const halfLeading = (lineHeight - content) / 2
  return texts.map((text, index) =>
    textPath(text, x, top + index * lineHeight + halfLeading + font.ascender * scale, size),
  )
}

function union(boxes: Box[]): Box {
  return {
    x1: Math.min(...boxes.map((b) => b.x1)),
    y1: Math.min(...boxes.map((b) => b.y1)),
    x2: Math.max(...boxes.map((b) => b.x2)),
    y2: Math.max(...boxes.map((b) => b.y2)),
  }
}

// opentype.js 2.0 toPathData() emits NaN for some coordinates, so serialize commands here.
function pathData(path: opentype.Path) {
  const n = (v: number) => Number(v.toFixed(3)).toString()
  return path.commands
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${n(c.x)} ${n(c.y)}`
      if (c.type === "Q") return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`
      if (c.type === "C") return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`
      return "Z"
    })
    .join("")
}

const MARK_VIEW = 257

function markGroup(x: number, y: number, size: number) {
  const s = size / MARK_VIEW
  return `<path transform="translate(${x} ${y}) scale(${s.toFixed(6)})" d="${BRAND_MARK_PATH}"/>`
}

type Layout = { body: string; box: Box }

function iconLayout(): Layout {
  return { body: markGroup(0, 0, MARK_VIEW), box: { x1: 0, y1: 0, x2: MARK_VIEW, y2: MARK_VIEW } }
}

function lockupLayout(texts: string[], size: number, lineHeight: number, withMark: boolean): Layout {
  const mark = 32
  const gap = 10
  const textX = withMark ? mark + gap : 0
  const blockHeight = texts.length * lineHeight
  const top = withMark ? (mark - blockHeight) / 2 : 0
  const paths = lines(texts, textX, top, size, lineHeight)
  const boxes = paths.map((p) => p.getBoundingBox())
  const textBox = union(boxes)
  const body = [
    withMark ? markGroup(0, 0, mark) : "",
    ...paths.map((p) => `<path d="${pathData(p)}"/>`),
  ].join("")
  const box = withMark ? union([textBox, { x1: 0, y1: 0, x2: mark, y2: mark }]) : textBox
  return { body, box }
}

const layouts = {
  icon: iconLayout(),
  "logo-stacked": lockupLayout(["crafter", "station"], 21, 21 * 0.95, true),
  "logo-wordmark": lockupLayout(["crafter station"], 25, 25 * 1.02, true),
  wordmark: lockupLayout(["crafter station"], 25, 25 * 1.02, false),
} as const

function svg({ body, box }: Layout, ink: string, background?: string, pad = 0) {
  const w = box.x2 - box.x1 + pad * 2
  const h = box.y2 - box.y1 + pad * 2
  const x = box.x1 - pad
  const y = box.y1 - pad
  const bg = background ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${background}"/>` : ""
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x.toFixed(3)} ${y.toFixed(3)} ${w.toFixed(3)} ${h.toFixed(3)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}">${bg}<g fill="${ink}">${body}</g></svg>\n`
}

// "light" files are for light backgrounds (dark ink); "dark" files for dark backgrounds.
const variants = {
  light: { ink: brandPalette.light.ink, paper: brandPalette.light.paper },
  dark: { ink: brandPalette.dark.ink, paper: brandPalette.dark.paper },
} as const

const RASTER_WIDTH = { icon: 1024, "logo-stacked": 1600, "logo-wordmark": 2000, wordmark: 2000 } as const

for (const [name, layout] of Object.entries(layouts) as [keyof typeof layouts, Layout][]) {
  for (const [variant, colors] of Object.entries(variants)) {
    const base = join(OUT, `crafter-station-${name}-${variant}`)
    const vector = svg(layout, colors.ink)
    writeFileSync(`${base}.svg`, vector)

    const pad = name === "icon" ? 0 : 0.18 * (layout.box.y2 - layout.box.y1)
    const width = RASTER_WIDTH[name]
    const transparent = Buffer.from(svg(layout, colors.ink, undefined, pad))
    const raster = sharp(transparent, { density: 1200 }).resize({ width })
    await raster.clone().png().toFile(`${base}.png`)
    await raster.clone().webp({ lossless: true }).toFile(`${base}.webp`)
    await sharp(Buffer.from(svg(layout, colors.ink, colors.paper, pad)), { density: 1200 })
      .resize({ width })
      .jpeg({ quality: 92 })
      .toFile(`${base}.jpg`)
    console.log(`✓ ${name}-${variant}`)
  }
}
