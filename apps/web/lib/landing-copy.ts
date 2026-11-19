import type { Locale } from "@/lib/i18n"

type Service = { title: string; body: string; proof: string }

type LandingCopy = {
  servicesLabel: string
  servicesTitle: string
  services: [Service, Service, Service, Service]
  servicesCta: string
  ossLabel: string
  ossTitle: string
  ossBody: string
  ossStars: string
  ossRepos: string
  ossChart: string
  ossCta: string
  contactLabel: string
  contactTitle: string
  contactBody: (names: string) => string
  bookCall: string
  coffee: string
  coffeeSubject: string
}

export const landingCopy: Record<Locale, LandingCopy> = {
  en: {
    servicesLabel: "Companies work with Crafter Station for",
    servicesTitle: "Work with us",
    services: [
      { title: "Hackathons for your product", body: "A challenge built around your API or SDK, with builders who ship working demos in a weekend.", proof: "The Next Craft · IA Hackathon Perú" },
      { title: "DevRel and launches in LATAM", body: "Put your dev tool in front of 1,000+ builders with demos, workshops and content in Spanish.", proof: "Hot Reload · DevDay Lima" },
      { title: "Workshops", body: "Hands-on sessions for teams and communities, taught by the people who build the tools.", proof: "Taste hacking · Agents" },
      { title: "Open source for your ecosystem", body: "We design, build and maintain open source tools that make your platform easier to adopt.", proof: "petdex · agentfiles · tinte" },
    ],
    servicesCta: "Talk to us",
    ossLabel: "Open source",
    ossTitle: "Built in the open, used in the wild",
    ossBody: "Everything we make starts as a public repository. Builders across LATAM use it, fork it and send fixes.",
    ossStars: "GitHub stars",
    ossRepos: "repositories accepting contributors",
    ossChart: "Stars per repository, live from GitHub",
    ossCta: "See all open source",
    contactLabel: "Let's build together",
    contactTitle: "Bring us your next idea",
    contactBody: (names) => `Sponsors, venues and teams have built with Crafter Station. Talk to ${names} about what we can make together.`,
    bookCall: "Book a call",
    coffee: "Grab a coffee in BA or Lima",
    coffeeSubject: "Coffee with Crafter Station",
  },
  es: {
    servicesLabel: "Las empresas trabajan con Crafter Station para",
    servicesTitle: "Trabaja con nosotros",
    services: [
      { title: "Hackathons para tu producto", body: "Un reto construido alrededor de tu API o SDK, con builders que shipean demos funcionales en un fin de semana.", proof: "The Next Craft · IA Hackathon Perú" },
      { title: "DevRel y lanzamientos en LATAM", body: "Lleva tu herramienta a más de 1.000 builders con demos, workshops y contenido en español.", proof: "Hot Reload · DevDay Lima" },
      { title: "Workshops", body: "Sesiones prácticas para equipos y comunidades, dictadas por quienes construyen las herramientas.", proof: "Taste hacking · Agentes" },
      { title: "Open source para tu ecosistema", body: "Diseñamos, construimos y mantenemos herramientas open source que facilitan adoptar tu plataforma.", proof: "petdex · agentfiles · tinte" },
    ],
    servicesCta: "Conversemos",
    ossLabel: "Código abierto",
    ossTitle: "Hecho en abierto, usado de verdad",
    ossBody: "Todo lo que hacemos empieza como un repositorio público. Builders de toda LATAM lo usan, lo forkean y mandan fixes.",
    ossStars: "estrellas en GitHub",
    ossRepos: "repositorios abiertos a contribuciones",
    ossChart: "Estrellas por repositorio, en vivo desde GitHub",
    ossCta: "Ver todo el código abierto",
    contactLabel: "Construyamos juntos",
    contactTitle: "Tráenos tu próxima idea",
    contactBody: (names) => `Sponsors, venues y equipos ya construyeron con Crafter Station. Habla con ${names} sobre lo que podemos hacer juntos.`,
    bookCall: "Agenda una llamada",
    coffee: "Tomemos un café en BA o Lima",
    coffeeSubject: "Café con Crafter Station",
  },
  pt: {
    servicesLabel: "Empresas trabalham com a Crafter Station para",
    servicesTitle: "Trabalhe com a gente",
    services: [
      { title: "Hackathons para o seu produto", body: "Um desafio em torno da sua API ou SDK, com builders que entregam demos funcionando em um fim de semana.", proof: "The Next Craft · IA Hackathon Perú" },
      { title: "DevRel e lançamentos na LATAM", body: "Leve sua ferramenta a mais de 1.000 builders com demos, workshops e conteúdo em espanhol.", proof: "Hot Reload · DevDay Lima" },
      { title: "Workshops", body: "Sessões práticas para equipes e comunidades, conduzidas por quem constrói as ferramentas.", proof: "Taste hacking · Agentes" },
      { title: "Open source para o seu ecossistema", body: "Projetamos, construímos e mantemos ferramentas open source que facilitam adotar a sua plataforma.", proof: "petdex · agentfiles · tinte" },
    ],
    servicesCta: "Vamos conversar",
    ossLabel: "Código aberto",
    ossTitle: "Feito em aberto, usado de verdade",
    ossBody: "Tudo o que fazemos começa como um repositório público. Builders de toda a LATAM usam, fazem fork e enviam correções.",
    ossStars: "estrelas no GitHub",
    ossRepos: "repositórios abertos a contribuições",
    ossChart: "Estrelas por repositório, ao vivo do GitHub",
    ossCta: "Ver todo o código aberto",
    contactLabel: "Vamos construir juntos",
    contactTitle: "Traga sua próxima ideia",
    contactBody: (names) => `Patrocinadores, espaços e equipes já construíram com a Crafter Station. Fale com ${names} sobre o que podemos fazer juntos.`,
    bookCall: "Agende uma conversa",
    coffee: "Um café em BA ou Lima",
    coffeeSubject: "Café com a Crafter Station",
  },
  zh: {
    servicesLabel: "企业与 Crafter Station 合作的方式",
    servicesTitle: "与我们合作",
    services: [
      { title: "为你的产品举办黑客松", body: "围绕你的 API 或 SDK 设计挑战，开发者在一个周末内交付可运行的演示。", proof: "The Next Craft · IA Hackathon Perú" },
      { title: "拉美开发者关系与发布", body: "通过演示、工作坊和西班牙语内容，把你的开发工具带给 1,000+ 位开发者。", proof: "Hot Reload · DevDay Lima" },
      { title: "工作坊", body: "由工具的构建者为团队和社区带来的实操课程。", proof: "Taste hacking · Agents" },
      { title: "为你的生态构建开源", body: "我们设计、构建并维护开源工具，让你的平台更容易被采用。", proof: "petdex · agentfiles · tinte" },
    ],
    servicesCta: "联系我们",
    ossLabel: "开源",
    ossTitle: "公开构建，真实使用",
    ossBody: "我们做的一切都从公开仓库开始。拉美各地的开发者使用、fork 并提交修复。",
    ossStars: "GitHub 星标",
    ossRepos: "个欢迎贡献的仓库",
    ossChart: "各仓库星标数，实时来自 GitHub",
    ossCta: "查看全部开源项目",
    contactLabel: "一起构建",
    contactTitle: "带来你的下一个想法",
    contactBody: (names) => `赞助方、场地和团队都曾与 Crafter Station 一起构建。和 ${names} 聊聊我们能一起做什么。`,
    bookCall: "预约通话",
    coffee: "在布宜诺斯艾利斯或利马喝杯咖啡",
    coffeeSubject: "与 Crafter Station 喝咖啡",
  },
  ja: {
    servicesLabel: "企業が Crafter Station と取り組んでいること",
    servicesTitle: "一緒に取り組む",
    services: [
      { title: "プロダクトのためのハッカソン", body: "あなたの API や SDK を軸にしたチャレンジ。ビルダーが週末で動くデモを届けます。", proof: "The Next Craft · IA Hackathon Perú" },
      { title: "ラテンアメリカでの DevRel とローンチ", body: "デモ、ワークショップ、スペイン語のコンテンツで、開発ツールを 1,000 人以上のビルダーに届けます。", proof: "Hot Reload · DevDay Lima" },
      { title: "ワークショップ", body: "ツールをつくっている本人たちが教える、チームとコミュニティ向けの実践セッション。", proof: "Taste hacking · Agents" },
      { title: "エコシステムのためのオープンソース", body: "プラットフォームを導入しやすくするオープンソースツールを設計、開発、保守します。", proof: "petdex · agentfiles · tinte" },
    ],
    servicesCta: "相談する",
    ossLabel: "オープンソース",
    ossTitle: "オープンにつくり、実際に使われる",
    ossBody: "私たちがつくるものはすべて公開リポジトリから始まります。ラテンアメリカ中のビルダーが使い、フォークし、修正を送ってくれます。",
    ossStars: "GitHub スター",
    ossRepos: "件のコントリビューション歓迎リポジトリ",
    ossChart: "リポジトリごとのスター数（GitHub からリアルタイム）",
    ossCta: "すべてのオープンソースを見る",
    contactLabel: "一緒につくろう",
    contactTitle: "次のアイデアを聞かせてください",
    contactBody: (names) => `スポンサー、会場、チームが Crafter Station と一緒につくってきました。何ができるか ${names} に相談してください。`,
    bookCall: "通話を予約する",
    coffee: "ブエノスアイレスかリマでコーヒーを",
    coffeeSubject: "Crafter Station とコーヒー",
  },
}
