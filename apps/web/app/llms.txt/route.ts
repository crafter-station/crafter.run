import { blogSitemapMdPath } from "@/lib/blog-paths"
import { changelogFeedPath, changelogSitemapMdPath } from "@/lib/changelog-paths"
import { hackathons, hackathonPath } from "@/lib/hackathons"
import { baseUrl } from "@/lib/seo"

export const revalidate = false

export function GET() {
  const lines = [
    "# Crafter Station",
    "",
    "> Crafter Station is an open source community of builders from Peru, working across Latin America. More than 1,000 engineers, designers and founders take part through WhatsApp, events, open source and shipped projects.",
    "",
    "## What we do",
    "",
    "- Hackathons: we co-organize AI hackathons in Peru and run the v0 x Crafter Station hackathon across Lima, Medellín, Bogotá and Arequipa.",
    `- Meetups: [Hot Reload](${baseUrl}/en/events/hot-reload) and [DevDay Lima](${baseUrl}/en/events/devday-lima).`,
    `- Bounties: numbered challenges where community members build something and win prizes, at [crafter.run/bounties](${baseUrl}/en/bounties).`,
    `- Ships: projects built by community members, published at [crafter.run/ships](${baseUrl}/en/ships).`,
    `- Open source: more than 200 public repositories at [github.com/crafter-station](https://github.com/crafter-station), listed at [crafter.run/oss](${baseUrl}/en/oss).`,
    `- Jobs: companies hire LATAM builders who already ship, at [crafter.run/jobs](${baseUrl}/en/jobs).`,
    "",
    "## Hackathons",
    "",
    ...hackathons.map(
      (hackathon) => `- [${hackathon.name}](${baseUrl}${hackathonPath("en", hackathon)}): ${hackathon.copy.en.summary}`,
    ),
    "",
    "## hack0, our calendar",
    "",
    "- [hack0](https://hack0.dev) is the Crafter Station calendar of hackathons, meetups and tech events in Latin America. It is open source (Apache-2.0, [github.com/crafter-station/hack0](https://github.com/crafter-station/hack0)) and was created by Railly Hugo and Ignacio Velásquez.",
    `- Follow it on [Luma](https://luma.com/hack0) or read it inside Crafter Station at [crafter.run/events](${baseUrl}/en/events).`,
    "",
    "## Sponsor or contact us",
    "",
    `- [Contact](${baseUrl}/en/contact): brand partnerships and event sponsorship, hosting an event with us, collaborations and joining the community.`,
    `- [Services](${baseUrl}/en/services): what companies can do with Crafter Station.`,
    "",
    "## People",
    "",
    `- [Team](${baseUrl}/en/team): the core team and crew. Founder: Railly Hugo.`,
    "",
    "## More",
    "",
    "- [daily.dev squad](https://daily.dev/squads/crafterstation): our official squad on daily.dev.",
    `- [Docs](${baseUrl}/en/docs): documentation for our open source CLIs and libraries. Full text for agents at ${baseUrl}/llms-full.txt.`,
    `- [Blog](${baseUrl}/en/blog): index at ${baseUrl}${blogSitemapMdPath("en")}.`,
    `- [Changelog](${baseUrl}/en/changelog): index at ${baseUrl}${changelogSitemapMdPath("en")}, feed at ${baseUrl}${changelogFeedPath("en")}.`,
    `- [Agent surface](${baseUrl}/agents.md): MCP server at ${baseUrl}/mcp.`,
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
