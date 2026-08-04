import type { Locale } from "@/lib/i18n"

export type TeamMember = {
  username: string
  name: string
  role: string
  location?: string
  image: string
  bio: Record<Locale, string>
  skills: string[]
  github?: string
  linkedin?: string
  x?: string
  instagram?: string
  website?: string
  email?: string
  projects?: (string | { name: string; url: string })[]
  joinedYear?: number
  cal?: string
  listening?: {
    title: string
    artist: string
    cover?: string
    url?: string
  }
  timezone?: string
  clubs?: { icon: string; label: string }[]
  currently?: { label: string; value: string }[]
  stack?: { category: string; items: (string | { name: string; detail?: string })[] }[]
  software?: { category: string; items: (string | { name: string; detail?: string })[] }[]
  hardware?: { category: string; items: (string | { name: string; detail?: string })[] }[]
}

export const teamMembers: TeamMember[] = [
  {
    username: "shiara",
    name: "Shiara Arauzo",
    role: "Design Engineer",
    location: "Lima, Peru",
    timezone: "America/Lima",
    image: "/team/shiara.png",
    bio: {
      en: "Name it and I'll learn it. Design engineer building across web, videogames and research. Building products where neuroscience meets user experience. Founder of Glitch Girls and organizer of #SheShips, empowering women across LATAM to build and ship.",
      es: "Nombralo y lo aprendere. Ingeniera de diseno construyendo en web, videojuegos e investigacion. Construyendo productos donde la neurociencia se encuentra con la experiencia de usuario. Fundadora de Glitch Girls y organizadora de #SheShips, empoderando a mujeres en LATAM para construir y hacer ship.",
      pt: "Diga o nome e eu aprenderei. Engenheira de design construindo na web, videogames e pesquisa. Construindo produtos onde a neurociencia encontra a experiencia do usuario. Fundadora do Glitch Girls e organizadora do #SheShips, empoderando mulheres no LATAM para construir e fazer ship.",
      zh: "说出名字，我就能学会。设计工程师，横跨 Web、游戏和研究领域。打造让神经科学与用户体验相遇的产品。Glitch Girls 创始人、#SheShips 组织者，助力拉美女性去构建和 ship。",
      ja: "名前を挙げてくれれば、なんでも学びます。Web、ゲーム、リサーチを横断するデザインエンジニア。神経科学とユーザー体験が交わるプロダクトを作っています。Glitch Girls の創設者、#SheShips のオーガナイザーとして、LATAM の女性たちが作ってシップすることを後押ししています。",
    },
    skills: ["UI/UX Design", "React", "Figma", "TypeScript", "Astro", "Accessibility"],
    github: "https://github.com/shiarauzo",
    linkedin: "https://www.linkedin.com/in/shiara-arauzo/",
    x: "https://x.com/shiarauzo",
    instagram: "https://www.instagram.com/shiaraarauzo/",
    website: "https://shiara.design",
    projects: [
      { name: "essalud-cli", url: "https://www.npmjs.com/package/essalud-cli" },
      { name: "sheships", url: "https://sheships.org" },
      "Rubik Cube 3D",
      { name: "legalize-pe", url: "https://legalize-pe.crafter.ing/" },
      "Book Flip",
      "Halftone App",
      "Math Functions",
    ],
    cal: "https://cal.com/shiara-arauzo/30-min",
    joinedYear: 2024,
    listening: {
      title: "Sunflower",
      artist: "Post Malone, Swae Lee",
      cover: "/music/shiara.jpg",
      url: "https://www.youtube.com/watch?v=ApXoWvfEYVU&list=RDApXoWvfEYVU&start_radio=1",
    },
    clubs: [
      { icon: "🎮", label: "Gaming" },
      { icon: "🎨", label: "Design" },
      { icon: "🧠", label: "Neuroscience" },
      { icon: "🎵", label: "Music" },
      { icon: "☕", label: "Coffee" },
    ],
    currently: [
      { label: "building", value: "legalize-pe" },
      { label: "learning", value: "Arduino, C" },
      { label: "playing", value: "Spider-Man: Miles Morales" },
      { label: "obsessed with", value: "neuroscience + UX" },
    ],
    stack: [
      { category: "Languages", items: ["TypeScript", "JavaScript", "GDScript", "C"] },
      { category: "Frontend", items: ["React JS", "Next.js", "Tailwind", "HTML5", "CSS3", "Three.js", "WebGL"] },
      { category: "Backend", items: ["Clerk"] },
      { category: "AI", items: ["Claude Code", "v0"] },
      { category: "DevOps & Cloud", items: ["Vercel", "Supabase", "Trigger", "Neon", "Firecrawl", "GitHub Actions"] },
      { category: "Design", items: ["Figma", "Aseprite", "Blender", "Krita"] },
      { category: "Game", items: ["Godot", "Unity"] },
    ],
    software: [
      {
        category: "Editor & Terminal",
        items: [
          { name: "Zed", detail: "Code editor" },
          "Cursor",
          { name: "Claude", detail: "AI IDE" },
          { name: "Ghostty", detail: "Default terminal" },
          "Xcode",
        ],
      },
      {
        category: "Productivity",
        items: [
          "Granola",
          "Maca",
          "Linear",
          { name: "Obsidian", detail: "Second brain, notes & learning" },
          { name: "Übersicht", detail: "macOS desktop widgets" },
          "Google Calendar",
        ],
      },
      { category: "Media", items: ["DaVinci Resolve", "Screen Studio"] },
      { category: "Communication", items: ["Discord", "WhatsApp"] },
      { category: "Browser", items: ["DuckDuckGo", "Comet"] },
    ],
    hardware: [
      {
        category: "Computers",
        items: [
          { name: "MacBook Pro M4" },
          { name: "Redmi Note 13 Pro+", detail: "200MP camera" },
          { name: "Samsung Galaxy Tab S9 FE", detail: "SM-X510, Android 16" },
        ],
      },
      {
        category: "Audio & Video",
        items: [
          { name: "Meta Ray-Ban", detail: "Smart glasses, Classic Black" },
          { name: "AirPods Pro", detail: "Noise cancellation" },
        ],
      },
      {
        category: "Accessories",
        items: [
          { name: "Arduino UNO R3 WiFi", detail: "Robotics" },
          { name: "ESP32 DevKit", detail: "IoT microcontroller" },
        ],
      },
    ],
  },
  {
    username: "railly",
    name: "Railly Hugo",
    role: "Founder",
    location: "Buenos Aires, Argentina",
    timezone: "America/Argentina/Buenos_Aires",
    image: "/team/railly.png",
    bio: {
      en: "Peruvian software engineer based in Buenos Aires. Software Engineer at Vercel Labs, founder of Crafter Station, principal creator of Petdex, and Codex Ambassador in Peru.",
      es: "Ingeniero de software peruano radicado en Buenos Aires. Software Engineer en Vercel Labs, fundador de Crafter Station, creador principal de Petdex y Codex Ambassador en Peru.",
      pt: "Engenheiro de software peruano baseado em Buenos Aires. Software Engineer na Vercel Labs, fundador da Crafter Station, principal criador do Petdex e Codex Ambassador no Peru.",
      zh: "常驻布宜诺斯艾利斯的秘鲁软件工程师。Vercel Labs 软件工程师、Crafter Station 创始人、Petdex 主要创作者，以及秘鲁的 Codex Ambassador。",
      ja: "ブエノスアイレス在住のペルー出身ソフトウェアエンジニア。Vercel Labs のソフトウェアエンジニア、Crafter Station の創設者、Petdex のメインクリエイター、そしてペルーの Codex Ambassador です。",
    },
    skills: ["Developer Tools", "Open Source", "AI", "TypeScript", "Community"],
    github: "https://github.com/Railly",
    linkedin: "https://linkedin.com/in/railly-hugo",
    x: "https://x.com/raillyhugo",
    website: "https://railly.dev",
    email: "hi@railly.dev",
    projects: [
      { name: "petdex", url: "https://github.com/crafter-station/petdex" },
      { name: "tinte", url: "https://www.tinte.dev" },
      "elements",
    ],
    cal: "https://cal.com/railly/30min",
    joinedYear: 2023,
    listening: {
      title: "Kilometros",
      artist: "Los Caligaris",
      cover: "/music/railly.webp",
      url: "https://www.youtube.com/watch?v=pW9MJdTnl5E&list=RDpW9MJdTnl5E&start_radio=1",
    },
    stack: [
      { category: "Languages", items: ["TypeScript"] },
      { category: "Frontend", items: ["Next.js 15", "Tailwind CSS"] },
      { category: "Backend", items: ["Bun", "Clerk", "Trigger.dev", "Resend"] },
      { category: "Database", items: ["Neon"] },
      { category: "AI", items: ["Claude Code", "Codex"] },
      { category: "DevOps & Cloud", items: ["Vercel"] },
      { category: "Tools", items: ["Cursor", "Biome"] },
    ],
    software: [
      { category: "Editor & Terminal", items: ["Ghostty"] },
      { category: "Design", items: ["Figma"] },
      { category: "Productivity", items: ["Obsidian", "Raycast", "Linear", "Toggl Track", "Notion Calendar"] },
      { category: "Media", items: ["Screen Studio"] },
      { category: "Communication", items: ["Discord & Slack"] },
      { category: "Browser", items: ["Comet"] },
    ],
    hardware: [
      {
        category: "Computers",
        items: [
          { name: "MacBook Pro M4 Pro", detail: '14", 24 GB RAM, 2025' },
          { name: "iPad Pro", detail: "M-series chip" },
          { name: "iPhone 15 Plus", detail: "Daily driver" },
          { name: "Apple Watch S10", detail: "Health tracking" },
        ],
      },
      {
        category: "Audio & Video",
        items: [
          { name: "AirPods Pro", detail: "Noise cancellation" },
          { name: "Shure MV7+", detail: "Podcast microphone + boom arm" },
          { name: "DJI Mic Mini", detail: "Wireless lavalier (2 TX + 1 RX)" },
          { name: "DJI Osmo Nano", detail: "Action camera, 128 GB" },
          { name: "Meta Ray-Ban", detail: "Smart glasses, Classic Black" },
        ],
      },
      {
        category: "Peripherals",
        items: [
          { name: "Keychron K2", detail: "Mechanical keyboard" },
          { name: "Cougar E-STAR 140", detail: "Electric standing desk" },
        ],
      },
      {
        category: "Accessories",
        items: [
          { name: "Anker 737 Power Bank", detail: "PowerCore 24K, portable charger" },
          { name: "Arduino UNO R4 WiFi", detail: "IoT projects" },
        ],
      },
    ],
  },
  {
    username: "cuevaio",
    name: "Anthony Cueva",
    role: "Product Engineer",
    location: "Somewhere in the world",
    image: "/team/cueva.png",
    bio: {
      en: "Product engineer obsessed with shipping and building in public. Self-taught software engineer currently working at a crypto startup. Organizes IRL events to spread the shipping culture across LATAM and is on a mission to grow the Crafter Station community. Can help with career advice and shipping products.",
      es: "Ingeniero de producto obsesionado con shipear y construir en publico. Ingeniero de software autodidacta trabajando actualmente en una startup de cripto. Organiza eventos IRL para difundir la cultura del shipeo en LATAM y tiene la mision de hacer crecer la comunidad de Crafter Station. Puede ayudar con consejos de carrera y shipeo de productos.",
      pt: "Engenheiro de produto obcecado em fazer ship e construir em publico. Engenheiro de software autodidata trabalhando atualmente em uma startup de cripto. Organiza eventos presenciais para espalhar a cultura do ship pelo LATAM e tem a missao de crescer a comunidade da Crafter Station. Pode ajudar com carreira e shipping de produtos.",
      zh: "痴迷于 ship 和公开构建的产品工程师。自学成才的软件工程师，目前在一家加密创业公司工作。组织线下活动在拉美传播 shipping 文化，并以壮大 Crafter Station 社区为使命。可以在职业建议和产品 ship 方面提供帮助。",
      ja: "シップすることと公開の場で開発することに夢中なプロダクトエンジニア。独学のソフトウェアエンジニアで、現在は暗号資産スタートアップで働いています。LATAM にシップの文化を広めるためオフラインイベントを主催し、Crafter Station コミュニティを育てることをミッションにしています。キャリア相談やプロダクトのシップの相談に乗れます。",
    },
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Vercel", "React", "Astro", "Content Creation", "Career Advice"],
    github: "https://github.com/cuevaio",
    linkedin: "https://linkedin.com/in/cuevaio",
    x: "https://x.com/cuevaio",
    instagram: "https://www.instagram.com/cueva.io",
    website: "https://www.cueva.io",
    projects: ["text0", "lupa"],
    cal: "https://cal.com/cuevaio/30min",
    joinedYear: 2023,
    listening: {
      title: "Call It Fate, Call It Karma",
      artist: "The Strokes",
      cover: "/music/cueva.jpeg",
      url: "https://music.youtube.com/watch?v=Txn5-dKLFHg",
    },
    stack: [
      { category: "Languages", items: ["TypeScript"] },
      { category: "Frontend", items: ["React", "ShadCN", "Next.js"] },
      { category: "Backend", items: ["BetterAuth", "Clerk", "Polar", "Stripe", "Unkey", "Kapso", "WasenderAPI", "Trigger.dev"] },
      { category: "Database", items: ["Neon"] },
      { category: "AI", items: ["AI SDK", "AI Gateway"] },
      { category: "DevOps & Cloud", items: ["Cloudflare R2"] },
      { category: "Tools", items: ["Posthog"] },
    ],
    software: [
      { category: "Editor & Terminal", items: ["Ghostty", "OpenCode"] },
      { category: "Productivity", items: ["Google Calendar"] },
    ],
    hardware: [
      {
        category: "Computers",
        items: [
          { name: "MacBook Pro M4" },
          { name: "iPhone 15" },
          { name: "Apple Watch S10", detail: "Health tracking" },
        ],
      },
      {
        category: "Audio & Video",
        items: [
          { name: "Meta Ray-Ban", detail: "Smart glasses, Classic Black" },
          { name: "AirPods Pro", detail: "Noise cancellation" },
          { name: "Elgato Key Light", detail: "Studio light, 2800 lm, app-controlled" },
          { name: "DJI Mic Mini", detail: "Wireless mic, 2 TX + 1 RX" },
        ],
      },
      { category: "Accessories", items: [{ name: "Arduino UNO R3 WiFi" }] },
    ],
  },
  {
    username: "emmy",
    name: "Emmy Arias",
    role: "Growth & Marketing",
    location: "Bogota, Colombia",
    image: "/team/emmy.png",
    bio: {
      en: "Growth and marketing strategist with an anthropology background that shapes how she thinks about products: starting with people, not solutions. Expert in automation and AI workflows, she finds elegant ways to solve complex distribution challenges.",
      es: "Estratega de growth y marketing con formacion en antropologia que define como piensa sobre productos: empezando por las personas, no por las soluciones. Experta en automatizacion y flujos de IA, encuentra formas elegantes de resolver desafios de distribucion.",
      pt: "Estrategista de growth e marketing com formacao em antropologia que molda como pensa sobre produtos: comecando pelas pessoas, nao pelas solucoes. Especialista em automacao e fluxos de IA, encontra formas elegantes de resolver desafios de distribuicao.",
      zh: "拥有人类学背景的增长与营销策略师，这塑造了她思考产品的方式：从人出发，而不是从解决方案出发。她是自动化和 AI 工作流专家，善于用优雅的方式解决复杂的分发难题。",
      ja: "人類学のバックグラウンドを持つグロース・マーケティング戦略家。その視点が、ソリューションではなく人から考えるプロダクト観を形作っています。自動化と AI ワークフローのエキスパートとして、複雑なディストリビューションの課題をエレガントに解決します。",
    },
    skills: ["Growth", "Marketing", "n8n", "Automation", "AI Workflows", "Kapso"],
    github: "https://github.com/estparcae",
    linkedin: "https://www.linkedin.com/in/ed-pardo/",
    website: "https://emmy-pardo.vercel.app",
    cal: "https://cal.com/emms-pardo/30min",
    joinedYear: 2025,
    listening: {
      title: "Cemetery Drive",
      artist: "My Chemical Romance",
      cover: "/music/emmy.jpg",
      url: "https://www.youtube.com/watch?v=02W8DAnKvlA&list=RD02W8DAnKvlA&start_radio=1",
    },
  },
  {
    username: "cris",
    name: "Cristian Correa",
    role: "Data & Software Engineer",
    location: "Bogota, Colombia",
    image: "/team/cris.png",
    bio: {
      en: "Data and software engineer bridging the gap between machine learning and product. Passionate about making data-driven products accessible across LATAM.",
      es: "Ingeniero de datos y software que conecta machine learning con producto. Apasionado por hacer que los productos basados en datos sean accesibles en toda LATAM.",
      pt: "Engenheiro de dados e software que une machine learning com produto. Apaixonado por tornar produtos orientados por dados acessiveis em todo o LATAM.",
      zh: "连接机器学习与产品的数据与软件工程师。热衷于让数据驱动的产品在整个拉美触手可及。",
      ja: "機械学習とプロダクトの橋渡しをするデータ・ソフトウェアエンジニア。データドリブンなプロダクトを LATAM 全体に届けることに情熱を注いでいます。",
    },
    skills: ["Python", "Data Engineering", "Machine Learning", "TypeScript", "dbt", "SQL"],
    github: "https://github.com/camilocbarrera",
    linkedin: "https://www.linkedin.com/in/cristiancamilocorrea/",
    x: "https://x.com/camilocbarrera",
    website: "https://cristiancorrea.xyz/",
    cal: "https://cal.com/cristian-correa/30min",
    joinedYear: 2024,
    listening: {
      title: "Claude's Plan",
      artist: "Jeff Guo",
      url: "https://www.youtube.com/watch?v=9kT0oLBPiOw&list=RD9kT0oLBPiOw&start_radio=1",
    },
    stack: [
      { category: "Frontend", items: ["React", "ShadCN", "Next.js"] },
      { category: "Backend", items: ["Clerk", "Polar", "Stripe"] },
      { category: "Database", items: ["Neon"] },
      { category: "AI", items: ["AI SDK", "AI Gateway"] },
      { category: "Tools", items: ["Posthog"] },
    ],
  },
  {
    username: "nicolas",
    name: "Nicolas Vargas",
    role: "AI Engineer",
    location: "Bogota, Colombia",
    image: "/team/nicolas.png",
    bio: {
      en: "Backend developer focused on cloud and AI-driven solutions. Specializes in serverless technologies, cloud architecture, and building scalable, high-performance applications with clean abstractions.",
      es: "Desarrollador backend enfocado en soluciones cloud e impulsadas por IA. Especializado en serverless, arquitectura cloud y aplicaciones escalables con abstracciones limpias.",
      pt: "Desenvolvedor backend focado em solucoes cloud e orientadas por IA. Especializado em serverless, arquitetura cloud e aplicacoes escalaveis com abstracoes limpas.",
      zh: "专注于云和 AI 驱动解决方案的后端开发者。擅长 serverless 技术、云架构，以及构建抽象清晰、可扩展的高性能应用。",
      ja: "クラウドと AI 主導のソリューションに注力するバックエンド開発者。サーバーレス技術、クラウドアーキテクチャ、そしてクリーンな抽象化を備えたスケーラブルで高性能なアプリケーションの構築を得意としています。",
    },
    skills: ["Go", "TypeScript", "AWS", "SST", "Docker", "Kubernetes"],
    github: "https://github.com/MrUprizing",
    x: "https://x.com/MrUprizing",
    website: "https://uprizing.me/",
    cal: "https://cal.com/uprizing/30min",
    joinedYear: 2025,
    listening: {
      title: "Rosones",
      artist: "Fuerza Regida",
      url: "https://www.youtube.com/watch?v=9SsSl3qoOSw&list=RD9SsSl3qoOSw&start_radio=1",
    },
    stack: [
      { category: "Languages", items: ["TypeScript", "Go", "SQL"] },
      { category: "Frontend", items: ["Shadcn UI", "NextJs", "Svelte", "Tailwind"] },
      {
        category: "Backend",
        items: [
          "Hono ❤️",
          "ElysiaJs",
          "Echo",
          "Fiber",
          "Zod ❤️",
          "Better Auth ❤️",
          "Bun Js ❤️",
          "Turborepo",
          "Node Js",
          "Resend ❤️",
        ],
      },
      { category: "Database", items: ["PostgreSQL", "SQLite", "Redis", "DynamoDB"] },
      {
        category: "AI",
        items: [
          "Ai SDK ❤️",
          "Anthropic AI Api",
          "Mistral AI Api",
          "Firecrawl Api",
          "V0 & Api ❤️",
          "AWS Bedrock",
          "Claude Code",
          "Vercel AI Gateway",
        ],
      },
      {
        category: "DevOps & Cloud",
        items: [
          "Pulumi",
          "SST ❤️",
          "Docker",
          "GitHub Actions",
          "Kubernetes",
          "Aws ❤️",
          "Gcp",
          "Vercel ❤️",
          "Supabase",
          "Cloudinary",
          "Neon",
          "Upstash",
        ],
      },
      { category: "Design", items: ["Figma"] },
    ],
  },
  {
    username: "nacho",
    name: "Ignacio Velasquez",
    role: "Growth & Automation",
    location: "Arequipa, Peru",
    image: "/team/nacho.png",
    bio: {
      en: "Growth and automation specialist focused on helping products reach the right people. Builds systems that scale distribution and community engagement across LATAM.",
      es: "Especialista en growth y automatizacion enfocado en ayudar a productos a llegar a las personas correctas. Construye sistemas que escalan distribucion y comunidad en LATAM.",
      pt: "Especialista em growth e automacao focado em ajudar produtos a chegar nas pessoas certas. Constroi sistemas que escalam distribuicao e comunidade no LATAM.",
      zh: "专注于帮助产品触达对的人的增长与自动化专家。构建能在拉美规模化分发和社区互动的系统。",
      ja: "プロダクトを適切な人に届けることに注力する、グロースと自動化のスペシャリスト。LATAM 全体でディストリビューションとコミュニティエンゲージメントをスケールさせる仕組みを作っています。",
    },
    skills: ["Automation", "AI", "Notion", "Product Hunt", "Growth Hacking", "Content Marketing"],
    github: "https://github.com/TheVeller",
    linkedin: "https://www.linkedin.com/in/ignacio-vel%C3%A1squez-franco-3a5765204/",
    website: "https://theveller.gumroad.com/",
    cal: "https://cal.com/ignacio-velasquez-franco/30min",
    joinedYear: 2025,
  },
  {
    username: "ignacio",
    name: "Ignacio Rueda",
    role: "Backend Engineer",
    location: "Lima, Peru",
    image: "/team/ignacio.png",
    bio: {
      en: "Backend engineer focused on building reliable, performant APIs and systems. Loves Go and distributed systems.",
      es: "Ingeniero backend enfocado en construir APIs y sistemas confiables y de alto rendimiento. Le apasiona Go y los sistemas distribuidos.",
      pt: "Engenheiro backend focado em construir APIs e sistemas confiaveis e performantes. Apaixonado por Go e sistemas distribuidos.",
      zh: "专注于构建可靠、高性能 API 和系统的后端工程师。热爱 Go 和分布式系统。",
      ja: "信頼性が高くパフォーマンスに優れた API とシステムの構築に注力するバックエンドエンジニア。Go と分散システムが大好きです。",
    },
    skills: ["Go", "Python", "PostgreSQL", "Docker", "REST APIs", "Distributed Systems"],
    github: "https://github.com/Jibaru",
    linkedin: "https://www.linkedin.com/in/ignacior97/",
    cal: "https://cal.com/irueda/30min",
    joinedYear: 2024,
    software: [
      { category: "Media", items: ["FFmpeg", "OBS", "Filmora"] },
    ],
    hardware: [
      {
        category: "Computers",
        items: [
          { name: "MacBook Pro M4", detail: "14-inch, work" },
          { name: "Lenovo Legion", detail: "Windows — 3D & editing" },
          { name: "Lenovo ThinkPad", detail: "Linux" },
        ],
      },
      {
        category: "Audio & Video",
        items: [
          { name: "Razer Seiren Mini", detail: "Microphone" },
          { name: "GoPro 13 Black", detail: "Action camera" },
        ],
      },
    ],
  },
  {
    username: "liz",
    name: "Liz Riveros",
    role: "Project Manager",
    location: "Lima, Peru",
    image: "/team/liz.png",
    bio: {
      en: "Project manager who keeps the team aligned, the roadmap honest, and the shipping cadence high. Brings structure to chaos without slowing things down.",
      es: "Project manager que mantiene al equipo alineado, el roadmap honesto y el ritmo de shipeo alto. Aporta estructura al caos sin frenar las cosas.",
      pt: "Project manager que mantem o time alinhado, o roadmap honesto e o ritmo de ship alto. Traz estrutura ao caos sem desacelerar as coisas.",
      zh: "让团队保持一致、路线图保持诚实、ship 节奏保持高频的项目经理。在不拖慢速度的前提下给混乱带来秩序。",
      ja: "チームの足並みを揃え、ロードマップを正直に保ち、シップのペースを高く維持するプロジェクトマネージャー。スピードを落とさずに、カオスに構造をもたらします。",
    },
    skills: ["Project Management", "Agile", "Scrum", "Leadership", "Communication", "Notion"],
    linkedin: "https://www.linkedin.com/in/lizethriveros/",
    joinedYear: 2024,
  },
  {
    username: "gabriel",
    name: "Gabriel Antunes",
    role: "AI Engineer · Full-Stack",
    location: "Vila Velha, Brazil",
    image: "/team/gabriel.png",
    bio: {
      en: "Full-stack developer specializing in front-end development with solid experience in Docker and service scalability. Versatile across front-end and back-end environments and passionate about challenging projects.",
      es: "Full-stack developer especializado en frontend con experiencia solida en Docker y escalabilidad de servicios. Versatil en frontend y backend, y apasionado por proyectos desafiantes.",
      pt: "Full-stack developer especializado em frontend com experiencia solida em Docker e escalabilidade de servicos. Versatil em frontend e backend, e apaixonado por projetos desafiantes.",
      zh: "专精前端开发的全栈开发者，在 Docker 和服务可扩展性方面经验扎实。能灵活穿梭于前后端环境，热爱有挑战的项目。",
      ja: "フロントエンドを専門とするフルスタック開発者。Docker とサービスのスケーラビリティに確かな経験があります。フロントエンドとバックエンドの両方を柔軟にこなし、挑戦しがいのあるプロジェクトに情熱を注いでいます。",
    },
    skills: ["Python", "Go", "TypeScript", "React", "Angular", "Node.js", "Docker", "LangChain", "PostgreSQL"],
    github: "https://github.com/antunesgabriel",
    linkedin: "https://www.linkedin.com/in/gabriel-antunes/",
    joinedYear: 2026,
  },
  {
    username: "tarmeno",
    name: "Carlos Tarmeno",
    role: "Frontend Engineer",
    location: "Lima, Peru",
    image: "/team/tarmeno.png",
    bio: {
      en: "Frontend engineer who cares deeply about craft and user experience. Builds polished, accessible interfaces and loves the intersection of design and code.",
      es: "Ingeniero frontend que se preocupa profundamente por el oficio y la experiencia de usuario. Construye interfaces pulidas y accesibles, y ama la interseccion entre diseno y codigo.",
      pt: "Engenheiro frontend que se preocupa profundamente com craft e experiencia do usuario. Constroi interfaces polidas e acessiveis, e ama a intersecao entre design e codigo.",
      zh: "深切在意工艺与用户体验的前端工程师。构建精致、可访问的界面，热爱设计与代码的交汇处。",
      ja: "クラフトとユーザー体験を深く大切にするフロントエンドエンジニア。磨き込まれたアクセシブルなインターフェースを作り、デザインとコードの交差点を愛しています。",
    },
    skills: ["React", "TypeScript", "Next.js", "CSS", "JavaScript", "Accessibility"],
    github: "https://github.com/carlosdtn",
    linkedin: "https://www.linkedin.com/in/carlos-tarmeno/",
    website: "https://www.carlostarmeno.com/",
    joinedYear: 2024,
  },
  {
    username: "juan",
    name: "Juan Ortega",
    role: "Software Engineer",
    location: "Bogotá, Colombia",
    image: "/team/juan.png",
    bio: {
      en: "Software engineer building visagente.com, a product that helps people move up their U.S. visa appointment dates. Focused on shipping useful tools that solve real-world problems for Latin Americans abroad.",
      es: "Ingeniero de software construyendo visagente.com, un producto que ayuda a las personas a adelantar su cita de visa americana. Enfocado en shipear herramientas útiles que resuelven problemas reales para latinoamericanos en el exterior.",
      pt: "Engenheiro de software construindo o visagente.com, um produto que ajuda as pessoas a antecipar a data da entrevista do visto americano. Focado em fazer ship de ferramentas úteis que resolvem problemas reais para latino-americanos no exterior.",
      zh: "正在构建 visagente.com 的软件工程师，这个产品帮助人们提前美国签证面谈日期。专注于 ship 能为海外拉美人解决真实问题的实用工具。",
      ja: "アメリカのビザ面接日を早めるプロダクト、visagente.com を開発しているソフトウェアエンジニア。海外にいるラテンアメリカの人々の現実の課題を解決する、便利なツールをシップすることに注力しています。",
    },
    skills: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Product Engineering",
    ],
    github: "https://github.com/juanortega10",
    linkedin: "https://www.linkedin.com/in/juanortegariveros/",
    website: "https://visagente.com",
    joinedYear: 2026,
  },
  {
    username: "edward",
    name: "Edward Ramos",
    role: "Frontend Engineer",
    location: "Lima, Peru",
    timezone: "America/Lima",
    image: "/team/edward.png",
    bio: {
      en: "I refine frontend products—features, edge cases, and flows—until they work for real users in production, not just in review. Ownership on every project, care in every release, down to the details most teams skip.",
      es: "Refino productos frontend—features, casuísticas y flujos—hasta que funcionen para usuarios reales en producción, no solo en el review. Ownership en cada proyecto, cuidado en cada entrega, hasta los detalles que la mayoría deja pasar.",
      pt: "Refino produtos frontend—features, casos de borda e fluxos—ate funcionarem para usuarios reais em produção, não só no review. Ownership em cada projeto, cuidado em cada entrega, até os detalhes que a maioria deixa passar.",
      zh: "我持续打磨前端产品：功能、边界情况和流程，直到它们在生产环境里对真实用户可用，而不只是在 review 里跑通。每个项目都有 ownership，每次发布都足够用心，连大多数团队会跳过的细节也不放过。",
      ja: "フロントエンドプロダクトの機能、エッジケース、フローを、レビュー上だけでなく本番の実ユーザーにとって使えるものになるまで磨き込みます。すべてのプロジェクトにオーナーシップを、すべてのリリースに丁寧さを。多くのチームが飛ばしてしまう細部まで。",
    },
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Design Systems", "Playwright"],
    github: "https://github.com/EdwardR0507",
    linkedin: "https://www.linkedin.com/in/edwardramosvillarreal/",
    x: "https://x.com/EdRamosV",
    website: "https://www.edwardr.dev/",
    projects: [
      { name: "meet.up", url: "https://meetup.crafter.run" },
      { name: "Pawboard", url: "https://www.pawboard.dev" },
      { name: "GitHunter", url: "https://www.githunter.dev" },
      "elements",
    ],
    joinedYear: 2024,
    listening: {
      title: "Ditto",
      artist: "NewJeans",
      cover: "/music/edward.jpg",
      url: "https://www.youtube.com/watch?v=-g9I2neQR7w",
    },
    stack: [
      { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "Dart"] },
      { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Bootstrap", "MUI", "Flutter", "ShadCN", "Zustand", "TanStack Query", "Astro"] },
      { category: "Backend", items: ["Node.js", "Express", "Flask"] },
      { category: "Database", items: ["PostgreSQL", "SQLite", "Redis"] },
      { category: "AI", items: ["Cursor", "v0"] },
      { category: "DevOps & Cloud", items: ["Vercel"] },
    ],
    software: [
      { category: "Editor & Terminal", items: ["Cursor", "VS Code", "Ghostty"] },
      { category: "Productivity", items: ["Obsidian", "Notion", "Linear", "Raycast", "Google Calendar"] },
      { category: "Communication", items: ["Discord", "Slack", "WhatsApp"] },
      { category: "Browser", items: ["Brave", "Comet"] },
    ],
    hardware: [
      {
        category: "Computers",
        items: [
          { name: "MacBook Pro M5 Pro" },
          { name: "iPhone 16e" },
        ],
      },
    ],
  },
]

export function getTeamMember(username: string) {
  return teamMembers.find((member) => member.username === username)
}
