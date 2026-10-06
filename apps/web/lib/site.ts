import { activeTeamMembers, alumniTeamMembers } from "@/lib/team"
import { defaultLocale, type Locale } from "@/lib/i18n"

type LocalizedString = Record<Locale, string>

function localized(value: LocalizedString, locale: Locale) {
  return value[locale] ?? value[defaultLocale]
}

export const siteConfig = {
  name: "Crafter Station",
  domain: "crafter.run",
  tagline: {
    en: "The LatAm network of shippers",
    es: "La red LatAm de shippers",
    pt: "A rede LatAm de shippers",
    zh: "拉美的 shipper 网络",
    ja: "ラテンアメリカのシッパーネットワーク",
  },
  description: {
    es: "Crafter Station conecta a quienes construyen en LatAm: comunidad, código abierto, investigación, juegos, experimentos y encuentros.",
    en: "Crafter Station connects builders across LatAm through community, open source, research, games, experiments, and gatherings.",
    pt: "Crafter Station conecta quem constrói na América Latina: comunidade, código aberto, pesquisa, jogos, experimentos e encontros.",
    zh: "Crafter Station 通过社区、开源、研究、游戏、实验与活动，连接拉美的创造者。",
    ja: "Crafter Station は、コミュニティ、オープンソース、研究、ゲーム、実験、イベントを通じて、ラテンアメリカのつくる人をつなぎます。",
  },
  url: "https://crafter.run",
  org: "https://github.com/crafter-station",
} as const

export function getSiteConfig(locale: Locale = defaultLocale) {
  return {
    ...siteConfig,
    tagline: localized(siteConfig.tagline, locale),
    description: localized(siteConfig.description, locale),
  }
}

export const navSections = [
  {
    key: "community",
    items: [
      { key: "crafters", href: "/crafters" },
      { key: "ships", href: "/ships" },
      { key: "bounties", href: "/bounties" },
      { key: "team", href: "/team" },
    ],
  },
  {
    key: "workWithUs",
    items: [
      { key: "brandPartnerships", href: "/events/sponsors" },
      { key: "contact", href: "/contact" },
    ],
  },
] as const

export const languageLinks = [
  { label: "EN", href: "/" },
  { label: "ES", href: "/es" },
  { label: "PT", href: "/pt" },
  { label: "ZH", href: "/zh" },
  { label: "JA", href: "/ja" },
] as const

export const stats = [
  { value: "1000+", label: { en: "WhatsApp community members", es: "Miembros en la comunidad de WhatsApp", pt: "Membros na comunidade do WhatsApp", zh: "WhatsApp 社区成员", ja: "WhatsApp コミュニティのメンバー" } },
  { value: "50+", label: { en: "Events and hackathons hosted", es: "Eventos y hackathons organizados", pt: "Eventos e hackathons organizados", zh: "举办的活动与黑客松", ja: "開催したイベントとハッカソン" } },
  { value: "6.5k+", label: { en: "Open-source stars", es: "Estrellas en código abierto", pt: "Estrelas em codigo aberto", zh: "开源 star 数", ja: "オープンソースのスター" } },
] as const

export function getStats(locale: Locale = defaultLocale) {
  return stats.map((item) => ({ ...item, label: localized(item.label, locale) }))
}

export const ecosystem = [
  {
    title: { en: "Community", es: "Comunidad", pt: "Comunidade", zh: "社区", ja: "コミュニティ" },
    body: {
      en: "A WhatsApp-first network of 1000+ engineers, designers, founders, product, growth, and marketing people building across LatAm.",
      es: "Una red WhatsApp-first de 1000+ ingenieros, diseñadores, founders, producto, growth y marketing construyendo en LatAm.",
      pt: "Uma rede WhatsApp-first de 1000+ engenheiros, designers, founders, produto, growth e marketing construindo no LatAm.",
      zh: "一个以 WhatsApp 为主的网络，汇聚 1000+ 位在拉美各地构建的工程师、设计师、创始人、产品、增长和市场人。",
      ja: "ラテンアメリカ各地で開発する1000人以上のエンジニア、デザイナー、ファウンダー、プロダクト、グロース、マーケティング担当が集まる WhatsApp ファーストのネットワーク。",
    },
    href: "https://crafters.chat",
  },
  {
    title: { en: "Events", es: "Eventos", pt: "Eventos", zh: "活动", ja: "イベント" },
    body: {
      en: "Hot Reload, workshops, and hackathons for learning, building, and sharing with the community.",
      es: "Hot Reload, workshops y hackathons para aprender, construir y compartir con la comunidad.",
      pt: "Hot Reload, workshops e hackathons para aprender, construir e compartilhar com a comunidade.",
      zh: "通过 Hot Reload、工作坊与黑客松，与社区一起学习、构建和分享。",
      ja: "Hot Reload、ワークショップ、ハッカソンで、仲間と学び、つくり、共有します。",
    },
    href: "/events",
  },
  {
    title: { en: "Research", es: "Investigación", pt: "Pesquisa", zh: "研究", ja: "リサーチ" },
    body: {
      en: "Crafter Research studies AI-first engineering, agents, developer experience, and the new workflows shaping how teams ship.",
      es: "Crafter Research estudia ingeniería AI-first, agentes, developer experience y los nuevos flujos que cambian cómo los equipos construyen.",
      pt: "Crafter Research estuda engenharia AI-first, agentes, developer experience e os novos fluxos que mudam como os times constroem.",
      zh: "Crafter Research 研究 AI-first 工程、智能体、开发者体验，以及正在改变团队交付方式的新工作流。",
      ja: "Crafter Research は、AIファーストのエンジニアリング、エージェント、開発者体験、そしてチームのシップの仕方を変えつつある新しいワークフローを研究しています。",
    },
    href: "/universe#research",
  },
  {
    title: { en: "Open source", es: "Código abierto", pt: "Codigo aberto", zh: "开源", ja: "オープンソース" },
    body: {
      en: "We build in public and release tools developers actually use, from design systems to AI-native writing and codebase search.",
      es: "Construimos en público y liberamos herramientas que developers realmente usan: sistemas de diseño, escritura con IA y búsqueda de código.",
      pt: "Construimos em publico e liberamos ferramentas que developers realmente usam: sistemas de design, escrita com IA e busca de codigo.",
      zh: "我们公开构建，发布开发者真正会用的工具：从设计系统到 AI 原生写作和代码库搜索。",
      ja: "公開の場で開発し、デザインシステムから AIネイティブなライティングやコードベース検索まで、開発者が実際に使うツールをリリースしています。",
    },
    href: "/oss",
  },
  {
    title: { en: "Crafter Universe", es: "Universo Crafter", pt: "Universo Crafter", zh: "Crafter 宇宙", ja: "Crafter の世界" },
    body: {
      en: "Four directions for the same curiosity: Research, Lab, Games, and Station.",
      es: "Cuatro direcciones para una misma curiosidad: Research, Lab, Games y Station.",
      pt: "Quatro direções para a mesma curiosidade: Research, Lab, Games e Station.",
      zh: "同一份好奇心的四个方向：Research、Lab、Games 和 Station。",
      ja: "ひとつの好奇心、4つの方向。Research、Lab、Games、Station。",
    },
    href: "/universe",
  },
] as const

export function getEcosystem(locale: Locale = defaultLocale) {
  return ecosystem.map((item) => ({
    ...item,
    title: localized(item.title, locale),
    body: localized(item.body, locale),
  }))
}

export const communityOffers = [
  { en: "Join the WhatsApp community at crafters.chat", es: "Únete a la comunidad de WhatsApp en crafters.chat", pt: "Entre na comunidade do WhatsApp em crafters.chat", zh: "加入 crafters.chat 上的 WhatsApp 社区", ja: "crafters.chat の WhatsApp コミュニティに参加する" },
  { en: "Join workshops, hackathons, and community gatherings", es: "Participa en workshops, hackathons y encuentros de comunidad", pt: "Participe de workshops, hackathons e encontros da comunidade", zh: "参加工作坊、黑客松与社区聚会", ja: "ワークショップ、ハッカソン、コミュニティの集まりに参加する" },
  { en: "Learn in workshops and contribute to open projects with the community", es: "Aprende en workshops y contribuye a proyectos abiertos con la comunidad", pt: "Aprenda em workshops e contribua com projetos abertos junto à comunidade", zh: "参加工作坊，与社区一起为开放项目贡献力量", ja: "ワークショップで学び、コミュニティとオープンなプロジェクトに貢献する" },
  { en: "Ship in public with people who celebrate finished work", es: "Construye en público con personas que celebran el trabajo terminado", pt: "Construa em publico com pessoas que celebram trabalho finalizado", zh: "与庆祝完成之作的人一起公开 ship", ja: "完成した仕事を称え合う仲間と、公開の場でシップする" },
  { en: "Discover and showcase exceptional LatAm tech talent", es: "Descubre y muestra talento tech excepcional de LatAm", pt: "Descubra e mostre talento tech excepcional do LatAm", zh: "发现并展示拉美出色的技术人才", ja: "ラテンアメリカの卓越したテック人材を見つけ、紹介する" },
] as const

export function getCommunityOffers(locale: Locale = defaultLocale) {
  return communityOffers.map((item) => localized(item, locale))
}

export const collaborations = [
  { name: "OpenAI", logo: "/collaborations/openai.svg", href: "https://openai.com" },
  { name: "Codex", logo: "/collaborations/codex-dark.png", href: "https://openai.com/codex", preserveLogoColors: true },
  { name: "v0", logo: "/collaborations/v0.png", href: "https://v0.app" },
  { name: "Vercel", logo: "/collaborations/vercel.svg", href: "https://vercel.com" },
  { name: "Supabase", logo: "/collaborations/supabase.svg", href: "https://supabase.com" },
  { name: "Firecrawl", logo: "/collaborations/firecrawl.svg", href: "https://www.firecrawl.dev", preserveLogoColors: true },
  { name: "Cursor", logo: "/collaborations/cursor.svg", href: "https://cursor.com" },
  { name: "Wallbit", logo: "/collaborations/wallbit.png", href: "https://www.wallbit.io/en" },
  { name: "Sezzle", logo: "/collaborations/sezzle.png", href: "https://sezzle.com" },
  { name: "Portal", logo: "/collaborations/portal.svg", href: "https://useportal.co" },
] as const

export const events = [
  {
    title: { en: "Hot Reload", es: "Hot Reload", pt: "Hot Reload", zh: "Hot Reload", ja: "Hot Reload" },
    body: {
      en: "Coffee, code, and learning together. A new Crafter gathering in preparation; editions will be announced on the calendar.",
      es: "Café, código y aprendizaje en comunidad. Un nuevo encuentro de Crafter en preparación; las convocatorias se publicarán en la agenda.",
      pt: "Café, código e aprendizado em comunidade. Um novo encontro da Crafter em preparação; as edições serão anunciadas na agenda.",
      zh: "咖啡、代码与共同学习。Crafter 的新聚会正在筹备，后续活动将在日历中公布。",
      ja: "コーヒー、コード、仲間との学び。Crafter の新しい集まりを準備中です。開催案内はカレンダーでお知らせします。",
    },
  },
  {
    title: { en: "Hackathons", es: "Hackathons", pt: "Hackathons", zh: "黑客松", ja: "ハッカソン" },
    body: {
      en: "High-energy build sprints where devtools become part of the workflow, not just a sponsor logo.",
      es: "Sprints de construcción con energía alta donde los devtools son parte del flujo, no solo un logo de sponsor.",
      pt: "Sprints de construcao com energia alta onde devtools viram parte do fluxo, nao so um logo de sponsor.",
      zh: "高能量的构建冲刺，devtools 在这里成为工作流的一部分，而不只是赞助商 logo。",
      ja: "devtools がスポンサーのロゴではなくワークフローの一部になる、熱量の高いビルドスプリント。",
    },
  },
  {
    title: { en: "Product launches", es: "Lanzamientos", pt: "Lancamentos", zh: "产品发布", ja: "プロダクトローンチ" },
    body: {
      en: "Community launch moments for tools, open-source projects, and startup collaborations.",
      es: "Momentos de lanzamiento con comunidad para herramientas, proyectos de código abierto y colaboraciones con startups.",
      pt: "Momentos de lancamento com comunidade para ferramentas, projetos de codigo aberto e colaboracoes com startups.",
      zh: "与社区一起，为工具、开源项目和创业公司合作打造发布时刻。",
      ja: "ツール、オープンソースプロジェクト、スタートアップとのコラボレーションを、コミュニティと一緒に祝うローンチの瞬間。",
    },
  },
  {
    title: { en: "Workshops", es: "Workshops", pt: "Workshops", zh: "工作坊", ja: "ワークショップ" },
    body: {
      en: "Hands-on sessions around AI, product engineering, design systems, growth, and developer tools.",
      es: "Sesiones prácticas sobre IA, ingeniería de producto, sistemas de diseño, growth y herramientas para developers.",
      pt: "Sessoes praticas sobre IA, engenharia de produto, sistemas de design, growth e ferramentas para developers.",
      zh: "围绕 AI、产品工程、设计系统、增长和开发者工具的动手实践课程。",
      ja: "AI、プロダクトエンジニアリング、デザインシステム、グロース、開発者ツールをテーマにしたハンズオンセッション。",
    },
  },
] as const

export function getEvents(locale: Locale = defaultLocale) {
  return events.map((item) => ({
    title: localized(item.title, locale),
    body: localized(item.body, locale),
  }))
}

export const researchLinks = [
  {
    title: "Crafter Research",
    body: {
      en: "Research notes, essays, experiments, and technical writing from the unit.",
      es: "Notas de investigación, ensayos, experimentos y escritura técnica de la unidad.",
      pt: "Notas de pesquisa, ensaios, experimentos e escrita tecnica da unidade.",
      zh: "研究部门的研究笔记、随笔、实验和技术写作。",
      ja: "ユニットによるリサーチノート、エッセイ、実験、テクニカルライティング。",
    },
    href: "https://research.crafter.ing/",
  },
  {
    title: "crafter-research GitHub",
    body: {
      en: "Open research repositories, experiments, and technical artifacts.",
      es: "Repositorios abiertos de investigación, experimentos y artefactos técnicos.",
      pt: "Repositorios abertos de pesquisa, experimentos e artefatos tecnicos.",
      zh: "开放的研究仓库、实验和技术成果。",
      ja: "公開されたリサーチリポジトリ、実験、技術的な成果物。",
    },
    href: "https://github.com/crafter-research",
  },
] as const

export function getResearchLinks(locale: Locale = defaultLocale) {
  return researchLinks.map((item) => ({ ...item, body: localized(item.body, locale) }))
}

export const team = activeTeamMembers

export const alumniTeam = alumniTeamMembers

export const testimonials = [
  {
    name: "Founder, AI startup",
    role: "Series A, North America",
    quote: {
      en: "They moved faster than our internal team and shipped quality we had not seen from outside collaborators. The product feels native, not contracted.",
      es: "Se movieron más rápido que nuestro equipo interno y entregaron una calidad que no habíamos visto en colaboradores externos. El producto se siente nativo, no contratado.",
      pt: "Eles se moveram mais rapido que nosso time interno e entregaram uma qualidade que nao tinhamos visto em colaboradores externos. O produto parece nativo, nao terceirizado.",
      zh: "他们比我们的内部团队动作更快，交付的质量是我们从未在外部协作者身上见过的。产品感觉是自家长出来的，而不是外包的。",
      ja: "彼らは私たちの社内チームより速く動き、外部のコラボレーターでは見たことのない品質でシップしてくれました。プロダクトは外注ではなく、ネイティブに感じられます。",
    },
  },
  {
    name: "Head of Product",
    role: "Devtools, EU",
    quote: {
      en: "Crafter Station joined late and still pulled the launch forward. Strong opinions, no hand-holding required, and the polish is real.",
      es: "Crafter Station entró tarde e igual adelantó el lanzamiento. Opiniones fuertes, cero hand-holding y el polish es real.",
      pt: "Crafter Station entrou tarde e ainda assim adiantou o lancamento. Opinioes fortes, zero hand-holding e o polish e real.",
      zh: "Crafter Station 加入得很晚，却依然把发布提前了。观点鲜明、无需督促，打磨是实打实的。",
      ja: "Crafter Station は途中から参加したのに、ローンチを前倒ししてくれました。意見がはっきりしていて、手取り足取りは不要。仕上げの質も本物です。",
    },
  },
  {
    name: "CTO",
    role: "Marketplace, LATAM",
    quote: {
      en: "We've worked with a lot of product teams. None of them understood our stack the way these folks did on day one.",
      es: "Trabajamos con muchos equipos de producto. Ninguno entendió nuestro stack como ellos desde el día uno.",
      pt: "Trabalhamos com muitos times de produto. Nenhum entendeu nosso stack como eles desde o dia um.",
      zh: "我们和很多产品团队合作过。没有一个团队像他们那样，第一天就理解了我们的技术栈。",
      ja: "多くのプロダクトチームと仕事をしてきましたが、初日から私たちのスタックをここまで理解してくれたチームはいませんでした。",
    },
  },
] as const

export function getTestimonials(locale: Locale = defaultLocale) {
  return testimonials.map((item) => ({ ...item, quote: localized(item.quote, locale) }))
}

export const stackLogos = [
  { name: "Next.js" },
  { name: "Bun" },
  { name: "Vercel" },
  { name: "Drizzle" },
  { name: "Postgres" },
] as const

export const socials = [
  { label: "GitHub", href: "https://github.com/crafter-station" },
  { label: "X", href: "https://x.com/CrafterStation" },
  { label: "Instagram", href: "https://instagram.com/crafter.station/" },
  { label: "YouTube", href: "https://www.youtube.com/@crafterstation" },
  { label: "Discord", href: "https://discord.gg/kgsjU4sD7" },
  { label: "WhatsApp", href: "https://crafters.chat" },
  { label: "Luma", href: "https://luma.com/hack0" },
  { label: "Research", href: "https://research.crafter.ing/" },
] as const
