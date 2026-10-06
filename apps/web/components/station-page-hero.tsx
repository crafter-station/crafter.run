import type { ReactNode } from "react"
import { Container } from "@/components/grid-container"
import { StationPageArt, type PageArtwork } from "@/components/station-page-art"

export function StationPageHero({
  eyebrow,
  title,
  description,
  art,
  children,
}: {
  eyebrow: ReactNode
  title: ReactNode
  description: ReactNode
  art: PageArtwork
  children?: ReactNode
}) {
  return (
    <Container innerClassName="station-page-intro station-inner-hero">
      <p className="station-label station-inner-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="station-inner-hero-layout">
        <div className="station-inner-hero-copy">
          <p>{description}</p>
          {children ? <div className="station-inner-hero-extra">{children}</div> : null}
        </div>
        <StationPageArt kind={art} />
      </div>
    </Container>
  )
}
