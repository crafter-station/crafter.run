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
  },
  description: {
    en: "Crafter Station is a LatAm shipping network: community, products, open source, research, and events for builders across the region.",
    es: "Crafter Station es una red LatAm para shippers: comunidad, productos, codigo abierto, investigacion y eventos para builders de la region.",
    pt: "Crafter Station e uma rede LatAm para shippers: comunidade, produtos, codigo aberto, pesquisa e eventos para builders da regiao.",
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
  { key: "projects", href: "/projects" },
  { key: "research", href: "/research" },
  { key: "team", href: "/team" },
] as const

export const languageLinks = [
  { label: "EN", href: "/" },
  { label: "ES", href: "/es" },
  { label: "PT", href: "/pt" },
] as const

export const stats = [
  { value: "800+", label: { en: "WhatsApp community members", es: "Miembros en la comunidad de WhatsApp", pt: "Membros na comunidade do WhatsApp" } },
  { value: "50+", label: { en: "Events and hackathons hosted", es: "Eventos y hackathons organizados", pt: "Eventos e hackathons organizados" } },
  { value: "25+", label: { en: "Products shipped", es: "Productos construidos", pt: "Produtos construidos" } },
  { value: "3.2k+", label: { en: "Open-source stars", es: "Estrellas en codigo abierto", pt: "Estrelas em codigo aberto" } },
] as const

export function getStats(locale: Locale = defaultLocale) {
  return stats.map((item) => ({ ...item, label: localized(item.label, locale) }))
}

export const ecosystem = [
  {
    title: { en: "Community", es: "Comunidad", pt: "Comunidade" },
    body: {
      en: "A WhatsApp-first network of 800+ engineers, designers, founders, product, growth, and marketing people building across LatAm.",
      es: "Una red WhatsApp-first de 800+ ingenieros, disenadores, founders, producto, growth y marketing construyendo en LatAm.",
      pt: "Uma rede WhatsApp-first de 800+ engenheiros, designers, founders, produto, growth e marketing construindo no LatAm.",
    },
    href: "https://crafters.chat",
  },
  {
    title: { en: "Events", es: "Eventos", pt: "Eventos" },
    body: {
      en: "Code Brews, hackathons, product launches, workshops, and partner activations that bring serious builders into the same room.",
      es: "Code Brews, hackathons, lanzamientos, workshops y activaciones con partners que juntan a builders serios en la misma sala.",
      pt: "Code Brews, hackathons, lancamentos, workshops e ativacoes com parceiros que colocam builders serios na mesma sala.",
    },
    href: "/events",
  },
  {
    title: { en: "Research", es: "Investigacion", pt: "Pesquisa" },
    body: {
      en: "Crafter Research studies AI-first engineering, agents, developer experience, and the new workflows shaping how teams ship.",
      es: "Crafter Research estudia ingenieria AI-first, agentes, developer experience y los nuevos flujos que cambian como los equipos construyen.",
      pt: "Crafter Research estuda engenharia AI-first, agentes, developer experience e os novos fluxos que mudam como os times constroem.",
    },
    href: "/research",
  },
  {
    title: { en: "Open source", es: "Codigo abierto", pt: "Codigo aberto" },
    body: {
      en: "We build in public and release tools developers actually use, from design systems to AI-native writing and codebase search.",
      es: "Construimos en publico y liberamos herramientas que developers realmente usan: sistemas de diseno, escritura con IA y busqueda de codigo.",
      pt: "Construimos em publico e liberamos ferramentas que developers realmente usam: sistemas de design, escrita com IA e busca de codigo.",
    },
    href: "/projects",
  },
  {
    title: { en: "Products", es: "Productos", pt: "Produtos" },
    body: {
      en: "Community infrastructure, open-source tools, research projects, writing surfaces, design systems, and code search products built in public.",
      es: "Infraestructura de comunidad, herramientas de codigo abierto, investigacion, escritura, sistemas de diseno y busqueda de codigo construidos en publico.",
      pt: "Infraestrutura de comunidade, ferramentas de codigo aberto, pesquisa, escrita, sistemas de design e busca de codigo construidos em publico.",
    },
    href: "/projects",
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
    title: { en: "LatAm growth partner", es: "Partner de crecimiento en LatAm", pt: "Parceiro de crescimento no LatAm" },
    body: {
      en: "For devtools and startups that want to earn trust in LatAm through events, community, content, product collaboration, and high-signal builder access.",
      es: "Para devtools y startups que quieren ganar confianza en LatAm con eventos, comunidad, contenido, colaboracion de producto y acceso a builders de alta senal.",
      pt: "Para devtools e startups que querem ganhar confianca no LatAm com eventos, comunidade, conteudo, colaboracao de produto e acesso a builders de alto sinal.",
    },
    href: "/team/work-with-us",
  },
  {
    title: { en: "Hackathon & event activation", es: "Activacion en hackathons y eventos", pt: "Ativacao em hackathons e eventos" },
    body: {
      en: "We design and run activations that put your product in the hands of engineers, designers, product people, and shippers who can actually use it.",
      es: "Disenamos y operamos activaciones que ponen tu producto en manos de ingenieros, disenadores, producto y shippers que pueden usarlo de verdad.",
      pt: "Desenhamos e operamos ativacoes que colocam seu produto nas maos de engenheiros, designers, produto e shippers que podem usa-lo de verdade.",
    },
    href: "/events/sponsors",
  },
  {
    title: { en: "Product engineering", es: "Ingenieria de producto", pt: "Engenharia de produto" },
    body: {
      en: "End-to-end web products built on Next.js and the React ecosystem. From zero-to-one to scaling to millions of pages, we ship without half measures.",
      es: "Productos web end-to-end sobre Next.js y el ecosistema React. De cero-a-uno a escalar millones de paginas, construimos sin medias tintas.",
      pt: "Produtos web end-to-end sobre Next.js e o ecossistema React. De zero-a-um ate escalar milhoes de paginas, construimos sem meias medidas.",
    },
    href: "/team/work-with-us",
  },
  {
    title: { en: "AI products", es: "Productos con IA", pt: "Produtos com IA" },
    body: {
      en: "Streaming LLM UIs, agents, evals, and inference infra. We build with the latest models and the patterns that hold up in production.",
      es: "UIs con streaming de LLMs, agentes, evaluaciones e infraestructura de inferencia. Construimos con modelos recientes y patrones que aguantan produccion.",
      pt: "UIs com streaming de LLMs, agentes, avaliacoes e infraestrutura de inferencia. Construimos com modelos recentes e padroes que aguentam producao.",
    },
    href: "/team/work-with-us",
  },
  {
    title: { en: "Design systems", es: "Sistemas de diseno", pt: "Sistemas de design" },
    body: {
      en: "Component libraries and tokens that scale across surfaces. We treat the design system as a product, with rigor in versioning and DX.",
      es: "Librerias de componentes y tokens que escalan entre superficies. Tratamos el sistema de diseno como producto, con rigor en versionado y DX.",
      pt: "Bibliotecas de componentes e tokens que escalam entre superficies. Tratamos o sistema de design como produto, com rigor em versionamento e DX.",
    },
    href: "/team/work-with-us",
  },
  {
    title: { en: "Backend & APIs", es: "Backend y APIs", pt: "Backend e APIs" },
    body: {
      en: "Postgres, edge runtimes, queues, and the data plumbing your product actually depends on. Built to scale, instrumented from day one.",
      es: "Postgres, runtimes edge, colas y la capa de datos de la que tu producto depende. Construido para escalar e instrumentado desde el dia uno.",
      pt: "Postgres, runtimes edge, filas e a camada de dados da qual seu produto depende. Construido para escalar e instrumentado desde o dia um.",
    },
    href: "/team/work-with-us",
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
  { en: "Join the WhatsApp community at crafters.chat", es: "Unete a la comunidad de WhatsApp en crafters.chat", pt: "Entre na comunidade do WhatsApp em crafters.chat" },
  { en: "Attend Code Brews, hackathons, meetups, and launch nights", es: "Asiste a Code Brews, hackathons, meetups y noches de lanzamiento", pt: "Participe de Code Brews, hackathons, meetups e noites de lancamento" },
  { en: "Get mentoring and career advice from active builders", es: "Recibe mentoria y consejo de carrera de builders activos", pt: "Receba mentoria e conselho de carreira de builders ativos" },
  { en: "Ship in public with people who celebrate finished work", es: "Construye en publico con personas que celebran el trabajo terminado", pt: "Construa em publico com pessoas que celebram trabalho finalizado" },
  { en: "Discover and showcase exceptional LatAm tech talent", es: "Descubre y muestra talento tech excepcional de LatAm", pt: "Descubra e mostre talento tech excepcional do LatAm" },
] as const

export function getCommunityOffers(locale: Locale = defaultLocale) {
  return communityOffers.map((item) => localized(item, locale))
}

export const products = [
  {
    slug: "hack0",
    title: "hack0",
    tagline: { en: "The live LATAM builder index", es: "El indice vivo de builders en LATAM", pt: "O indice vivo de builders no LATAM" },
    description: {
      en: "A public directory for LATAM builders: events, communities, hackathons, labs, grants, and hosts maintained from open community calendars.",
      es: "Un directorio publico para builders de LATAM: eventos, comunidades, hackathons, labs, grants y hosts mantenidos desde calendarios abiertos de la comunidad.",
      pt: "Um diretorio publico para builders do LATAM: eventos, comunidades, hackathons, labs, grants e hosts mantidos a partir de calendarios abertos da comunidade.",
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
    tagline: { en: "The Codex pet index", es: "El indice de mascotas para Codex", pt: "O indice de pets para Codex" },
    description: {
      en: "A public gallery of animated companions for Codex. Browse thousands of open-source pets, preview their states, and install one with a single command.",
      es: "Una galeria publica de companeros animados para Codex. Explora miles de mascotas open source, previsualiza sus estados e instala una con un solo comando.",
      pt: "Uma galeria publica de companheiros animados para Codex. Explore milhares de pets open source, visualize seus estados e instale um com um unico comando.",
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
    tagline: { en: "Peruvian law as a git repo", es: "Legislacion peruana como repo git", pt: "Legislacao peruana como repo git" },
    description: {
      en: "A community-maintained corpus of Peruvian legal norms as Markdown files, where every reform is a commit dated to the real publication date.",
      es: "Un corpus comunitario de normas legales peruanas como archivos Markdown, donde cada reforma es un commit con la fecha real de publicacion.",
      pt: "Um corpus comunitario de normas legais peruanas como arquivos Markdown, onde cada reforma e um commit com a data real de publicacao.",
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
    tagline: { en: "Voice-to-text blazing fast", es: "Voz a texto a velocidad brutal", pt: "Voz para texto em alta velocidade" },
    description: {
      en: "A Mac voice interface that works across every app. Hold one hotkey, speak naturally, and Maca pastes polished text where your cursor is.",
      es: "Una interfaz de voz para Mac que funciona en cualquier app. Mantienes un hotkey, hablas natural y Maca pega texto pulido donde esta tu cursor.",
      pt: "Uma interface de voz para Mac que funciona em qualquer app. Segure uma tecla, fale naturalmente e o Maca cola texto polido onde esta o cursor.",
    },
    metrics: ["5x faster", "<50ms latency", "one hotkey"],
    technologies: ["Voice", "Mac", "Productivity"],
    url: "https://maca.sh/",
    accent: "from-stone-200 via-neutral-500 to-black",
  },
  {
    slug: "visagente",
    title: "Visagente",
    tagline: { en: "Advance your U.S. visa appointment", es: "Adelanta tu cita de visa americana", pt: "Antecipe sua entrevista de visto americano" },
    description: {
      en: "A visa appointment assistant that monitors availability and helps travelers move their U.S. visa interview earlier by up to 10 months.",
      es: "Un asistente de citas de visa que monitorea disponibilidad y ayuda a viajeros a adelantar su entrevista de visa americana hasta 10 meses.",
      pt: "Um assistente de agendamento de visto que monitora disponibilidade e ajuda viajantes a antecipar a entrevista do visto americano em ate 10 meses.",
    },
    metrics: ["up to 10 months", "U.S. visa", "appointment alerts"],
    technologies: ["Travel", "Automation", "Visa"],
    url: "https://visagente.com/",
    accent: "from-blue-300 via-cyan-500 to-emerald-600",
  },
  {
    slug: "shipping-bible",
    title: "Shipping Bible",
    tagline: { en: "Our playbook for shipping consistently", es: "Nuestro playbook para construir con consistencia", pt: "Nosso playbook para construir com consistencia" },
    description: {
      en: "A living philosophy on shipping, building in public, time-boxing work, telling better stories, and growing as a builder in LatAm.",
      es: "Una filosofia viva para construir en publico, trabajar con limites de tiempo, contar mejores historias y crecer como builder en LatAm.",
      pt: "Uma filosofia viva para construir em publico, trabalhar com limites de tempo, contar historias melhores e crescer como builder no LatAm.",
    },
    technologies: ["Playbook", "Community", "Shipping"],
    url: "https://theshippingbible.com/",
    accent: "from-zinc-200 via-zinc-500 to-zinc-900",
  },
  {
    slug: "research",
    title: "research",
    tagline: { en: "AI-first engineering research from Crafter Station", es: "Investigacion de ingenieria AI-first de Crafter Station", pt: "Pesquisa de engenharia AI-first da Crafter Station" },
    description: {
      en: "A research unit exploring agents, AI workflows, developer experience, codebase context, and the future of software teams.",
      es: "Una unidad de investigacion sobre agentes, flujos de trabajo con IA, experiencia de desarrollo, contexto de codebases y el futuro de los equipos de software.",
      pt: "Uma unidade de pesquisa sobre agentes, fluxos de trabalho com IA, experiencia de desenvolvimento, contexto de codebases e o futuro dos times de software.",
    },
    technologies: ["AI", "Agents", "DX"],
    url: "https://research.crafter.ing/",
    accent: "from-violet-300 via-indigo-500 to-blue-700",
  },
  {
    slug: "tinte",
    title: "tinte",
    tagline: { en: "AI theme generator for VS Code, Shadcn, and beyond", es: "Generador de temas con IA para VS Code, Shadcn y mas", pt: "Gerador de temas com IA para VS Code, Shadcn e mais" },
    description: {
      en: "Generate, remix, and ship beautiful themes across editors and design systems. Used by thousands of developers to make their environment feel like home.",
      es: "Genera, remezcla y publica temas visuales para editores y sistemas de diseno. Miles de developers lo usan para hacer que su entorno se sienta propio.",
      pt: "Gere, remix e publique temas visuais para editores e sistemas de design. Milhares de developers usam para deixar o ambiente com a propria cara.",
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
    tagline: { en: "Search that actually understands your codebase", es: "Busqueda que entiende tu codebase de verdad", pt: "Busca que entende sua codebase de verdade" },
    description: {
      en: "Semantic and structural search for engineering teams. Index, ask, and navigate code at the speed of thought.",
      es: "Busqueda semantica y estructural para equipos de ingenieria. Indexa, pregunta y navega codigo a la velocidad del pensamiento.",
      pt: "Busca semantica e estrutural para times de engenharia. Indexe, pergunte e navegue codigo na velocidade do pensamento.",
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
    tagline: { en: "A registry of production-ready UI elements", es: "Un registry de elementos UI listos para produccion", pt: "Um registry de elementos UI prontos para producao" },
    description: {
      en: "Drop-in components and integrations for the apps you actually ship: Clerk, Stripe, Uploadthing, theming, and more. shadcn-compatible.",
      es: "Componentes e integraciones listos para produccion para las apps que realmente construyes: Clerk, Stripe, Uploadthing, theming y mas. Compatible con shadcn.",
      pt: "Componentes e integracoes prontos para producao para os apps que voce realmente constroi: Clerk, Stripe, Uploadthing, theming e mais. Compativel com shadcn.",
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
    tagline: { en: "The editor we wished we had", es: "El editor que queriamos tener", pt: "O editor que queriamos ter" },
    description: {
      en: "An opinionated, AI-native writing surface for technical teams. Focused, fast, and designed to disappear.",
      es: "Una superficie de escritura opinionada y nativa de IA para equipos tecnicos. Enfocada, rapida y disenada para desaparecer.",
      pt: "Uma superficie de escrita opinativa e nativa de IA para times tecnicos. Focada, rapida e desenhada para desaparecer.",
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
    title: { en: "Code Brew", es: "Code Brew", pt: "Code Brew" },
    body: {
      en: "Intimate meetups for shippers to share demos, lessons, and honest stories from the workbench.",
      es: "Meetups intimos para que shippers compartan demos, aprendizajes e historias honestas del trabajo.",
      pt: "Meetups intimos para shippers compartilharem demos, aprendizados e historias honestas do trabalho.",
    },
  },
  {
    title: { en: "Hackathons", es: "Hackathons", pt: "Hackathons" },
    body: {
      en: "High-energy build sprints where devtools become part of the workflow, not just a sponsor logo.",
      es: "Sprints de construccion con energia alta donde los devtools son parte del flujo, no solo un logo de sponsor.",
      pt: "Sprints de construcao com energia alta onde devtools viram parte do fluxo, nao so um logo de sponsor.",
    },
  },
  {
    title: { en: "Product launches", es: "Lanzamientos", pt: "Lancamentos" },
    body: {
      en: "Community launch moments for tools, open-source projects, and startup collaborations.",
      es: "Momentos de lanzamiento con comunidad para herramientas, proyectos de codigo abierto y colaboraciones con startups.",
      pt: "Momentos de lancamento com comunidade para ferramentas, projetos de codigo aberto e colaboracoes com startups.",
    },
  },
  {
    title: { en: "Workshops", es: "Workshops", pt: "Workshops" },
    body: {
      en: "Hands-on sessions around AI, product engineering, design systems, growth, and developer tools.",
      es: "Sesiones practicas sobre IA, ingenieria de producto, sistemas de diseno, growth y herramientas para developers.",
      pt: "Sessoes praticas sobre IA, engenharia de produto, sistemas de design, growth e ferramentas para developers.",
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
    },
    href: "https://research.crafter.ing/",
  },
  {
    title: "crafter-research GitHub",
    body: {
      en: "Open research repositories, experiments, and technical artifacts.",
      es: "Repositorios abiertos de investigacion, experimentos y artefactos tecnicos.",
      pt: "Repositorios abertos de pesquisa, experimentos e artefatos tecnicos.",
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
    },
  },
  {
    name: "Head of Product",
    role: "Devtools, EU",
    quote: {
      en: "Crafter Station joined late and still pulled the launch forward. Strong opinions, no hand-holding required, and the polish is real.",
      es: "Crafter Station entro tarde e igual adelanto el lanzamiento. Opiniones fuertes, cero hand-holding y el polish es real.",
      pt: "Crafter Station entrou tarde e ainda assim adiantou o lancamento. Opinioes fortes, zero hand-holding e o polish e real.",
    },
  },
  {
    name: "CTO",
    role: "Marketplace, LATAM",
    quote: {
      en: "We've worked with a lot of product teams. None of them understood our stack the way these folks did on day one.",
      es: "Trabajamos con muchos equipos de producto. Ninguno entendio nuestro stack como ellos desde el dia uno.",
      pt: "Trabalhamos com muitos times de produto. Nenhum entendeu nosso stack como eles desde o dia um.",
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
