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
  projects?: string[]
  joinedYear?: number
  cal?: string
}

export const teamMembers: TeamMember[] = [
  {
    username: "shiara",
    name: "Shiara Arauzo",
    role: "Design Engineer",
    location: "Lima, Peru",
    image: "/team/shiara.png",
    bio: {
      en: "Name it and I'll learn it. Design engineer building across web, videogames and research. Building products where neuroscience meets user experience. Founder of Glitch Girls and organizer of #SheShips, empowering women across LATAM to build and ship.",
      es: "Nombralo y lo aprendere. Ingeniera de diseno construyendo en web, videojuegos e investigacion. Construyendo productos donde la neurociencia se encuentra con la experiencia de usuario. Fundadora de Glitch Girls y organizadora de #SheShips, empoderando a mujeres en LATAM para construir y hacer ship.",
      pt: "Diga o nome e eu aprenderei. Engenheira de design construindo na web, videogames e pesquisa. Construindo produtos onde a neurociencia encontra a experiencia do usuario. Fundadora do Glitch Girls e organizadora do #SheShips, empoderando mulheres no LATAM para construir e fazer ship.",
    },
    skills: ["UI/UX Design", "React", "Figma", "TypeScript", "Astro", "Accessibility"],
    github: "https://github.com/shiarauzo",
    linkedin: "https://www.linkedin.com/in/shiara-arauzo/",
    instagram: "https://www.instagram.com/shiaraarauzo/",
    website: "https://shiara.design",
    cal: "https://cal.com/shiara-arauzo/30-min",
    joinedYear: 2024,
  },
  {
    username: "railly",
    name: "Railly Hugo",
    role: "Design Engineer",
    location: "Lima, Peru",
    image: "/team/railly.png",
    bio: {
      en: "Design engineer passionate about developer tools and open source. Creator of tinte, a theme generator for VS Code and shadcn/ui with a strong open-source community.",
      es: "Ingeniero de diseno apasionado por las herramientas para developers y el open source. Creador de tinte, un generador de temas para VS Code y shadcn/ui con una comunidad open-source fuerte.",
      pt: "Engenheiro de design apaixonado por ferramentas para desenvolvedores e open source. Criador do tinte, um gerador de temas para VS Code e shadcn/ui com uma comunidade open-source forte.",
    },
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma", "Next.js", "Design Systems"],
    github: "https://github.com/Railly",
    linkedin: "https://linkedin.com/in/railly-hugo",
    x: "https://x.com/raillyhugo",
    website: "https://railly.dev",
    projects: ["tinte", "elements"],
    cal: "https://cal.com/railly/30min",
    joinedYear: 2023,
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
    },
    skills: ["Growth", "Marketing", "n8n", "Automation", "AI Workflows", "Kapso"],
    github: "https://github.com/estparcae",
    linkedin: "https://www.linkedin.com/in/ed-pardo/",
    website: "https://emmy-pardo.vercel.app",
    cal: "https://cal.com/emms-pardo/30min",
    joinedYear: 2025,
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
    },
    skills: ["Python", "Data Engineering", "Machine Learning", "TypeScript", "dbt", "SQL"],
    github: "https://github.com/camilocbarrera",
    linkedin: "https://www.linkedin.com/in/cristiancamilocorrea/",
    x: "https://x.com/camilocbarrera",
    website: "https://cristiancorrea.xyz/",
    cal: "https://cal.com/cristian-correa/30min",
    joinedYear: 2024,
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
    },
    skills: ["Go", "TypeScript", "AWS", "SST", "Docker", "Kubernetes"],
    github: "https://github.com/MrUprizing",
    x: "https://x.com/MrUprizing",
    website: "https://uprizing.me/",
    cal: "https://cal.com/uprizing/30min",
    joinedYear: 2025,
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
    },
    skills: ["Automation", "AI", "Notion", "Product Hunt", "Growth Hacking", "Content Marketing"],
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
    },
    skills: ["Go", "Python", "PostgreSQL", "Docker", "REST APIs", "Distributed Systems"],
    github: "https://github.com/Jibaru",
    linkedin: "https://www.linkedin.com/in/ignacior97/",
    cal: "https://cal.com/irueda/30min",
    joinedYear: 2024,
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
    },
    skills: ["React", "TypeScript", "Next.js", "CSS", "JavaScript", "Accessibility"],
    github: "https://github.com/carlosdtn",
    linkedin: "https://www.linkedin.com/in/carlos-tarmeno/",
    website: "https://www.carlostarmeno.com/",
    joinedYear: 2024,
  },
  {
    username: "edward",
    name: "Edward Ramos",
    role: "Frontend Engineer",
    location: "Lima, Peru",
    image: "/team/edward.png",
    bio: {
      en: "Frontend engineer passionate about building interactive and visually engaging web experiences. Contributor to the elements component library.",
      es: "Ingeniero frontend apasionado por construir experiencias web interactivas y visualmente atractivas. Contribuidor de la libreria de componentes elements.",
      pt: "Engenheiro frontend apaixonado por construir experiencias web interativas e visualmente envolventes. Contribuidor da biblioteca de componentes elements.",
    },
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Animation", "Web APIs"],
    github: "https://github.com/EdwardR0507",
    linkedin: "https://www.linkedin.com/in/edwardramosvillarreal/",
    projects: ["elements"],
    joinedYear: 2024,
  },
]

export function getTeamMember(username: string) {
  return teamMembers.find((member) => member.username === username)
}
