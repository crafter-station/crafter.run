"use client"

import { type CountdownLabels, EventCountdown, EventLocalTime } from "@/components/event-countdown"

export type CountdownEvent = { title: string; startAt: string; endAt: string; allDay: boolean }

/** The next featured hack0 event as large ticking digits, with its start in the visitor's timezone. */
export function CountdownDemo({ event, labels, locale, kicker, yourTime, limaTime, none }: {
  event: CountdownEvent | null; labels: CountdownLabels; locale: string; kicker: string; yourTime: string; limaTime: string; none: string
}) {
  return (
    <div className="wb-countdown">
      <p className="wb-countdown-kicker">{kicker}</p>
      {event ? (
        <>
          <p className="wb-countdown-title">{event.title}</p>
          <EventCountdown startAt={event.startAt} endAt={event.endAt} labels={labels} variant="blocks" />
          <p className="wb-countdown-when"><EventLocalTime startAt={event.startAt} allDay={event.allDay} locale={locale} yourTime={yourTime} limaTime={limaTime} /></p>
        </>
      ) : <p className="wb-countdown-title">{none}</p>}
    </div>
  )
}
