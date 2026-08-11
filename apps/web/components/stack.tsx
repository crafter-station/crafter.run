import { Container } from "@/components/grid-container"
import { stackLogos } from "@/lib/site"

export function Stack() {
  return (
    <Container innerClassName="overflow-hidden">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center md:py-24">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Life in the fast lane
        </p>
        <h2 className="mb-4 text-3xl tracking-tight md:text-4xl">
          Building on a stack we believe in
        </h2>
        <div className="text-balance text-muted-foreground">
          <p>
            We use one focused stack across every project so we can move
            faster without sacrificing quality. It works, it scales, and it
            lets the team move as a unit.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {stackLogos.map((logo, i) => (
            <span
              key={logo.name}
              className="flex items-center gap-3 md:gap-4"
            >
              <span className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                {logo.name}
              </span>
              {i < stackLogos.length - 1 ? (
                <span className="text-muted-foreground" aria-hidden>
                  +
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </Container>
  )
}
