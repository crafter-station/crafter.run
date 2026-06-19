import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/grid-container"
import { type Locale, withLocale } from "@/lib/i18n"
import { team } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Team({ locale }: { locale: Locale }) {
  return (
    <div id="team">
      <Container innerClassName="border-b py-6">
        <h2 className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          The crafters
        </h2>
      </Container>
      <hr className="border-line" />
      <Container innerClassName="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member, i) => {
            const col = (n: number) => i % n
            return (
              <Link
                key={member.name}
                href={withLocale(`/team/${member.username}`, locale)}
                className={cn(
                  "group relative flex flex-col items-center gap-3 px-4 py-8 text-center transition-colors hover:bg-accent/5",
                  // borders between columns
                  col(2) !== 0 && "border-l border-line sm:border-l-0",
                  col(3) !== 0 && "sm:border-l sm:border-line lg:border-l-0",
                  col(4) !== 0 && "lg:border-l lg:border-line",
                  // borders between rows
                  i >= 2 && "border-t border-line sm:border-t-0",
                  i >= 3 && "sm:border-t sm:border-line lg:border-t-0",
                  i >= 4 && "lg:border-t lg:border-line",
                )}
              >
                <div className="relative size-20 overflow-hidden rounded-full border border-line bg-secondary">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-wider text-muted-foreground/70">
                    {member.location}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
