import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"
import type { Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

export function DesignSystemGuide({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  const swatches = [
    { name: "Station / Soft", className: "bg-brand-soft text-[#20221d]", value: "#F8E9A4" },
    { name: "Station / Signal", className: "bg-brand text-[#20221d]", value: "#FFC107" },
    { name: "Canvas", className: "bg-background text-foreground", value: "background" },
    { name: "Surface", className: "bg-card text-card-foreground", value: "card" },
    { name: "Ink", className: "bg-foreground text-background", value: "foreground" },
  ]
  return (
    <section className="station-section" id="system">
      <div className="station-section-heading"><div><p className="station-eyebrow">Crafter / Design system</p><h2>{t.guide}</h2></div><ThemeSwitcher locale={locale} label={`${t.light} / ${t.dark} / ${t.system}`} className="min-h-11 rounded border border-line px-4" /></div>
      <p className="max-w-2xl text-muted-foreground leading-7">{t.guideIntro}</p>
      <h3 className="mt-12 text-xl">01 / {t.palette}</h3>
      <div className="station-guide-grid">{swatches.map((swatch) => <div key={swatch.name} className={`station-swatch ${swatch.className}`}><span>{swatch.name}</span><span>{swatch.value}</span></div>)}</div>
      <h3 id="typography" className="mt-12 text-xl">02 / {t.typography}</h3>
      <div className="station-guide-specimen">
        <p className="font-display text-4xl tracking-tight md:text-6xl">Craft. Ship. Repeat.</p>
        <p className="station-label text-muted-foreground">Crafter Sans / Bucle Medium 500 / Preview 0.200</p>
        <p className="font-heading text-3xl">{t.note}</p>
        <p className="text-lg">Geist / Aa Bb Cc — 0123456789</p>
        <p className="station-label">Geist Mono / CRAFTER STATION — BUILT IN THE OPEN</p>
      </div>
      <h3 className="mt-12 text-xl">03 / {t.components}</h3>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button asChild><a href="#assets">{t.primary}<ArrowUpRight aria-hidden="true" /></a></Button>
        <Button variant="outline" asChild><a href="#typography">{t.secondary}</a></Button>
        <Button disabled>{t.disabled}</Button><Badge variant="secondary">Open source</Badge><Badge variant="outline">Station</Badge>
      </div>
      <div className="mt-8 max-w-md"><label htmlFor="system-example" className="mb-2 block text-sm">{t.field}</label><Input id="system-example" placeholder="craft → ship → repeat" /></div>
    </section>
  )
}
