import type { CSSProperties } from "react"

import { fallbackCover } from "@/lib/ships-showcase"

/** The Ship's image, or a cover generated from its name so no card is an empty box. */
export function ShipCover({ name, imageUrl, eager = false }: { name: string; imageUrl: string | null; eager?: boolean }) {
  if (imageUrl) {
    return (
      <span className="ship-cover">
        <img src={imageUrl} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
      </span>
    )
  }
  const { palette, letters, angle } = fallbackCover(name)
  const style = { "--cover-from": palette.from, "--cover-to": palette.to, "--cover-ink": palette.ink, "--cover-angle": `${angle}deg` } as CSSProperties
  return (
    <span className="ship-cover ship-cover-generated" style={style} aria-hidden="true">
      <span>{letters}</span>
    </span>
  )
}
