import type { Locale } from "@/lib/i18n"

type ParticipationCopy = {
  paths: { title: string; body: string; action: string }[]
  contact: { title: string; body: string; community: string; team: string }
  team: { eyebrow: string; title: string; body: string; contribute: string; workshops: string }
  hotReload: { eyebrow: string; body: string; action: string }
  makeables: { eyebrow: string; title: string; body: string; action: string }
  history: string
  impact: string
}

export const participationCopy: Record<Locale, ParticipationCopy> = {
  es: {
    paths: [
      { title: "Contribuir a un proyecto", body: "Encuentra una herramienta que te interese y empieza por una issue, una prueba o una mejora de documentación.", action: "Explorar código abierto" },
      { title: "Aprender en un workshop", body: "Construye con otras personas, comparte preguntas y lleva lo aprendido a tu próximo proyecto.", action: "Ver la agenda" },
      { title: "Crear un encuentro", body: "Conecta tu comunidad u organización con encuentros, workshops y proyectos de Crafter.", action: "Explorar colaboraciones" },
      { title: "Un kit para tu comunidad", body: "Diseña badges, tarjetas y stickers con Makeables. Dale una identidad compartida a tu próximo encuentro.", action: "Abrir Makeables" },
    ],
    contact: { title: "Una conversación para empezar.", body: "Cuéntanos qué estás construyendo, a quién quieres reunir o dónde te gustaría aportar. Encuéntranos en la comunidad y conoce a las personas detrás de Crafter.", community: "Hablar con la comunidad", team: "Conocer al equipo" },
    team: { eyebrow: "Construir en compañía", title: "Empieza por hacer algo juntos.", body: "Una contribución, una pregunta o un workshop pueden ser el comienzo. Explora los proyectos y encuentra un espacio para aprender y aportar.", contribute: "Encontrar un proyecto", workshops: "Ver próximos workshops" },
    hotReload: { eyebrow: "Un nuevo encuentro de Crafter", body: "Café, código y workshops para aprender en comunidad. Estamos preparando Hot Reload; las próximas convocatorias se publicarán en la agenda.", action: "Seguir las convocatorias" },
    makeables: { eyebrow: "Hecho en Crafter", title: "Una comunidad también se puede llevar puesta.", body: "Badges, tarjetas y stickers con la identidad de tu comunidad. Diseña con agentes y llévalos a tu próximo encuentro.", action: "Explorar Makeables" },
    history: "Historial de hackathons",
    impact: "Ver el impacto de Petdex",
  },
  en: {
    paths: [
      { title: "Contribute to a project", body: "Find a tool you care about and start with an issue, a test, or a documentation improvement.", action: "Explore open source" },
      { title: "Learn in a workshop", body: "Build with other people, share questions, and bring what you learn to your next project.", action: "See the calendar" },
      { title: "Create a gathering", body: "Connect your community or organization with Crafter gatherings, workshops, and projects.", action: "Explore collaborations" },
      { title: "A kit for your community", body: "Design badges, cards, and stickers with Makeables. Give your next gathering a shared identity.", action: "Open Makeables" },
    ],
    contact: { title: "Start with a conversation.", body: "Tell us what you are building, who you want to bring together, or where you would like to contribute. Find us in the community and meet the people behind Crafter.", community: "Talk with the community", team: "Meet the team" },
    team: { eyebrow: "Building together", title: "Start by making something together.", body: "A contribution, a question, or a workshop can be the beginning. Explore the projects and find a place to learn and contribute.", contribute: "Find a project", workshops: "See upcoming workshops" },
    hotReload: { eyebrow: "A new Crafter gathering", body: "Coffee, code, and workshops for learning together. Hot Reload is in preparation; upcoming editions will be announced on the calendar.", action: "Follow the announcements" },
    makeables: { eyebrow: "Made at Crafter", title: "A community you can wear.", body: "Badges, cards, and stickers that feel like your community. Design with agents and bring them to your next gathering.", action: "Explore Makeables" },
    history: "Hackathon history",
    impact: "See Petdex's impact",
  },
  pt: {
    paths: [
      { title: "Contribuir com um projeto", body: "Encontre uma ferramenta que te interesse e comece com uma issue, um teste ou uma melhoria na documentação.", action: "Explorar código aberto" },
      { title: "Aprender em um workshop", body: "Construa com outras pessoas, compartilhe perguntas e leve o aprendizado para seu próximo projeto.", action: "Ver a agenda" },
      { title: "Criar um encontro", body: "Conecte sua comunidade ou organização aos encontros, workshops e projetos da Crafter.", action: "Explorar colaborações" },
      { title: "Um kit para sua comunidade", body: "Crie badges, cartões e stickers com Makeables. Dê uma identidade compartilhada ao próximo encontro.", action: "Abrir Makeables" },
    ],
    contact: { title: "Uma conversa para começar.", body: "Conte o que está construindo, quem quer reunir ou onde gostaria de contribuir. Encontre a gente na comunidade e conheça as pessoas por trás da Crafter.", community: "Conversar com a comunidade", team: "Conhecer a equipe" },
    team: { eyebrow: "Construir em companhia", title: "Comece criando algo junto.", body: "Uma contribuição, uma pergunta ou um workshop podem ser o começo. Explore os projetos e encontre um lugar para aprender e contribuir.", contribute: "Encontrar um projeto", workshops: "Ver próximos workshops" },
    hotReload: { eyebrow: "Um novo encontro da Crafter", body: "Café, código e workshops para aprender em comunidade. Estamos preparando o Hot Reload; as próximas edições serão anunciadas na agenda.", action: "Acompanhar os anúncios" },
    makeables: { eyebrow: "Feito na Crafter", title: "Uma comunidade que você pode vestir.", body: "Badges, cartões e stickers com a identidade da sua comunidade. Crie com agentes e leve ao próximo encontro.", action: "Explorar Makeables" },
    history: "Histórico de hackathons",
    impact: "Ver o impacto do Petdex",
  },
  zh: {
    paths: [
      { title: "为项目贡献力量", body: "找到你感兴趣的工具，从一个 issue、一次测试或文档改进开始。", action: "探索开源项目" },
      { title: "在工作坊中学习", body: "与他人一起构建、交流问题，把收获带到下一个项目。", action: "查看活动日历" },
      { title: "一起举办活动", body: "让你的社区或组织参与 Crafter 的聚会、工作坊与项目。", action: "探索合作方式" },
      { title: "为社区设计一套物料", body: "使用 Makeables 设计胸牌、卡片和贴纸，为下一次聚会打造共同的形象。", action: "打开 Makeables" },
    ],
    contact: { title: "从一次交流开始。", body: "告诉我们你在构建什么、希望聚集哪些人，或想在哪个方向贡献力量。加入社区，认识 Crafter 背后的伙伴。", community: "与社区交流", team: "认识团队" },
    team: { eyebrow: "一起构建", title: "从一起做一件事开始。", body: "一次贡献、一个问题或一场工作坊，都可以成为起点。探索项目，找到学习与贡献的空间。", contribute: "寻找项目", workshops: "查看工作坊安排" },
    hotReload: { eyebrow: "Crafter 的新聚会", body: "咖啡、代码与工作坊，让大家一起学习。Hot Reload 正在筹备中，后续活动将在日历中公布。", action: "关注活动公告" },
    makeables: { eyebrow: "由 Crafter 打造", title: "把社区的形象戴在身上。", body: "让胸牌、卡片和贴纸带上社区的个性。与智能体一起设计，带到下一次聚会。", action: "探索 Makeables" },
    history: "往期黑客松",
    impact: "查看 Petdex 的影响力",
  },
  ja: {
    paths: [
      { title: "プロジェクトに貢献する", body: "気になるツールを見つけ、issue、テスト、ドキュメントの改善から始めましょう。", action: "オープンソースを見る" },
      { title: "ワークショップで学ぶ", body: "仲間とつくり、質問を共有し、学んだことを次のプロジェクトへつなげます。", action: "カレンダーを見る" },
      { title: "集まりをつくる", body: "あなたのコミュニティや組織と、Crafter のイベント、ワークショップ、プロジェクトをつなぎましょう。", action: "協力のかたちを見る" },
      { title: "コミュニティのためのキット", body: "Makeables でバッジ、カード、ステッカーをデザイン。次の集まりに共通のアイデンティティを。", action: "Makeables を開く" },
    ],
    contact: { title: "まずは、会話から。", body: "つくっているもの、集めたい仲間、貢献したい分野を教えてください。コミュニティに参加して、Crafter の仲間に出会いましょう。", community: "コミュニティで話す", team: "チームを知る" },
    team: { eyebrow: "仲間とつくる", title: "一緒につくることから始めよう。", body: "ひとつの貢献、質問、ワークショップが始まりになります。プロジェクトを探して、学びと貢献の場を見つけましょう。", contribute: "プロジェクトを探す", workshops: "ワークショップの予定を見る" },
    hotReload: { eyebrow: "Crafter の新しい集まり", body: "コーヒー、コード、ワークショップで一緒に学ぶ。Hot Reload は準備中です。今後の開催案内はカレンダーでお知らせします。", action: "開催案内をフォロー" },
    makeables: { eyebrow: "Crafter がつくる", title: "コミュニティを、身につけよう。", body: "コミュニティらしさを、バッジやカード、ステッカーに。エージェントとデザインして、次の集まりへ。", action: "Makeables を見る" },
    history: "これまでのハッカソン",
    impact: "Petdex の成果を見る",
  },
}

const participationDestinations = ["/oss#contribute", "/events#calendar", "/events/sponsors", "https://makeables.dev"] as const

export function getParticipationPaths(locale: Locale) {
  return participationCopy[locale].paths.map((path, index) => ({
    ...path,
    href: participationDestinations[index],
  }))
}
