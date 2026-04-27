import Link from "next/link"
import { ArrowLink } from "@/components/arrow-link"
import { Container } from "@/components/grid-container"
import { InteractiveLines } from "@/components/interactive-lines"
import { services } from "@/lib/site"

function IconCard({
  letter,
  hideOnMobile,
}: {
  letter: string
  hideOnMobile?: boolean
}) {
  return (
    <div
      className={
        "relative flex aspect-square items-center justify-center border-l border-line " +
        (hideOnMobile ? "hidden md:flex" : "")
      }
    >
      <span aria-hidden className="absolute inset-6 border border-line/70" />
      <span
        aria-hidden
        className="absolute left-6 top-6 size-2 -translate-x-1/2 -translate-y-1/2 border-t border-l border-line"
      />
      <span
        aria-hidden
        className="absolute right-6 top-6 size-2 translate-x-1/2 -translate-y-1/2 border-t border-r border-line"
      />
      <span
        aria-hidden
        className="absolute left-6 bottom-6 size-2 -translate-x-1/2 translate-y-1/2 border-b border-l border-line"
      />
      <span
        aria-hidden
        className="absolute right-6 bottom-6 size-2 translate-x-1/2 translate-y-1/2 border-b border-r border-line"
      />
      <span className="font-mono text-7xl font-light text-foreground/20">
        {letter}
      </span>
    </div>
  )
}

export function Capabilities() {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="relative overflow-hidden p-10 md:border-r md:border-line">
          <InteractiveLines orientation="horizontal" className="opacity-60" />
          <p className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            What we craft
          </p>
          <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            We build with a curated stack we actually believe in. These tools
            helped us scale products to millions of users, ship AI features
            that hold up in production, and stand up design systems used
            across surfaces.
          </p>
        </div>
        <IconCard letter="C" />
        <IconCard letter="R" />
        <IconCard letter="·" hideOnMobile />
      </div>
      <div className="grid grid-cols-1 border-t border-line md:grid-cols-4">
        {services.map((s, i) => (
          <Link
            key={s.title}
            href={s.href}
            className={
              "group flex flex-col justify-between p-8 transition-colors hover:bg-accent/10 " +
              (i > 0 ? "md:border-l md:border-line " : "") +
              (i < 2 ? "border-b border-line md:border-b-0 " : "")
            }
          >
            <div>
              <h3 className="text-lg tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
            <ArrowLink className="mt-8">Talk to us</ArrowLink>
          </Link>
        ))}
      </div>
    </Container>
  )
}
