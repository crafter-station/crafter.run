import type { Locale } from "@/lib/i18n"
import type { NetworkArea } from "@/lib/network"

type AreaCopy = {
  verb: string
  title: string
  body: string
  topics: string
  primary: string
  secondary?: string
}

type UniverseCopy = {
  name: string
  title: [string, string]
  eyebrow: string
  intro: string
  description: string
  mapLabel: string
  mapNote: string
  directory: string
  areas: Record<NetworkArea, AreaCopy>
  stationLinks: [string, string, string]
  starting: {
    eyebrow: string
    title: string
    body: string
    paths: [StartingPath, StartingPath, StartingPath]
  }
}

type StartingPath = { label: string; title: string; body: string; action: string }

export const universeCopy: Record<Locale, UniverseCopy> = {
  es: {
    name: "Universo Crafter",
    title: ["Universo", "Crafter"],
    eyebrow: "Una misma chispa. Cuatro direcciones.",
    intro: "Hay preguntas que se investigan, ideas que se prueban y mundos que se juegan. Todo empieza con la misma curiosidad.",
    description: "Explora Research, Lab, Games y Station: las cuatro áreas de Crafter y sus caminos hacia la investigación, los experimentos, los juegos y la comunidad.",
    mapLabel: "Explorar las áreas de Crafter",
    mapNote: "Elige una dirección. Encuentra tu punto de partida.",
    directory: "Dentro del universo",
    areas: {
      research: {
        verb: "Investigar",
        title: "Seguir las buenas preguntas.",
        body: "Preguntas abiertas sobre IA, agentes y nuevas formas de hacer ingeniería. Investigamos, experimentamos y compartimos lo que aprendemos.",
        topics: "IA · Agentes · Ingeniería",
        primary: "Explorar Research",
        secondary: "Repositorios de Research",
      },
      lab: {
        verb: "Fabricar",
        title: "Ideas que toman forma física.",
        body: "Hardware, fabricación y prototipos físicos. Exploramos cómo conectar el código con objetos que podemos construir, tocar y probar.",
        topics: "Hardware · Fabricación · Prototipos",
        primary: "Entrar al Lab",
        secondary: "Todo el código abierto",
      },
      games: {
        verb: "Jugar",
        title: "La curiosidad también juega.",
        body: "Mundos por imaginar y mecánicas por descubrir. Exploramos lo que hace divertida una experiencia, creando con tecnología y ganas de jugar.",
        topics: "Mundos · Mecánicas · Juego",
        primary: "Explorar Games",
      },
      station: {
        verb: "Conectar",
        title: "Construir se disfruta en compañía.",
        body: "Station conecta a quienes hacen cosas. Encuentra una conversación, participa en un encuentro o comparte lo que estás construyendo.",
        topics: "Comunidad · Encuentros · Ships",
        primary: "Entrar a la comunidad",
      },
    },
    stationLinks: ["Encontrar un encuentro", "Explorar los Ships", "Conocer a los crafters"],
    starting: {
      eyebrow: "Tu punto de partida",
      title: "No hace falta elegir una sola.",
      body: "Una pregunta puede convertirse en un experimento, un juego o una conversación. Empieza por lo que te dé curiosidad.",
      paths: [
        { label: "Para aprender", title: "Sigue una idea.", body: "Notas, decisiones y aprendizajes de lo que vamos construyendo.", action: "Leer el Journal" },
        { label: "Para contribuir", title: "Abre un proyecto.", body: "Explora el código, prueba una herramienta y encuentra dónde aportar.", action: "Explorar código abierto" },
        { label: "Para compartir", title: "Muestra lo que haces.", body: "Descubre los proyectos de la comunidad y comparte el tuyo.", action: "Explorar los Ships" },
      ],
    },
  },
  en: {
    name: "Crafter Universe",
    title: ["Crafter", "Universe"],
    eyebrow: "One spark. Four directions.",
    intro: "Some questions invite research, some ideas need a prototype, and some worlds are made to play in. They all start with curiosity.",
    description: "Explore Research, Lab, Games, and Station: the four areas of Crafter, with paths into research, experiments, games, and community.",
    mapLabel: "Explore the Crafter areas",
    mapNote: "Choose a direction. Find your starting point.",
    directory: "Inside the universe",
    areas: {
      research: {
        verb: "Investigate",
        title: "Follow the good questions.",
        body: "Open questions about AI, agents, and new ways to engineer. We research, experiment, and share what we learn.",
        topics: "AI · Agents · Engineering",
        primary: "Explore Research",
        secondary: "Research repositories",
      },
      lab: {
        verb: "Make",
        title: "Ideas that take physical shape.",
        body: "Hardware, fabrication, and physical prototypes. We explore how code connects with objects we can build, touch, and test.",
        topics: "Hardware · Fabrication · Prototypes",
        primary: "Enter the Lab",
        secondary: "All our open source",
      },
      games: {
        verb: "Play",
        title: "Curiosity plays, too.",
        body: "Worlds to imagine and mechanics to discover. We explore what makes an experience fun, creating with technology and a sense of play.",
        topics: "Worlds · Mechanics · Play",
        primary: "Explore Games",
      },
      station: {
        verb: "Connect",
        title: "Building is better with company.",
        body: "Station connects people who make things. Find a conversation, join a gathering, or share what you are building.",
        topics: "Community · Gatherings · Ships",
        primary: "Join the community",
      },
    },
    stationLinks: ["Find a gathering", "Explore Ships", "Meet the crafters"],
    starting: {
      eyebrow: "Your starting point",
      title: "You don't have to pick just one.",
      body: "A question can become an experiment, a game, or a conversation. Start with whatever makes you curious.",
      paths: [
        { label: "To learn", title: "Follow an idea.", body: "Notes, decisions, and lessons from the things we're building.", action: "Read the Journal" },
        { label: "To contribute", title: "Open a project.", body: "Explore the code, try a tool, and find a place to contribute.", action: "Explore open source" },
        { label: "To share", title: "Show what you make.", body: "Discover community projects and share your own.", action: "Explore Ships" },
      ],
    },
  },
  pt: {
    name: "Universo Crafter",
    title: ["Universo", "Crafter"],
    eyebrow: "Uma mesma faísca. Quatro direções.",
    intro: "Há perguntas para pesquisar, ideias para testar e mundos para jogar. Tudo começa com a mesma curiosidade.",
    description: "Explore Research, Lab, Games e Station: as quatro áreas da Crafter e seus caminhos para pesquisa, experimentos, jogos e comunidade.",
    mapLabel: "Explorar as áreas da Crafter",
    mapNote: "Escolha uma direção. Encontre seu ponto de partida.",
    directory: "Dentro do universo",
    areas: {
      research: {
        verb: "Pesquisar",
        title: "Seguir as boas perguntas.",
        body: "Perguntas abertas sobre IA, agentes e novas formas de fazer engenharia. Pesquisamos, experimentamos e compartilhamos o que aprendemos.",
        topics: "IA · Agentes · Engenharia",
        primary: "Explorar Research",
        secondary: "Repositórios de Research",
      },
      lab: {
        verb: "Fabricar",
        title: "Ideias que ganham forma física.",
        body: "Hardware, fabricação e protótipos físicos. Exploramos como conectar código a objetos que podemos construir, tocar e testar.",
        topics: "Hardware · Fabricação · Protótipos",
        primary: "Entrar no Lab",
        secondary: "Todo o código aberto",
      },
      games: {
        verb: "Jogar",
        title: "A curiosidade também brinca.",
        body: "Mundos para imaginar e mecânicas para descobrir. Exploramos o que torna uma experiência divertida, criando com tecnologia e vontade de brincar.",
        topics: "Mundos · Mecânicas · Jogos",
        primary: "Explorar Games",
      },
      station: {
        verb: "Conectar",
        title: "Construir é melhor em companhia.",
        body: "Station conecta quem faz acontecer. Encontre uma conversa, participe de um encontro ou compartilhe o que está construindo.",
        topics: "Comunidade · Encontros · Ships",
        primary: "Entrar na comunidade",
      },
    },
    stationLinks: ["Encontrar um encontro", "Explorar os Ships", "Conhecer os crafters"],
    starting: {
      eyebrow: "Seu ponto de partida",
      title: "Não precisa escolher só uma.",
      body: "Uma pergunta pode virar um experimento, um jogo ou uma conversa. Comece pelo que despertar sua curiosidade.",
      paths: [
        { label: "Para aprender", title: "Siga uma ideia.", body: "Notas, decisões e aprendizados do que estamos construindo.", action: "Ler o Journal" },
        { label: "Para contribuir", title: "Abra um projeto.", body: "Explore o código, teste uma ferramenta e encontre onde contribuir.", action: "Explorar código aberto" },
        { label: "Para compartilhar", title: "Mostre o que faz.", body: "Descubra os projetos da comunidade e compartilhe o seu.", action: "Explorar os Ships" },
      ],
    },
  },
  zh: {
    name: "Crafter 宇宙",
    title: ["Crafter", "宇宙"],
    eyebrow: "同一份好奇，四个方向。",
    intro: "有些问题值得研究，有些想法需要动手尝试，有些世界是为游戏而生。一切都从好奇心开始。",
    description: "探索 Crafter 的四个领域：Research、Lab、Games 和 Station，找到通往研究、实验、游戏与社区的入口。",
    mapLabel: "探索 Crafter 的四个领域",
    mapNote: "选择一个方向，找到你的起点。",
    directory: "走进这个宇宙",
    areas: {
      research: {
        verb: "研究",
        title: "沿着好问题走下去。",
        body: "关于 AI、智能体与新工程方法的开放问题。我们研究、实验，并分享从中学到的东西。",
        topics: "AI · 智能体 · 工程",
        primary: "探索 Research",
        secondary: "Research 代码仓库",
      },
      lab: {
        verb: "制造",
        title: "让想法变成实体。",
        body: "硬件、制造与实体原型。我们探索如何将代码与可以构建、触摸和测试的物体连接起来。",
        topics: "硬件 · 制造 · 原型",
        primary: "走进 Lab",
        secondary: "所有开源项目",
      },
      games: {
        verb: "游戏",
        title: "好奇心也爱玩。",
        body: "想象世界，发现玩法。带着技术与玩心去创造，探索怎样让体验变得有趣。",
        topics: "世界 · 玩法 · 游戏",
        primary: "探索 Games",
      },
      station: {
        verb: "连接",
        title: "一起构建，更有乐趣。",
        body: "Station 连接动手创造的人。加入一次对话、参加一场活动，或分享你正在构建的作品。",
        topics: "社区 · 聚会 · 作品",
        primary: "加入社区",
      },
    },
    stationLinks: ["发现聚会", "探索社区作品", "认识 crafters"],
    starting: {
      eyebrow: "你的起点",
      title: "不必只选一个方向。",
      body: "一个问题，可以变成一次实验、一款游戏或一场对话。从让你好奇的地方开始。",
      paths: [
        { label: "学习", title: "跟随一个想法。", body: "记录我们构建过程中的笔记、选择与收获。", action: "阅读 Journal" },
        { label: "贡献", title: "打开一个项目。", body: "探索代码，试用工具，找到适合你的贡献方式。", action: "探索开源项目" },
        { label: "分享", title: "展示你的作品。", body: "发现社区项目，也分享你正在构建的东西。", action: "探索 Ships" },
      ],
    },
  },
  ja: {
    name: "Crafter の世界",
    title: ["Crafter", "の世界"],
    eyebrow: "ひとつの好奇心。4つの方向。",
    intro: "研究したくなる問い、試したくなるアイデア、遊びたくなる世界。すべては同じ好奇心から始まります。",
    description: "Crafter の4つの領域、Research、Lab、Games、Station。研究、実験、ゲーム、コミュニティへの入り口を見つけましょう。",
    mapLabel: "Crafter の領域を探す",
    mapNote: "方向を選んで、自分の出発点を見つけよう。",
    directory: "この世界の中へ",
    areas: {
      research: {
        verb: "探究する",
        title: "よい問いを追いかける。",
        body: "AI、エージェント、新しいエンジニアリングへの問い。研究し、実験し、学んだことを分かち合います。",
        topics: "AI · エージェント · エンジニアリング",
        primary: "Research を見る",
        secondary: "Research のリポジトリ",
      },
      lab: {
        verb: "つくる",
        title: "アイデアを、触れられるかたちに。",
        body: "ハードウェア、製作、実物のプロトタイプ。つくり、触れ、試せるものとコードをつなぐ方法を探ります。",
        topics: "ハードウェア · 製作 · プロトタイプ",
        primary: "Lab に入る",
        secondary: "すべてのオープンソース",
      },
      games: {
        verb: "遊ぶ",
        title: "好奇心は、遊びにも。",
        body: "世界を想像し、遊び方を発見する。テクノロジーと遊び心でつくりながら、体験を面白くするものを探ります。",
        topics: "世界 · 仕組み · 遊び",
        primary: "Games を見る",
      },
      station: {
        verb: "つながる",
        title: "仲間とつくると、もっと楽しい。",
        body: "Station は、ものをつくる人をつなぎます。会話に加わる、集まりに参加する、いまつくっているものを共有する。",
        topics: "コミュニティ · 集まり · 作品",
        primary: "コミュニティに参加",
      },
    },
    stationLinks: ["集まりを探す", "Ships を見る", "crafters に出会う"],
    starting: {
      eyebrow: "あなたの出発点",
      title: "ひとつに決めなくてもいい。",
      body: "問いが実験になり、ゲームになり、会話になる。気になるところから始めてみよう。",
      paths: [
        { label: "学びたい", title: "アイデアを追いかける。", body: "つくる過程でのノート、判断、学びを読む。", action: "Journal を読む" },
        { label: "参加したい", title: "プロジェクトを開く。", body: "コードを読み、ツールを試し、自分が貢献できる場所を探す。", action: "オープンソースを見る" },
        { label: "共有したい", title: "つくったものを見せる。", body: "コミュニティの作品に出会い、自分の作品も共有する。", action: "Ships を見る" },
      ],
    },
  },
}
