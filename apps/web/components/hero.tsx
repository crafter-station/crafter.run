import Link from "next/link"
import { type Locale } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"
import { bucleCopy } from "@/lib/bucle-copy"
import { skeleton, type OutlineData } from "@/lib/font-outlines"
import { getOssRepos } from "@/lib/oss"
import displayOutlines from "@/public/font/outlines/display.json"

// Crafter Sans Bucle's real outlines, bundled into the server render only. Two
// letters of the headline are shown as the drawing behind them: the community drew this face.
const display = displayOutlines as OutlineData

function Drawn({ char, delay }: { char: string; delay: number }) {
  const glyph = display.glyphs[char]
  if (!glyph?.path) return <>{char}</>
  const { ascent, descent, unitsPerEm } = display
  const shape = skeleton(glyph.path)
  return <span className="hero-drawn" style={{ "--d": `${delay}ms`, "--glyph-h": `${(ascent - descent) / unitsPerEm}em` } as React.CSSProperties}>
    {char}
    <svg viewBox={`0 ${-ascent} ${glyph.advance} ${ascent - descent}`} aria-hidden="true"
      style={{ width: `${glyph.advance / unitsPerEm}em`, height: `${(ascent - descent) / unitsPerEm}em` }}>
      <g transform="scale(1 -1)">
        <path d={glyph.path} pathLength={1} className="hero-drawn-outline" />
        <g className="hero-drawn-skeleton">
          {shape.handles.map(([x1, y1, x2, y2], i) => <path key={`h${i}`} d={`M${x1} ${y1}L${x2} ${y2}`} />)}
          {shape.handles.map(([, , x, y], i) => <circle key={`c${i}`} cx={x} cy={y} r="9" />)}
          {shape.nodes.map(([x, y], i) => <rect key={`n${i}`} x={x - 14} y={y - 14} width="28" height="28" />)}
        </g>
      </g>
    </svg>
  </span>
}

const SPECIMEN = "abcdefghijklmnopqrstuvwxyz0123456789".split("")

export async function HeroContent({
  locale, eventsCta, eventsHref, ossCta, ossHref,
}: {
  locale: Locale; eventsCta: string; eventsHref: string; ossCta: string; ossHref: string;
}) {
  const t = stationCopy[locale]
  const b = bucleCopy[locale]
  // Live stars from GitHub (cached a day, seeded fallback): the specimen's sample text is what we ship.
  const repos = (await getOssRepos()).sort((x, y) => y.stars - x.stars).slice(0, 3)
  return (
      <section className="station-masthead hero-specimen" aria-labelledby="station-title">
        <div className="hero-light" aria-hidden="true" />
        <p className="hero-eyebrow"><span>Crafter Station</span><span>Lima</span><span>{t.builders}</span></p>
        <h1 id="station-title"><span className="sr-only">{`${siteConfig.name}, ${siteConfig.tagline[locale]}. `}</span>
          <span lang="en" className="hero-line"><Drawn char="C" delay={0} />raft.</span>
          <span lang="en" className="hero-line"><Drawn char="S" delay={260} />hip.</span>
          <span lang="en" className="hero-line hero-line-gold">Repeat.</span>
        </h1>
        <aside className="hero-panel" aria-label="Crafter Sans Bucle">
          <p className="hero-panel-label"><span>Crafter Sans</span><span>Bucle · 500</span></p>
          <div className="hero-panel-grid" aria-hidden="true">{SPECIMEN.map(char => <span key={char}>{char}</span>)}</div>
          <ul className="hero-panel-repos">
            {repos.map(repo => <li key={repo.repo}><a href={repo.url} target="_blank" rel="noopener noreferrer"><span>{repo.name}</span><span>{repo.stars.toLocaleString("en-US")} ★</span></a></li>)}
          </ul>
        </aside>
        <div className="hero-baseline" aria-hidden="true"><span>baseline 0 · x-height {display.xHeight} · cap {display.capHeight}</span></div>
        <div className="hero-foot">
          <p className="station-masthead-description">{b.hero}</p>
          <div className="station-masthead-actions">
            <Link href={ossHref} className="station-masthead-cta station-masthead-cta-primary">{ossCta}</Link>
            <Link href={eventsHref} className="station-masthead-cta">{eventsCta}</Link>
          </div>
        </div>
      </section>
  )
}
