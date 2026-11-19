"use client"

import { type CSSProperties, useRef, useState } from "react"

const themes = [
  { id: "paper", name: "Paper", bg: "#f7f5ea", fg: "#20221d", primary: "#c8921a", muted: "#6b6347", line: "#20221d24" },
  { id: "dusk", name: "Dusk", bg: "#0f1424", fg: "#e6e9f5", primary: "#8aa4ff", muted: "#8b94b8", line: "#e6e9f52e" },
  { id: "clay", name: "Clay", bg: "#f3e4d7", fg: "#3a1f14", primary: "#c2512b", muted: "#8a5d49", line: "#3a1f1429" },
  { id: "mint", name: "Mint", bg: "#e8f3ee", fg: "#10281f", primary: "#1f8a63", muted: "#53766a", line: "#10281f26" },
] as const

/** A mini interface that re-skins from one token set; arrow keys move between palettes like a radio group. */
export function TinteDemo({ label }: { label: string }) {
  const [index, setIndex] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const theme = themes[index]
  const vars = { "--t-bg": theme.bg, "--t-fg": theme.fg, "--t-primary": theme.primary, "--t-muted": theme.muted, "--t-line": theme.line } as CSSProperties

  function move(to: number) {
    const next = (to + themes.length) % themes.length
    setIndex(next)
    refs.current[next]?.focus()
  }

  return (
    <div className="wb-tinte">
      <div className="wb-tinte-preview" style={vars} data-theme-id={theme.id}>
        <div className="wb-tinte-card">
          <p className="wb-tinte-kicker">Edition 01 · Lima</p>
          <h3>Hot Reload</h3>
          <p className="wb-tinte-body">Build for a day, ship by night.</p>
          <div className="wb-tinte-row">
            <span className="wb-tinte-button">Join</span>
            <span className="wb-tinte-toggle" aria-hidden="true"><i /></span>
            <span className="wb-tinte-tag">LATAM</span>
          </div>
        </div>
        <dl className="wb-tinte-tokens">
          <div><dt>--background</dt><dd>{theme.bg}</dd></div>
          <div><dt>--primary</dt><dd>{theme.primary}</dd></div>
        </dl>
      </div>
      <div className="wb-tinte-picker" role="radiogroup" aria-label={label}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); move(index + 1) }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); move(index - 1) }
        }}>
        {themes.map((item, i) => (
          <button key={item.id} type="button" role="radio" aria-checked={i === index} tabIndex={i === index ? 0 : -1}
            ref={node => { refs.current[i] = node }} onClick={() => setIndex(i)} title={item.name}>
            <span className="wb-tinte-swatch" style={{ background: item.bg, boxShadow: `inset 0 0 0 1px ${item.line}` }}><i style={{ background: item.primary }} /></span>
            <span>{item.name}</span>
          </button>
        ))}
        <kbd className="wb-kbd" aria-hidden="true">← →</kbd>
      </div>
    </div>
  )
}
