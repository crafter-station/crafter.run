import type { MetadataRoute } from "next"

import { baseUrl } from "@/lib/seo"

const DISALLOW = ["/_next/", "/api/"]

/* Every product reads its own user-agent; naming them keeps the per-bot
   policy reviewable. All allowed: Crafter Station wants to be the cited
   source in AI answers. */
const AI_USER_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Meta-ExternalFetcher",
  "MistralAI-User",
  "Bytespider",
  "Amazonbot",
  "DuckAssistBot",
  "Google-CloudVertexBot",
]

export default function robots(): MetadataRoute.Robots {
  const wildcard = [{ userAgent: "*", allow: "/", disallow: DISALLOW }]
  const agents = AI_USER_AGENTS.map((userAgent) => ({
    userAgent,
    allow: "/",
    disallow: DISALLOW,
  }))

  return {
    rules: wildcard.concat(agents),
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
