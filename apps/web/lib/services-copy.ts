import type { Locale } from "@/lib/i18n"

type Service = { title: string; body: string; proof: string }

export type ServiceCategoryId = "events" | "devrel" | "education" | "open-source"

type Category = { id: ServiceCategoryId; label: string; title: string; lede: string; services: [Service, Service] }

type ServicesCopy = {
  label: string
  claim: string
  lede: string
  book: string
  email: string
  categories: [Category, Category, Category, Category]
  proofLabel: string
  proofTitle: string
  proofLede: string
  stats: [string, string][]
  editionsTitle: string
  places: [string, string, string]
  prize: string
  raised: string
  sponsorsTitle: string
  sponsorsSummary: string
}

/** The hackathons Crafter Station has run, with what each raised and paid out in prizes (US$). */
export const hackathonEditions = [
  { name: "IA Hackathon Perú", href: "https://peru.ai-hackathon.co/", year: "2025", duration: "24h", prize: 1500, raised: 9500 },
  { name: "The realtime hackathon", href: "https://hack.useportal.co/", year: "2026", duration: "39h", prize: 800, raised: 7250 },
  { name: "The Next Craft", href: "https://thenextcraft.org/", year: "2026", duration: "12h", prize: 1500, raised: 15750 },
] as const

/** Sponsors named on the retired sponsors page. */
export const pastSponsorNames = ["Codex", "OpenAI", "Firecrawl", "Vercel", "v0", "Portal", "Wallbit"] as const

export const servicesCopy: Record<Locale, ServicesCopy> = {
  en: {
    label: "Services",
    claim: "Put your product in front of LATAM builders.",
    lede: "Companies hire Crafter Station for hackathons, launches, workshops and open source, run by a non-profit community of 1,000+ builders in Lima. Clerk, Cursor, ElevenLabs and v0 have backed what we run.",
    book: "Book a free 30-min call",
    email: "Email us",
    categories: [
      { id: "events", label: "Events", title: "Events and hackathons", lede: "Rooms where builders use your product, not just see your logo.", services: [
        { title: "Hackathons for your product", body: "A challenge built around your API or SDK, with builders who ship working demos in a weekend.", proof: "The Next Craft · IA Hackathon Perú · The realtime hackathon" },
        { title: "Event sponsorship", body: "Put your team in the room at hackathons, workshops and launches for builders across LatAm.", proof: "Codex · OpenAI · Vercel · Firecrawl · v0" },
      ] },
      { id: "devrel", label: "DevRel", title: "DevRel and launches in LATAM", lede: "Reach the builders who will actually use your tool.", services: [
        { title: "Launch moments", body: "Community launches for tools, open-source projects and startup collaborations.", proof: "Hot Reload · DevDay Lima" },
        { title: "Demos and content in Spanish", body: "Put your dev tool in front of 1,000+ builders with demos, workshops and content in Spanish.", proof: "1,000+ builders · 20,000+ Luma subscribers" },
      ] },
      { id: "education", label: "Education", title: "Workshops", lede: "Hands-on sessions, taught by the people who build the tools.", services: [
        { title: "Workshops for teams", body: "Hands-on sessions around AI, product engineering, design systems, growth and developer tools.", proof: "Taste hacking · Agents" },
        { title: "Workshops for communities", body: "A session for your meetup, campus or company, run by the Crafter community.", proof: "Hot Reload" },
      ] },
      { id: "open-source", label: "Open source", title: "Open source for your ecosystem", lede: "Public repositories that make your platform easier to adopt.", services: [
        { title: "Tools for your ecosystem", body: "We design, build and maintain open source tools that make your platform easier to adopt.", proof: "petdex · agentfiles · tinte" },
        { title: "Bounties and contributors", body: "Point builders at your repo with scoped bounties and issues that accept contributors.", proof: "crafter.run/bounties" },
      ] },
    ],
    proofLabel: "Proof",
    proofTitle: "What we have already run",
    proofLede: "Three hackathons, backed by companies and institutions across LatAm.",
    stats: [["US$32,500", "raised across three hackathons"], ["US$65,000", "in tools and credits offered"], ["650+", "hackers"], ["4", "countries: Peru, Colombia, El Salvador, Guatemala"]],
    editionsTitle: "Hackathon editions",
    places: ["Lima, Peru", "Online", "5 cities, LATAM"],
    prize: "in prizes",
    raised: "raised",
    sponsorsTitle: "Sponsors of builder events",
    sponsorsSummary: "Teams that have already shown up for Crafter Station builders.",
  },
  es: {
    label: "Servicios",
    claim: "Pon tu producto frente a los builders de LATAM.",
    lede: "Las empresas contratan a Crafter Station para hackathons, lanzamientos, workshops y código abierto, de la mano de una comunidad sin fines de lucro de más de 1.000 builders en Lima. Clerk, Cursor, ElevenLabs y v0 han respaldado lo que hacemos.",
    book: "Agenda una llamada gratis de 30 min",
    email: "Escríbenos",
    categories: [
      { id: "events", label: "Eventos", title: "Eventos y hackathons", lede: "Espacios donde los builders usan tu producto, no solo ven tu logo.", services: [
        { title: "Hackathons para tu producto", body: "Un reto construido alrededor de tu API o SDK, con builders que shipean demos funcionales en un fin de semana.", proof: "The Next Craft · IA Hackathon Perú · The realtime hackathon" },
        { title: "Patrocinio de eventos", body: "Pon a tu equipo en la sala en hackathons, workshops y lanzamientos para builders de LatAm.", proof: "Codex · OpenAI · Vercel · Firecrawl · v0" },
      ] },
      { id: "devrel", label: "DevRel", title: "DevRel y lanzamientos en LATAM", lede: "Llega a los builders que de verdad van a usar tu herramienta.", services: [
        { title: "Momentos de lanzamiento", body: "Lanzamientos en comunidad para herramientas, proyectos open source y colaboraciones con startups.", proof: "Hot Reload · DevDay Lima" },
        { title: "Demos y contenido en español", body: "Lleva tu herramienta a más de 1.000 builders con demos, workshops y contenido en español.", proof: "+1.000 builders · +20.000 suscriptores en Luma" },
      ] },
      { id: "education", label: "Educación", title: "Workshops", lede: "Sesiones prácticas, dictadas por quienes construyen las herramientas.", services: [
        { title: "Workshops para equipos", body: "Sesiones prácticas sobre IA, ingeniería de producto, sistemas de diseño, growth y herramientas para devs.", proof: "Taste hacking · Agentes" },
        { title: "Workshops para comunidades", body: "Una sesión para tu meetup, campus o empresa, dictada por la comunidad Crafter.", proof: "Hot Reload" },
      ] },
      { id: "open-source", label: "Código abierto", title: "Open source para tu ecosistema", lede: "Repositorios públicos que facilitan adoptar tu plataforma.", services: [
        { title: "Herramientas para tu ecosistema", body: "Diseñamos, construimos y mantenemos herramientas open source que facilitan adoptar tu plataforma.", proof: "petdex · agentfiles · tinte" },
        { title: "Bounties y contribuidores", body: "Lleva a los builders a tu repo con bounties acotados e issues abiertos a contribuciones.", proof: "crafter.run/bounties" },
      ] },
    ],
    proofLabel: "Pruebas",
    proofTitle: "Lo que ya hicimos",
    proofLede: "Tres hackathons respaldados por empresas e instituciones de LatAm.",
    stats: [["US$32.500", "recaudados en tres hackathons"], ["US$65.000", "en herramientas y créditos ofrecidos"], ["+650", "hackers"], ["4", "países: Perú, Colombia, El Salvador, Guatemala"]],
    editionsTitle: "Ediciones de hackathon",
    places: ["Lima, Perú", "Online", "5 ciudades, LATAM"],
    prize: "en premios",
    raised: "recaudados",
    sponsorsTitle: "Sponsors de eventos para builders",
    sponsorsSummary: "Equipos que ya apostaron por los builders de Crafter Station.",
  },
  pt: {
    label: "Serviços",
    claim: "Coloque seu produto na frente dos builders da LATAM.",
    lede: "Empresas contratam a Crafter Station para hackathons, lançamentos, workshops e código aberto, com uma comunidade sem fins lucrativos de mais de 1.000 builders em Lima. Clerk, Cursor, ElevenLabs e v0 já apoiaram o que fazemos.",
    book: "Agende uma conversa grátis de 30 min",
    email: "Escreva para nós",
    categories: [
      { id: "events", label: "Eventos", title: "Eventos e hackathons", lede: "Espaços onde builders usam seu produto, não só veem seu logo.", services: [
        { title: "Hackathons para o seu produto", body: "Um desafio em torno da sua API ou SDK, com builders que entregam demos funcionando em um fim de semana.", proof: "The Next Craft · IA Hackathon Perú · The realtime hackathon" },
        { title: "Patrocínio de eventos", body: "Coloque seu time na sala em hackathons, workshops e lançamentos para builders da LatAm.", proof: "Codex · OpenAI · Vercel · Firecrawl · v0" },
      ] },
      { id: "devrel", label: "DevRel", title: "DevRel e lançamentos na LATAM", lede: "Alcance os builders que realmente vão usar sua ferramenta.", services: [
        { title: "Momentos de lançamento", body: "Lançamentos em comunidade para ferramentas, projetos open source e colaborações com startups.", proof: "Hot Reload · DevDay Lima" },
        { title: "Demos e conteúdo em espanhol", body: "Leve sua ferramenta a mais de 1.000 builders com demos, workshops e conteúdo em espanhol.", proof: "+1.000 builders · +20.000 inscritos no Luma" },
      ] },
      { id: "education", label: "Educação", title: "Workshops", lede: "Sessões práticas, conduzidas por quem constrói as ferramentas.", services: [
        { title: "Workshops para equipes", body: "Sessões práticas sobre IA, engenharia de produto, design systems, growth e ferramentas para devs.", proof: "Taste hacking · Agentes" },
        { title: "Workshops para comunidades", body: "Uma sessão para o seu meetup, campus ou empresa, conduzida pela comunidade Crafter.", proof: "Hot Reload" },
      ] },
      { id: "open-source", label: "Código aberto", title: "Open source para o seu ecossistema", lede: "Repositórios públicos que facilitam adotar a sua plataforma.", services: [
        { title: "Ferramentas para o seu ecossistema", body: "Projetamos, construímos e mantemos ferramentas open source que facilitam adotar a sua plataforma.", proof: "petdex · agentfiles · tinte" },
        { title: "Bounties e contribuidores", body: "Leve builders ao seu repositório com bounties delimitados e issues abertas a contribuições.", proof: "crafter.run/bounties" },
      ] },
    ],
    proofLabel: "Provas",
    proofTitle: "O que já fizemos",
    proofLede: "Três hackathons apoiados por empresas e instituições da LatAm.",
    stats: [["US$32.500", "captados em três hackathons"], ["US$65.000", "em ferramentas e créditos oferecidos"], ["+650", "hackers"], ["4", "países: Peru, Colômbia, El Salvador, Guatemala"]],
    editionsTitle: "Edições de hackathon",
    places: ["Lima, Peru", "Online", "5 cidades, LATAM"],
    prize: "em prêmios",
    raised: "captados",
    sponsorsTitle: "Sponsors de eventos para builders",
    sponsorsSummary: "Times que já apareceram para os builders da Crafter Station.",
  },
  zh: {
    label: "服务",
    claim: "让你的产品被拉美开发者看见。",
    lede: "企业与 Crafter Station 合作举办黑客松、产品发布、工作坊和开源项目。我们是一个位于利马、拥有 1,000+ 位开发者的非营利社区。Clerk、Cursor、ElevenLabs 和 v0 都曾支持我们的活动。",
    book: "预约免费 30 分钟通话",
    email: "发邮件给我们",
    categories: [
      { id: "events", label: "活动", title: "活动与黑客松", lede: "让开发者真正用上你的产品，而不只是看到你的 logo。", services: [
        { title: "为你的产品举办黑客松", body: "围绕你的 API 或 SDK 设计挑战，让开发者在一个周末做出可运行的 demo。", proof: "The Next Craft · IA Hackathon Perú · The realtime hackathon" },
        { title: "活动赞助", body: "让你的团队出现在拉美开发者的黑客松、工作坊和产品发布现场。", proof: "Codex · OpenAI · Vercel · Firecrawl · v0" },
      ] },
      { id: "devrel", label: "DevRel", title: "拉美 DevRel 与产品发布", lede: "触达真正会使用你工具的开发者。", services: [
        { title: "发布时刻", body: "为工具、开源项目和创业合作举办社区发布。", proof: "Hot Reload · DevDay Lima" },
        { title: "西语 demo 与内容", body: "用西语 demo、工作坊和内容，把你的开发者工具带给 1,000+ 位开发者。", proof: "1,000+ 位开发者 · 20,000+ Luma 订阅者" },
      ] },
      { id: "education", label: "教育", title: "工作坊", lede: "由打造工具的人亲自带领的实战课程。", services: [
        { title: "面向团队的工作坊", body: "围绕 AI、产品工程、设计系统、增长和开发者工具的实战课程。", proof: "Taste hacking · Agents" },
        { title: "面向社区的工作坊", body: "由 Crafter 社区为你的聚会、校园或公司带来一场课程。", proof: "Hot Reload" },
      ] },
      { id: "open-source", label: "开源", title: "为你的生态做开源", lede: "让你的平台更容易被采用的公开仓库。", services: [
        { title: "生态工具", body: "我们设计、构建并维护开源工具，让你的平台更容易被采用。", proof: "petdex · agentfiles · tinte" },
        { title: "赏金与贡献者", body: "用明确范围的赏金和欢迎贡献的 issue，把开发者引到你的仓库。", proof: "crafter.run/bounties" },
      ] },
    ],
    proofLabel: "成果",
    proofTitle: "我们已经做过的事",
    proofLede: "三场黑客松，获得拉美企业与机构的支持。",
    stats: [["US$32,500", "三场黑客松共筹集"], ["US$65,000", "提供的工具与额度"], ["650+", "黑客"], ["4", "个国家：秘鲁、哥伦比亚、萨尔瓦多、危地马拉"]],
    editionsTitle: "黑客松届次",
    places: ["秘鲁利马", "线上", "拉美 5 座城市"],
    prize: "奖金",
    raised: "已筹集",
    sponsorsTitle: "开发者活动的赞助商",
    sponsorsSummary: "已经为 Crafter Station 的开发者到场的团队。",
  },
  ja: {
    label: "サービス",
    claim: "ラテンアメリカのビルダーに、あなたのプロダクトを届ける。",
    lede: "企業は、ハッカソン、ローンチ、ワークショップ、オープンソースで Crafter Station に依頼しています。リマを拠点とする 1,000 人以上のビルダーの非営利コミュニティです。Clerk、Cursor、ElevenLabs、v0 が私たちの活動を支援してくれました。",
    book: "無料の30分相談を予約",
    email: "メールで連絡",
    categories: [
      { id: "events", label: "イベント", title: "イベントとハッカソン", lede: "ロゴを見せるだけでなく、ビルダーがプロダクトを実際に使う場。", services: [
        { title: "プロダクトのためのハッカソン", body: "あなたの API や SDK を軸にした課題で、ビルダーが週末のうちに動くデモを作ります。", proof: "The Next Craft · IA Hackathon Perú · The realtime hackathon" },
        { title: "イベント協賛", body: "ラテンアメリカのビルダー向けハッカソン、ワークショップ、ローンチにチームで参加できます。", proof: "Codex · OpenAI · Vercel · Firecrawl · v0" },
      ] },
      { id: "devrel", label: "DevRel", title: "ラテンアメリカの DevRel とローンチ", lede: "実際にツールを使うビルダーに届けます。", services: [
        { title: "ローンチの場", body: "ツール、オープンソース、スタートアップとの協業のためのコミュニティローンチ。", proof: "Hot Reload · DevDay Lima" },
        { title: "スペイン語のデモとコンテンツ", body: "スペイン語のデモ、ワークショップ、コンテンツで、1,000 人以上のビルダーにあなたの開発者ツールを届けます。", proof: "1,000+ ビルダー · 20,000+ Luma 購読者" },
      ] },
      { id: "education", label: "教育", title: "ワークショップ", lede: "ツールをつくる人たちが教える、手を動かす講座。", services: [
        { title: "チーム向けワークショップ", body: "AI、プロダクトエンジニアリング、デザインシステム、グロース、開発者ツールを扱う実践セッション。", proof: "Taste hacking · Agents" },
        { title: "コミュニティ向けワークショップ", body: "ミートアップ、キャンパス、会社のために、Crafter コミュニティが開くセッション。", proof: "Hot Reload" },
      ] },
      { id: "open-source", label: "オープンソース", title: "エコシステムのためのオープンソース", lede: "プラットフォームを導入しやすくする公開リポジトリ。", services: [
        { title: "エコシステム向けツール", body: "プラットフォームを導入しやすくするオープンソースツールを設計、開発、保守します。", proof: "petdex · agentfiles · tinte" },
        { title: "バウンティとコントリビューター", body: "範囲を絞ったバウンティと、貢献を受け付ける issue で、ビルダーをあなたのリポジトリへ。", proof: "crafter.run/bounties" },
      ] },
    ],
    proofLabel: "実績",
    proofTitle: "これまでにやったこと",
    proofLede: "ラテンアメリカの企業と機関に支えられた 3 回のハッカソン。",
    stats: [["US$32,500", "3 回のハッカソンで調達"], ["US$65,000", "提供したツールとクレジット"], ["650+", "ハッカー"], ["4", "か国: ペルー、コロンビア、エルサルバドル、グアテマラ"]],
    editionsTitle: "ハッカソンの開催履歴",
    places: ["ペルー・リマ", "オンライン", "ラテンアメリカ 5 都市"],
    prize: "賞金",
    raised: "調達",
    sponsorsTitle: "ビルダーイベントのスポンサー",
    sponsorsSummary: "すでに Crafter Station のビルダーのために動いてくれたチーム。",
  },
}
