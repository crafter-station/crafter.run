import type { Locale } from "@/lib/i18n"

export const faqDestinations = {
  crafter: "/universe",
  open: "/oss",
  community: "https://crafters.chat",
  skills: "https://crafters.chat",
  contribute: "/oss",
  core: "/contact",
  areas: "/universe",
  events: "/events",
  ideas: "/oss#contribute",
  together: "/contact#collaborate",
} as const

type FaqItem = {
  id: keyof typeof faqDestinations
  question: string
  answer: string
  cta: string
}

type FaqCopy = {
  eyebrow: string
  title: string
  description: string
  items: FaqItem[]
}

export const faqCopy: Record<Locale, FaqCopy> = {
  es: {
    eyebrow: "Preguntas frecuentes",
    title: "Buenas preguntas.",
    description: "Sobre lo que hacemos, por qué lo hacemos y cómo encontrar tu lugar.",
    items: [
      { id: "crafter", question: "¿Qué es Crafter Station?", answer: "Un punto de encuentro para quienes quieren construir cosas con tecnología. Compartimos herramientas, proyectos y lo que aprendemos por el camino, desde Latinoamérica y con curiosidad por lo que viene.", cta: "Conoce nuestro universo" },
      { id: "open", question: "¿Por qué hacen open source?", answer: "Porque una herramienta puede servirle a mucha más gente cuando su código está abierto. Nos permite aprender de otros, recibir ideas que no habíamos considerado y devolver algo de lo que la comunidad nos ha dado.", cta: "Explora el código" },
      { id: "community", question: "¿Cómo puedo ser parte de la comunidad?", answer: "Entra a la conversación, preséntate y comparte algo que te dé curiosidad. Puedes venir con un proyecto, una pregunta o ganas de conocer a otras personas que también están construyendo.", cta: "Entra a la comunidad" },
      { id: "skills", question: "¿Tengo que saber programar para aportar?", answer: "Hay mucho por hacer además de escribir código: diseño, documentación, pruebas, traducciones o compartir una buena explicación. Empieza por lo que sabes y por lo que te gustaría aprender.", cta: "Encuentra con quién empezar" },
      { id: "contribute", question: "¿Cómo hago mi primera contribución?", answer: "Elige una herramienta que uses o te interese, lee su README y revisa los issues. Reportar un problema con claridad o mejorar un ejemplo ya es una buena contribución. Si quieres hacer un cambio grande, abre primero la conversación en el repositorio.", cta: "Encuentra un proyecto" },
      { id: "core", question: "¿Cómo puedo formar parte del core team?", answer: "Empieza por conocernos y construir con la comunidad. Si te interesa involucrarte más, cuéntanos qué estás haciendo, qué te gustaría aportar y en qué proyectos te ves colaborando. La mejor forma de empezar es conversar y hacer algo juntos.", cta: "Hablemos" },
      { id: "areas", question: "¿Qué son Research, Lab, Games y Station?", answer: "Cuatro organizaciones con una curiosidad compartida. Research investiga; Lab explora hardware y fabricación; Games crea juegos; Station conecta comunidad, código abierto y encuentros.", cta: "Explora las cuatro áreas" },
      { id: "events", question: "¿Dónde encuentro los próximos eventos?", answer: "En hack0, nuestro calendario en Luma. La agenda reúne meetups, hackathons y encuentros de la comunidad. Puedes explorar las próximas fechas, revisar los anteriores y suscribirte desde tu calendario.", cta: "Abre la agenda" },
      { id: "ideas", question: "Tengo una idea. ¿Dónde la comparto?", answer: "Busca el proyecto más cercano a tu idea y abre una issue: explica qué problema quieres resolver, para quién y qué has probado. Si todavía no sabes dónde encaja, compártela con la comunidad.", cta: "Propón una idea" },
      { id: "together", question: "¿Podemos trabajar juntos en un proyecto?", answer: "Podemos colaborar en proyectos abiertos, workshops y encuentros. Cuéntanos qué estás construyendo y qué te gustaría aportar para encontrar un primer paso juntos.", cta: "Cuéntanos tu proyecto" },
    ],
  },
  en: {
    eyebrow: "Frequently asked questions",
    title: "Good questions.",
    description: "What we make, why we make it, and where you fit in.",
    items: [
      { id: "crafter", question: "What is Crafter Station?", answer: "A meeting point for people who want to make things with technology. We share tools, projects, and what we learn along the way, from Latin America with curiosity about what comes next.", cta: "Meet our universe" },
      { id: "open", question: "Why do you build open source?", answer: "Because a tool can help many more people when its code is open. It lets us learn from others, hear ideas we had not considered, and give something back to the community we learn from.", cta: "Explore the code" },
      { id: "community", question: "How can I join the community?", answer: "Join the conversation, introduce yourself, and share something you are curious about. Bring a project, a question, or an interest in meeting other people who are making things.", cta: "Join the community" },
      { id: "skills", question: "Do I need to know how to code to contribute?", answer: "There is plenty to do beyond writing code: design, documentation, testing, translations, or sharing a clear explanation. Start with what you know and what you want to learn.", cta: "Find people to start with" },
      { id: "contribute", question: "How do I make my first contribution?", answer: "Choose a tool you use or find interesting, read its README, and look through the issues. A clear bug report or a better example is already a useful contribution. For a bigger change, start a conversation in the repository first.", cta: "Find a project" },
      { id: "core", question: "How can I become part of the core team?", answer: "Start by getting to know us and building with the community. If you want to get more involved, tell us what you are working on, what you would like to contribute, and which projects interest you. A conversation and something we can make together are a good place to start.", cta: "Let's talk" },
      { id: "areas", question: "What are Research, Lab, Games, and Station?", answer: "Four organizations with a shared curiosity. Research investigates; Lab explores hardware and fabrication; Games creates games; Station connects community, open source, and gatherings.", cta: "Explore the four areas" },
      { id: "events", question: "Where can I find upcoming events?", answer: "On hack0, our Luma calendar. The agenda brings together community meetups, hackathons, and gatherings. Explore upcoming dates, browse previous events, or subscribe through your calendar app.", cta: "Open the calendar" },
      { id: "ideas", question: "I have an idea. Where can I share it?", answer: "Find the project closest to your idea and open an issue: explain the problem, who it affects, and what you have tried. If you are unsure where it belongs, share it with the community.", cta: "Suggest an idea" },
      { id: "together", question: "Can we work together on a project?", answer: "We can collaborate on open projects, workshops, and gatherings. Tell us what you are building and how you would like to contribute so we can find a first step together.", cta: "Tell us about your project" },
    ],
  },
  pt: {
    eyebrow: "Perguntas frequentes",
    title: "Boas perguntas.",
    description: "O que fazemos, por que fazemos e onde você pode participar.",
    items: [
      { id: "crafter", question: "O que é a Crafter Station?", answer: "Um ponto de encontro para quem quer criar com tecnologia. Compartilhamos ferramentas, projetos e o que aprendemos pelo caminho, da América Latina e com curiosidade pelo que vem a seguir.", cta: "Conheça nosso universo" },
      { id: "open", question: "Por que vocês fazem open source?", answer: "Porque uma ferramenta pode ajudar muito mais gente quando seu código é aberto. Podemos aprender com outras pessoas, receber ideias que não tínhamos considerado e retribuir um pouco do que a comunidade nos deu.", cta: "Explore o código" },
      { id: "community", question: "Como posso participar da comunidade?", answer: "Entre na conversa, apresente-se e compartilhe algo que desperte sua curiosidade. Traga um projeto, uma pergunta ou vontade de conhecer outras pessoas que também estão criando.", cta: "Entre na comunidade" },
      { id: "skills", question: "Preciso saber programar para contribuir?", answer: "Há muito a fazer além de escrever código: design, documentação, testes, traduções ou uma boa explicação. Comece pelo que você sabe e pelo que gostaria de aprender.", cta: "Encontre com quem começar" },
      { id: "contribute", question: "Como faço minha primeira contribuição?", answer: "Escolha uma ferramenta que usa ou que desperte seu interesse, leia o README e veja as issues. Relatar um problema com clareza ou melhorar um exemplo já é uma contribuição. Para uma mudança maior, abra primeiro uma conversa no repositório.", cta: "Encontre um projeto" },
      { id: "core", question: "Como posso fazer parte do core team?", answer: "Comece conhecendo a gente e construindo com a comunidade. Se quiser se envolver mais, conte o que está fazendo, como gostaria de contribuir e em quais projetos se imagina colaborando. Conversar e criar algo juntos é um bom começo.", cta: "Vamos conversar" },
      { id: "areas", question: "O que são Research, Lab, Games e Station?", answer: "Quatro organizações com uma curiosidade compartilhada. Research pesquisa; Lab explora hardware e fabricação; Games cria jogos; Station conecta comunidade, código aberto e encontros.", cta: "Explore as quatro áreas" },
      { id: "events", question: "Onde encontro os próximos eventos?", answer: "No hack0, nosso calendário no Luma. A agenda reúne meetups, hackathons e encontros da comunidade. Veja as próximas datas, explore os eventos anteriores ou assine pelo seu aplicativo de calendário.", cta: "Abra a agenda" },
      { id: "ideas", question: "Tenho uma ideia. Onde posso compartilhar?", answer: "Encontre o projeto mais próximo da sua ideia e abra uma issue: explique o problema, para quem e o que já tentou. Se não souber onde ela se encaixa, compartilhe com a comunidade.", cta: "Proponha uma ideia" },
      { id: "together", question: "Podemos trabalhar juntos em um projeto?", answer: "Podemos colaborar em projetos abertos, workshops e encontros. Conte o que está construindo e como gostaria de contribuir para encontrarmos um primeiro passo juntos.", cta: "Conte sobre seu projeto" },
    ],
  },
  zh: {
    eyebrow: "常见问题",
    title: "好问题，聊一聊。",
    description: "我们在做什么、为什么做，以及你可以如何参与。",
    items: [
      { id: "crafter", question: "Crafter Station 是什么？", answer: "这里汇聚了想用技术创造事物的人。我们从拉丁美洲出发，分享工具、项目和一路学到的东西，也对接下来会发生什么充满好奇。", cta: "认识我们的世界" },
      { id: "open", question: "为什么做开源？", answer: "工具的代码开放后，就有机会帮助更多人。我们可以向他人学习，听到未曾想到的点子，也把从社区获得的帮助传递下去。", cta: "探索代码" },
      { id: "community", question: "如何加入社区？", answer: "加入讨论，介绍一下自己，分享让你好奇的事情。可以带着项目、问题，或只是想认识同样在创造的人。", cta: "加入社区" },
      { id: "skills", question: "不会编程也能参与吗？", answer: "当然有代码之外的贡献方式：设计、文档、测试、翻译，或把一个概念解释清楚。从你会的事情和想学的事情开始。", cta: "找到一起开始的伙伴" },
      { id: "contribute", question: "如何做出第一次贡献？", answer: "选一个你正在使用或感兴趣的工具，阅读 README 和 issues。清楚地报告问题、改进示例，都是有用的贡献。计划较大的改动时，先在仓库里展开讨论。", cta: "找到一个项目" },
      { id: "core", question: "如何成为核心团队的一员？", answer: "先认识彼此，和社区一起动手做东西。如果想更深入地参与，告诉我们你正在做什么、希望贡献什么，以及对哪些项目感兴趣。从一次交流、一次合作开始。", cta: "和我们聊聊" },
      { id: "areas", question: "Research、Lab、Games 和 Station 分别是什么？", answer: "四个组织，共同的好奇心。Research 开展研究，Lab 探索硬件与制造，Games 创造游戏，Station 连接社区、开源与聚会。", cta: "探索四个方向" },
      { id: "events", question: "在哪里查看即将举行的活动？", answer: "查看 hack0，我们在 Luma 上的日历。这里汇集社区聚会、黑客松和交流活动。你可以浏览未来日期、查看往期活动，也可以用日历应用订阅。", cta: "打开活动日历" },
      { id: "ideas", question: "有了想法，可以在哪里分享？", answer: "找到最接近你想法的项目并提交 issue，说明要解决的问题、服务的人群和已经尝试的方法。如果不确定适合哪个项目，可以先与社区分享。", cta: "提出一个想法" },
      { id: "together", question: "可以邀请你们一起做项目吗？", answer: "我们可以在开放项目、工作坊和活动中合作。告诉我们你在构建什么、希望贡献什么，一起找到第一步。", cta: "聊聊你的项目" },
    ],
  },
  ja: {
    eyebrow: "よくある質問",
    title: "いい質問から。",
    description: "何を、なぜつくるのか。そして、どう参加できるのか。",
    items: [
      { id: "crafter", question: "Crafter Station とは？", answer: "テクノロジーで何かをつくりたい人が出会う場所です。ラテンアメリカから、ツールやプロジェクト、学んだことを共有し、次に何ができるかを探っています。", cta: "Crafter の世界を知る" },
      { id: "open", question: "なぜオープンソースをつくるのですか？", answer: "コードを公開すると、ツールがより多くの人の役に立つからです。ほかの人から学び、思いつかなかったアイデアに出会い、コミュニティから得たものを少しずつ返していけます。", cta: "コードを見る" },
      { id: "community", question: "コミュニティにはどう参加できますか？", answer: "会話に加わり、自己紹介と気になっていることを聞かせてください。プロジェクトでも質問でも、ものをつくる仲間に会ってみたいという気持ちだけでも。", cta: "コミュニティに参加" },
      { id: "skills", question: "プログラミングができなくても貢献できますか？", answer: "コード以外にも、デザイン、ドキュメント、テスト、翻訳、わかりやすい説明など、できることはたくさんあります。得意なことや学びたいことから始めてください。", cta: "一緒に始める仲間を探す" },
      { id: "contribute", question: "最初のコントリビューションは何から？", answer: "使っているツールや気になるツールを選び、README と issue を読んでみてください。わかりやすい不具合報告やサンプルの改善も立派な貢献です。大きな変更は、先にリポジトリで相談しましょう。", cta: "プロジェクトを探す" },
      { id: "core", question: "コアチームにはどうすれば参加できますか？", answer: "まずはお互いを知り、コミュニティで一緒につくってみましょう。もっと関わりたいと思ったら、今取り組んでいること、貢献したいこと、気になるプロジェクトを聞かせてください。会話と小さな共同制作から始められます。", cta: "話してみる" },
      { id: "areas", question: "Research、Lab、Games、Station の違いは？", answer: "好奇心を共有する四つの組織です。Research は研究し、Lab はハードウェアと製作を探求し、Games はゲームをつくり、Station はコミュニティ、オープンソース、集まりをつなぎます。", cta: "四つの領域を見る" },
      { id: "events", question: "今後のイベントはどこで見られますか？", answer: "Luma のカレンダー hack0 で確認できます。コミュニティのミートアップやハッカソン、交流イベントをまとめています。今後の日程や過去のイベントを見たり、カレンダーアプリから購読したりできます。", cta: "カレンダーを開く" },
      { id: "ideas", question: "アイデアはどこで共有できますか？", answer: "アイデアに近いプロジェクトを見つけ、issue を開いてください。誰のどんな問題を解決したいか、何を試したかを伝えましょう。迷ったらコミュニティで相談できます。", cta: "アイデアを提案" },
      { id: "together", question: "プロジェクトで一緒に働けますか？", answer: "オープンなプロジェクト、ワークショップ、イベントで協力できます。つくっているものや貢献したいことを教えてください。一緒に最初の一歩を見つけましょう。", cta: "プロジェクトを相談" },
    ],
  },
}
