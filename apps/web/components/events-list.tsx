"use client"

import { useState } from "react"
import { ArrowLink } from "@/components/arrow-link"
import { cn } from "@/lib/utils"

export interface EventListItem {
  id: string
  title: string
  description: string
  url: string
  coverUrl: string | null
  location: string
  date: string
  tags: string[]
}

interface EventsListProps {
  upcoming: EventListItem[]
  past: EventListItem[]
  filterTags: string[]
  labels: {
    all: string
    upcoming: string
    past: string
    register: string
    noEvents: string
    noFilteredEvents: string
  }
}

export function EventsList({
  upcoming,
  past,
  filterTags,
  labels,
}: EventsListProps) {
  const [activeTag, setActiveTag] = useState("all")
  const visibleUpcoming = upcoming.filter(
    (event) => activeTag === "all" || event.tags.includes(activeTag),
  )
  const visiblePast = past.filter(
    (event) => activeTag === "all" || event.tags.includes(activeTag),
  )
  const hasEvents = upcoming.length > 0 || past.length > 0
  const hasVisibleEvents = visibleUpcoming.length > 0 || visiblePast.length > 0

  if (!hasEvents) {
    return (
      <div className="border-b px-6 py-16 md:px-10">
        <p className="text-sm text-muted-foreground">{labels.noEvents}</p>
      </div>
    )
  }

  return (
    <>
      {filterTags.length > 0 ? (
        <div className="border-b px-6 py-4 md:px-10">
          <div className="flex flex-wrap items-center gap-2">
            {["all", ...filterTags].map((tag) => {
              const active = activeTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-line text-muted-foreground hover:border-foreground hover:text-foreground",
                  )}
                >
                  {tag === "all" ? labels.all : tag}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {!hasVisibleEvents ? (
        <div className="border-b px-6 py-16 md:px-10">
          <p className="text-sm text-muted-foreground">
            {labels.noFilteredEvents}
          </p>
        </div>
      ) : null}

      {visibleUpcoming.length > 0 ? (
        <EventSection
          events={visibleUpcoming}
          label={labels.upcoming}
          registerLabel={labels.register}
          variant="upcoming"
        />
      ) : null}

      {visiblePast.length > 0 ? (
        <EventSection
          events={visiblePast}
          label={labels.past}
          registerLabel={labels.register}
          variant="past"
        />
      ) : null}
    </>
  )
}

function EventSection({
  events,
  label,
  registerLabel,
  variant,
}: {
  events: EventListItem[]
  label: string
  registerLabel: string
  variant: "upcoming" | "past"
}) {
  return (
    <section className="border-b px-6 py-12 md:px-10">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        {label}
      </h2>
      <div className="mt-6 divide-y divide-line border-t border-line">
        {events.map((event) =>
          variant === "upcoming" ? (
            <UpcomingEventRow
              key={event.id}
              event={event}
              registerLabel={registerLabel}
            />
          ) : (
            <PastEventRow key={event.id} event={event} />
          ),
        )}
      </div>
    </section>
  )
}

function EventImage({
  event,
  size,
}: {
  event: EventListItem
  size: "large" | "small"
}) {
  const sizeClass = size === "large" ? "h-16 w-16" : "h-12 w-12"

  return (
    <a href={event.url} target="_blank" rel="noreferrer" className="shrink-0">
      {event.coverUrl ? (
        <img
          src={event.coverUrl}
          alt=""
          className={cn(sizeClass, "object-cover")}
          loading="lazy"
        />
      ) : (
        <div className={cn(sizeClass, "bg-line")} />
      )}
    </a>
  )
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="text-xs text-accent">
          [{tag}]
        </span>
      ))}
    </div>
  )
}

function UpcomingEventRow({
  event,
  registerLabel,
}: {
  event: EventListItem
  registerLabel: string
}) {
  return (
    <article className="py-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <EventImage event={event} size="large" />
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              <a href={event.url} target="_blank" rel="noreferrer" className="hover:underline">
                {event.title}
              </a>
            </h3>
            <Tags tags={event.tags} />
            {event.description ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {event.description.slice(0, 220)}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>{event.date}</span>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        <a href={event.url} target="_blank" rel="noreferrer" className="group shrink-0">
          <ArrowLink>{registerLabel}</ArrowLink>
        </a>
      </div>
    </article>
  )
}

function PastEventRow({ event }: { event: EventListItem }) {
  return (
    <article className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <EventImage event={event} size="small" />
        <div>
          <h3 className="text-sm font-semibold tracking-tight">
            <a href={event.url} target="_blank" rel="noreferrer" className="hover:underline">
              {event.title}
            </a>
          </h3>
          <Tags tags={event.tags} />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 pl-16 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:pl-0">
        <span>{event.date}</span>
        <span>{event.location}</span>
      </div>
    </article>
  )
}
