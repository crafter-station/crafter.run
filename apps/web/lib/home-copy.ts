import type { Locale } from "@/lib/i18n"

type HomeCopy = {
  events: string; eventsBody: string; calendar: string; sponsor: string
  brew: string; ship: string; people: string; peopleTitle: string
  peopleBody: string; peopleNote: string; meetTeam: string; join: string
  journal: string; journalTitle: string; allPosts: string; explore: string
  journalNote: string; contactLabel: string; contactTitle: string
  contactBody: string; contactNote: string
  community: string; ships: string; docs: string; workWithUs: string
}

export const homeCopy: Record<Locale, HomeCopy> = {
  es: {
    events: "Pantallas abajo.\nIdeas arriba.",
    eventsBody: "A veces, el siguiente paso de un proyecto es conocer a alguien.",
    calendar: "Ver próximos encuentros", sponsor: "Organiza algo con nosotros",
    brew: "Café, código\ny una buena charla.", ship: "Una idea.\nUna tripulación.\nA construir.",
    people: "La gente detrás", peopleTitle: "Aquí siempre\ncabe alguien más.",
    peopleBody: "Ven con una idea, una pregunta o algo a medio hacer. Nos gusta compartir lo que aprendemos y conocer a quienes están construyendo.",
    peopleNote: "Las conversaciones también son parte del proceso.",
    meetTeam: "Conoce al equipo", join: "Entra a la comunidad",
    journal: "Notas del taller", journalTitle: "Aprender.\nCompartir.\nVolver a hacer.",
    allPosts: "Leer el blog", explore: "Sigue tu curiosidad",
    journalNote: "Ideas que vale la pena dejar por escrito.",
    contactLabel: "El siguiente capítulo", contactTitle: "Lo siguiente\nlo hacemos\njuntos.",
    contactBody: "Un proyecto, un encuentro, una idea a medio hacer. Hay muchas maneras de empezar una conversación.",
    contactNote: "Toda buena idea necesita con quién compartirla.",
    community: "Comunidad", ships: "Lo que estamos lanzando", docs: "Documentación", workWithUs: "Colaborar",
  },
  en: {
    events: "Screens down.\nIdeas up.",
    eventsBody: "Sometimes, the next step for a project is meeting someone.",
    calendar: "See upcoming gatherings", sponsor: "Host something with us",
    brew: "Coffee, code,\nand a good conversation.", ship: "One idea.\nOne crew.\nLet’s build.",
    people: "The people behind it", peopleTitle: "There’s always\nroom for one more.",
    peopleBody: "Bring an idea, a question, or something half finished. We like sharing what we learn and meeting people who are making things.",
    peopleNote: "Conversations are part of the process, too.",
    meetTeam: "Meet the team", join: "Join the community",
    journal: "Workbench notes", journalTitle: "Learn.\nShare.\nMake again.",
    allPosts: "Read the blog", explore: "Follow your curiosity",
    journalNote: "Ideas worth putting into words.",
    contactLabel: "The next chapter", contactTitle: "The next thing,\nwe make\ntogether.",
    contactBody: "A project, a gathering, an idea still taking shape. There are plenty of ways to start a conversation.",
    contactNote: "Every good idea needs someone to share it with.",
    community: "Community", ships: "What we’re shipping", docs: "Documentation", workWithUs: "Collaborate",
  },
  pt: {
    events: "Telas de lado.\nIdeias em alta.",
    eventsBody: "Às vezes, o próximo passo de um projeto é conhecer alguém.",
    calendar: "Ver próximos encontros", sponsor: "Organize algo com a gente",
    brew: "Café, código\ne uma boa conversa.", ship: "Uma ideia.\nUma equipe.\nVamos construir.",
    people: "Quem faz acontecer", peopleTitle: "Sempre cabe\nmais alguém.",
    peopleBody: "Traga uma ideia, uma pergunta ou algo pela metade. Gostamos de compartilhar o que aprendemos e conhecer quem está criando.",
    peopleNote: "As conversas também fazem parte do processo.",
    meetTeam: "Conheça a equipe", join: "Entre na comunidade",
    journal: "Notas da oficina", journalTitle: "Aprender.\nCompartilhar.\nCriar de novo.",
    allPosts: "Ler o blog", explore: "Siga sua curiosidade",
    journalNote: "Ideias que merecem ficar no papel.",
    contactLabel: "O próximo capítulo", contactTitle: "O próximo passo,\na gente dá\njunto.",
    contactBody: "Um projeto, um encontro, uma ideia pela metade. Há muitas maneiras de começar uma conversa.",
    contactNote: "Toda boa ideia precisa de alguém para compartilhar.",
    community: "Comunidade", ships: "O que estamos lançando", docs: "Documentação", workWithUs: "Colaborar",
  },
  zh: {
    events: "放下屏幕。\n点亮想法。",
    eventsBody: "有时，项目的下一步，是遇见一个人。",
    calendar: "查看即将举行的活动", sponsor: "一起举办活动",
    brew: "咖啡、代码，\n聊点有趣的。", ship: "一个想法。\n一支团队。\n开始创造。",
    people: "背后的伙伴", peopleTitle: "这里总有\n你的位置。",
    peopleBody: "带上一个想法、一个问题，或一个未完成的作品。我们乐于分享所学，也想认识正在创造的人。",
    peopleNote: "交流，也是创造的一部分。",
    meetTeam: "认识团队", join: "加入社区",
    journal: "工作台笔记", journalTitle: "学习。\n分享。\n再次创造。",
    allPosts: "阅读博客", explore: "跟随你的好奇心",
    journalNote: "值得写下来的想法。",
    contactLabel: "下一章", contactTitle: "下一件事，\n我们一起\n创造。",
    contactBody: "一个项目、一次相聚、一个还在成形的想法。开启对话的方式，有很多。",
    contactNote: "每个好想法，都值得与人分享。",
    community: "社区", ships: "正在发布的作品", docs: "文档", workWithUs: "一起合作",
  },
  ja: {
    events: "画面を閉じて。\nアイデアを広げて。",
    eventsBody: "プロジェクトの次の一歩は、誰かとの出会いかもしれません。",
    calendar: "今後のイベントを見る", sponsor: "一緒にイベントを開こう",
    brew: "コーヒーとコード、\nそしていい会話。", ship: "ひとつのアイデア。\nひとつのチーム。\nさあ、つくろう。",
    people: "つくる仲間たち", peopleTitle: "あなたの居場所も、\nここにある。",
    peopleBody: "アイデアでも、質問でも、つくりかけのものでも。学んだことを分かち合い、つくる人たちと出会いたい。",
    peopleNote: "会話も、つくるプロセスの一部。",
    meetTeam: "チームを知る", join: "コミュニティに参加",
    journal: "ワークベンチノート", journalTitle: "学ぶ。\n共有する。\nまたつくる。",
    allPosts: "ブログを読む", explore: "好奇心のままに",
    journalNote: "書き残しておきたいアイデア。",
    contactLabel: "次の章へ", contactTitle: "次の何かを、\n一緒に\nつくろう。",
    contactBody: "プロジェクト、集まり、まだ途中のアイデア。会話のきっかけは、いろいろあります。",
    contactNote: "いいアイデアは、誰かと分かち合いたい。",
    community: "コミュニティ", ships: "リリースしたもの", docs: "ドキュメント", workWithUs: "協力する",
  },
}
