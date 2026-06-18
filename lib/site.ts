export const siteConfig = {
  name: "Crafter Station",
  domain: "crafter.run",
  tagline: "We ship at the speed of AI",
  description:
    "Crafter Station is a fast-paced delivery studio shipping world-class products at the speed of AI, with a strong open-source track record.",
  url: "https://crafter.run",
  org: "https://github.com/CrafterStation",
} as const

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Next", href: "/next" },
  { label: "Open source", href: "#open-source" },
  { label: "Team", href: "#team" },
  { label: "Stack", href: "#stack" },
] as const

export const services = [
  {
    title: "Product engineering",
    body: "End-to-end web products built on Next.js and the React ecosystem. From zero-to-one to scaling to millions of pages, we ship without half measures.",
    href: "#contact",
  },
  {
    title: "AI products",
    body: "Streaming LLM UIs, agents, evals, and inference infra. We build with the latest models and the patterns that hold up in production.",
    href: "#contact",
  },
  {
    title: "Design systems",
    body: "Component libraries and tokens that scale across surfaces. We treat the design system as a product, with rigor in versioning and DX.",
    href: "#contact",
  },
  {
    title: "Backend & APIs",
    body: "Postgres, edge runtimes, queues, and the data plumbing your product actually depends on. Built to scale, instrumented from day one.",
    href: "#contact",
  },
] as const

export const products = [
  {
    slug: "tinte",
    title: "tinte",
    tagline: "AI theme generator for VS Code, Shadcn, and beyond",
    description:
      "Generate, remix, and ship beautiful themes across editors and design systems. Used by thousands of developers to make their environment feel like home.",
    technologies: ["Next.js", "AI SDK", "Postgres", "Vercel"],
    url: "https://tinte.dev",
    accent: "from-amber-300 via-orange-400 to-rose-500",
  },
  {
    slug: "lupa",
    title: "lupa",
    tagline: "Search that actually understands your codebase",
    description:
      "Semantic and structural search for engineering teams. Index, ask, and navigate code at the speed of thought.",
    technologies: ["Bun", "Postgres", "pgvector", "Next.js"],
    url: "https://lupa.dev",
    accent: "from-cyan-300 via-sky-500 to-indigo-600",
  },
  {
    slug: "elements",
    title: "elements",
    tagline: "A registry of production-ready UI elements",
    description:
      "Drop-in components and integrations for the apps you actually ship: Clerk, Stripe, Uploadthing, theming, and more. shadcn-compatible.",
    technologies: ["React", "Tailwind", "shadcn", "Registry"],
    url: "https://tryelements.dev",
    accent: "from-emerald-300 via-teal-500 to-cyan-600",
  },
  {
    slug: "text0",
    title: "text0",
    tagline: "The editor we wished we had",
    description:
      "An opinionated, AI-native writing surface for technical teams. Focused, fast, and designed to disappear.",
    technologies: ["Next.js", "AI SDK", "Tiptap"],
    url: "https://text0.dev",
    accent: "from-fuchsia-300 via-purple-500 to-indigo-700",
  },
] as const

export const openSourceRepos = [
  {
    name: "tinte",
    org: "Railly",
    stars: 1240,
    forks: 68,
    description: "AI theme generator for VS Code, Shadcn UI, and more.",
    url: "https://github.com/Railly/tinte",
  },
  {
    name: "lupa",
    org: "CrafterStation",
    stars: 860,
    forks: 41,
    description: "Semantic search for codebases and structured docs.",
    url: "https://github.com/CrafterStation/lupa",
  },
  {
    name: "elements",
    org: "CrafterStation",
    stars: 720,
    forks: 35,
    description: "A registry of production-ready UI components and integrations.",
    url: "https://github.com/CrafterStation/elements",
  },
  {
    name: "text0",
    org: "CrafterStation",
    stars: 410,
    forks: 19,
    description: "AI-native writing surface for technical teams.",
    url: "https://github.com/CrafterStation/text0",
  },
] as const

export const totalStars = openSourceRepos.reduce((s, r) => s + r.stars, 0)
export const totalForks = openSourceRepos.reduce((s, r) => s + r.forks, 0)

export const team = [
  {
    name: "Shiara Arauzo",
    role: "Design Engineer",
    location: "Lima, Peru",
    image: "/team/shiara.png",
  },
  {
    name: "Railly Hugo",
    role: "Design Engineer",
    location: "Lima, Peru",
    image: "/team/railly.png",
  },
  {
    name: "Anthony Cueva",
    role: "Product Engineer",
    location: "Remote",
    image: "/team/cueva.png",
  },
  {
    name: "Emmy Arias",
    role: "Growth & Marketing",
    location: "Bogotá, Colombia",
    image: "/team/emmy.png",
  },
  {
    name: "Cristian Correa",
    role: "Data & Software Engineer",
    location: "Bogotá, Colombia",
    image: "/team/cris.png",
  },
  {
    name: "Nicolas Vargas",
    role: "Backend Developer",
    location: "Bogotá, Colombia",
    image: "/team/nicolas.png",
  },
  {
    name: "Ignacio Velásquez",
    role: "Growth & Automation",
    location: "Arequipa, Peru",
    image: "/team/nacho.png",
  },
  {
    name: "Ignacio Rueda",
    role: "Backend Engineer",
    location: "Lima, Peru",
    image: "/team/ignacio.png",
  },
  {
    name: "Liz Riveros",
    role: "Project Manager",
    location: "Lima, Peru",
    image: "/team/liz.png",
  },
  {
    name: "Gabriel Antunes",
    role: "AI Engineer · Full-Stack",
    location: "Vila Velha, Brazil",
    image: "/team/gabriel.png",
  },
  {
    name: "Carlos Tarmeño",
    role: "Frontend Engineer",
    location: "Lima, Peru",
    image: "/team/tarmeno.png",
  },
  {
    name: "Edward Ramos",
    role: "Frontend Engineer",
    location: "Lima, Peru",
    image: "/team/edward.png",
  },
] as const

export const testimonials = [
  {
    name: "Founder, AI startup",
    role: "Series A, North America",
    quote:
      "They moved faster than our internal team and shipped quality we hadn't seen from any agency. The product feels native, not contracted.",
  },
  {
    name: "Head of Product",
    role: "Devtools, EU",
    quote:
      "Crafter Station joined late and still pulled the launch forward. Strong opinions, no hand-holding required, and the polish is real.",
  },
  {
    name: "CTO",
    role: "Marketplace, LATAM",
    quote:
      "We've worked with a lot of studios. None of them understood our stack the way these folks did on day one.",
  },
] as const

export const stackLogos = [
  { name: "Next.js" },
  { name: "Bun" },
  { name: "Vercel" },
  { name: "Drizzle" },
  { name: "Postgres" },
] as const

export const socials = [
  { label: "GitHub", href: "https://github.com/CrafterStation" },
  { label: "X", href: "https://x.com/CrafterStation" },
  { label: "Discord", href: "https://discord.gg/crafterstation" },
  { label: "Station", href: "https://www.crafterstation.com/" },
] as const
