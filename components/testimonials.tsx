import { Container } from "@/components/grid-container"
import { testimonials } from "@/lib/site"

export function Testimonials() {
  const shown = testimonials.slice(0, 3)
  return (
    <Container innerClassName="pt-16">
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl tracking-tight text-foreground md:text-4xl">
          What teams say after we ship
        </h2>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="flex -space-x-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="size-10 overflow-hidden rounded-full border-2 border-background bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-zinc-900"
              style={{ zIndex: 6 - i }}
              aria-hidden
            />
          ))}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 border-t border-line md:grid-cols-3">
        {shown.map((t, i) => (
          <article
            key={t.name}
            className={
              "relative p-8 " + (i > 0 ? "md:border-l md:border-line" : "")
            }
          >
            <p className="text-sm leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div
                className="size-8 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-zinc-900"
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  )
}
