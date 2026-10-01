import { ArrowLink } from "@/components/arrow-link"
import { LocalizedLink } from "@/components/localized-link"
import { type Locale } from "@/lib/i18n"
import { getEcosystem, getSiteConfig } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"

export function Capabilities({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  return (
    <section className="station-section">
      <div className="station-section-heading"><div><p className="station-eyebrow">Crafter Station</p><h2>{t.more}</h2></div></div>
      <p className="mb-8 max-w-2xl leading-7 text-muted-foreground">{getSiteConfig(locale).description}</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {getEcosystem(locale).map((item, index) => (
          <LocalizedLink key={item.title} href={item.href} locale={locale} className="group flex flex-col rounded-md border border-line bg-card p-7 transition-colors hover:border-foreground/40">
            <span className="station-label mb-8 text-muted-foreground">0{index + 1} / CRAFTER</span>
            <h3 className="text-xl">{item.title}</h3>
            <p className="mt-4 grow text-sm leading-7 text-muted-foreground">{item.body}</p>
            <ArrowLink className="mt-8">{t.explore}</ArrowLink>
          </LocalizedLink>
        ))}
      </div>
    </section>
  )
}
