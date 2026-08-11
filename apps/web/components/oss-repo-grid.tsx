"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLink } from "@/components/arrow-link"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/grid-container"
import type { OssRepo } from "@/lib/oss"
import { cn } from "@/lib/utils"

const ALL = "all"

export function OssRepoGrid({
  repos,
  eyebrow,
  title,
  intro,
  allLabel,
  descriptionPending,
  repoCta,
}: {
  repos: (OssRepo & { openIssuesLabel: string })[]
  eyebrow: string
  title: string
  intro: string
  allLabel: string
  descriptionPending: string
  repoCta: string
}) {
  const [owner, setOwner] = useState<string>(ALL)

  const owners = useMemo(() => {
    const counts = new Map<string, number>()
    for (const repo of repos) {
      const key = repo.repo.split("/")[0]
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [repos])

  const visible = useMemo(
    () =>
      owner === ALL
        ? repos
        : repos.filter((repo) => repo.repo.split("/")[0] === owner),
    [repos, owner],
  )

  return (
    <>
      <Container innerClassName="border-b px-6 py-10 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:shrink-0 lg:justify-end">
            <button
              type="button"
              onClick={() => setOwner(ALL)}
              className={cn(
                "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                owner === ALL
                  ? "border-foreground bg-foreground text-background"
                  : "border-line text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {allLabel}
              <span className="ml-2 tabular-nums opacity-60">
                {repos.length}
              </span>
            </button>
            {owners.map(([name, count]) => (
              <button
                key={name}
                type="button"
                onClick={() => setOwner(name)}
                className={cn(
                  "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                  owner === name
                    ? "border-foreground bg-foreground text-background"
                    : "border-line text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {name}
                <span className="ml-2 tabular-nums opacity-60">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((repo, i) => (
            <Link
              key={repo.repo}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "group relative flex min-h-56 flex-col p-8 transition-colors hover:bg-accent-surface/10 " +
                (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "") +
                (i >= 2 ? "md:border-t xl:border-t-0 " : "") +
                (i >= 3 ? "xl:border-t xl:border-l " : "")
              }
            >
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r opacity-70 transition-opacity group-hover:opacity-100 ${repo.accent}`}
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {repo.repo}
              </p>
              <h3 className="mt-3 text-2xl tracking-tight">{repo.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {repo.description ?? descriptionPending}
              </p>
              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    ★ {repo.stars.toLocaleString()}
                  </Badge>
                  {repo.openIssues > 0 ? (
                    <Badge variant="secondary">{repo.openIssuesLabel}</Badge>
                  ) : null}
                  {repo.language ? (
                    <Badge variant="outline">{repo.language}</Badge>
                  ) : null}
                </div>
                <ArrowLink className="mt-6">{repoCta}</ArrowLink>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
