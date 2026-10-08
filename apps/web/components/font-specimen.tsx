"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { FontBucle } from "@/components/font-bucle"
import { FontField } from "@/components/font-field"
import { FontWordmark } from "@/components/font-wordmark"
import { bucleCopy } from "@/lib/font-bucle-copy"
import { fontCopy } from "@/lib/font-copy"
import { loadOutlines, type OutlineData } from "@/lib/font-outlines"
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
// Lowercase is the only range redrawn as cubic masters so far; everything else is still derived from Display.
const isMaster = (char: string) => /^[a-z]$/.test(char)
const masterCount = glyphInventory.filter(g => isMaster(g.sample)).length
const fontStyle = (id: CutId): CSSProperties => ({
  fontFamily: id === "display" ? "var(--font-display)" : "var(--font-sans)",
  fontWeight: id === "display" ? 500 : Number(id),
})
const phrases = ["Craft. Ship.\nRepeat.", "Código abierto.\nIdeas compartidas.", "¿Qué estás creando?\n¡Café, código y corazón!", "Ciência e comunidade.\nSão Paulo · ação · coração."]

export function FontSpecimen({ locale }: { locale: Locale }) {
  const t = fontCopy[locale]
  const b = bucleCopy[locale]
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
  const inspector = useRef<HTMLDivElement>(null)
  const selected = cuts.find(c => c.id === cutId)!

  function chooseCut(id: CutId) {
    setCutId(id)
    if (id !== "display") setLastTextWeight(id)
  }
  useEffect(() => {
    let live = true
    setData(null); setFailed(false)
    loadOutlines(cutId).then(result => { if (live) setData(result) }).catch(() => { if (live) setFailed(true) })
    return () => { live = false }
  }, [cutId, retry])
  const drawing = data?.glyphs[glyph]
  const drawingWidth = Math.max(drawing?.advance ?? 600, drawing?.bounds?.[2] ?? 0, 500)
  function chooseGlyph(value: string) {
    setGlyph(value)
    inspector.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }

  return <main className="font-page">
    <FontField />
    <header className="font-hero">
      <div className="font-topline">
        <p className="station-label">Crafter Sans / {t.eyebrow}</p>
        <a className="font-version-badge" href="#font-bucle"><span aria-hidden="true" />{b.badge} · Text {fontVersions.text} · Display {fontVersions.display}</a>
      </div>
      <div className="font-family-switch" role="group" aria-label={t.family}>
        <button aria-pressed={cutId === "display"} onClick={() => chooseCut("display")}>Display</button>
        <button aria-pressed={cutId !== "display"} onClick={() => chooseCut(lastTextWeight)}>Text</button>
      </div>
      <div className="font-wordmark-stage">
        <FontWordmark cut={cutId} word="crafter." label="Crafter Sans" guides={b.guides} />
        <p className="font-lens-hint">{b.lensHint}</p>
      </div>
      <div className="font-hero-bottom">
        <p>{t.intro}</p>
        <dl className="font-facts"><div><dt>{t.textWeights}</dt><dd>4</dd></div><div><dt>{t.characters}</dt><dd>{glyphInventory.length}</dd></div><div><dt>{b.master}</dt><dd>{masterCount}</dd></div></dl>
      </div>
      <nav className="font-section-nav" aria-label="Crafter Sans">
        <a href="#font-sizes">{b.sizesLabel}</a><a href="#font-try">{t.try}</a><a href="#font-bucle">{b.bucleLabel}</a><a href="#font-glyphs">{t.glyphs}</a><a href="#font-context">{t.uses}</a>
      </nav>
    </header>

    <section className="font-section" id="font-sizes" aria-labelledby="font-sizes-title">
      <div className="font-section-heading"><div><p className="station-label">01 / {b.sizesLabel}</p><h2 id="font-sizes-title">{b.sizesTitle}</h2></div><p>{b.sizesBody}</p></div>
      <div className="font-sizes">
        {(["display", "500"] as const).map(id => <article key={id} className={`font-size-row font-size-${id}`}>
          <p className="font-size-meta"><span>{id === "display" ? b.displayCut : b.textCut}</span><span>{id === "display" ? fontVersions.display : fontVersions.text}</span></p>
          <p className="font-size-big" style={fontStyle(id)}>comunidad</p>
          <div className="font-size-small">
            {[18, 16].map(px => <p key={px} style={{ ...fontStyle(id), fontSize: px }}><small>{b.atSize} {px} px</small>{t.reading}</p>)}
          </div>
        </article>)}
      </div>
    </section>

    <section className="font-section font-tester" id="font-try" aria-labelledby="font-try-title">
      <div className="font-section-heading"><div><p className="station-label">02 / {t.try}</p><h2 id="font-try-title">{t.testerTitle}</h2></div><p>{t.testerDescription}</p></div>
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
      <div className="font-section-heading"><div><p className="station-label">03 / {t.family}</p><h2 id="font-weights-title">{t.familyTitle}</h2></div><p>{t.familyDescription}</p></div>
      <div className="font-weight-grid">{cuts.slice(1).map(c => <article key={c.id} className={`font-weight-card font-weight-${c.id}`}>
        <div className="font-card-label"><h3>{c.name}</h3><span>{c.weight}</span></div>
        <p className="font-weight-mark" style={fontStyle(c.id)} aria-hidden="true">Aa<span>&</span></p>
        <p className="font-weight-reading" style={fontStyle(c.id)}>{t.reading}</p>
        <button onClick={() => { chooseCut(c.id); document.getElementById("font-try")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }) }}>{t.try} {c.name}</button>
      </article>)}</div>
    </section>

    <section className="font-section font-bucle" id="font-bucle" aria-labelledby="font-bucle-title">
      <div className="font-section-heading"><div><p className="station-label">04 / {b.bucleLabel}</p><h2 id="font-bucle-title">{b.bucleTitle}</h2></div><p>{b.bucleBody}</p></div>
      <FontBucle copy={b} />
    </section>

    <section className="font-section" id="font-glyphs" aria-labelledby="font-glyphs-title">
      <div className="font-section-heading"><div><p className="station-label">05 / {t.glyphs}</p><h2 id="font-glyphs-title">{t.glyphTitle}</h2></div><p>{t.glyphDescription}</p></div>
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
      <div className="font-glyph-legend"><p>{b.legendTitle}</p><span data-status="master">{b.master} · {masterCount}</span><span data-status="derived">{b.derived} · {glyphInventory.length - masterCount}</span><span>{b.pending}</span></div>
      <div className="font-glyph-grid" aria-label={t.allGlyphs}>{glyphInventory.map(g => <button key={g.unicode} data-status={isMaster(g.sample) ? "master" : "derived"} title={`${g.unicode} · ${g.name}`} aria-label={`${g.unicode} · ${g.sample.trim() || t.space}`} aria-pressed={glyph === g.sample} onClick={() => chooseGlyph(g.sample)}><span style={fontStyle(cutId)}>{g.sample.trim() || "␣"}</span><small>{g.unicode}</small></button>)}</div>
    </section>

    <section className="font-section" id="font-context" aria-labelledby="font-context-title">
      <div className="font-section-heading"><div><p className="station-label">06 / {t.uses}</p><h2 id="font-context-title">{t.usesTitle}</h2></div><p>{t.usesDescription}</p></div>
      <article className="font-context-station"><div><p className="station-label">Crafter Station</p><h3>Craft.<br />Ship.<br />Repeat.</h3></div><div><CrafterStationLogo decorative /><p>{t.station}</p></div></article>
      <div className="font-context-pair">
        <article className="font-context-oss"><p className="station-label">Crafter Open Source</p><h3>{t.open}</h3><p>{t.openSub}</p><div><span>Elements</span><span>Petdex</span><span>TRX</span></div><span className="font-context-braces" aria-hidden="true">{"{ }"}</span></article>
        <article className="font-context-coffee"><p className="station-label">Crafter Station / Hot Reload</p><h3>Hot Reload</h3><svg viewBox="0 0 200 160" fill="none" aria-hidden="true"><path d="M40 44h98v49c0 32-18 47-49 47S40 125 40 93V44Zm100 9h18c32 0 32 48 0 48h-20M65 28c-12-12 13-12 1-24M108 28c-12-12 13-12 1-24" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg><p>{t.coffee}</p></article>
      </div><p className="font-context-note">{t.contextNote}</p>
    </section>

    <section className="font-section font-follow" id="font-follow" aria-labelledby="font-follow-title">
      <p className="station-label">{b.followLabel} · Text {fontVersions.text}</p>
      <h2 id="font-follow-title">{b.followTitle}</h2>
      <p>{b.followBody}</p>
      <div className="font-follow-links"><a href="https://github.com/crafter-station">{b.github}</a><a href={`/${locale}/blog`}>{b.journal}</a></div>
      <div className="font-ticker" aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>{b.ticker.map(item => <span key={item}>{item}<CrafterStationLogo decorative /></span>)}</span>)}</div></div>
    </section>
  </main>
}
