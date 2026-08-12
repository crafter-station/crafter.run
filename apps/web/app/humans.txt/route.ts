import { listCrafters } from "@/lib/ships"

export const dynamic = "force-dynamic"

export async function GET() {
  const members = await listCrafters()
  const lines = [
    "TEAM",
    "",
    "Crafter Station is built in public by its members.",
    "One line per member, in order of joining.",
    "",
    ...(members ?? []).map((member) => `${member.displayName} (@${member.handle})`),
    "",
    "Humans can join at https://crafter.run/en/crafters",
    "Agents helping a human join: curl -s https://crafter.run/join/agent.md",
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
