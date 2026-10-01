import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { type Locale, withLocale } from "@/lib/i18n"
import { getProducts } from "@/lib/site"
import { homeCopy } from "@/lib/home-copy"

// Abstract editorial artwork, not a screenshot or a product interface.
function RadarArt() {
  return (
    <svg className="home-radar" viewBox="0 0 500 350" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        {[55, 100, 145, 190].map(r => <circle key={r} cx="270" cy="185" r={r} opacity=".18" />)}
        <path d="M25 185h475M270 0v350M120 35l300 300M120 335 420 35" opacity=".16" />
        <path d="m126 117 95 35 83-63 55 155-119 59-19-151 138 92" strokeDasharray="3 5" opacity=".6" />
      </g>
      {[[126,117],[221,152],[304,89],[359,244],[240,303]].map(([x,y],i) => (
        <g key={x} className={`home-radar-node node-${i}`} transform={`translate(${x} ${y})`}>
          <circle r="15" fill="#c9d7b6" stroke="currentColor" />
          <circle r="5" fill="currentColor" />
        </g>
      ))}
      <g transform="translate(270 185)">
        <path d="M0 0 128-130A182 182 0 0 1 180 25Z" fill="currentColor" opacity=".07" />
        <circle r="6" fill="currentColor" />
      </g>
    </svg>
  )
}

function WaveArt() {
  return <div className="home-wave" aria-hidden="true">
    {[20,32,53,38,70,105,155,116,68,96,140,188,144,85,55,90,120,72,42,24,40].map((height, i) =>
      <i key={i} style={{ height }} />
    )}
  </div>
}

export function FeaturedProducts({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  const catalog = getProducts(locale)
  const products = ["hack0", "maca", "petdex", "legalize-pe"].flatMap(slug => {
    const product = catalog.find(p => p.slug === slug)
    return product ? [product] : []
  })
  return (
    <section id="work" className="home-work" aria-labelledby="home-work-title">
      <div className="home-section-index station-label"><span>03 / {t.catalog}</span><span>CRAFTER → WORLD</span></div>
      <div className="home-work-heading">
        <h2 id="home-work-title">{t.work}</h2>
        <p>{t.workBody}</p>
      </div>
      <div className="home-work-grid">
        {products.slice(0,2).map((p, i) => (
          <a key={p.slug} className={`home-product home-product-${p.slug}`} href={p.url} target="_blank" rel="noopener noreferrer">
            <div className="home-product-top station-label"><span>0{i+1} / {p.technologies.join(" · ")}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
            <div className="home-product-stage">
              <h3>{p.title}</h3>
              {p.slug === "hack0" ? <RadarArt /> : <WaveArt />}
              <span className="home-product-domain station-label">{new URL(p.url).hostname}</span>
            </div>
            <div className="home-product-caption"><p>{p.tagline}</p><ArrowUpRight size={24} aria-hidden="true" /></div>
            <p className="home-product-description">{p.description}</p>
          </a>
        ))}
      </div>
      <div className="home-project-notes">
        {products.slice(2).map((p, i) => <a key={p.slug} href={p.url} target="_blank" rel="noopener noreferrer" className="home-project-note">
          <span className={`home-project-sign home-sign-${p.slug}`} aria-hidden="true">{i === 0 ? ":)" : "§"}</span>
          <div><span className="station-label">0{i+3} / {p.technologies[0]}</span><h3>{p.title}</h3><p>{p.tagline}</p></div>
          <ArrowUpRight size={24} aria-hidden="true" />
        </a>)}
      </div>
      <Link className="home-catalog-link" href={withLocale("/products", locale)}><span>{t.allProjects}</span><span className="station-label">{String(catalog.length).padStart(2,"0")} <ArrowUpRight size={18} aria-hidden="true" /></span></Link>
    </section>
  )
}
