import { MakeablesArtwork } from "@/components/makeables-artwork"
import type { Locale } from "@/lib/i18n"
import { participationCopy } from "@/lib/participation-copy"

export function StationMakeables({ locale }: { locale: Locale }) {
  const t = participationCopy[locale].makeables
  return (
    <section className="home-makeables" aria-labelledby="home-makeables-title">
      <div className="home-makeables-panel">
        <div className="home-makeables-copy">
          <p className="station-label">{t.eyebrow}</p>
          <h2 id="home-makeables-title">Makeables<span aria-hidden="true">✳</span></h2>
          <p className="home-makeables-tagline">{t.title}</p>
          <p className="home-makeables-body">{t.body}</p>
          <a className="home-secondary-link" href="https://makeables.dev" target="_blank" rel="noopener noreferrer">{t.action}<span aria-hidden="true">↗</span></a>
        </div>
        <MakeablesArtwork />
      </div>
    </section>
  )
}
