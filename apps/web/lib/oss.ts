export type OssRepo = {
  repo: string // "owner/name"
  name: string
  url: string
  description: string | null
  stars: number
  openIssues: number // GitHub counts issues + PRs together
  language: string | null
  accent: string // tailwind gradient, drawn from each project's own brand
}

type Seed = Omit<OssRepo, "name" | "url">

/**
 * Curated list of repos across the Crafter Station network that actively
 * accept outside contributors. Numbers are a static fallback snapshot
 * (2026-08-11) used only when the GitHub API is unreachable; live data is
 * fetched with daily revalidation.
 *
 * Accents come from each project's own palette, read from its source where
 * one exists: petdex, agentfiles, tinte, elements, one-hunter-vscode,
 * skill-kit, hack0 and reporte-co from their committed CSS
 * or theme config, neon-cli from neon.com/brand. text0 is converted from the
 * oklch values in its globals.css. trx (Whisper), survey-cli and li-metrics are
 * close matches rather than declared tokens. charts and cligentic have no
 * visual identity of their own and use neutral grays. v0-cli is the one guess
 * here: no primary source confirmed a hex, so it follows v0's commonly cited
 * violet. Repos from crafter-research, crafter-lab and crafter-games use
 * neutral grays until their palettes are read from source.
 */
const seeds: Seed[] = [
  {
    repo: "crafter-station/petdex",
    stars: 3704,
    openIssues: 17,
    description:
      "The public gallery of animated pets for Codex, Claude Code, OpenCode and Gemini CLI",
    language: "TypeScript",
    accent: "from-indigo-400 via-indigo-500 to-blue-600",
  },
  {
    repo: "Railly/agentfiles",
    stars: 721,
    openIssues: 0,
    description:
      "Browse, create, and edit AI agent files across Claude Code, Cursor, Codex, and 12 coding tools — from Obsidian.",
    language: "TypeScript",
    accent: "from-violet-400 via-violet-500 to-purple-700",
  },
  {
    repo: "Railly/tinte",
    stars: 610,
    openIssues: 7,
    description:
      "Agent-native design system infrastructure. Generate, compile, install, and preview design systems from one source of truth.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-station/elements",
    stars: 519,
    openIssues: 4,
    description:
      "Full-stack shadcn/ui blocks for auth, payments, AI, logos, and more",
    language: "TypeScript",
    accent: "from-neutral-300 via-neutral-500 to-neutral-800",
  },
  {
    repo: "crafter-station/text0",
    stars: 450,
    openIssues: 13,
    description: "Absurdly smart (and personal) autocomplete",
    language: "TypeScript",
    accent: "from-blue-500 via-blue-600 to-amber-400",
  },
  {
    repo: "Railly/one-hunter-vscode",
    stars: 386,
    openIssues: 13,
    description:
      "A stylish theme inspired by Vercel Theme ▲ and One Dark Pro 🎨. Powered by Tinte",
    language: "TypeScript",
    accent: "from-pink-500 via-fuchsia-500 to-blue-400",
  },
  {
    repo: "crafter-station/trx",
    stars: 84,
    openIssues: 2,
    description: "Agent-first CLI for audio/video transcription via Whisper",
    language: "TypeScript",
    accent: "from-emerald-400 via-teal-600 to-neutral-900",
  },
  {
    repo: "crafter-station/skill-kit",
    stars: 72,
    openIssues: 0,
    description: "local-first analytics for AI agent skills",
    language: "TypeScript",
    accent: "from-zinc-200 via-zinc-500 to-zinc-900",
  },
  {
    repo: "crafter-station/hack0",
    stars: 34,
    openIssues: 5,
    description: "Hackathons & Tech Events in LATAM",
    language: "TypeScript",
    accent: "from-emerald-300 via-emerald-600 to-emerald-900",
  },
  {
    repo: "crafter-station/crafter-tracker",
    stars: 5,
    openIssues: 5,
    description:
      "Mapa 8-bit en vivo de los ships, cooking sessions y eventos de la comunidad Crafter Station en LATAM",
    language: "TypeScript",
    accent: "from-amber-300 via-amber-500 to-emerald-500",
  },
  {
    repo: "crafter-station/charts",
    stars: 4,
    openIssues: 0,
    description:
      "Terminal-native charts. Sparklines, line, bar, scatter, candlestick — composable, typed, zero deps.",
    language: "TypeScript",
    accent: "from-slate-400 via-slate-600 to-slate-800",
  },
  {
    repo: "crafter-research/sismo-abierto",
    stars: 3,
    openIssues: 2,
    description:
      "Official earthquake, accelerometric, and volcanic data from Peru and Colombia with traceable sources.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-station/neon-cli",
    stars: 2,
    openIssues: 0,
    description:
      "Agentic-first CLI for Neon Postgres - per-project usage, billing, and branch management the dashboard won't show you",
    language: "TypeScript",
    accent: "from-lime-300 via-emerald-400 to-green-600",
  },
  {
    repo: "crafter-station/spaceship-cli",
    stars: 1,
    openIssues: 0,
    description:
      "Agent-first CLI for the Spaceship registrar API with a trust ladder for writes, portfolio linting, and API drift detection.",
    language: "TypeScript",
    accent: "from-white via-neutral-400 to-neutral-800",
  },
  {
    repo: "crafter-station/reporte-co",
    stars: 2,
    openIssues: 2,
    description:
      "Mapa ciudadano para reportar daños, emergencias y necesidades después de un sismo en Colombia",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "shiarauzo/essalud-cli",
    stars: 15,
    openIssues: 1,
    description:
      "Book and cancel EsSalud appointments from the terminal. Unofficial, local-first, your token never leaves your machine.",
    language: "TypeScript",
    accent: "from-teal-300 via-cyan-600 to-sky-800",
  },
  {
    repo: "Railly/cligentic",
    stars: 1,
    openIssues: 4,
    description: "Copy-paste CLI blocks for the agent era. Own your primitives.",
    language: "TypeScript",
    accent: "from-gray-300 via-gray-500 to-gray-800",
  },
  {
    repo: "crafter-station/survey-cli",
    stars: 1,
    openIssues: 0,
    description: "Run surveys from your terminal. Agent-friendly, type-safe, OSS.",
    language: "TypeScript",
    accent: "from-red-400 via-red-700 to-neutral-900",
  },
  {
    repo: "Railly/v0-cli",
    stars: 0,
    openIssues: 0,
    description:
      "Agent-first CLI for the v0 Platform API. JSON contract, trust ladder, audit trail, intent tokens.",
    language: "TypeScript",
    accent: "from-violet-400 via-blue-500 to-neutral-950",
  },
  {
    repo: "crafter-station/li-metrics",
    stars: 0,
    openIssues: 0,
    description: null,
    language: "TypeScript",
    accent: "from-sky-500 via-blue-600 to-blue-800",
  },
  {
    repo: "crafter-research/sunat-cli",
    stars: 104,
    openIssues: 0,
    description: "Agent-first CLI for SUNAT tax automation - gov-tech tool for Peruvian freelancers",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/legalize-pe-engine",
    stars: 7,
    openIssues: 0,
    description: "Engine for legalize-pe: recon CLI, web app, scraper packages. Pre-1.0 — breaking changes expected.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/political-graph",
    stars: 5,
    openIssues: 0,
    description: "Grafo interactivo de relaciones entre políticos peruanos y casos de corrupción.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/peru-financia",
    stars: 4,
    openIssues: 0,
    description: "Mapa open-source de financiamiento político peruano. Datos ONPE 1995–2026.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/onpe-cli",
    stars: 4,
    openIssues: 0,
    description: "Agent-first CLI for ONPE election data",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/peru-gov",
    stars: 3,
    openIssues: 0,
    description: "Hola, Perú: unofficial assistant that routes situations to the right gob.pe procedure",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/amicus-eval",
    stars: 2,
    openIssues: 0,
    description: "Open retrieval benchmark for Spanish-language Peruvian legal QA. Reproduce every metric yourself.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/timeline-peru",
    stars: 2,
    openIssues: 0,
    description: "public timeline of peruvian history",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/becas-cli",
    stars: 1,
    openIssues: 0,
    description: "CLI para oportunidades educativas de Perú con perfiles, evidencia oficial y salida JSON.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/latambench",
    stars: 1,
    openIssues: 0,
    description: "LatamBench: Generation-first LLM benchmark for Latin American Spanish",
    language: "Astro",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/candidatos",
    stars: 1,
    openIssues: 0,
    description: "Explorador de candidatos para las Elecciones Generales Peru 2026. Cruza datos JNE + peru-financia + political-graph.",
    language: "Astro",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-research/muniscan",
    stars: 0,
    openIssues: 0,
    description: "Automated, census-wide index of the digital surface Peru's 1,794 municipalities declare on gob.pe",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-lab/circuitkit",
    stars: 0,
    openIssues: 0,
    description: "Typed circuit diagrams, linked node annotations and portable SVG for authors and agents.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/dotframe",
    stars: 3,
    openIssues: 0,
    description: "TS-first game engine: one codebase for web and native macOS/Windows via scriptc",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/crafter-smash",
    stars: 2,
    openIssues: 0,
    description: "Crafter Smash: juego de pelea estilo Super Smash Flash con los crafters",
    language: "JavaScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/learnkafka",
    stars: 1,
    openIssues: 0,
    description: "Learn Apache Kafka by playing — a visual game (EN/ES)",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/learnclickhouse",
    stars: 1,
    openIssues: 0,
    description: "Column Depot — a 3D warehouse game that teaches ClickHouse (unofficial)",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/iris-vn",
    stars: 1,
    openIssues: 0,
    description: "Iris.exe — visual novel web de citas y misterio",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/the-ones-game",
    stars: 1,
    openIssues: 0,
    description: "THE ONES (選ばれし者) — horror en primera persona en el Japón rural de 1998. Descarga para Windows.",
    language: "HTML",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/craft-ones",
    stars: 0,
    openIssues: 0,
    description: "Tiny 1v1 turn-based artillery prototype: six Peruvian critters, six tools, 15-second turns.",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
  {
    repo: "crafter-games/espresso",
    stars: 0,
    openIssues: 0,
    description: "Espresso perfecto, the Hot Reload game built with dotframe",
    language: "TypeScript",
    accent: "from-neutral-200 via-neutral-500 to-neutral-900",
  },
]

export const ossRepoNames = seeds.map((seed) => seed.repo)

function fromSeed(seed: Seed): OssRepo {
  return {
    ...seed,
    name: seed.repo.split("/")[1],
    url: `https://github.com/${seed.repo}`,
  }
}

async function fetchRepo(seed: Seed): Promise<OssRepo> {
  try {
    const res = await fetch(`https://api.github.com/repos/${seed.repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "crafter-station-website",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return fromSeed(seed)
    const data = (await res.json()) as {
      stargazers_count?: number
      open_issues_count?: number
      description?: string | null
      language?: string | null
    }
    return {
      ...fromSeed(seed),
      stars: data.stargazers_count ?? seed.stars,
      openIssues: data.open_issues_count ?? seed.openIssues,
      description: data.description ?? seed.description,
      language: data.language ?? seed.language,
    }
  } catch {
    return fromSeed(seed)
  }
}

export async function getOssRepos(): Promise<OssRepo[]> {
  const repos = await Promise.all(seeds.map(fetchRepo))
  return repos.sort((a, b) => b.stars - a.stars)
}
