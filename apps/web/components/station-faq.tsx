import { FaqSection } from "@/components/faq-section"
import { faqCopy, faqDestinations } from "@/lib/faq-copy"
import type { Locale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"

export function StationFaq({ locale, index }: { locale: Locale; index: number }) {
  const t = faqCopy[locale]
  return (
    <FaqSection
      locale={locale}
      id="faq"
      index={index}
      label={landingCopy[locale].sections.faq}
      title={t.title}
      lede={t.description}
      items={t.items.map((item) => ({ ...item, href: faqDestinations[item.id] }))}
    />
  )
}
