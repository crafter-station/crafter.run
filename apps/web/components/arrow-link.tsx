import { Slot } from "@radix-ui/react-slot"
import { ArrowUpRight } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface ArrowLinkProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

export const ArrowLink = React.forwardRef<HTMLElement, ArrowLinkProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Comp = (asChild ? Slot : "span") as React.ElementType
    return (
      <Comp
        ref={ref}
        className={cn(
          "group inline-flex items-center text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-accent",
          className,
        )}
        {...props}
      >
        {children}
        <span
          className={cn(
            "ml-2 inline-flex size-7 shrink-0 items-center justify-center rounded-sm border border-line bg-secondary/50 transition-colors duration-200 group-hover:border-foreground/40",
          )}
        >
          <ArrowUpRight
            className={cn(
              "size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            )}
          />
        </span>
      </Comp>
    )
  },
)
ArrowLink.displayName = "ArrowLink"
