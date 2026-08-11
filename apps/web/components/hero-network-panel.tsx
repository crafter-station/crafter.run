import { getOssRepos } from "@/lib/oss"

function formatStars(n: number) {
  if (n < 1000) return String(n)
  return `${(n / 1000).toFixed(1)}k`
}

export async function HeroNetworkPanel({
  eyebrow = "The network",
  starsLabel = "stars",
  reposLabel = "repos",
  issuesLabel = "open for contribution",
}: {
  eyebrow?: string
  starsLabel?: string
  reposLabel?: string
  issuesLabel?: string
}) {
  const repos = await getOssRepos()
  if (repos.length === 0) return null

  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0)
  const totalIssues = repos.reduce((sum, r) => sum + r.openIssues, 0)
  const top = repos.slice(0, 5)
  const max = top[0]?.stars || 1

  return (
    <div className="w-full max-w-md border border-line bg-background/60 backdrop-blur-[2px]">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </p>
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      </div>

      <div className="grid grid-cols-2 border-b border-line">
        <div className="border-r border-line px-6 py-5">
          <p className="font-mono text-4xl tracking-tight text-foreground">
            {formatStars(totalStars)}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">{starsLabel}</p>
        </div>
        <div className="px-6 py-5">
          <p className="font-mono text-4xl tracking-tight text-foreground">
            {repos.length}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">{reposLabel}</p>
        </div>
      </div>

      <div className="space-y-3 px-6 py-5">
        {top.map((repo) => (
          <div key={repo.repo} className="flex items-center gap-4">
            <span className="w-24 shrink-0 truncate text-xs text-foreground/80">
              {repo.name}
            </span>
            <span className="h-1 flex-1 overflow-hidden bg-foreground/8">
              <span
                className="block h-full bg-foreground/45"
                style={{ width: `${Math.max(4, (repo.stars / max) * 100)}%` }}
              />
            </span>
            <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
              {formatStars(repo.stars)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-line px-6 py-4">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-accent">{totalIssues}</span> {issuesLabel}
        </p>
      </div>
    </div>
  )
}
