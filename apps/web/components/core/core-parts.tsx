import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/grid-container"
import { coreCopy } from "@/lib/core-copy"
import type { Locale } from "@/lib/i18n"
import { getTeamMember } from "@/lib/team"

export function Attendees({ usernames, size = "md" }: { usernames: string[]; size?: "sm" | "md" }) {
  const members = usernames.flatMap((username) => getTeamMember(username) ?? [])
  const first = (name: string) => name.split(" ")[0]
  // Two people share a first name: add the initial of the first surname to both.
  const label = (name: string) =>
    members.filter((member) => first(member.name) === first(name)).length > 1
      ? `${first(name)} ${name.split(" ")[1]?.[0] ?? ""}.`
      : first(name)
  return (
    <ul className={`cm-faces cm-faces-${size}`}>
      {members.map((member) => (
        <li key={member.username} title={member.name}>
          <span className="cm-face">
            <Image src={member.image} alt="" width={96} height={96} />
          </span>
          {size === "md" ? <span className="cm-face-name">{label(member.name)}</span> : null}
        </li>
      ))}
    </ul>
  )
}

export function CoreLocked({ locale, path }: { locale: Locale; path: string }) {
  const t = coreCopy[locale]
  return (
    <main className="flex-1">
      <Container innerClassName="cm-locked">
        <span className="cm-lock" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <rect x="10" y="21" width="28" height="20" rx="5" />
            <path d="M16 21v-5a8 8 0 0 1 16 0v5" />
            <circle cx="24" cy="31" r="2.2" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <p className="station-label cm-eyebrow">{t.lockedEyebrow}</p>
        <h1>{t.lockedTitle}</h1>
        <p className="cm-locked-body">{t.lockedBody}</p>
        <Link className="station-button station-button-yellow" href={`/${locale}/sign-in?redirect_url=${encodeURIComponent(path)}`}>
          {t.signIn} <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </main>
  )
}

export function formatMeetingDate(heldAt: string, locale: Locale, style: "long" | "parts" = "long") {
  const date = new Date(heldAt)
  const zone = "America/Lima"
  if (style === "long") return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: zone }).format(date)
  return {
    day: new Intl.DateTimeFormat(locale, { day: "numeric", timeZone: zone }).format(date),
    month: new Intl.DateTimeFormat(locale, { month: "short", timeZone: zone }).format(date).replace(".", ""),
    year: new Intl.DateTimeFormat(locale, { year: "numeric", timeZone: zone }).format(date),
    weekday: new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: zone }).format(date),
  }
}
