import { profileLocationLines, type ProfileLocation } from "@crafter/contracts"

import { cn } from "@/lib/utils"

export function ProfileLocationLine({
  origin,
  based,
  fromLabel,
  basedLabel,
  className,
}: {
  origin: ProfileLocation | null | undefined
  based: ProfileLocation | null | undefined
  fromLabel: string
  basedLabel: string
  className?: string
}) {
  const lines = profileLocationLines(origin, based, { from: fromLabel, based: basedLabel })
  if (lines.length === 0) return null

  return (
    <p className={cn("text-sm leading-6 text-muted-foreground", className)}>
      {lines.map((line, index) => (
        <span key={line.text}>
          {index > 0 ? " · " : null}
          {line.flag ? <span aria-hidden="true">{line.flag} </span> : null}
          {line.text}
        </span>
      ))}
    </p>
  )
}
