import type { ReactNode } from "react"
import { Container } from "@/components/grid-container"
import { StationPageArt, type PageArtwork } from "@/components/station-page-art"

/** The inner-page hero: label, one claim, the lede, and optional actions (hero-cta / hero-cta-ghost). */
export function StationPageHero({
  eyebrow,
  title,
  description,
  art,
  actions,
  children,
}: {
  eyebrow: ReactNode
  title: ReactNode
  description: ReactNode
  art?: PageArtwork
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <Container innerClassName="inner-hero">
      <p className="home-label">{eyebrow}</p>
      <div className="inner-hero-grid">
        <h1>{title}</h1>
        <div className="inner-hero-side">
          <p>{description}</p>
          {actions ? <div className="inner-hero-actions">{actions}</div> : null}
          {art ? <StationPageArt kind={art} /> : null}
        </div>
        {children ? <div className="inner-hero-extra">{children}</div> : null}
      </div>
    </Container>
  )
}
