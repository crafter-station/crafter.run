import type { CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

import { isLocale, locales } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

import { HackathonsExperience } from "./hackathons-experience"
import styles from "./hackathons.module.css"

const hackathons = [
  {
    name: "IA Hackathon Perú",
    href: "https://peru.ai-hackathon.co/",
    year: "2025",
    duration: "24h",
    prize: 1500,
    prizeType: "cash",
    raised: 9500,
  },
  {
    name: "She Ships",
    href: "https://sheships.org/hackathons/2026",
    year: "2026",
    duration: "48h",
    prize: 1500,
    prizeType: "published",
    raised: 12500,
  },
  {
    name: "The realtime hackathon",
    href: "https://hack.useportal.co/",
    year: "2026",
    duration: "39h",
    prize: 800,
    prizeType: "cash",
    raised: 7250,
  },
  {
    name: "The Next Craft",
    href: "https://thenextcraft.org/",
    year: "2026",
    duration: "12h",
    prize: 1500,
    prizeType: "cash",
    raised: 15750,
  },
] as const

const creditPartners = [
  { name: "v0", logo: "/collaborations/v0.png", href: "https://v0.app" },
  {
    name: "Featherless AI",
    logo: "https://sheships.org/sponsors/featherless-full-dark.svg",
    href: "https://featherless.ai",
  },
  { name: "ElevenLabs", logo: "/hackathons/partners/elevenlabs.svg", href: "https://elevenlabs.io" },
  { name: "Make", logo: "https://www.make.com/favicon.ico", href: "https://make.com" },
  {
    name: "Tropicalia",
    logo: "/hackathons/partners/tropicalia.png",
    href: "https://www.tropicalia.dev",
  },
  { name: "Tavily", logo: "/hackathons/partners/tavily.svg", href: "https://tavily.com" },
  { name: "Vapi", logo: "/hackathons/partners/vapi.svg", href: "https://vapi.ai" },
  { name: "Apify", logo: "/hackathons/partners/apify.svg", href: "https://apify.com" },
  { name: "Cursor", logo: "/collaborations/cursor.svg", href: "https://cursor.com" },
  { name: "n8n", logo: "https://n8n.io/favicon.ico", href: "https://n8n.io" },
  { name: "Replit", logo: "/hackathons/partners/replit.svg", href: "https://replit.com" },
] as const

const sponsors = [
  ...creditPartners,
  { name: "Portal", logo: "/collaborations/portal.svg", href: "https://useportal.co" },
  { name: "Convex", logo: "/hackathons/partners/convex.svg", href: "https://convex.dev" },
  { name: "Yalo", logo: "/hackathons/partners/yalo.svg", href: "https://yalo.ai" },
  { name: "Clerk", logo: "/hackathons/partners/clerk.svg", href: "https://clerk.com" },
  { name: "Exa", logo: "/hackathons/partners/exa.svg", href: "https://exa.ai" },
  { name: "3DevLabs", logo: "/hackathons/partners/3DevLabs.svg", href: "https://3devlabs.app" },
  { name: "Sezzle", logo: "/collaborations/sezzle.png", href: "https://sezzle.com" },
  { name: "Lovable", logo: "https://peru.ai-hackathon.co/logo_lovable.svg", href: "https://lovable.dev" },
  {
    name: "Huawei",
    logo: "https://peru.ai-hackathon.co/_logo_Logo-Huawei.png",
    href: "https://huawei.com",
  },
  {
    name: "Cayetano Heredia",
    logo: "https://peru.ai-hackathon.co/logo_cayetano_BN_1.png",
    href: "https://cayetano.edu.pe",
  },
  {
    name: "Bioincuba",
    logo: "https://peru.ai-hackathon.co/logo_bioincuba_BN_1.png",
    href: "https://bioincuba.cayetano.pe",
  },
  {
    name: "Yavendió",
    logo: "https://peru.ai-hackathon.co/1.png",
    href: "https://yavendio.com",
  },
  {
    name: "forHuman",
    logo: "https://peru.ai-hackathon.co/3.png",
    href: "https://forhuman.studio",
  },
  {
    name: "Repensar",
    logo: "https://peru.ai-hackathon.co/logo_repensar_logo.png",
    href: "https://repensar.la",
  },
  {
    name: "CloudForge AI",
    logo: "https://peru.ai-hackathon.co/_logo_logo%20cloud%20forge%20ai.png",
    href: "https://cloud-forge-ai.com",
  },
  {
    name: "Little Caesars",
    logo: "https://peru.ai-hackathon.co/logo-little-caesars.png",
    href: "https://pe.littlecaesars.com",
  },
  { name: "UCSM", logo: "/hackathons/partners/ucsm.png", href: "https://ucsm.edu.pe" },
  { name: "Visagente", logo: "/hackathons/partners/visagente.svg", href: "https://visagente.com" },
] as const

const pageCopy = {
  en: {
    metadataTitle: "Crafter Hackathons",
    metadataDescription:
      "Hackathons built by Crafter Station across Peru, Colombia, El Salvador, and Guatemala.",
    kicker: "Built across Latin America",
    tagline: "Focused rooms, real deadlines, working products.",
    scroll: "Scroll to explore",
    prizesLabel: "Prize pools",
    prizesCaption: "across four Crafter hackathons",
    fundingLabel: "Funds raised",
    fundingCaption: "across four Crafter hackathons",
    valueLabel: "Tools and credits offered",
    valueCaption: "for participants and winning teams",
    creditPartnersLabel: "Credits provided by",
    communityLabel: "Our community",
    hackers: "Hackers",
    submissions: "Submissions",
    communityPartners: "Partners",
    lumaSubscribers: "Luma subscribers",
    communityMembers: "Community members",
    ledgerTitle: "Four formats. One standard: ship.",
    places: ["Lima, Peru", "Online, LATAM", "Online", "5 cities, LATAM"],
    cashPrize: "cash prizes",
    publishedPrize: "published prize",
    countriesLabel: "Regional reach",
    countries: "Countries",
    countryNames: ["Peru", "Colombia", "El Salvador", "Guatemala"],
    partnersLabel: "Partners and sponsors",
    partnersTitle: "Built with good company.",
    ctaLabel: "The next one",
    ctaTitle: "Build it with us.",
    ctaBody: "Hackathons, community programs, and product activations across Latin America.",
    cta: "Book a community call",
    navigationLabel: "Page sections",
    navigationItem: "Go to section",
  },
  es: {
    metadataTitle: "Crafter Hackathons",
    metadataDescription:
      "Hackathons creadas por Crafter Station en Perú, Colombia, El Salvador y Guatemala.",
    kicker: "Construido en Latinoamérica",
    tagline: "Espacios enfocados, deadlines reales, productos que funcionan.",
    scroll: "Sigue para explorar",
    prizesLabel: "Premios publicados",
    prizesCaption: "entre cuatro Crafter hackathons",
    fundingLabel: "Fondos recaudados",
    fundingCaption: "entre cuatro Crafter hackathons",
    valueLabel: "Herramientas y créditos ofrecidos",
    valueCaption: "para participantes y equipos ganadores",
    creditPartnersLabel: "Créditos entregados por",
    communityLabel: "Nuestra comunidad",
    hackers: "Hackers",
    submissions: "Submissions",
    communityPartners: "Partners",
    lumaSubscribers: "Suscriptores en Luma",
    communityMembers: "Miembros de la comunidad",
    ledgerTitle: "Cuatro formatos. Un estándar: shippear.",
    places: ["Lima, Perú", "Online, LATAM", "Online", "5 ciudades, LATAM"],
    cashPrize: "premios en cash",
    publishedPrize: "premio publicado",
    countriesLabel: "Alcance regional",
    countries: "Países",
    countryNames: ["Perú", "Colombia", "El Salvador", "Guatemala"],
    partnersLabel: "Partners y sponsors",
    partnersTitle: "Construido en buena compañía.",
    ctaLabel: "El siguiente",
    ctaTitle: "Constrúyelo con nosotros.",
    ctaBody: "Hackathons, programas de comunidad y activaciones de producto en Latinoamérica.",
    cta: "Agenda una llamada",
    navigationLabel: "Secciones de la página",
    navigationItem: "Ir a la sección",
  },
  pt: {
    metadataTitle: "Crafter Hackathons",
    metadataDescription:
      "Hackathons criados pela Crafter Station no Peru, Colômbia, El Salvador e Guatemala.",
    kicker: "Construído na América Latina",
    tagline: "Espaços focados, prazos reais, produtos funcionando.",
    scroll: "Role para explorar",
    prizesLabel: "Prêmios publicados",
    prizesCaption: "em quatro Crafter hackathons",
    fundingLabel: "Recursos captados",
    fundingCaption: "em quatro Crafter hackathons",
    valueLabel: "Ferramentas e créditos oferecidos",
    valueCaption: "para participantes e equipes vencedoras",
    creditPartnersLabel: "Créditos oferecidos por",
    communityLabel: "Nossa comunidade",
    hackers: "Hackers",
    submissions: "Projetos enviados",
    communityPartners: "Parceiros",
    lumaSubscribers: "Assinantes no Luma",
    communityMembers: "Membros da comunidade",
    ledgerTitle: "Quatro formatos. Um padrão: lançar.",
    places: ["Lima, Peru", "Online, LATAM", "Online", "5 cidades, LATAM"],
    cashPrize: "prêmios em dinheiro",
    publishedPrize: "prêmio publicado",
    countriesLabel: "Alcance regional",
    countries: "Países",
    countryNames: ["Peru", "Colômbia", "El Salvador", "Guatemala"],
    partnersLabel: "Parceiros e patrocinadores",
    partnersTitle: "Construído em boa companhia.",
    ctaLabel: "O próximo",
    ctaTitle: "Construa com a gente.",
    ctaBody: "Hackathons, programas de comunidade e ativações de produto na América Latina.",
    cta: "Agendar uma conversa",
    navigationLabel: "Seções da página",
    navigationItem: "Ir para a seção",
  },
  zh: {
    metadataTitle: "Crafter Hackathons",
    metadataDescription: "Crafter Station 在秘鲁、哥伦比亚、萨尔瓦多和危地马拉打造的黑客松。",
    kicker: "在拉丁美洲打造",
    tagline: "专注的空间，真实的截止时间，能运行的产品。",
    scroll: "滚动浏览",
    prizesLabel: "已公布奖金池",
    prizesCaption: "来自四场 Crafter 黑客松",
    fundingLabel: "筹集资金",
    fundingCaption: "来自四场 Crafter 黑客松",
    valueLabel: "提供的工具与额度",
    valueCaption: "面向参与者和获胜团队",
    creditPartnersLabel: "额度提供方",
    communityLabel: "我们的社区",
    hackers: "黑客",
    submissions: "提交项目",
    communityPartners: "合作伙伴",
    lumaSubscribers: "Luma 订阅者",
    communityMembers: "社区成员",
    ledgerTitle: "四种形式，一个标准：交付。",
    places: ["秘鲁利马", "拉美线上", "线上", "拉美 5 座城市"],
    cashPrize: "现金奖金",
    publishedPrize: "已公布奖金",
    countriesLabel: "区域覆盖",
    countries: "国家",
    countryNames: ["秘鲁", "哥伦比亚", "萨尔瓦多", "危地马拉"],
    partnersLabel: "合作伙伴与赞助商",
    partnersTitle: "与优秀伙伴一起打造。",
    ctaLabel: "下一场",
    ctaTitle: "和我们一起打造。",
    ctaBody: "面向拉丁美洲的黑客松、社区项目和产品体验活动。",
    cta: "预约社区通话",
    navigationLabel: "页面章节",
    navigationItem: "前往章节",
  },
  ja: {
    metadataTitle: "Crafter Hackathons",
    metadataDescription:
      "Crafter Station がペルー、コロンビア、エルサルバドル、グアテマラで手がけたハッカソン。",
    kicker: "ラテンアメリカでつくる",
    tagline: "集中できる場、現実の締切、動くプロダクト。",
    scroll: "スクロールして見る",
    prizesLabel: "公表された賞金総額",
    prizesCaption: "4つの Crafter ハッカソン合計",
    fundingLabel: "調達資金",
    fundingCaption: "4つの Crafter ハッカソン合計",
    valueLabel: "提供されたツールとクレジット",
    valueCaption: "参加者と受賞チーム向け",
    creditPartnersLabel: "クレジット提供",
    communityLabel: "コミュニティ",
    hackers: "ハッカー",
    submissions: "提出作品",
    communityPartners: "パートナー",
    lumaSubscribers: "Luma 登録者",
    communityMembers: "コミュニティメンバー",
    ledgerTitle: "4つの形式。基準はひとつ。出荷する。",
    places: ["ペルー、リマ", "オンライン、LATAM", "オンライン", "LATAM 5都市"],
    cashPrize: "賞金（現金）",
    publishedPrize: "公表賞金",
    countriesLabel: "地域への広がり",
    countries: "か国",
    countryNames: ["ペルー", "コロンビア", "エルサルバドル", "グアテマラ"],
    partnersLabel: "パートナーとスポンサー",
    partnersTitle: "最高の仲間とつくる。",
    ctaLabel: "次の一歩",
    ctaTitle: "一緒につくろう。",
    ctaBody: "ラテンアメリカ全域のハッカソン、コミュニティプログラム、製品体験。",
    cta: "コミュニティ相談を予約",
    navigationLabel: "ページセクション",
    navigationItem: "セクションへ移動",
  },
} as const

const countries = ["🇵🇪", "🇨🇴", "🇸🇻", "🇬🇹"] as const

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const copy = pageCopy[lang]

  return buildMetadata({
    locale: lang,
    path: "/hackathons",
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  })
}

export default async function HackathonsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const copy = pageCopy[lang]

  return (
    <HackathonsExperience
      navigationLabel={copy.navigationLabel}
      navigationItemLabel={copy.navigationItem}
    >
      <main>
        <section className={`${styles.section} ${styles.hero}`} data-hack-section>
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center} data-hack-reveal>
            <a href={`/${lang}`} className={styles.logoLink} aria-label="Crafter Station">
              <Image
                src="/brand/crafter-station-logo-wordmark-dark.svg"
                alt="Crafter Station"
                width={260}
                height={56}
                priority
              />
            </a>
            <p className={styles.label}>{copy.kicker}</p>
            <h1>Crafter Hackathons</h1>
            <p className={styles.tagline}>{copy.tagline}</p>
          </div>
          <a className={styles.scrollCue} href="#funding">
            {copy.scroll}
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className={styles.section} id="funding" data-hack-section>
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center}>
            <p className={styles.label} data-hack-reveal>
              {copy.fundingLabel}
            </p>
            <p
              className={styles.money}
              data-count="45000"
              data-prefix="US$"
              data-hack-reveal
            >
              US$45,000
            </p>
            <p className={styles.metricCaption} data-hack-reveal>
              {copy.fundingCaption}
            </p>
            <div className={styles.metricRule} data-hack-reveal />
            <div className={styles.fundingBreakdown}>
              {hackathons.map((hackathon, index) => (
                <div
                  key={hackathon.name}
                  data-hack-reveal
                  style={{ "--delay": `${index * 80}ms` } as CSSProperties}
                >
                  <strong>US${hackathon.raised.toLocaleString("en-US")}</strong>
                  <span>{hackathon.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.ledgerSection}`}
          id="prizes"
          data-hack-section
        >
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center}>
            <p className={styles.label} data-hack-reveal>
              {copy.prizesLabel}
            </p>
            <p className={styles.money} data-count="5300" data-prefix="US$" data-hack-reveal>
              US$5,300
            </p>
            <p className={styles.metricCaption} data-hack-reveal>
              {copy.prizesCaption}
            </p>
            <div className={styles.metricRule} data-hack-reveal />
            <h2 data-hack-reveal>{copy.ledgerTitle}</h2>
            <div className={styles.ledger}>
              {hackathons.map((hackathon, index) => (
                <a
                  className={styles.ledgerRow}
                  href={hackathon.href}
                  key={hackathon.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hack-reveal
                  style={{ "--delay": `${index * 90}ms` } as CSSProperties}
                >
                  <span className={styles.ledgerIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.ledgerMain}>
                    <strong>{hackathon.name}</strong>
                    <small>
                      {copy.places[index]} · {hackathon.year} · {hackathon.duration}
                    </small>
                  </span>
                  <span className={styles.ledgerPrize}>
                    <strong>US${hackathon.prize.toLocaleString("en-US")}</strong>
                    <small>
                      {hackathon.prizeType === "cash" ? copy.cashPrize : copy.publishedPrize}
                    </small>
                  </span>
                  <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.25} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} data-hack-section>
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center}>
            <p className={styles.label} data-hack-reveal>
              {copy.valueLabel}
            </p>
            <p className={styles.money} data-count="65000" data-prefix="US$" data-hack-reveal>
              US$65,000
            </p>
            <p className={styles.metricCaption} data-hack-reveal>
              {copy.valueCaption}
            </p>
            <div className={styles.metricRule} data-hack-reveal />
            <p className={styles.label} data-hack-reveal>
              {copy.creditPartnersLabel}
            </p>
            <div className={styles.partnerCloud}>
              {creditPartners.map((partner, index) => (
                <a
                  className={styles.partner}
                  href={partner.href}
                  key={partner.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                  aria-label={partner.name}
                  data-hack-reveal
                  style={{ "--delay": `${index * 60}ms` } as CSSProperties}
                >
                  <img src={partner.logo} alt="" width="52" height="52" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} data-hack-section>
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center}>
            <p className={styles.label} data-hack-reveal>
              {copy.communityLabel}
            </p>
            <div className={styles.communityStats}>
              {[
                { value: 20000, suffix: "+", label: copy.lumaSubscribers },
                { value: 1200, suffix: "+", label: copy.communityMembers },
                { value: 650, suffix: "+", label: copy.hackers },
                { value: 220, suffix: "", label: copy.submissions },
                { value: 20, suffix: "+", label: copy.communityPartners },
              ].map((stat, index) => (
                <div key={stat.label}>
                  <p
                    data-count={stat.value}
                    data-suffix={stat.suffix}
                    data-hack-reveal
                    style={{ "--delay": `${index * 100}ms` } as CSSProperties}
                  >
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <span className={styles.label}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} data-hack-section>
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center}>
            <p className={styles.label} data-hack-reveal>
              {copy.countriesLabel}
            </p>
            <p className={styles.bigNumber} data-count="4" data-hack-reveal>
              4
            </p>
            <p className={styles.metricCaption} data-hack-reveal>
              {copy.countries}
            </p>
            <div className={styles.metricRule} data-hack-reveal />
            <div className={styles.flags}>
              {countries.map((flag, index) => (
                <div
                  className={styles.flag}
                  key={flag}
                  data-hack-reveal
                  style={{ "--delay": `${index * 90}ms` } as CSSProperties}
                >
                  <span aria-hidden="true">{flag}</span>
                  <p>{copy.countryNames[index]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.partnersSection}`} data-hack-section>
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center}>
            <p className={styles.label} data-hack-reveal>
              {copy.partnersLabel}
            </p>
            <h2 data-hack-reveal>{copy.partnersTitle}</h2>
            <div className={styles.partnerCloud}>
              {sponsors.map((partner, index) => (
                <a
                  className={styles.partner}
                  href={partner.href}
                  key={partner.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                  aria-label={partner.name}
                  data-hack-reveal
                  style={{ "--delay": `${(index % 10) * 45}ms` } as CSSProperties}
                >
                  <img src={partner.logo} alt="" width="52" height="52" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.closing}`} data-hack-section>
          <div className={styles.crosshair} aria-hidden="true" />
          <div className={styles.center}>
            <p className={styles.label} data-hack-reveal>
              {copy.ctaLabel}
            </p>
            <h2 data-hack-reveal>{copy.ctaTitle}</h2>
            <p className={styles.tagline} data-hack-reveal>
              {copy.ctaBody}
            </p>
            <a
              className={styles.cta}
              href="https://cal.com/crafter/community"
              target="_blank"
              rel="noopener noreferrer"
              data-hack-reveal
            >
              {copy.cta}
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.25} />
            </a>
            <a href={`/${lang}`} className={styles.closingLogo} aria-label="Crafter Station">
              <Image
                src="/brand/crafter-station-logo-wordmark-dark.svg"
                alt="Crafter Station"
                width={210}
                height={45}
              />
            </a>
          </div>
        </section>
      </main>
    </HackathonsExperience>
  )
}
