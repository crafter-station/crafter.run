import Link from "next/link"
import { notFound } from "next/navigation"

import { Attendees, CoreLocked, formatMeetingDate } from "@/components/core/core-parts"
import { compileMeeting, InlineStrong } from "@/components/core/meeting-markdown"
import { Container } from "@/components/grid-container"
import { getCoreViewer } from "@/lib/core"
import { coreCopy } from "@/lib/core-copy"
import { getCoreMeeting } from "@/lib/core-meetings"
import { isLocale } from "@/lib/i18n"

import "@/app/station-core.css"

export const metadata = { robots: { index: false, follow: false } }

type Props = { params: Promise<{ lang: string; slug: string }>; searchParams: Promise<{ view?: string }> }

export default async function Page({ params, searchParams }: Props) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const base = `/${lang}/core/meetings/${slug}`
  const viewer = await getCoreViewer()
  if (viewer.state === "signed-out") return <CoreLocked locale={lang} path={base} />
  if (viewer.state === "outsider") notFound()

  const meeting = await getCoreMeeting(slug)
  if (!meeting) notFound()

  const t = coreCopy[lang]
  const transcriptView = (await searchParams).view === "transcript"
  const { content, sections } = await compileMeeting(transcriptView ? (meeting.transcript ?? "") : meeting.body)

  const numbered = sections.some((section) => section.num)

  return (
    <main className="cm-page flex-1">
      <Container innerClassName="cm-hero">
        <nav className="cm-crumbs station-label" aria-label={t.meetings}>
          <Link href={`/${lang}/core/meetings`}>
            <span aria-hidden="true">←</span> {t.back}
          </Link>
        </nav>
        <p className="station-label cm-eyebrow">
          {t.core} <span aria-hidden="true">·</span> {formatMeetingDate(meeting.heldAt, lang) as string}
        </p>
        <h1>
          {meeting.title.split(" · ")[0]}
          {meeting.title.includes(" · ") ? <span>{meeting.title.split(" · ").slice(1).join(" · ")}</span> : null}
        </h1>
        <p className="cm-lede">
          <InlineStrong text={meeting.summary} />
        </p>
        <div className="cm-facts">
          <dl>
            {meeting.durationMinutes ? (
              <div>
                <dt className="station-label">{t.duration}</dt>
                <dd>{t.minutes(meeting.durationMinutes)}</dd>
              </div>
            ) : null}
            <div>
              <dt className="station-label">{t.attendees}</dt>
              <dd>{t.people(meeting.attendees.length)}</dd>
            </div>
          </dl>
          <Attendees usernames={meeting.attendees} />
        </div>
      </Container>

      <Container innerClassName="cm-tabs-wrap" rails={false}>
        <nav className="cm-tabs" aria-label={meeting.title}>
          <Link href={base} aria-current={transcriptView ? undefined : "page"} scroll={false}>
            {t.summary}
          </Link>
          <Link href={`${base}?view=transcript`} aria-current={transcriptView ? "page" : undefined} scroll={false}>
            {t.transcript}
          </Link>
        </nav>
      </Container>

      <Container innerClassName="cm-body">
        <aside className="cm-toc">
          {sections.length ? (
            <>
              <p className="station-label">{transcriptView ? t.transcript : t.contents}</p>
              <ol>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      {numbered ? <span className="cm-toc-num">{section.num ? section.num.padStart(2, "0") : "··"}</span> : null}
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </>
          ) : null}
        </aside>
        <article className={transcriptView ? "cm-article cm-transcript" : "cm-article"}>
          {transcriptView ? <p className="cm-transcript-note">{meeting.transcript ? t.transcriptNote : t.noTranscript}</p> : null}
          {content}
        </article>
      </Container>
    </main>
  )
}
