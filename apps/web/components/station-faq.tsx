import Link from "next/link"
import { Plus } from "lucide-react"
import { faqCopy, faqDestinations } from "@/lib/faq-copy"
import { type Locale, withLocale } from "@/lib/i18n"

export function StationFaq({ locale }: { locale: Locale }) {
  const t = faqCopy[locale]

  return (
    <section className="home-faq" id="faq" aria-labelledby="home-faq-title">
      <div className="home-faq-heading">
        <p className="station-label">{t.eyebrow}</p>
        <h2 id="home-faq-title">{t.title}</h2>
        <p>{t.description}</p>
        <span className="home-faq-mark" aria-hidden="true">?</span>
      </div>
      <div className="home-faq-list">
        {t.items.map((item, index) => {
          const href = faqDestinations[item.id]
          const external = href.startsWith("https:")
          return (
            // Native details may already be open when React hydrates. Keep the
            // visitor's choice without treating that browser-owned state as a mismatch.
            <details key={item.id} name="station-faq" className="home-faq-item" suppressHydrationWarning>
              <summary>
                <span className="home-faq-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.question}</span>
                <Plus size={17} aria-hidden="true" />
              </summary>
              <div className="home-faq-answer">
                <p>{item.answer}</p>
                <Link href={external ? href : withLocale(href, locale)}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}>
                  {item.cta}
                </Link>
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}
