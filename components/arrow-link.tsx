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
          "group inline-flex items-center text-sm text-zinc-500 transition-colors duration-200 group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-400",
          className,
        )}
        {...props}
      >
        {children}
        <span
          className={cn(
            "ml-2 inline-flex size-[30px] items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 transition-colors duration-200 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:group-hover:border-zinc-600",
          )}
        >
          <ArrowUpRight
            className={cn(
              "size-4 text-zinc-500 transition-all duration-200 group-hover:rotate-45 group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-400",
            )}
          />
        </span>
      </Comp>
    )
  },
)
ArrowLink.displayName = "ArrowLink"
