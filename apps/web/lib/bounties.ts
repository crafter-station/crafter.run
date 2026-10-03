export type Bounty = {
  slug: string
  title: string
  prize: string
  summary: string
  steps: string[]
  rewards: string[]
  eventUrl: string
  closesAt: string
}

export const bounties: Bounty[] = [
  {
    slug: "1",
    title: "5 entradas gratis para AI Frontier Conf '26",
    prize: "Sábado 17 de octubre, 9am, UTEC Barranco",
    summary:
      "Hablan Jorge Escobedo (Head of AI, Yape), Luis Huayaney (Head of AI, Mibanco), Adolfo Valdivieso (Turbo AI, Stanford), Arturo Deza (Artificio, MIT & Harvard) e Ignacio Velásquez de Crafter Station, que monta agentes autónomos en vivo en el Builder Track.",
    steps: [
      "Este finde construye algo con IA.",
      "Hazle un video con Opus 5.5.",
      "Postéalo en X, LinkedIn o IG etiquetando a @RaillyHugo y @crafterstation, con el link del evento.",
      "Manda el link de tu post aquí antes del domingo 4 a las 11pm.",
    ],
    rewards: [
      "3 entradas para los mejores posts.",
      "2 entradas sorteadas entre todos los que participen.",
      "Ganadores el lunes 5, solo si puedes ir presencial.",
    ],
    eventUrl: "https://eventos.utec.edu.pe/ai-frontier-conf-26",
    closesAt: "2026-10-05T04:00:00Z",
  },
]

export function getBounty(slug: string) {
  return bounties.find((bounty) => bounty.slug === slug) ?? null
}

export function isBountyOpen(bounty: Bounty, now = new Date()) {
  return now < new Date(bounty.closesAt)
}

/**
 * Normalizes a WhatsApp phone number to E.164 or a WhatsApp username to `@name`.
 * Bare 9-digit numbers starting with 9 are Peruvian mobiles.
 */
export function normalizeWhatsappContact(input: string) {
  const value = input.trim()
  const digits = value.replace(/[\s().-]/g, "")
  if (/^9\d{8}$/.test(digits)) return `+51${digits}`
  if (/^\+[1-9]\d{7,14}$/.test(digits)) return digits
  const username = value.replace(/^@/, "")
  if (/^[a-zA-Z0-9._]{3,35}$/.test(username) && /[a-zA-Z]/.test(username)) return `@${username}`
  return null
}
