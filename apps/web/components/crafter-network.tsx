import Link from "next/link"
import type { CSSProperties } from "react"
import { getTranslations } from "next-intl/server"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { getNetwork, type NetworkArea } from "@/lib/network"
import { type Locale, withLocale } from "@/lib/i18n"

// Original editorial diagrams. The navigation keeps the original Crafter mark.
export function NetworkArtwork({ area }: { area: NetworkArea }) {
  return <svg viewBox="0 0 280 180" fill="none" className="network-artwork" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.3">
      {area === "research" && <>
        {[34, 57, 80].map(r => <ellipse key={r} cx="140" cy="90" rx={r} ry={r * .62} transform="rotate(-27 140 90)" />)}
        <path d="M36 90h208M140 20v140" strokeDasharray="2 5" opacity=".4" />
        <circle cx="140" cy="90" r="11" fill="currentColor" />
        <circle cx="199" cy="52" r="7" fill="var(--network-surface)" />
        <path d="M46 44h14m-7-7v14M218 139h14m-7-7v14" />
      </>}
      {area === "lab" && <>
        {[0, 1, 2].map(i => <g key={i} transform={`translate(0 ${-i * 28})`}>
          <path d="m67 105 73-38 73 38-73 39Z" fill="var(--network-surface)" />
          <path d="M67 105v12l73 39 73-39v-12M140 144v12" />
          {i === 2 && <path d="m119 96-17 9 17 9m42-18 17 9-17 9m-15-18-12 18" strokeWidth="2.5" />}
        </g>)}
        <path d="M39 120h16m-8-8v16M229 39h14m-7-7v14" opacity=".6" />
      </>}
      {area === "games" && <>
        <path d="m83 55 62-24 60 25-62 25Z" fill="currentColor" opacity=".16" />
        <path d="m83 55 62-24 60 25-62 25Zm0 0v68l60 29 62-28V56M143 81v71" />
        <path d="m96 88 33 15m-17-23v31" strokeWidth="6" strokeLinecap="square" />
        <ellipse cx="164" cy="105" rx="5" ry="7" fill="currentColor" />
        <ellipse cx="184" cy="95" rx="5" ry="7" fill="currentColor" />
        <path d="M53 43h16m-8-8v16M220 133h16m-8-8v16" />
      </>}
      {area === "station" && <>
        <circle cx="140" cy="90" r="54" strokeDasharray="2 6" opacity=".45" />
        <path d="M68 90h144M140 23v134M92 42l96 96M92 138l96-96" opacity=".5" />
        {[[68,90],[140,23],[212,90],[140,157]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="var(--network-surface)" />)}
        <circle cx="140" cy="90" r="31" fill="var(--network-surface)" />
      </>}
    </g>
  </svg>
}

export function NetworkCards({ locale, headingLevel = 3 }: { locale: Locale; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3"
  return <div className="network-grid">
    {getNetwork(locale).map((area, index) => <Link key={area.id} href={area.href}
      className={`network-card network-${area.id}`}
      style={{ "--network-color": area.color, "--network-surface": area.surface, "--network-ink": area.ink } as CSSProperties}
      aria-labelledby={`network-${area.id}-title`}
      {...(area.href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <div className="network-card-top"><span className="station-label">0{index + 1} / CRAFTER</span></div>
      <div className="network-card-art"><NetworkArtwork area={area.id} />{area.id === "station" && <CrafterStationLogo decorative className="network-station-mark" />}</div>
      <Heading id={`network-${area.id}-title`}>{area.name}</Heading>
      <p className="network-card-tagline">{area.tagline}</p>
      <p className="network-card-description">{area.description}</p>
      <span className="network-card-domain">{area.domain}</span>
    </Link>)}
  </div>
}

export async function StationNetwork({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pages.network" })
  return <section className="home-network" id="family" aria-labelledby="home-network-title">
    <div className="home-network-heading">
      <div><h2 id="home-network-title">{t("eyebrow")}</h2><p>{t("description")}</p></div>
      <Link className="home-action-link" href={withLocale("/universe", locale)}>{t("exploreCta")}</Link>
    </div>
    <NetworkCards locale={locale} />
  </section>
}
