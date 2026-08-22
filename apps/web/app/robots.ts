import type { MetadataRoute } from "next"

import { baseUrl } from "@/lib/seo"

/* Route handlers under /api are internal plumbing with one exception: the
   read-only endpoints below are the machine-readable half of the site and are
   named in /openapi.json, so agents are told to fetch them. Allow lines are
   more specific than the Disallow, which is how every major crawler resolves
   the overlap. */
const ALLOW = [
  "/",
  "/api/oss/repos",
  "/api/search",
  "/api/next-projects",
  "/api/workshop-questions",
]

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
  const wildcard = [{ userAgent: "*", allow: ALLOW, disallow: DISALLOW }]
  const agents = AI_USER_AGENTS.map((userAgent) => ({
    userAgent,
    allow: ALLOW,
    disallow: DISALLOW,
  }))

  return {
    rules: wildcard.concat(agents),
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
