import type { ReactNode } from "react"

import { ClipVideo } from "@/components/changelog/clip-video"

/**
 * A short looping product clip, the changelog's GIF. `size` is `WIDTHxHEIGHT`
 * so the frame reserves its space before the video loads.
 */
export function Clip({ src, poster, caption, size, alt }: { src: string; poster?: string; caption?: string; size: string; alt: string }) {
  const [width, height] = size.split("x").map(Number)
  if (!width || !height) throw new Error(`Clip ${src}: size must be WIDTHxHEIGHT, got "${size}"`)
  return (
    <figure className="journal-figure changelog-clip">
      <ClipVideo src={src} poster={poster} width={width} height={height} label={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** Two or three figures side by side; stacks on narrow screens. */
export function Gallery({ children }: { children: ReactNode }) {
  return <div className="changelog-gallery">{children}</div>
}

/**
 * Someone outside the team talking about the ship. `quote` must be the
 * verbatim public text; `source` is the platform or publication name.
 */
export function Mention({ href, author, source, quote, date }: { href: string; author: string; source: string; quote: string; date?: string }) {
  return (
    <figure className="changelog-mention">
      <blockquote cite={href}>
        <p>{quote}</p>
      </blockquote>
      <figcaption>
        <a href={href} rel="noopener noreferrer" target="_blank">
          <strong>{author}</strong>
          <span>{source}{date ? ` · ${date}` : ""}</span>
        </a>
      </figcaption>
    </figure>
  )
}
