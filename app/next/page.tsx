import type { Metadata } from "next"

import { Container, SectionGap } from "@/components/grid-container"
import { NextProjectsBoard } from "@/components/next-projects-board"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "What should Crafter Station build next? · crafter.run",
  description:
    "Submit and vote on the realtime list of projects Crafter Station should build next.",
}

export default function NextPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container innerClassName="overflow-hidden px-4 py-12 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
              /next
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Vote on the next thing we should craft.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
              A live, community-ranked queue for product ideas. Submit anonymously, leave an alias if you want, and move the best ideas up in realtime.
            </p>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="px-4 py-4 md:px-8 md:py-8">
          <NextProjectsBoard />
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
