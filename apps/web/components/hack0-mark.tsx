/** hack0 mark: a stadium 0 broken by a slash. `bg` must match the surface behind it. */
export function Hack0Mark({ size, bg = "hsl(var(--background))", className }: { size?: number | string; bg?: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <rect x="17" y="6" width="30" height="52" rx="15" fill="none" stroke="currentColor" strokeWidth="8" />
      <line x1="10" y1="60" x2="54" y2="4" stroke={bg} strokeWidth="15" />
      <line x1="10" y1="60" x2="54" y2="4" stroke="#ff3d00" strokeWidth="8" strokeLinecap="square" />
    </svg>
  )
}

/** Lowercase "hack" plus the mark, as on hack0.dev. */
export function Hack0Wordmark({ className }: { className?: string }) {
  return (
    <span className={`hack0-wordmark ${className ?? ""}`} aria-label="hack0">
      <span aria-hidden="true">hack</span>
      <Hack0Mark size="0.86em" />
    </span>
  )
}
