"use client"

import { useState } from "react"
import { CalEmbed } from "@/components/cal-embed"
import { Container } from "@/components/grid-container"
import { cn } from "@/lib/utils"

export type ContactTrack = {
  id: string
  label: string
  host: string
  blurb: string
  calLink: string
}

export function ContactPicker({
  eyebrow,
  title,
  description,
  tracks,
  withLabel,
}: {
  eyebrow: string
  title: string
  description: string
  tracks: ContactTrack[]
  withLabel: string
}) {
  const [activeId, setActiveId] = useState(tracks[0]?.id)
  const active = tracks.find((track) => track.id === activeId) ?? tracks[0]
  if (!active) return null

  return (
    <>
      <Container innerClassName="border-y px-6 py-10 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Container>
      <Container>
        <div className="grid grid-cols-1 border-b border-line md:grid-cols-2 xl:grid-cols-4">
          {tracks.map((track, i) => {
            const isActive = track.id === active.id
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveId(track.id)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex flex-col p-8 text-left transition-colors",
                  i > 0 ? "border-t border-line md:border-t-0 md:border-l" : "",
                  i >= 2 ? "xl:border-t-0" : "",
                  i === 2 ? "md:border-t md:border-l-0 xl:border-l" : "",
                  i === 3 ? "md:border-t" : "",
                  isActive ? "bg-accent/10" : "hover:bg-accent/5",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5 transition-opacity",
                    isActive ? "bg-foreground opacity-100" : "opacity-0",
                  )}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {withLabel} {track.host}
                </span>
                <span className="mt-3 text-lg tracking-tight text-foreground">
                  {track.label}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {track.blurb}
                </span>
              </button>
            )
          })}
        </div>
      </Container>
      <CalEmbed
        key={active.id}
        calLink={active.calLink}
        namespace={`contact-${active.id}`}
      />
    </>
  )
}
