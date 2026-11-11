/**
 * Companies and institutions that backed a Crafter hackathon, with the event each one backed.
 * One source for every surface that shows them. Logos live in `public/`, never hotlinked.
 * Add a partner only with evidence: the event's own site or its partner records.
 */
export type PartnerEventId = "the-next-craft-2026" | "ia-hackathon-peru-2025"

export type PartnerEvent = { id: PartnerEventId; name: string; year: string; date: string; href: string; raised: number }

export type Partner = { name: string; logo: string; href: string; events: PartnerEventId[] }

export const partnerEvents: PartnerEvent[] = [
  { id: "the-next-craft-2026", name: "The Next Craft", year: "2026", date: "2026-08-08", href: "https://thenextcraft.org/", raised: 15750 },
  { id: "ia-hackathon-peru-2025", name: "IA Hackathon Perú", year: "2025", date: "2025-11-29", href: "https://peru.ai-hackathon.co/", raised: 9500 },
]

const tnc = "the-next-craft-2026"
const pah = "ia-hackathon-peru-2025"
const logo = (file: string) => `/hackathons/partners/${file}`

export const partners: Partner[] = [
  { name: "3DevLabs", logo: logo("3DevLabs.svg"), href: "https://3devlabs.app", events: [tnc] },
  { name: "Apify", logo: logo("apify.svg"), href: "https://apify.com", events: [tnc] },
  { name: "Bioincuba", logo: logo("bioincuba.webp"), href: "https://bioincuba.cayetano.pe", events: [pah] },
  { name: "Cayetano Heredia", logo: logo("cayetano.webp"), href: "https://cayetano.edu.pe", events: [tnc, pah] },
  { name: "Clerk", logo: logo("clerk.svg"), href: "https://clerk.com", events: [tnc, pah] },
  { name: "CloudForge AI", logo: logo("cloudforge.svg"), href: "https://www.cloud-forge-ai.com", events: [tnc, pah] },
  { name: "Convex", logo: logo("convex.svg"), href: "https://convex.dev", events: [tnc] },
  { name: "Cursor", logo: "/collaborations/cursor.svg", href: "https://cursor.com", events: [tnc, pah] },
  { name: "ElevenLabs", logo: logo("elevenlabs.svg"), href: "https://elevenlabs.io", events: [tnc, pah] },
  { name: "Exa", logo: logo("exa.svg"), href: "https://exa.ai", events: [tnc] },
  { name: "forHuman", logo: logo("forhuman.webp"), href: "https://forhuman.studio", events: [pah] },
  { name: "Huawei", logo: logo("huawei.webp"), href: "https://huawei.com", events: [pah] },
  { name: "Little Caesars", logo: logo("little-caesars.webp"), href: "https://pe.littlecaesars.com", events: [pah] },
  { name: "Lovable", logo: logo("lovable.svg"), href: "https://lovable.dev", events: [pah] },
  { name: "n8n", logo: logo("n8n.svg"), href: "https://n8n.io", events: [tnc] },
  { name: "Repensar", logo: logo("repensar.webp"), href: "https://repensar.la", events: [pah] },
  { name: "Replit", logo: logo("replit.svg"), href: "https://replit.com", events: [tnc] },
  { name: "Tavily", logo: logo("tavily.svg"), href: "https://tavily.com", events: [tnc] },
  { name: "UCSM", logo: logo("ucsm.png"), href: "https://ucsm.edu.pe", events: [tnc] },
  { name: "v0", logo: "/collaborations/v0.png", href: "https://v0.app", events: [pah] },
  { name: "Vapi", logo: logo("vapi.svg"), href: "https://vapi.ai", events: [tnc] },
  { name: "Yalo", logo: logo("yalo.svg"), href: "https://yalo.ai", events: [tnc] },
  { name: "Yavendió", logo: logo("yavendio.webp"), href: "https://yavendio.com", events: [pah] },
]

/** Newest event first; inside an event, partners that backed more events first, then by name. */
export function partnersByEvent() {
  return [...partnerEvents]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((event) => ({
      event,
      partners: partners
        .filter((partner) => partner.events.includes(event.id))
        .sort((a, b) => b.events.length - a.events.length || a.name.localeCompare(b.name)),
    }))
}
