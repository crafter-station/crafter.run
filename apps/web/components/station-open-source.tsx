import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { getOssRepos } from "@/lib/oss"
import { bucleCopy } from "@/lib/bucle-copy"

export async function StationOpenSource({ locale }: { locale: Locale }) {
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
    <section className="home-source" aria-labelledby="home-oss-title">
      <div className="home-source-heading">
        <div>
          <h2 id="home-oss-title">{b.ossTitle}</h2>
          <p className="home-source-note">{b.ossBody}</p>
        </div>
        <Link href={withLocale("/oss", locale)} className="home-action-link">{b.ossExplore}</Link>
      </div>
      <div className="home-source-list">
        {selected.map((repo, i) => (
          <Link key={repo.repo} href={repo.url} target="_blank" rel="noopener noreferrer" className="home-source-project">
            <span className="station-label">{String(i + 1).padStart(2, "0")} / {repo.category}</span>
            <h3>{repo.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
