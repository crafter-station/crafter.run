import { ArrowUpRight } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

export const ArrowLink = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "station-quiet-link group inline-flex items-center text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-accent",
          className,
        )}
        {...props}
      >
        {children}
        <span
          className={cn(
            "station-link-arrow ml-2 inline-flex size-7 shrink-0 items-center justify-center rounded-sm border border-line bg-secondary/50 transition-colors duration-200 group-hover:border-foreground/40",
          )}
        >
          <ArrowUpRight
            className={cn(
              "size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            )}
          />
        </span>
      </span>
    )
  },
)
ArrowLink.displayName = "ArrowLink"
