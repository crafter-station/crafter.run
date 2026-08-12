import Link from "next/link"
import { Menu } from "lucide-react"
import { AuthActions } from "@/components/auth-actions"
import { Container } from "@/components/grid-container"
import { LanguageSwitcher } from "@/components/language-switcher"
import { PixelArrow } from "@/components/pixel-arrow"
import { SiteWordmark } from "@/components/site-wordmark"
import { ThemeSwitcher } from "@/components/theme-switcher"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { type Locale, withLocale } from "@/lib/i18n"
import { navSections } from "@/lib/site"

const navCopy = {
  en: {
    community: "Community",
    ships: "Ships",
    crafters: "Crafters",
    events: "Events",
    oss: "Open source",
    products: "Products",
    research: "Research",
    impact: "Impact",
    team: "Team",
    ossMetrics: "OSS metrics",
    timeline: "Project activity",
    workWithUs: "Work with us",
    contact: "Contact",
    communityCta: "Join the community",
    language: "Language",
    theme: "Theme",
    openMenu: "Open menu",
  },
  es: {
    community: "Comunidad",
    ships: "Ships",
    crafters: "Crafters",
    events: "Eventos",
    oss: "Código abierto",
    products: "Productos",
    research: "Investigación",
    impact: "Impacto",
    team: "Equipo",
    ossMetrics: "Métricas OSS",
    timeline: "Actividad de proyectos",
    workWithUs: "Trabaja con nosotros",
    contact: "Contacto",
    communityCta: "Únete a la comunidad",
    language: "Idioma",
    theme: "Tema",
    openMenu: "Abrir menú",
  },
  pt: {
    community: "Comunidade",
    ships: "Ships",
    crafters: "Crafters",
    events: "Eventos",
    oss: "Codigo aberto",
    products: "Produtos",
    research: "Pesquisa",
    impact: "Impacto",
    team: "Equipe",
    ossMetrics: "Metricas OSS",
    timeline: "Atividade dos projetos",
    workWithUs: "Trabalhe conosco",
    contact: "Contato",
    communityCta: "Entre na comunidade",
    language: "Idioma",
    theme: "Tema",
    openMenu: "Abrir menu",
  },
  zh: {
    community: "社区",
    ships: "社区作品",
    crafters: "成员",
    events: "活动",
    oss: "开源",
    products: "产品",
    research: "研究",
    impact: "影响力",
    team: "团队",
    ossMetrics: "开源指标",
    timeline: "项目动态",
    workWithUs: "与我们合作",
    contact: "联系我们",
    communityCta: "加入社区",
    language: "语言",
    theme: "主题",
    openMenu: "打开菜单",
  },
  ja: {
    community: "コミュニティ",
    ships: "コミュニティ作品",
    crafters: "Crafters",
    events: "イベント",
    oss: "オープンソース",
    products: "プロダクト",
    research: "リサーチ",
    impact: "インパクト",
    team: "チーム",
    ossMetrics: "OSS メトリクス",
    timeline: "プロジェクト活動",
    workWithUs: "一緒に働く",
    contact: "お問い合わせ",
    communityCta: "コミュニティに参加",
    language: "言語",
    theme: "テーマ",
    openMenu: "メニューを開く",
  },
} as const

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = navCopy[locale]

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm">
      <Container innerClassName="h-4" />
      <hr className="border-line" />
      <Container innerClassName="h-16">
        <nav className="relative flex h-full justify-between">
          <div className="flex h-full w-[180px] items-center border-line xl:w-[215px] xl:border-r">
            <Link
              href={withLocale("/", locale)}
              className="group inline-flex h-full items-center px-4 transition-colors xl:hover:bg-primary/5"
            >
              <SiteWordmark />
            </Link>
          </div>
          <div className="hidden flex-1 items-center justify-center xl:flex">
            <NavigationMenu viewport={false} className="h-full">
              <NavigationMenuList className="h-full gap-0">
                {navSections.map((section) => (
                  <NavigationMenuItem key={section.key} className="h-full">
                    <NavigationMenuTrigger className="h-16 rounded-none bg-transparent px-4 text-foreground hover:bg-accent-surface/10 hover:text-foreground focus:bg-accent-surface/10 focus:text-foreground data-[state=open]:bg-accent-surface/10 data-[state=open]:text-foreground 2xl:px-5">
                      {t[section.key]}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-64 p-2">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={withLocale(item.href, locale)}
                                className="block rounded-sm px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                              >
                                {t[item.key]}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden h-full items-center border-line xl:flex xl:border-l">
            <div className="flex h-full items-center">
              <LanguageSwitcher
                currentLocale={locale}
                label={t.language}
                className="h-16 px-3 font-mono text-[10px] tracking-[0.16em]"
              />
            </div>
            <div className="flex h-full items-center border-l border-line">
              <ThemeSwitcher
                label={t.theme}
                className="h-16 px-3"
              />
            </div>
            <AuthActions locale={locale} />
          </div>
          <details className="ml-auto flex items-center xl:hidden">
            <summary
              className="flex h-16 w-16 cursor-pointer list-none items-center justify-center text-foreground/70 transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden"
              aria-label={t.openMenu}
            >
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute left-0 right-0 top-full border-t border-line bg-background">
              <Container innerClassName="px-4 py-4 xl:hidden">
                <div className="flex flex-col">
                  {navSections.map((section) => (
                    <details key={section.key} className="group border-b border-line">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                        {t[section.key]}
                        <span className="text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ul className="flex flex-col pb-3 pl-3">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={withLocale(item.href, locale)}
                              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {t[item.key]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                  <div className="mt-4 flex items-center justify-between border border-line px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t.language}
                    </span>
                    <div className="flex items-center gap-3">
                      <LanguageSwitcher
                        currentLocale={locale}
                        label={t.language}
                        className="font-mono text-[10px] tracking-[0.16em]"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between border border-line px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t.theme}
                    </span>
                    <ThemeSwitcher
                      label={t.theme}
                      className="font-mono text-[10px] tracking-[0.16em]"
                    />
                  </div>
                  <Link
                    href="https://crafters.chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-between border border-foreground/20 px-4 py-3 text-sm font-medium"
                  >
                    {t.communityCta}
                    <PixelArrow />
                  </Link>
                  <div className="mt-2 grid gap-2">
                    <AuthActions locale={locale} mobile />
                  </div>
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
