import Link from "next/link"

/**
 * The caption every demo tile shares: a bold verb phrase, one sentence, then mono chips naming
 * the repo or primitive behind it. The phrase is the tile's link; its ::after stretches over the
 * tile so the whole surface navigates while the live demo above keeps its own controls.
 */
export function TileCaption({ title, text, chips, href, external = false }: {
  title: string
  text: string
  chips: readonly string[]
  href?: string
  external?: boolean
}) {
  const phrase = href
    ? external
      ? <a className="tile-caption-link" href={href} target="_blank" rel="noopener noreferrer">{title}</a>
      : <Link className="tile-caption-link" href={href}>{title}</Link>
    : title
  return (
    <figcaption className="tile-caption">
      <p><strong>{phrase}</strong> {text}</p>
      <ul className="tile-chips" aria-label="Stack">
        {chips.map(chip => <li key={chip}>{chip}</li>)}
      </ul>
    </figcaption>
  )
}
