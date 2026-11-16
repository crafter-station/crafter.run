import Image from "next/image"
import Link from "next/link"

import { toView } from "@/components/changelog/format"
import { getIndexEntries } from "@/lib/changelog"
import { changelogPath } from "@/lib/changelog-paths"
import type { Locale } from "@/lib/i18n"

const copy: Record<Locale, { title: string; all: string }> = {
  en: { title: "Recently shipped", all: "See the changelog" },
  es: { title: "Lo último que shipeamos", all: "Ver el changelog" },
  pt: { title: "O que lançamos por último", all: "Ver o changelog" },
  zh: { title: "最近发布", all: "查看更新日志" },
  ja: { title: "最近のリリース", all: "チェンジログを見る" },
}

/** The three newest changelog entries with a cover, linked from the homepage. */
export function StationShipped({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const latest = getIndexEntries(locale)
    .filter((entry) => entry.image)
    .slice(0, 3)
    .map((entry) => toView(entry, locale))
  if (latest.length === 0) return null

  return (
    <section className="home-shipped" aria-labelledby="home-shipped-title">
      <div className="home-shipped-intro">
        <h2 id="home-shipped-title">{t.title}</h2>
        <Link href={changelogPath(locale)} className="home-action-link">{t.all}</Link>
      </div>
      <ul className="home-shipped-grid">
        {latest.map((entry) => (
          <li key={entry.slug} data-area={entry.area}>
            <Link href={entry.href} hrefLang={entry.locale}>
              <span className="home-shipped-cover">
                <Image src={entry.image!} alt={entry.title} width={1600} height={1000} sizes="(min-width: 1024px) 360px, 100vw" />
              </span>
              <time dateTime={entry.date}>{entry.dateShort}</time>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
