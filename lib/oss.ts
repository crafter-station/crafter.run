export type OssRepo = {
  repo: string // "owner/name"
  name: string
  url: string
  description: string | null
  stars: number
  openIssues: number // GitHub counts issues + PRs together
  language: string | null
}

type Seed = Omit<OssRepo, "name" | "url">

/**
 * Curated list of repos across the Crafter Station network that actively
 * accept outside contributors. Numbers are a static fallback snapshot
 * (2026-08-06) used only when the GitHub API is unreachable; live data is
 * fetched with daily revalidation.
 */
const seeds: Seed[] = [
  {
    repo: "crafter-station/petdex",
    stars: 3704,
    openIssues: 17,
    description:
      "The public gallery of animated pets for Codex, Claude Code, OpenCode and Gemini CLI",
    language: "TypeScript",
  },
  {
    repo: "Railly/agentfiles",
    stars: 721,
    openIssues: 0,
    description:
      "Browse, create, and edit AI agent files across Claude Code, Cursor, Codex, and 12 coding tools — from Obsidian.",
    language: "TypeScript",
  },
  {
    repo: "Railly/tinte",
    stars: 610,
    openIssues: 7,
    description:
      "Agent-native design system infrastructure. Generate, compile, install, and preview design systems from one source of truth.",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/elements",
    stars: 519,
    openIssues: 4,
    description:
      "Full-stack shadcn/ui blocks for auth, payments, AI, logos, and more",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/text0",
    stars: 450,
    openIssues: 13,
    description: "Absurdly smart (and personal) autocomplete",
    language: "TypeScript",
  },
  {
    repo: "Railly/one-hunter-vscode",
    stars: 386,
    openIssues: 13,
    description:
      "A stylish theme inspired by Vercel Theme ▲ and One Dark Pro 🎨. Powered by Tinte",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/trx",
    stars: 84,
    openIssues: 2,
    description: "Agent-first CLI for audio/video transcription via Whisper",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/skill-kit",
    stars: 72,
    openIssues: 0,
    description: "local-first analytics for AI agent skills",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/hack0",
    stars: 34,
    openIssues: 5,
    description: "Hackathons & Tech Events in LATAM",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/charts",
    stars: 4,
    openIssues: 0,
    description:
      "Terminal-native charts. Sparklines, line, bar, scatter, candlestick — composable, typed, zero deps.",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/neon-cli",
    stars: 2,
    openIssues: 0,
    description:
      "Agentic-first CLI for Neon Postgres - per-project usage, billing, and branch management the dashboard won't show you",
    language: "TypeScript",
  },
  {
    repo: "Railly/cligentic",
    stars: 1,
    openIssues: 4,
    description: "Copy-paste CLI blocks for the agent era. Own your primitives.",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/survey-cli",
    stars: 1,
    openIssues: 0,
    description: "Run surveys from your terminal. Agent-friendly, type-safe, OSS.",
    language: "TypeScript",
  },
  {
    repo: "Railly/v0-cli",
    stars: 0,
    openIssues: 0,
    description:
      "Agent-first CLI for the v0 Platform API. JSON contract, trust ladder, audit trail, intent tokens.",
    language: "TypeScript",
  },
  {
    repo: "crafter-station/li-metrics",
    stars: 0,
    openIssues: 0,
    description: null,
    language: "TypeScript",
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
