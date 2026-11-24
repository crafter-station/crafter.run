import Link from "next/link"
import { Plus } from "lucide-react"
import { type Locale, withLocale } from "@/lib/i18n"
import { HomeHead } from "@/components/home-head"
import { JsonLd } from "@/components/json-ld"
import { faqPageSchema } from "@/lib/structured-data"

export type FaqEntry = { id: string; question: string; answer: string; href?: string; cta?: string }

type Props = {
  locale: Locale
  id: string
  index: number
  label: string
  title: string
  lede?: string
  items: FaqEntry[]
}

/** A numbered accordion of questions with its FAQPage markup, so the answers search engines quote are the ones on the page. */
export function FaqSection({ locale, id, index, label, title, lede, items }: Props) {
  return (
    <section className="home-faq" id={id} aria-labelledby={`${id}-title`}>
      <JsonLd data={faqPageSchema(items)} />
      <HomeHead id={`${id}-title`} index={index} label={label} title={title} lede={lede} />
      <div className="home-faq-list home-frame">
        {items.map((item, n) => {
          const external = item.href?.startsWith("https:")
          return (
            // Native details may already be open when React hydrates. Keep the
            // visitor's choice without treating that browser-owned state as a mismatch.
            <details key={item.id} name={id} className="home-faq-item" suppressHydrationWarning>
              <summary>
                <span className="home-faq-number" aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                <span>{item.question}</span>
                <Plus size={17} aria-hidden="true" />
              </summary>
              <div className="home-faq-answer">
                <p>{item.answer}</p>
                {item.href && item.cta && (
                  <Link href={external ? item.href : withLocale(item.href, locale)}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}>
                    {item.cta}
                  </Link>
                )}
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}
