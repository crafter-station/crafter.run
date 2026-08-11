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
    <section className={cn("mx-auto w-full max-w-[1380px] px-0", className)}>
      <div
        className={cn(
          "relative border-line",
          rails && "border-x",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function SectionGap() {
  return (
    <>
      <hr className="border-line" />
      <section className="mx-auto w-full max-w-[1380px]">
        <div className="relative h-4 border-x border-line" />
      </section>
      <hr className="-mt-px border-line" />
    </>
  )
}
