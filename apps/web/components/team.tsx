import { Container } from "@/components/grid-container"
import { TeamGrid } from "@/components/team-grid"
import type { Locale } from "@/lib/i18n"
import { team } from "@/lib/site"

export function Team({ locale }: { locale: Locale }) {
  return (
    <div id="team">
      <Container innerClassName="border-b py-6">
        <h2 className="text-center font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
          The crafters
        </h2>
      </Container>
      <hr className="border-line" />
      <Container innerClassName="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
            One team, many timezones
          </p>
          <h3 className="mt-3 text-3xl tracking-tight md:text-4xl">
            Senior operators only
          </h3>
          <p className="mt-4 text-balance text-muted-foreground">
            We stay deliberately small so every project gets senior eyes from
            day one. No layers. No handoffs. Just the people who will actually
            ship it, across the Americas, working as one team.
          </p>
        </div>
      </Container>
      <hr className="border-line" />
      <Container>
        <TeamGrid members={team} locale={locale} />
      </Container>
    </div>
  )
}
