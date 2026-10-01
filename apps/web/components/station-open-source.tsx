import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { type Locale, withLocale } from "@/lib/i18n"
import { getOssRepos } from "@/lib/oss"
import { stationCopy } from "@/lib/station-copy"
import { bucleCopy } from "@/lib/bucle-copy"

export async function StationOpenSource({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  const b = bucleCopy[locale]
  const repos = await getOssRepos()
  const selected = [
    { repo: "crafter-station/elements", name: "Elements", category: b.interfaces },
    { repo: "crafter-station/petdex", name: "Petdex", category: b.companions },
    { repo: "crafter-station/trx", name: "TRX", category: b.tools },
  ].flatMap(item => {
    const repo = repos.find(repo => repo.repo === item.repo)
    return repo ? [{ ...item, url: repo.url }] : []
  })

  return (
    <section className="station-open-source dark theme-scope" aria-labelledby="home-oss-title">
      <div className="station-feature-top station-label"><span>02 / Crafter Open Source</span><span>{t.built}</span></div>
      <div className="station-oss-heading">
        <h2 id="home-oss-title">{b.ossTitle}</h2>
        <p>{b.ossSubtitle}</p>
      </div>
      <div className="station-feature-list">
        {selected.map((repo, i) => (
          <Link key={repo.repo} href={repo.url} target="_blank" rel="noopener noreferrer" className="station-feature-row">
            <span className="station-row-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{repo.name}</h3>
            <span className="station-row-category">{repo.category}</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <div className="station-feature-footer">
        <p>{b.ossBody}</p>
        <Link href={withLocale("/oss", locale)} className="station-editorial-link">{b.ossExplore}<ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
