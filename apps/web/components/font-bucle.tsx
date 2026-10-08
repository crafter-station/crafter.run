"use client"

import { useState, type CSSProperties } from "react"
import type { BucleCopy } from "@/lib/font-bucle-copy"
import history from "@/lib/font-history.json"
import { skeleton } from "@/lib/font-outlines"

type Drawing = { path: string; advance: number; points: number }
const drawings = history as Record<string, { weight: string; glyphs: Record<string, { before: Drawing; after: Drawing }> }>

type Entry = {
  id: keyof BucleCopy["entries"]
  version: string
  previous: string
  /** Family of the previous build, declared in `station-font.css` from `public/font/history`. */
  before: string
  after: string
  weight: 400 | 500 | 700
  sample: string
}

// Only builds whose binaries are kept in public/font/history; every pair is a real before/after.
const entries: Entry[] = [
  { id: "xyz", version: "0.309", previous: "0.308", before: "Crafter Text 0.308", after: "var(--font-sans)", weight: 700, sample: "xyz zoyx" },
  { id: "kvw", version: "0.308", previous: "0.307", before: "Crafter Text 0.307", after: "var(--font-sans)", weight: 700, sample: "kiwi vivo" },
  { id: "ijl", version: "0.307", previous: "0.306", before: "Crafter Text 0.306", after: "var(--font-sans)", weight: 700, sample: "jilli lijl" },
  { id: "ft", version: "0.306", previous: "0.305", before: "Crafter Text 0.305", after: "var(--font-sans)", weight: 400, sample: "f̂ t̂ f́ t̃" },
  { id: "display", version: "0.200", previous: "0.101", before: "Crafter Historical", after: "var(--font-display)", weight: 500, sample: "comunidad" },
]

function Glyph({ drawing, version }: { drawing: Drawing; version: string }) {
  const shape = skeleton(drawing.path)
  return <figure>
    <svg viewBox={`-60 -820 ${drawing.advance + 120} 1120`} aria-hidden="true">
      <path d="M-60 0 H2000 M-60 -555 H2000" className="font-bucle-guide" />
      <g transform="scale(1 -1)">
        <path d={drawing.path} className="font-bucle-fill" />
        {shape.handles.map(([x1, y1, x2, y2], i) => <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} className="font-bucle-handle" />)}
        {shape.handles.map(([, , x, y], i) => <circle key={i} cx={x} cy={y} r="9" className="font-bucle-control" />)}
        {shape.nodes.map(([x, y], i) => <rect key={i} x={x - 10} y={y - 10} width="20" height="20" className="font-bucle-node" />)}
      </g>
    </svg>
    <figcaption><span>{version}</span><span>{drawing.points}</span></figcaption>
  </figure>
}

/** Before and after skeletons taken from the two builds' OTFs by the history export. */
function Skeletons({ entry, copy }: { entry: Entry; copy: BucleCopy }) {
  const set = drawings[entry.id]
  return <div className="font-bucle-skeletons">
    {Object.entries(set.glyphs).map(([char, pair]) => <div key={char} className="font-bucle-pair" aria-label={`${char}: ${pair.before.points} → ${pair.after.points} ${copy.points}`}>
      <Glyph drawing={pair.before} version={entry.previous} />
      <Glyph drawing={pair.after} version={entry.version} />
    </div>)}
    <p className="font-bucle-legend">{copy.pointsLegend} · {set.weight}</p>
  </div>
}

function Wipe({ entry, copy }: { entry: Entry; copy: BucleCopy }) {
  const [split, setSplit] = useState(50)
  const [text, setText] = useState(entry.sample)
  // Most redraws move a few units; stacking both builds shows them better than a wipe does.
  const [overlay, setOverlay] = useState(true)
  const style = (family: string): CSSProperties => ({ fontFamily: `${family.startsWith("var(") ? family : `"${family}"`}, var(--font-sans)`, fontWeight: entry.weight })
  return <article className="font-bucle-entry">
    <Heading entry={entry} copy={copy} />
    <div className="font-bucle-stage" data-overlay={overlay || undefined} style={{ "--split": `${split}%` } as CSSProperties}>
      <p className="font-bucle-before" style={style(entry.before)} aria-hidden="true">{text || " "}</p>
      <p className="font-bucle-after" style={style(entry.after)}>{text || " "}</p>
      <span className="font-bucle-tag font-bucle-tag-before">{entry.previous}</span>
      <span className="font-bucle-tag font-bucle-tag-after">{entry.version}</span>
      {!overlay && <input type="range" min="0" max="100" value={split} onChange={e => setSplit(Number(e.target.value))} aria-label={`${copy.compare} ${entry.previous} / ${entry.version}`} />}
    </div>
    <div className="font-bucle-tools">
      <div className="font-bucle-mode" role="group" aria-label={copy.compare}>
        <button aria-pressed={overlay} onClick={() => setOverlay(true)}>{copy.overlay}</button>
        <button aria-pressed={!overlay} onClick={() => setOverlay(false)}>{copy.wipe}</button>
      </div>
      <label className="font-bucle-edit">{copy.editSample}<input value={text} onChange={e => setText(e.target.value)} spellCheck={false} /></label>
    </div>
  </article>
}

function Entry({ entry, copy }: { entry: Entry; copy: BucleCopy }) {
  // An anchor-only change leaves outlines identical, so it is shown set in type instead.
  const set = drawings[entry.id]
  if (!set || Object.values(set.glyphs).every(g => g.before.path === g.after.path)) return <Wipe entry={entry} copy={copy} />
  return <article className="font-bucle-entry">
    <Heading entry={entry} copy={copy} />
    <Skeletons entry={entry} copy={copy} />
  </article>
}

function Heading({ entry, copy }: { entry: Entry; copy: BucleCopy }) {
  return <header>
    <p className="font-bucle-version"><span>{entry.previous}</span><span aria-hidden="true">→</span><strong>{entry.version}</strong></p>
    <h3>{copy.entries[entry.id].title}</h3>
    <p>{copy.entries[entry.id].body}</p>
  </header>
}

export function FontBucle({ copy }: { copy: BucleCopy }) {
  return <div className="font-bucle-list">{entries.map(entry => <Entry key={entry.id} entry={entry} copy={copy} />)}</div>
}
