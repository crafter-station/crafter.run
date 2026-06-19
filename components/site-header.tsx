import Link from "next/link"
import { Menu } from "lucide-react"
import { Container } from "@/components/grid-container"
import { PixelArrow } from "@/components/pixel-arrow"
import { SiteWordmark } from "@/components/site-wordmark"
import { type Locale, withLocale } from "@/lib/i18n"
import { languageLinks, navItems } from "@/lib/site"

const navCopy = {
  en: {
    events: "Events",
    projects: "Projects",
    research: "Research",
    team: "Team",
    communityCta: "Join the community",
    openMenu: "Open menu",
  },
  es: {
    events: "Eventos",
    projects: "Proyectos",
    research: "Investigacion",
    team: "Equipo",
    communityCta: "Unete a la comunidad",
    openMenu: "Abrir menu",
  },
  pt: {
    events: "Eventos",
    projects: "Projetos",
    research: "Pesquisa",
    team: "Equipe",
    communityCta: "Entre na comunidade",
    openMenu: "Abrir menu",
  },
} as const

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = navCopy[locale]

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur">
      <Container innerClassName="h-4" />
      <hr className="border-line" />
      <Container innerClassName="h-16">
        <nav className="relative flex h-full justify-between">
          <div className="flex h-full w-[180px] items-center border-line lg:w-[215px] lg:border-r">
            <Link
              href={withLocale("/", locale)}
              className="group inline-flex h-full items-center px-4 transition-colors lg:hover:bg-primary/5"
            >
              <SiteWordmark />
            </Link>
          </div>
          <div className="hidden flex-1 items-center justify-center lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href, locale)}
                className="inline-flex h-16 items-center gap-1 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              >
                {t[item.key]}
              </Link>
            ))}
          </div>
          <div className="hidden h-full items-center border-line lg:flex lg:border-l">
            <div className="flex h-full items-center px-3">
              {languageLinks.map((item) => (
                <Link
                  key={item.label}
                  href={withLocale("/", item.label.toLowerCase() as Locale)}
                  className="px-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <details className="contents lg:hidden">
            <summary
              className="flex h-16 w-16 cursor-pointer list-none items-center justify-center text-foreground/70 transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden"
              aria-label={t.openMenu}
            >
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute left-0 right-0 top-full border-t border-line bg-background">
              <Container innerClassName="px-4 py-4 lg:hidden">
                <div className="flex flex-col">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={withLocale(item.href, locale)}
                      className="border-b border-line py-3 text-sm text-foreground"
                    >
                      {t[item.key]}
                    </Link>
                  ))}
                  <Link
                    href="https://crafters.chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-between border border-foreground/20 px-4 py-3 text-sm font-medium"
                  >
                    {t.communityCta}
                    <PixelArrow />
                  </Link>
                </div>
              </Container>
            </div>
          </details>
        </nav>
      </Container>
      <hr className="border-line" />
    </header>
  )
}
