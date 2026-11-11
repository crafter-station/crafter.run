import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Attendees, CoreLocked, formatMeetingDate } from "@/components/core/core-parts"
import { InlineStrong } from "@/components/core/meeting-markdown"
import { Container } from "@/components/grid-container"
import { getCoreViewer } from "@/lib/core"
import { coreCopy } from "@/lib/core-copy"
import { listCoreMeetings } from "@/lib/core-meetings"
import { isLocale } from "@/lib/i18n"

import "@/app/station-core.css"

export const metadata = { robots: { index: false, follow: false } }

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const viewer = await getCoreViewer()
  if (viewer.state === "signed-out") return <CoreLocked locale={lang} path={`/${lang}/core/meetings`} />
  if (viewer.state === "outsider") notFound()

  const t = coreCopy[lang]
  const meetings = await listCoreMeetings()
  const me = viewer.member

  return (
    <main className="cm-page flex-1">
      <Container innerClassName="cm-index-hero">
        <p className="station-label cm-eyebrow">
          {t.core} <span aria-hidden="true">/</span> {t.meetings}
        </p>
        <h1>{t.indexTitle}</h1>
        <div className="cm-index-meta">
          <p>{t.indexDescription}</p>
          <span className="cm-index-side">
            {me ? (
              <span className="cm-whoami">
                <span className="cm-face">
                  <Image src={me.image} alt="" width={64} height={64} />
                </span>
                <span>
                  <span className="station-label">{t.signedInAs}</span>
                  <strong>{me.name}</strong>
                </span>
              </span>
            ) : null}
            {meetings?.length ? <span className="station-label">{t.count(meetings.length)}</span> : null}
          </span>
        </div>
      </Container>

      <Container innerClassName="cm-index-list">
        {meetings === null ? <p className="cm-empty">{t.unavailable}</p> : null}
        {meetings?.length === 0 ? <p className="cm-empty">{t.empty}</p> : null}
        <ol>
          {meetings?.map((meeting) => {
            const date = formatMeetingDate(meeting.heldAt, lang, "parts") as Record<string, string>
            return (
              <li key={meeting.slug}>
                <Link className="cm-row" href={`/${lang}/core/meetings/${meeting.slug}`}>
                  <span className="cm-date" aria-hidden="true">
                    <span className="cm-date-day">{date.day}</span>
                    <span className="cm-date-month">{date.month}</span>
                    <span className="cm-date-year">{date.year}</span>
                  </span>
                  <span className="cm-row-copy">
                    <span className="station-label cm-row-meta">
                      {date.weekday}
                      {meeting.durationMinutes ? ` · ${t.minutes(meeting.durationMinutes)}` : ""} · {t.people(meeting.attendees.length)}
                      {me && meeting.attendees.includes(me.username) ? <span className="cm-attended">{t.attended}</span> : null}
                    </span>
                    <h2>{meeting.title}</h2>
                    <p>
                      <InlineStrong text={meeting.summary} />
                    </p>
                  </span>
                  <span className="cm-row-side">
                    <Attendees usernames={meeting.attendees} viewer={me?.username} youLabel={t.you} size="sm" />
                    <span className="cm-arrow" aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </Container>
    </main>
  )
}
