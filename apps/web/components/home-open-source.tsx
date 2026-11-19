import Link from "next/link"

import { type Locale, withLocale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"
import { getOssRepos } from "@/lib/oss"
import { HomeHead } from "@/components/home-head"

// Monochrome masks of each project's own icon, tinted with the accent in CSS.
const logos = new Set(["petdex", "agentfiles", "tinte", "elements", "text0", "one-hunter-vscode"])

function RepoLogo({ name, size }: { name: string; size: "sm" }) {
  if (!logos.has(name)) return null
  return <span className={`home-oss-logo home-oss-logo-${size}`} style={{ "--logo": `url(/oss/logos/${name}.png)` } as React.CSSProperties} aria-hidden="true" />
}

/** Open source proof: total stars, a live bar chart of the top repositories and three featured cards. */
export async function HomeOpenSource({ locale, index }: { locale: Locale; index: number }) {
  const t = landingCopy[locale]
  const repos = [...(await getOssRepos())].sort((a, b) => b.stars - a.stars)
  if (repos.length === 0) return null
  const stars = repos.reduce((sum, repo) => sum + repo.stars, 0)
  const chart = repos.slice(0, 6)
  const max = chart[0].stars
  const number = new Intl.NumberFormat("en-US")

  return (
    <section className="home-oss" aria-labelledby="home-oss-title">
      <HomeHead id="home-oss-title" index={index} label={t.sections.openSource} title={t.ossTitle} lede={t.ossBody}>
        <Link href={withLocale("/oss", locale)} className="home-action-link">{t.ossCta}</Link>
      </HomeHead>
      <div className="home-oss-panel home-frame">
        <div className="home-oss-total">
          <strong>{number.format(stars)}</strong>
          <span className="home-label">{t.ossStars}</span>
          <span className="home-label-sm">{repos.length} {t.ossRepos}</span>
        </div>
        <figure className="home-oss-chart">
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
          <figcaption className="home-label-sm">{t.ossChart}</figcaption>
        </figure>
      </div>
    </section>
  )
}
