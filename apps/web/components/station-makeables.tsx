import { StationPageArt } from "@/components/station-page-art"
import type { Locale } from "@/lib/i18n"
import { participationCopy } from "@/lib/participation-copy"

export function StationMakeables({ locale }: { locale: Locale }) {
  const t = participationCopy[locale].makeables
  return (
    <section className="home-makeables" aria-labelledby="home-makeables-title">
      <div className="home-makeables-panel">
        <div>
          <p className="station-label">{t.eyebrow} / Makeables</p>
          <h2 id="home-makeables-title">{t.title}</h2>
          <p className="home-makeables-body">{t.body}</p>
          <a className="home-action-link" href="https://makeables.dev" target="_blank" rel="noopener noreferrer">{t.action}</a>
        </div>
        <StationPageArt kind="brand" />
      </div>
    </section>
  )
}
