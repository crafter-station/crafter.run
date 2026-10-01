import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ProjectArt } from "@/components/project-art"
import { type Locale, withLocale } from "@/lib/i18n"
import { getProducts } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"

const featuredProductSlugs = ["hack0", "petdex", "legalize-pe", "maca"]
export function FeaturedProducts({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  const products = getProducts(locale).filter((p) => featuredProductSlugs.includes(p.slug))
  return (
    <section id="work" className="station-section">
      <div className="station-section-heading">
        <div><p className="station-eyebrow">{t.projectsLabel}</p><h2>{t.projects}</h2></div>
        <Link href={withLocale("/products", locale)} className="station-text-link">{t.visit}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="station-project-grid">
        {products.map((p) => (
          <article key={p.slug} className="station-project-card">
            <ProjectArt name={p.slug} label={p.technologies[0]} />
            <div className="station-project-info">
              <h3>{p.title}</h3><p>{p.tagline}</p>
              <p className="text-muted-foreground">{p.description}</p>
              <div className="station-project-meta">
                {("metrics" in p ? p.metrics : p.technologies).slice(0, 3).map((metric) => <span key={metric}>{metric}</span>)}
              </div>
              <div className="station-project-foot">
                <Link className="station-text-link" href={p.url} target="_blank" rel="noopener noreferrer">{t.visit}<ArrowUpRight size={15} aria-hidden="true" /></Link>
                <span className="station-label text-muted-foreground">{p.slug}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
