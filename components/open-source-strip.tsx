import Link from "next/link"
import { ArrowLink } from "@/components/arrow-link"
import { Container } from "@/components/grid-container"
import { openSourceRepos, totalStars, totalForks, siteConfig } from "@/lib/site"

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.79L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.193L.818 6.374a.75.75 0 0 1 .416-1.279l4.21-.612L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  )
}

function ForkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  )
}

function formatStars(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function OpenSourceStrip() {
  const marqueeItems = [
    `★ ${formatStars(totalStars)}+ stars across our repos`,
    "Open source by default",
    `${openSourceRepos.length} flagship projects`,
    `${formatStars(totalForks)} forks · and counting`,
    "MIT-licensed, production-tested",
  ]
  const repeated = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div id="open-source">
      <Container innerClassName="border-b py-6">
        <h2 className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Open source track record
        </h2>
      </Container>
      <hr className="border-line" />
      <Container innerClassName="overflow-hidden">
        <div className="relative flex h-14 items-center overflow-hidden border-b border-line">
          <div className="marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {repeated.map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-accent">●</span>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {openSourceRepos.map((repo, i) => (
            <Link
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "group flex flex-col justify-between p-8 transition-colors hover:bg-accent/10 " +
                (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "")
              }
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {repo.org}
                </p>
                <h3 className="mt-2 font-mono text-2xl tracking-tight">
                  {repo.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <StarIcon className="size-4 text-accent" />
                    {formatStars(repo.stars)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <ForkIcon className="size-4" />
                    {repo.forks}
                  </span>
                </div>
                <ArrowLink>View</ArrowLink>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 border-t border-line md:grid-cols-2">
          <div className="flex items-center justify-between p-6 md:border-r md:border-line">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Total stars
            </p>
            <p className="font-mono text-2xl tracking-tight">
              <span className="text-accent">★</span> {totalStars.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Browse the org
            </p>
            <Link
              href={siteConfig.org}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <ArrowLink>github.com/CrafterStation</ArrowLink>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
