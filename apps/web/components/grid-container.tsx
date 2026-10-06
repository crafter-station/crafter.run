import { cn } from "@/lib/utils"

export function Container({
  className,
  innerClassName,
  rails = true,
  children,
}: {
  className?: string
  innerClassName?: string
  rails?: boolean
  children?: React.ReactNode
}) {
  return (
    <section className={cn("station-container mx-auto w-full max-w-[1440px] px-0", className)}>
      <div
        className={cn(
          "station-container-inner relative border-line",
          rails && "station-rails",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function SectionGap() {
  return <div className="station-section-gap" aria-hidden="true" />
}
