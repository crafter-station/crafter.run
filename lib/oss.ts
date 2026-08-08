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
 * (2026-08-06) used only when the GitHub API is unreachable; live data is
 * fetched with daily revalidation.
 *
 * Accents come from each project's own palette, read from its source where
 * one exists: petdex, agentfiles, tinte, elements, one-hunter-vscode,
 * skill-kit and hack0 from their committed CSS or theme config, kebo from
 * its mobile theme tokens (primary #6934D2, secondary #260035), neon-cli
 * from neon.com/brand. text0 is converted from the oklch values in its
 * globals.css. trx (Whisper), survey-cli and li-metrics are close matches
 * rather than declared tokens. charts and cligentic have no visual identity
 * of their own and use neutral grays. v0-cli is the one guess here: no
 * primary source confirmed a hex, so it follows v0's commonly cited violet.
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
    repo: "kebo-ai/kebo",
    stars: 149,
    openIssues: 7,
    description:
      "AI financial agent trusted by 100k+ users across LATAM — budgeting, transactions, and accounts on iOS & Android",
    language: "TypeScript",
    accent: "from-violet-500 via-purple-600 to-purple-950",
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
    repo: "crafter-station/charts",
    stars: 4,
    openIssues: 0,
    description:
      "Terminal-native charts. Sparklines, line, bar, scatter, candlestick — composable, typed, zero deps.",
    language: "TypeScript",
    accent: "from-slate-400 via-slate-600 to-slate-800",
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
]

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
