import { cn } from "@/lib/utils"

export function PixelArrow({
  className,
  tone = "default",
}: {
  className?: string
  tone?: "default" | "inverse"
}) {
  const dot =
    tone === "inverse"
      ? "bg-zinc-50 dark:bg-zinc-900"
      : "bg-zinc-900 dark:bg-zinc-50"
  return (
    <span
      aria-hidden
      className={cn("group relative h-4 w-4 overflow-hidden", className)}
    >
      <span className="grid h-full w-full grid-cols-5 grid-rows-5">
        <span
          className={cn(
            "col-start-2 row-start-1",
            dot,
            "group-hover:animate-column-shift-1",
          )}
        />
        <span
          className={cn(
            "col-start-3 row-start-2",
            dot,
            "group-hover:animate-column-shift-2",
          )}
        />
        <span
          className={cn(
            "col-start-4 row-start-3",
            dot,
            "group-hover:animate-column-shift-3",
          )}
        />
        <span
          className={cn(
            "col-start-3 row-start-4",
            dot,
            "group-hover:animate-column-shift-2",
          )}
        />
        <span
          className={cn(
            "col-start-2 row-start-5",
            dot,
            "group-hover:animate-column-shift-1",
          )}
        />
      </span>
    </span>
  )
}
