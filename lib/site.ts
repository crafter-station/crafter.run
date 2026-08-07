import { teamMembers } from "@/lib/team"
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
    en: "Crafter Station is a LatAm shipping network: community, products, open source, research, and events for builders across the region.",
    es: "Crafter Station es una red LatAm para shippers: comunidad, productos, codigo abierto, investigacion y eventos para builders de la region.",
    pt: "Crafter Station e uma rede LatAm para shippers: comunidade, produtos, codigo aberto, pesquisa e eventos para builders da regiao.",
    zh: "Crafter Station 是一个拉美 shipper 网络：面向整个地区 builder 的社区、产品、开源、研究与活动。",
    ja: "Crafter Station はラテンアメリカのシッパーネットワークです。地域のビルダーのためのコミュニティ、プロダクト、オープンソース、リサーチ、イベントを提供します。",
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

export const navItems = [
  { key: "events", href: "/events" },
  { key: "oss", href: "/oss" },
  { key: "products", href: "/products" },
  { key: "research", href: "/research" },
  { key: "impact", href: "/impact/petdex" },
  { key: "team", href: "/team" },
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
  { value: "100+", label: { en: "Products shipped", es: "Productos construidos", pt: "Produtos construidos", zh: "已 ship 的产品", ja: "シップしたプロダクト" } },
  { value: "6.5k+", label: { en: "Open-source stars", es: "Estrellas en codigo abierto", pt: "Estrelas em codigo aberto", zh: "开源 star 数", ja: "オープンソースのスター" } },
] as const

export function getStats(locale: Locale = defaultLocale) {
  return stats.map((item) => ({ ...item, label: localized(item.label, locale) }))
}

export const ecosystem = [
  {
    title: { en: "Community", es: "Comunidad", pt: "Comunidade", zh: "社区", ja: "コミュニティ" },
    body: {
      en: "A WhatsApp-first network of 1000+ engineers, designers, founders, product, growth, and marketing people building across LatAm.",
      es: "Una red WhatsApp-first de 1000+ ingenieros, disenadores, founders, producto, growth y marketing construyendo en LatAm.",
      pt: "Uma rede WhatsApp-first de 1000+ engenheiros, designers, founders, produto, growth e marketing construindo no LatAm.",
      zh: "一个以 WhatsApp 为主的网络，汇聚 1000+ 位在拉美各地构建的工程师、设计师、创始人、产品、增长和市场人。",
      ja: "ラテンアメリカ各地で開発する1000人以上のエンジニア、デザイナー、ファウンダー、プロダクト、グロース、マーケティング担当が集まる WhatsApp ファーストのネットワーク。",
    },
    href: "https://crafters.chat",
  },
  {
    title: { en: "Events", es: "Eventos", pt: "Eventos", zh: "活动", ja: "イベント" },
    body: {
      en: "Code Brews, hackathons, product launches, workshops, and partner activations that bring serious builders into the same room.",
      es: "Code Brews, hackathons, lanzamientos, workshops y activaciones con partners que juntan a builders serios en la misma sala.",
      pt: "Code Brews, hackathons, lancamentos, workshops e ativacoes com parceiros que colocam builders serios na mesma sala.",
      zh: "Code Brew、黑客松、产品发布、工作坊和合作伙伴活动，把认真做事的 builder 聚到同一个空间。",
      ja: "Code Brew、ハッカソン、プロダクトローンチ、ワークショップ、パートナー施策で、本気のビルダーを同じ場所に集めます。",
    },
    href: "/events",
  },
  {
    title: { en: "Research", es: "Investigacion", pt: "Pesquisa", zh: "研究", ja: "リサーチ" },
    body: {
      en: "Crafter Research studies AI-first engineering, agents, developer experience, and the new workflows shaping how teams ship.",
      es: "Crafter Research estudia ingenieria AI-first, agentes, developer experience y los nuevos flujos que cambian como los equipos construyen.",
      pt: "Crafter Research estuda engenharia AI-first, agentes, developer experience e os novos fluxos que mudam como os times constroem.",
      zh: "Crafter Research 研究 AI-first 工程、智能体、开发者体验，以及正在改变团队交付方式的新工作流。",
      ja: "Crafter Research は、AIファーストのエンジニアリング、エージェント、開発者体験、そしてチームのシップの仕方を変えつつある新しいワークフローを研究しています。",
    },
    href: "/research",
  },
  {
    title: { en: "Open source", es: "Codigo abierto", pt: "Codigo aberto", zh: "开源", ja: "オープンソース" },
    body: {
      en: "We build in public and release tools developers actually use, from design systems to AI-native writing and codebase search.",
      es: "Construimos en publico y liberamos herramientas que developers realmente usan: sistemas de diseno, escritura con IA y busqueda de codigo.",
      pt: "Construimos em publico e liberamos ferramentas que developers realmente usam: sistemas de design, escrita com IA e busca de codigo.",
      zh: "我们公开构建，发布开发者真正会用的工具：从设计系统到 AI 原生写作和代码库搜索。",
      ja: "公開の場で開発し、デザインシステムから AIネイティブなライティングやコードベース検索まで、開発者が実際に使うツールをリリースしています。",
    },
    href: "/oss",
  },
  {
    title: { en: "Products", es: "Productos", pt: "Produtos", zh: "产品", ja: "プロダクト" },
    body: {
      en: "Products we ship and support: voice interfaces, agent tooling, research surfaces, and the writing we sell.",
      es: "Productos que construimos y sostenemos: interfaces de voz, herramientas para agentes, investigacion y la escritura que vendemos.",
      pt: "Produtos que construimos e sustentamos: interfaces de voz, ferramentas para agentes, pesquisa e a escrita que vendemos.",
      zh: "我们打造并持续维护的产品：语音界面、智能体工具、研究平台，以及我们出售的写作内容。",
      ja: "私たちが開発し支えるプロダクト: 音声インターフェース、エージェント向けツール、リサーチ基盤、そして販売しているライティング。",
    },
    href: "/products",
  },
] as const

export function getEcosystem(locale: Locale = defaultLocale) {
  return ecosystem.map((item) => ({
    ...item,
    title: localized(item.title, locale),
    body: localized(item.body, locale),
  }))
}

export const services = [
  {
    title: { en: "LatAm growth partner", es: "Partner de crecimiento en LatAm", pt: "Parceiro de crescimento no LatAm", zh: "拉美增长伙伴", ja: "ラテンアメリカのグロースパートナー" },
    body: {
      en: "For devtools and startups that want to earn trust in LatAm through events, community, content, product collaboration, and high-signal builder access.",
      es: "Para devtools y startups que quieren ganar confianza en LatAm con eventos, comunidad, contenido, colaboracion de producto y acceso a builders de alta senal.",
      pt: "Para devtools e startups que querem ganhar confianca no LatAm com eventos, comunidade, conteudo, colaboracao de produto e acesso a builders de alto sinal.",
      zh: "面向希望通过活动、社区、内容、产品协作和高质量 builder 触达来赢得拉美信任的 devtools 与创业公司。",
      ja: "イベント、コミュニティ、コンテンツ、プロダクトコラボレーション、質の高いビルダーへのアクセスを通じて、ラテンアメリカで信頼を獲得したい devtools やスタートアップのために。",
    },
    href: "/team/emmy",
  },
  {
    title: { en: "Hackathon & event activation", es: "Activacion en hackathons y eventos", pt: "Ativacao em hackathons e eventos", zh: "黑客松与活动策划", ja: "ハッカソン・イベント施策" },
    body: {
      en: "We design and run activations that put your product in the hands of engineers, designers, product people, and shippers who can actually use it.",
      es: "Disenamos y operamos activaciones que ponen tu producto en manos de ingenieros, disenadores, producto y shippers que pueden usarlo de verdad.",
      pt: "Desenhamos e operamos ativacoes que colocam seu produto nas maos de engenheiros, designers, produto e shippers que podem usa-lo de verdade.",
      zh: "我们设计并运营各类活动，把你的产品交到真正能用上它的工程师、设计师、产品人和 shipper 手中。",
      ja: "エンジニア、デザイナー、プロダクト担当、シッパーなど、実際に使ってくれる人の手にあなたのプロダクトを届ける施策を設計・運営します。",
    },
    href: "/events/sponsors",
  },
  {
    title: { en: "Product engineering", es: "Ingenieria de producto", pt: "Engenharia de produto", zh: "产品工程", ja: "プロダクトエンジニアリング" },
    body: {
      en: "End-to-end web products built on Next.js and the React ecosystem. From zero-to-one to scaling to millions of pages, we ship without half measures.",
      es: "Productos web end-to-end sobre Next.js y el ecosistema React. De cero-a-uno a escalar millones de paginas, construimos sin medias tintas.",
      pt: "Produtos web end-to-end sobre Next.js e o ecossistema React. De zero-a-um ate escalar milhoes de paginas, construimos sem meias medidas.",
      zh: "基于 Next.js 和 React 生态的端到端 Web 产品。从零到一到扩展至数百万页面，我们不打折扣地交付。",
      ja: "Next.js と React エコシステムで作るエンドツーエンドの Web プロダクト。ゼロイチから数百万ページへのスケールまで、中途半端にせずシップします。",
    },
    href: "/team/cuevaio",
  },
  {
    title: { en: "AI products", es: "Productos con IA", pt: "Produtos com IA", zh: "AI 产品", ja: "AI プロダクト" },
    body: {
      en: "Streaming LLM UIs, agents, evals, and inference infra. We build with the latest models and the patterns that hold up in production.",
      es: "UIs con streaming de LLMs, agentes, evaluaciones e infraestructura de inferencia. Construimos con modelos recientes y patrones que aguantan produccion.",
      pt: "UIs com streaming de LLMs, agentes, avaliacoes e infraestrutura de inferencia. Construimos com modelos recentes e padroes que aguentam producao.",
      zh: "流式 LLM 界面、智能体、评测与推理基础设施。我们使用最新的模型和经得起生产考验的模式来构建。",
      ja: "ストリーミング LLM UI、エージェント、評価、推論インフラ。最新のモデルと、本番で通用するパターンで開発します。",
    },
    href: "/team/nicolas",
  },
  {
    title: { en: "Design systems", es: "Sistemas de diseno", pt: "Sistemas de design", zh: "设计系统", ja: "デザインシステム" },
    body: {
      en: "Component libraries and tokens that scale across surfaces. We treat the design system as a product, with rigor in versioning and DX.",
      es: "Librerias de componentes y tokens que escalan entre superficies. Tratamos el sistema de diseno como producto, con rigor en versionado y DX.",
      pt: "Bibliotecas de componentes e tokens que escalam entre superficies. Tratamos o sistema de design como produto, com rigor em versionamento e DX.",
      zh: "能够跨界面扩展的组件库与 token。我们把设计系统当作产品来对待，在版本管理和 DX 上一丝不苟。",
      ja: "複数のサーフェスにスケールするコンポーネントライブラリとトークン。デザインシステムをプロダクトとして扱い、バージョニングと DX に厳密に取り組みます。",
    },
    href: "/team/shiara",
  },
  {
    title: { en: "Backend & APIs", es: "Backend y APIs", pt: "Backend e APIs", zh: "后端与 API", ja: "バックエンドと API" },
    body: {
      en: "Postgres, edge runtimes, queues, and the data plumbing your product actually depends on. Built to scale, instrumented from day one.",
      es: "Postgres, runtimes edge, colas y la capa de datos de la que tu producto depende. Construido para escalar e instrumentado desde el dia uno.",
      pt: "Postgres, runtimes edge, filas e a camada de dados da qual seu produto depende. Construido para escalar e instrumentado desde o dia um.",
      zh: "Postgres、边缘运行时、队列，以及你的产品真正依赖的数据管道。为扩展而建，从第一天起就有完善的观测。",
      ja: "Postgres、エッジランタイム、キュー、そしてプロダクトが実際に依存するデータ基盤。スケールを見据えて構築し、初日から計測を組み込みます。",
    },
    href: "/team/ignacio",
  },
] as const

export function getServices(locale: Locale = defaultLocale) {
  return services.map((item) => ({
    ...item,
    title: localized(item.title, locale),
    body: localized(item.body, locale),
  }))
}

export const communityOffers = [
  { en: "Join the WhatsApp community at crafters.chat", es: "Unete a la comunidad de WhatsApp en crafters.chat", pt: "Entre na comunidade do WhatsApp em crafters.chat", zh: "加入 crafters.chat 上的 WhatsApp 社区", ja: "crafters.chat の WhatsApp コミュニティに参加する" },
  { en: "Attend Code Brews, hackathons, meetups, and launch nights", es: "Asiste a Code Brews, hackathons, meetups y noches de lanzamiento", pt: "Participe de Code Brews, hackathons, meetups e noites de lancamento", zh: "参加 Code Brew、黑客松、meetup 和发布之夜", ja: "Code Brew、ハッカソン、ミートアップ、ローンチナイトに参加する" },
  { en: "Get mentoring and career advice from active builders", es: "Recibe mentoria y consejo de carrera de builders activos", pt: "Receba mentoria e conselho de carreira de builders ativos", zh: "从活跃的 builder 那里获得导师辅导和职业建议", ja: "現役のビルダーからメンタリングとキャリアアドバイスを受ける" },
  { en: "Ship in public with people who celebrate finished work", es: "Construye en publico con personas que celebran el trabajo terminado", pt: "Construa em publico com pessoas que celebram trabalho finalizado", zh: "与庆祝完成之作的人一起公开 ship", ja: "完成した仕事を称え合う仲間と、公開の場でシップする" },
  { en: "Discover and showcase exceptional LatAm tech talent", es: "Descubre y muestra talento tech excepcional de LatAm", pt: "Descubra e mostre talento tech excepcional do LatAm", zh: "发现并展示拉美出色的技术人才", ja: "ラテンアメリカの卓越したテック人材を見つけ、紹介する" },
] as const

export function getCommunityOffers(locale: Locale = defaultLocale) {
  return communityOffers.map((item) => localized(item, locale))
}

export const products = [
  {
    slug: "hack0",
    title: "hack0",
    tagline: { en: "The live LATAM builder index", es: "El indice vivo de builders en LATAM", pt: "O indice vivo de builders no LATAM", zh: "实时更新的 LATAM builder 索引", ja: "ライブで更新される LATAM ビルダーインデックス" },
    description: {
      en: "A public directory for LATAM builders: events, communities, hackathons, labs, grants, and hosts maintained from open community calendars.",
      es: "Un directorio publico para builders de LATAM: eventos, comunidades, hackathons, labs, grants y hosts mantenidos desde calendarios abiertos de la comunidad.",
      pt: "Um diretorio publico para builders do LATAM: eventos, comunidades, hackathons, labs, grants e hosts mantidos a partir de calendarios abertos da comunidade.",
      zh: "面向 LATAM builder 的公开目录：活动、社区、黑客松、实验室、资助与主办方，由开放的社区日历维护。",
      ja: "LATAM のビルダーのための公開ディレクトリ。イベント、コミュニティ、ハッカソン、ラボ、グラント、ホストを、オープンなコミュニティカレンダーから管理しています。",
    },
    metrics: ["186 events", "84 communities", "20 countries"],
    technologies: ["LATAM", "Events", "Community"],
    url: "https://hack0.dev",
    sourceUrl: "https://github.com/crafter-station/hack0",
    openSource: true,
    accent: "from-lime-300 via-emerald-500 to-teal-700",
  },
  {
    slug: "petdex",
    title: "Petdex",
    tagline: { en: "The Codex pet index", es: "El indice de mascotas para Codex", pt: "O indice de pets para Codex", zh: "Codex 的宠物索引", ja: "Codex のペットインデックス" },
    description: {
      en: "A public gallery of animated companions for Codex. Browse thousands of open-source pets, preview their states, and install one with a single command.",
      es: "Una galeria publica de companeros animados para Codex. Explora miles de mascotas open source, previsualiza sus estados e instala una con un solo comando.",
      pt: "Uma galeria publica de companheiros animados para Codex. Explore milhares de pets open source, visualize seus estados e instale um com um unico comando.",
      zh: "Codex 动画伙伴的公开图库。浏览数千只开源宠物，预览它们的状态，一条命令即可安装。",
      ja: "Codex のためのアニメーションコンパニオンの公開ギャラリー。数千のオープンソースのペットを眺め、状態をプレビューして、コマンド1つでインストールできます。",
    },
    metrics: ["3,114+ pets", "1-command install", "open source"],
    technologies: ["Codex", "Desktop", "Gallery"],
    url: "https://petdex.dev",
    sourceUrl: "https://github.com/crafter-station/petdex",
    openSource: true,
    accent: "from-pink-300 via-fuchsia-500 to-purple-700",
  },
  {
    slug: "legalize-pe",
    title: "Legalize PE",
    tagline: { en: "Peruvian law as a git repo", es: "Legislacion peruana como repo git", pt: "Legislacao peruana como repo git", zh: "把秘鲁法律变成 git 仓库", ja: "ペルーの法律を git リポジトリに" },
    description: {
      en: "A community-maintained corpus of Peruvian legal norms as Markdown files, where every reform is a commit dated to the real publication date.",
      es: "Un corpus comunitario de normas legales peruanas como archivos Markdown, donde cada reforma es un commit con la fecha real de publicacion.",
      pt: "Um corpus comunitario de normas legais peruanas como arquivos Markdown, onde cada reforma e um commit com a data real de publicacao.",
      zh: "由社区维护的秘鲁法律规范语料库，以 Markdown 文件呈现，每次修法都是一个标注真实公布日期的 commit。",
      ja: "ペルーの法規範を Markdown ファイルとしてコミュニティで管理するコーパス。すべての改正が、実際の公布日で日付が付いた commit になっています。",
    },
    metrics: ["21,244 norms", "26/26 jurisdictions", "10,199 regional"],
    technologies: ["Law", "Markdown", "Git"],
    url: "https://legalize-pe.crafter.ing/",
    sourceUrl: "https://github.com/crafter-research/legalize-pe",
    openSource: true,
    accent: "from-slate-200 via-blue-500 to-indigo-800",
  },
  {
    slug: "maca",
    title: "Maca",
    tagline: { en: "Voice-to-text blazing fast", es: "Voz a texto a velocidad brutal", pt: "Voz para texto em alta velocidade", zh: "极速语音转文字", ja: "爆速の音声テキスト入力" },
    description: {
      en: "A Mac voice interface that works across every app. Hold one hotkey, speak naturally, and Maca pastes polished text where your cursor is.",
      es: "Una interfaz de voz para Mac que funciona en cualquier app. Mantienes un hotkey, hablas natural y Maca pega texto pulido donde esta tu cursor.",
      pt: "Uma interface de voz para Mac que funciona em qualquer app. Segure uma tecla, fale naturalmente e o Maca cola texto polido onde esta o cursor.",
      zh: "适用于所有应用的 Mac 语音界面。按住一个快捷键、自然说话，Maca 就把润色好的文字粘贴到光标处。",
      ja: "あらゆるアプリで使える Mac の音声インターフェース。ホットキーを押しながら自然に話すだけで、Maca が整った文章をカーソル位置に貼り付けます。",
    },
    metrics: ["5x faster", "<50ms latency", "one hotkey"],
    technologies: ["Voice", "Mac", "Productivity"],
    url: "https://maca.sh/",
    accent: "from-stone-200 via-neutral-500 to-black",
  },
  {
    slug: "visagente",
    title: "Visagente",
    tagline: { en: "Advance your U.S. visa appointment", es: "Adelanta tu cita de visa americana", pt: "Antecipe sua entrevista de visto americano", zh: "提前你的美国签证面谈", ja: "アメリカのビザ面接を前倒しに" },
    description: {
      en: "A visa appointment assistant that monitors availability and helps travelers move their U.S. visa interview earlier by up to 10 months.",
      es: "Un asistente de citas de visa que monitorea disponibilidad y ayuda a viajeros a adelantar su entrevista de visa americana hasta 10 meses.",
      pt: "Um assistente de agendamento de visto que monitora disponibilidade e ajuda viajantes a antecipar a entrevista do visto americano em ate 10 meses.",
      zh: "一个签证预约助手：监控空位，帮助旅客把美国签证面谈最多提前 10 个月。",
      ja: "空き枠をモニタリングし、アメリカのビザ面接を最大10か月早められるように旅行者を支援する予約アシスタント。",
    },
    metrics: ["up to 10 months", "U.S. visa", "appointment alerts"],
    technologies: ["Travel", "Automation", "Visa"],
    url: "https://visagente.com/",
    accent: "from-blue-300 via-cyan-500 to-emerald-600",
  },
  {
    slug: "shipping-bible",
    title: "Shipping Bible",
    tagline: { en: "Our playbook for shipping consistently", es: "Nuestro playbook para construir con consistencia", pt: "Nosso playbook para construir com consistencia", zh: "我们持续 ship 的 playbook", ja: "コンスタントにシップするためのプレイブック" },
    description: {
      en: "A living philosophy on shipping, building in public, time-boxing work, telling better stories, and growing as a builder in LatAm.",
      es: "Una filosofia viva para construir en publico, trabajar con limites de tiempo, contar mejores historias y crecer como builder en LatAm.",
      pt: "Uma filosofia viva para construir em publico, trabalhar com limites de tempo, contar historias melhores e crescer como builder no LatAm.",
      zh: "一部持续更新的理念：如何 ship、公开构建、用时间盒工作、讲更好的故事，并在拉美作为 builder 成长。",
      ja: "シップすること、公開の場で開発すること、タイムボックスで働くこと、より良いストーリーを語ること、そしてラテンアメリカでビルダーとして成長すること。それらについての生きた哲学です。",
    },
    technologies: ["Playbook", "Community", "Shipping"],
    url: "https://theshippingbible.com/",
    accent: "from-zinc-200 via-zinc-500 to-zinc-900",
  },
  {
    slug: "research",
    title: "research",
    tagline: { en: "AI-first engineering research from Crafter Station", es: "Investigacion de ingenieria AI-first de Crafter Station", pt: "Pesquisa de engenharia AI-first da Crafter Station", zh: "来自 Crafter Station 的 AI-first 工程研究", ja: "Crafter Station による AIファーストのエンジニアリングリサーチ" },
    description: {
      en: "A research unit exploring agents, AI workflows, developer experience, codebase context, and the future of software teams.",
      es: "Una unidad de investigacion sobre agentes, flujos de trabajo con IA, experiencia de desarrollo, contexto de codebases y el futuro de los equipos de software.",
      pt: "Uma unidade de pesquisa sobre agentes, fluxos de trabalho com IA, experiencia de desenvolvimento, contexto de codebases e o futuro dos times de software.",
      zh: "一个研究部门，探索智能体、AI 工作流、开发者体验、代码库上下文以及软件团队的未来。",
      ja: "エージェント、AI ワークフロー、開発者体験、コードベースのコンテキスト、そしてソフトウェアチームの未来を探求するリサーチユニット。",
    },
    technologies: ["AI", "Agents", "DX"],
    url: "https://research.crafter.ing/",
    accent: "from-violet-300 via-indigo-500 to-blue-700",
  },
  {
    slug: "tinte",
    title: "tinte",
    tagline: { en: "AI theme generator for VS Code, Shadcn, and beyond", es: "Generador de temas con IA para VS Code, Shadcn y mas", pt: "Gerador de temas com IA para VS Code, Shadcn e mais", zh: "面向 VS Code、Shadcn 等的 AI 主题生成器", ja: "VS Code や Shadcn などのための AI テーマジェネレーター" },
    description: {
      en: "Generate, remix, and ship beautiful themes across editors and design systems. Used by thousands of developers to make their environment feel like home.",
      es: "Genera, remezcla y publica temas visuales para editores y sistemas de diseno. Miles de developers lo usan para hacer que su entorno se sienta propio.",
      pt: "Gere, remix e publique temas visuais para editores e sistemas de design. Milhares de developers usam para deixar o ambiente com a propria cara.",
      zh: "跨编辑器和设计系统生成、混搭并发布漂亮的主题。数千名开发者用它让自己的环境更有家的感觉。",
      ja: "エディタとデザインシステムをまたいで、美しいテーマを生成・リミックス・公開できます。数千人の開発者が、自分の環境を自分の居場所にするために使っています。",
    },
    technologies: ["Next.js", "AI SDK", "Postgres", "Vercel"],
    url: "https://tinte.dev",
    sourceUrl: "https://github.com/Railly/tinte",
    openSource: true,
    accent: "from-amber-300 via-orange-400 to-rose-500",
  },
  {
    slug: "lupa",
    title: "lupa",
    tagline: { en: "Search that actually understands your codebase", es: "Busqueda que entiende tu codebase de verdad", pt: "Busca que entende sua codebase de verdade", zh: "真正理解你代码库的搜索", ja: "コードベースを本当に理解する検索" },
    description: {
      en: "Semantic and structural search for engineering teams. Index, ask, and navigate code at the speed of thought.",
      es: "Busqueda semantica y estructural para equipos de ingenieria. Indexa, pregunta y navega codigo a la velocidad del pensamiento.",
      pt: "Busca semantica e estrutural para times de engenharia. Indexe, pergunte e navegue codigo na velocidade do pensamento.",
      zh: "面向工程团队的语义与结构化搜索。索引、提问，以思维的速度浏览代码。",
      ja: "エンジニアリングチームのためのセマンティック検索と構造検索。インデックスして、質問して、思考のスピードでコードをナビゲートできます。",
    },
    technologies: ["Bun", "Postgres", "pgvector", "Next.js"],
    url: "https://lupa.dev",
    sourceUrl: "https://github.com/crafter-station/lupa",
    openSource: true,
    accent: "from-cyan-300 via-sky-500 to-indigo-600",
  },
  {
    slug: "elements",
    title: "elements",
    tagline: { en: "A registry of production-ready UI elements", es: "Un registry de elementos UI listos para produccion", pt: "Um registry de elementos UI prontos para producao", zh: "生产可用 UI 元素的 registry", ja: "プロダクションレディな UI エレメントのレジストリ" },
    description: {
      en: "Drop-in components and integrations for the apps you actually ship: Clerk, Stripe, Uploadthing, theming, and more. shadcn-compatible.",
      es: "Componentes e integraciones listos para produccion para las apps que realmente construyes: Clerk, Stripe, Uploadthing, theming y mas. Compatible con shadcn.",
      pt: "Componentes e integracoes prontos para producao para os apps que voce realmente constroi: Clerk, Stripe, Uploadthing, theming e mais. Compativel com shadcn.",
      zh: "为你真正要 ship 的应用准备的即插即用组件与集成：Clerk、Stripe、Uploadthing、主题等。兼容 shadcn。",
      ja: "実際にシップするアプリのための、すぐ使えるコンポーネントとインテグレーション。Clerk、Stripe、Uploadthing、テーマなどに対応し、shadcn 互換です。",
    },
    technologies: ["React", "Tailwind", "shadcn", "Registry"],
    url: "https://tryelements.dev",
    sourceUrl: "https://github.com/crafter-station/elements",
    openSource: true,
    accent: "from-emerald-300 via-teal-500 to-cyan-600",
  },
  {
    slug: "text0",
    title: "text0",
    tagline: { en: "The editor we wished we had", es: "El editor que queriamos tener", pt: "O editor que queriamos ter", zh: "我们一直想要的编辑器", ja: "ずっと欲しかったエディタ" },
    description: {
      en: "An opinionated, AI-native writing surface for technical teams. Focused, fast, and designed to disappear.",
      es: "Una superficie de escritura opinionada y nativa de IA para equipos tecnicos. Enfocada, rapida y disenada para desaparecer.",
      pt: "Uma superficie de escrita opinativa e nativa de IA para times tecnicos. Focada, rapida e desenhada para desaparecer.",
      zh: "为技术团队打造的有主见的 AI 原生写作界面。专注、快速，并且被设计得让人感觉不到它的存在。",
      ja: "テクニカルチームのための、こだわりのある AIネイティブなライティングサーフェス。集中できて、速く、存在を感じさせないようにデザインされています。",
    },
    technologies: ["Next.js", "AI SDK", "Tiptap"],
    url: "https://text0.dev",
    sourceUrl: "https://github.com/crafter-station/text0",
    openSource: true,
    accent: "from-fuchsia-300 via-purple-500 to-indigo-700",
  },
] as const

export function getProducts(locale: Locale = defaultLocale) {
  return products.map((item) => ({
    ...item,
    tagline: localized(item.tagline, locale),
    description: localized(item.description, locale),
  }))
}

function isOpenSource(product: ReturnType<typeof getProducts>[number]) {
  return "openSource" in product && product.openSource === true
}

export function getOpenSourceProducts(locale: Locale = defaultLocale) {
  return getProducts(locale).filter(isOpenSource)
}

export function getClosedProducts(locale: Locale = defaultLocale) {
  return getProducts(locale).filter((product) => !isOpenSource(product))
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
    title: { en: "Code Brew", es: "Code Brew", pt: "Code Brew", zh: "Code Brew", ja: "Code Brew" },
    body: {
      en: "Intimate meetups for shippers to share demos, lessons, and honest stories from the workbench.",
      es: "Meetups intimos para que shippers compartan demos, aprendizajes e historias honestas del trabajo.",
      pt: "Meetups intimos para shippers compartilharem demos, aprendizados e historias honestas do trabalho.",
      zh: "小而美的聚会，让 shipper 分享 demo、经验和来自工作台的真实故事。",
      ja: "シッパーがデモや学び、現場の率直なストーリーを共有する、少人数のミートアップ。",
    },
  },
  {
    title: { en: "Hackathons", es: "Hackathons", pt: "Hackathons", zh: "黑客松", ja: "ハッカソン" },
    body: {
      en: "High-energy build sprints where devtools become part of the workflow, not just a sponsor logo.",
      es: "Sprints de construccion con energia alta donde los devtools son parte del flujo, no solo un logo de sponsor.",
      pt: "Sprints de construcao com energia alta onde devtools viram parte do fluxo, nao so um logo de sponsor.",
      zh: "高能量的构建冲刺，devtools 在这里成为工作流的一部分，而不只是赞助商 logo。",
      ja: "devtools がスポンサーのロゴではなくワークフローの一部になる、熱量の高いビルドスプリント。",
    },
  },
  {
    title: { en: "Product launches", es: "Lanzamientos", pt: "Lancamentos", zh: "产品发布", ja: "プロダクトローンチ" },
    body: {
      en: "Community launch moments for tools, open-source projects, and startup collaborations.",
      es: "Momentos de lanzamiento con comunidad para herramientas, proyectos de codigo abierto y colaboraciones con startups.",
      pt: "Momentos de lancamento com comunidade para ferramentas, projetos de codigo aberto e colaboracoes com startups.",
      zh: "与社区一起，为工具、开源项目和创业公司合作打造发布时刻。",
      ja: "ツール、オープンソースプロジェクト、スタートアップとのコラボレーションを、コミュニティと一緒に祝うローンチの瞬間。",
    },
  },
  {
    title: { en: "Workshops", es: "Workshops", pt: "Workshops", zh: "工作坊", ja: "ワークショップ" },
    body: {
      en: "Hands-on sessions around AI, product engineering, design systems, growth, and developer tools.",
      es: "Sesiones practicas sobre IA, ingenieria de producto, sistemas de diseno, growth y herramientas para developers.",
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
      es: "Notas de investigacion, ensayos, experimentos y escritura tecnica de la unidad.",
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
      es: "Repositorios abiertos de investigacion, experimentos y artefactos tecnicos.",
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

export const team = teamMembers

export const testimonials = [
  {
    name: "Founder, AI startup",
    role: "Series A, North America",
    quote: {
      en: "They moved faster than our internal team and shipped quality we had not seen from outside collaborators. The product feels native, not contracted.",
      es: "Se movieron mas rapido que nuestro equipo interno y entregaron una calidad que no habiamos visto en colaboradores externos. El producto se siente nativo, no contratado.",
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
      es: "Crafter Station entro tarde e igual adelanto el lanzamiento. Opiniones fuertes, cero hand-holding y el polish es real.",
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
      es: "Trabajamos con muchos equipos de producto. Ninguno entendio nuestro stack como ellos desde el dia uno.",
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
  { label: "Discord", href: "https://discord.gg/crafterstation" },
  { label: "WhatsApp", href: "https://crafters.chat" },
  { label: "Luma", href: "https://luma.com/hack0" },
  { label: "Research", href: "https://research.crafter.ing/" },
] as const
