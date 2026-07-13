import Link from "next/link"

export type Listening = {
  title: string
  artist: string
  cover?: string
  url?: string
}

export function CurrentlyListening({ listening, label }: { listening: Listening; label: string }) {
  const { title, artist, cover, url } = listening

  const record = (
    <div className="relative aspect-square w-14 shrink-0 sm:w-16">
      {/* vinyl disc */}
      <div
        className="absolute inset-0 animate-spin rounded-full bg-neutral-900 ring-1 ring-white/15 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.9)] [animation-duration:18s]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at center, #111 0, #111 1px, #2e2e2e 2px, #111 3px)",
        }}
      >
        {/* center label = album cover */}
        <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-1 ring-white/10">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={`${title} — ${artist}`} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[conic-gradient(from_180deg,#a855f7,#ec4899,#f59e0b,#a855f7)]" />
          )}
          {/* spindle hole */}
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-950 ring-1 ring-white/20" />
        </div>
      </div>
      {/* fixed edge highlight + sheen (does not rotate) */}
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.22),transparent_50%)]" />
    </div>
  )

  return (
    <div className="flex items-center gap-4">
      {record}
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
        {url ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 block truncate text-sm font-medium text-foreground hover:underline"
          >
            {title}
          </Link>
        ) : (
          <p className="mt-1.5 truncate text-sm font-medium text-foreground">{title}</p>
        )}
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{artist}</p>
      </div>
    </div>
  )
}
