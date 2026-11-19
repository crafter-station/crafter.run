import type { ReactNode } from "react"

/**
 * The one section header on the homepage: "NN / LABEL", the title, an optional lede on the
 * left, and at most one action group on the right, baseline-aligned. Tiles hang below it.
 */
export function HomeHead({ id, index, label, title, lede, children }: {
  id: string; index: number; label: string; title: string; lede?: string; children?: ReactNode
}) {
  return (
    <header className="home-head">
      <div className="home-head-copy">
        <p className="home-label"><span className="home-label-n">{String(index).padStart(2, "0")}</span><span className="home-label-sep"> / </span>{label}</p>
        <h2 id={id}>{title}</h2>
        {lede ? <p className="home-head-lede">{lede}</p> : null}
      </div>
      {children ? <div className="home-head-action">{children}</div> : null}
    </header>
  )
}
