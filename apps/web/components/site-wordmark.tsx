import { cn } from "@/lib/utils"
import { CrafterStationLogo } from "./crafter-station-logo"

export function SiteWordmark({
  className,
  showIcon = true,
  stacked = false,
}: {
  className?: string
  showIcon?: boolean
  stacked?: boolean
}) {
  return (
    <span
      className={cn(
        "station-wordmark inline-flex select-none",
        stacked ? "flex-col items-start gap-3" : "items-center gap-2.5",
        className,
      )}
      aria-label="Crafter Station"
    >
      {showIcon ? <CrafterStationLogo className={stacked ? "size-12" : "size-8"} /> : null}
      <span className="wordmark-crafter text-foreground">
        crafter{stacked ? <br /> : " "}station
      </span>
    </span>
  )
}
