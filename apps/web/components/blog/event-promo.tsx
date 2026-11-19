import Image from "next/image"
import type { Locale } from "@/lib/i18n"
import { activePromo } from "@/lib/promos"

export function EventPromo({ locale }: { locale: Locale }) {
  const promo = activePromo()
  if (!promo) return null
  const copy = promo.copy[locale]

  return (
    <aside className="journal-promo home-frame">
      <Image src={promo.image} alt="" width={480} height={480} className="journal-promo-art" />
      <div>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <a className="station-button" href={promo.href} target="_blank" rel="noopener noreferrer">{copy.cta}</a>
      </div>
    </aside>
  )
}
