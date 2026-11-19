import type { CSSProperties } from "react"

/** Joined hairline stat tiles: Crafter 500 number in the accent, home-label-sm caption. */
export function StatTiles({ items, columns = items.length, label }: {
  items: readonly (readonly [string, string])[]; columns?: number; label?: string
}) {
  return (
    <dl className={`stat-tiles tile-grid home-frame tile-grid-${columns}`} style={{ "--cols": columns } as CSSProperties} aria-label={label}>
      {items.map(([value, caption]) => (
        <div key={caption}><dd>{value}</dd><dt className="home-label-sm">{caption}</dt></div>
      ))}
    </dl>
  )
}
