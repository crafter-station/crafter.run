"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { fontCopy } from "@/lib/font-copy"
import glyphInventory from "@/lib/font-glyphs.json"
import fontVersions from "@/lib/font-versions.json"
import type { Locale } from "@/lib/i18n"

const cuts = [
  { id: "display", name: "Bucle Display", weight: 500, stem: "CrafterSansPreview-Medium" },
  { id: "400", name: "Regular", weight: 400, stem: "CrafterSansTextPreview-Regular" },
  { id: "500", name: "Medium", weight: 500, stem: "CrafterSansTextPreview-Medium" },
  { id: "600", name: "Semibold", weight: 600, stem: "CrafterSansTextPreview-SemiBold" },
  { id: "700", name: "Bold", weight: 700, stem: "CrafterSansTextPreview-Bold" },
] as const
type CutId = typeof cuts[number]["id"]
type OutlineData = {
  unitsPerEm: number; ascent: number; descent: number; xHeight: number; capHeight: number
  glyphs: Record<string, { path: string; advance: number; bounds: number[] | null; name: string }>
}
const fontStyle = (id: CutId): CSSProperties => ({
  fontFamily: id === "display" ? "var(--font-display)" : "var(--font-sans)",
  fontWeight: id === "display" ? 500 : Number(id),
})
const phrases = ["Craft. Ship.\nRepeat.", "Código abierto.\nIdeas compartidas.", "¿Qué estás creando?\n¡Café, código y corazón!", "Ciência e comunidade.\nSão Paulo · ação · coração."]

export function FontSpecimen({ locale }: { locale: Locale }) {
  const t = fontCopy[locale]
  const [cutId, setCutId] = useState<CutId>("display")
  const [lastTextWeight, setLastTextWeight] = useState<CutId>("400")
  const [sample, setSample] = useState(phrases[0])
  const [size, setSize] = useState(64)
  const [tracking, setTracking] = useState(0)
  const [kern, setKern] = useState(true)
  const [glyph, setGlyph] = useState("g")
  const [outline, setOutline] = useState(false)
  const [data, setData] = useState<OutlineData | null>(null)
  const [failed, setFailed] = useState(false)
  const [retry, setRetry] = useState(0)
  const [comparison, setComparison] = useState("minimum · comunidad")
  const [format, setFormat] = useState("otf")
  const inspector = useRef<HTMLDivElement>(null)
  const selected = cuts.find(c => c.id === cutId)!

  function chooseCut(id: CutId) {
    setCutId(id)
    if (id !== "display") setLastTextWeight(id)
  }
  useEffect(() => {
    const controller = new AbortController()
    setData(null); setFailed(false)
    fetch(`/font/outlines/${cutId}.json`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(); return response.json() })
      .then((result: OutlineData) => setData(result))
      .catch(error => { if (error.name !== "AbortError") setFailed(true) })
    return () => controller.abort()
  }, [cutId, retry])
  const drawing = data?.glyphs[glyph]
  const drawingWidth = Math.max(drawing?.advance ?? 600, drawing?.bounds?.[2] ?? 0, 500)
  function chooseGlyph(value: string) {
    setGlyph(value)
    inspector.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }

  return <main className="font-page">
    <header className="font-hero">
      <div className="font-topline">
        <p className="station-label">Crafter Sans / {t.eyebrow}</p>
        <a className="font-primary-link" href="#font-download">{t.download}</a>
      </div>
      <div className="font-family-switch" role="group" aria-label={t.family}>
        <button aria-pressed={cutId === "display"} onClick={() => chooseCut("display")}>Bucle Display</button>
        <button aria-pressed={cutId !== "display"} onClick={() => chooseCut(lastTextWeight)}>Crafter Text</button>
      </div>
      <div className="font-wordmark-stage">
        <h1 aria-label="Crafter Sans" style={fontStyle(cutId)}>crafter<span aria-hidden="true">.</span></h1>
        <div className="font-hero-symbol" aria-hidden="true"><CrafterStationLogo decorative /></div>
      </div>
      <div className="font-hero-bottom">
        <p>{t.intro}</p>
        <dl className="font-facts"><div><dt>{t.textWeights}</dt><dd>4</dd></div><div><dt>{t.characters}</dt><dd>{glyphInventory.length}</dd></div><div><dt>{cutId === "display" ? "Display" : "Text"}</dt><dd className="font-version">{cutId === "display" ? fontVersions.display : fontVersions.text}</dd></div></dl>
      </div>
      <nav className="font-section-nav" aria-label="Crafter Sans">
        <a href="#font-try">{t.try}</a><a href="#font-weights">{t.family}</a><a href="#font-glyphs">{t.glyphs}</a><a href="#font-context">{t.uses}</a>
      </nav>
    </header>

    <section className="font-section font-tester" id="font-try" aria-labelledby="font-try-title">
      <div className="font-section-heading"><div><p className="station-label">01 / {t.try}</p><h2 id="font-try-title">{t.testerTitle}</h2></div><p>{t.testerDescription}</p></div>
      <div className="font-controls">
        <label>{t.variant}<select value={cutId} onChange={e => chooseCut(e.target.value as CutId)}>{cuts.map(c => <option key={c.id} value={c.id}>{c.id === "display" ? "Bucle Display" : `Text · ${c.name}`} {c.weight}</option>)}</select></label>
        <label>{t.size}<span><input type="range" min="14" max="144" value={size} onChange={e => setSize(Number(e.target.value))} /><output>{size} px</output></span></label>
        <label>{t.spacing}<span><input type="range" min="-3" max="10" step=".25" value={tracking} onChange={e => setTracking(Number(e.target.value))} /><output>{tracking} px</output></span></label>
        <label className="font-check"><input type="checkbox" checked={kern} onChange={e => setKern(e.target.checked)} />{t.kerning}</label>
        <button className="font-reset" onClick={() => { chooseCut("display"); setSize(64); setTracking(0); setKern(true); setSample(phrases[0]) }}>{t.reset}</button>
      </div>
      <label htmlFor="font-sample" className="sr-only">{t.sample}</label>
      <textarea id="font-sample" value={sample} onChange={e => setSample(e.target.value)} spellCheck={false}
        style={{ ...fontStyle(cutId), fontSize: size, letterSpacing: tracking, fontKerning: kern ? "normal" : "none" }} />
      <div className="font-presets">{phrases.map((phrase, i) => <button key={phrase} aria-pressed={sample === phrase} onClick={() => setSample(phrase)}>{t.presets[i]}</button>)}</div>
    </section>

    <section className="font-section" id="font-weights" aria-labelledby="font-weights-title">
      <div className="font-section-heading"><div><p className="station-label">02 / {t.family}</p><h2 id="font-weights-title">{t.familyTitle}</h2></div><p>{t.familyDescription}</p></div>
      <div className="font-weight-grid">{cuts.slice(1).map(c => <article key={c.id} className={`font-weight-card font-weight-${c.id}`}>
        <div className="font-card-label"><h3>{c.name}</h3><span>{c.weight}</span></div>
        <p className="font-weight-mark" style={fontStyle(c.id)} aria-hidden="true">Aa<span>&</span></p>
        <p className="font-weight-reading" style={fontStyle(c.id)}>{t.reading}</p>
        <button onClick={() => { chooseCut(c.id); document.getElementById("font-try")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }) }}>{t.try} {c.name}</button>
      </article>)}</div>
    </section>

    <section className="font-section" id="font-glyphs" aria-labelledby="font-glyphs-title">
      <div className="font-section-heading"><div><p className="station-label">03 / {t.glyphs}</p><h2 id="font-glyphs-title">{t.glyphTitle}</h2></div><p>{t.glyphDescription}</p></div>
      <div className="font-inspector" ref={inspector}>
        <div className="font-inspector-top"><span>{selected.name} / {selected.weight}</span><button aria-pressed={outline} onClick={() => setOutline(!outline)}>{t.outline}</button></div>
        <div className="font-glyph-drawing" aria-live="polite">
          {data && drawing ? <svg viewBox={`-80 ${-data.ascent - 70} ${drawingWidth + 160} ${data.ascent - data.descent + 140}`} role="img" aria-label={`${glyph.trim() || t.space} · ${drawing.name}`}>
            <g className="font-glyph-guides">{[0, data.xHeight, data.capHeight].map(y => <path key={y} d={`M-80 ${-y} H${drawingWidth + 80}`} />)}<path d={`M0 ${-data.ascent} V${-data.descent} M${drawing.advance} ${-data.ascent} V${-data.descent}`} /></g>
            <path d={drawing.path} transform="scale(1 -1)" fill={outline ? "none" : "currentColor"} stroke={outline ? "currentColor" : "none"} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg> : <p>{failed ? t.unavailable : t.loading}{failed && <button onClick={() => setRetry(n => n + 1)}>{t.retry}</button>}</p>}
          {drawing && !drawing.path && <span className="font-space-label">{t.space}</span>}
        </div>
        <dl className="font-glyph-metrics">
          <div><dt>{t.width}</dt><dd>{drawing?.advance ?? "—"}</dd></div><div><dt>{t.xHeight}</dt><dd>{data?.xHeight ?? "—"}</dd></div><div><dt>{t.capHeight}</dt><dd>{data?.capHeight ?? "—"}</dd></div>
        </dl>
        <p className="font-metric-note">{data?.unitsPerEm ?? 1000} {t.units} / em · {glyph.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}</p>
      </div>
      <div className="font-glyph-shortlist" aria-label={t.glyphs}>{[...new Set("crafterg&¿ñ8")].map(char => <button key={char} aria-pressed={glyph === char} onClick={() => chooseGlyph(char)} style={fontStyle(cutId)}>{char}</button>)}</div>
      <details className="font-glyph-details"><summary>{t.allGlyphs}</summary><div className="font-glyph-grid">{glyphInventory.map(g => <button key={g.unicode} title={`${g.unicode} · ${g.name}`} aria-label={`${g.unicode} · ${g.sample.trim() || t.space}`} aria-pressed={glyph === g.sample} onClick={() => chooseGlyph(g.sample)}><span style={fontStyle(cutId)}>{g.sample.trim() || "␣"}</span><small>{g.unicode}</small></button>)}</div></details>
      <details className="font-evolution"><summary>{t.evolution}</summary>
        <label>{t.comparison}<input value={comparison} onChange={e => setComparison(e.target.value)} /></label>
        <div><span>{t.before} / 0.101</span><p className="font-before">{comparison || " "}</p></div>
        <div><span>{t.after} / 0.200</span><p className="font-after">{comparison || " "}</p></div>
      </details>
    </section>

    <section className="font-section" id="font-context" aria-labelledby="font-context-title">
      <div className="font-section-heading"><div><p className="station-label">04 / {t.uses}</p><h2 id="font-context-title">{t.usesTitle}</h2></div><p>{t.usesDescription}</p></div>
      <article className="font-context-station"><div><p className="station-label">Crafter Station</p><h3>Craft.<br />Ship.<br />Repeat.</h3></div><div><CrafterStationLogo decorative /><p>{t.station}</p></div></article>
      <div className="font-context-pair">
        <article className="font-context-oss"><p className="station-label">Crafter Open Source</p><h3>{t.open}</h3><p>{t.openSub}</p><div><span>Elements</span><span>Petdex</span><span>TRX</span></div><span className="font-context-braces" aria-hidden="true">{"{ }"}</span></article>
        <article className="font-context-coffee"><p className="station-label">Crafter Station / Code Brew</p><h3>Code Brew</h3><svg viewBox="0 0 200 160" fill="none" aria-hidden="true"><path d="M40 44h98v49c0 32-18 47-49 47S40 125 40 93V44Zm100 9h18c32 0 32 48 0 48h-20M65 28c-12-12 13-12 1-24M108 28c-12-12 13-12 1-24" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg><p>{t.coffee}</p></article>
      </div><p className="font-context-note">{t.contextNote}</p>
    </section>

    <section className="font-section font-download" id="font-download" aria-labelledby="font-download-title">
      <div className="font-section-heading"><div><p className="station-label">05 / Crafter Sans</p><h2 id="font-download-title">{t.downloadTitle}</h2></div><p>{t.downloadDescription}</p></div>
      <label className="font-format">{t.format}<select value={format} onChange={e => setFormat(e.target.value)}><option value="otf">OTF</option><option value="ttf">TTF</option><option value="woff2">WOFF2</option></select></label>
      <div className="font-download-list">{cuts.map(c => <a key={c.id} href={`/font/files/${c.stem}.${format}`} download><span style={fontStyle(c.id)}>Aa</span><span>{c.name}<small>{c.weight} / {c.id === "display" ? fontVersions.display : fontVersions.text}</small></span><span>{format.toUpperCase()}</span></a>)}</div>
      <p className="font-release-note">{t.status} <a href="/font/README.txt">{t.notes}</a></p>
    </section>
  </main>
}
