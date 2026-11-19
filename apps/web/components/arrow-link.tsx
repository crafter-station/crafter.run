import { ArrowUpRight } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

/** Tertiary action: the homepage secondary text link with a trailing arrow. */
export const ArrowLink = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("home-secondary-link station-quiet-link gap-2", className)} {...props}>
        {children}
        <ArrowUpRight aria-hidden className="size-4 shrink-0" />
      </span>
    )
  },
)
ArrowLink.displayName = "ArrowLink"
