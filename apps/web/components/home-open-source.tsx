import Link from "next/link"

import { type Locale, withLocale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"
import { getOssRepos } from "@/lib/oss"

// Monochrome masks of each project's own icon, tinted with the accent in CSS.
const logos = new Set(["petdex", "agentfiles", "tinte", "elements", "text0", "one-hunter-vscode"])

function RepoLogo({ name, size }: { name: string; size: "sm" | "lg" }) {
  if (!logos.has(name)) return null
  return <span className={`home-oss-logo home-oss-logo-${size}`} style={{ "--logo": `url(/oss/logos/${name}.png)` } as React.CSSProperties} aria-hidden="true" />
}

/** Open source proof: total stars, a live bar chart of the top repositories and three featured cards. */
export async function HomeOpenSource({ locale }: { locale: Locale }) {
  const t = landingCopy[locale]
  const repos = [...(await getOssRepos())].sort((a, b) => b.stars - a.stars)
  if (repos.length === 0) return null
  const stars = repos.reduce((sum, repo) => sum + repo.stars, 0)
  const chart = repos.slice(0, 6)
  const max = chart[0].stars
  const number = new Intl.NumberFormat("en-US")

  return (
    <section className="home-oss" aria-labelledby="home-oss-title">
      <div className="home-oss-panel">
        <div className="home-oss-intro">
          <p className="station-label">{t.ossLabel}</p>
          <h2 id="home-oss-title">{t.ossTitle}</h2>
          <p>{t.ossBody}</p>
          <Link href={withLocale("/oss", locale)} className="home-action-link">{t.ossCta}</Link>
        </div>
        <figure className="home-oss-chart">
          <div className="home-oss-total">
            <strong>{number.format(stars)}</strong>
            <span>{t.ossStars}<br />{repos.length} {t.ossRepos}</span>
          </div>
          <ol>
            {chart.map((repo) => (
              <li key={repo.repo}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  <span className="home-oss-name"><RepoLogo name={repo.name} size="sm" />{repo.name}</span>
                  <span className="home-oss-bar" style={{ "--share": repo.stars / max } as React.CSSProperties} />
                  <span className="home-oss-count">{number.format(repo.stars)}</span>
                </a>
              </li>
            ))}
          </ol>
          <figcaption className="station-label">{t.ossChart}</figcaption>
        </figure>
      </div>
      <ul className="home-oss-cards">
        {repos.slice(0, 3).map((repo) => (
          <li key={repo.repo}>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              <RepoLogo name={repo.name} size="lg" />
              <span className="home-oss-card-head station-label"><span>{repo.name}</span><span>★ {number.format(repo.stars)}</span></span>
              <p>{repo.description}</p>
              <span className="home-oss-card-meta station-label">{repo.language ?? repo.repo}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
