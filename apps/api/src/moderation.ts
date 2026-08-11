type ModeratedShip = { name: string; tagline: string; description: string }

const unsafeContent = /(?:-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{16,})/

export async function moderateShip(ship: ModeratedShip) {
  const content = `${ship.name}\n${ship.tagline}\n${ship.description}`
  if (unsafeContent.test(content)) {
    return { allowed: false, reason: "Remove credentials or private keys before publishing." }
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return { allowed: true, reason: "Automated moderation is not configured." }
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ model: "omni-moderation-latest", input: content }),
  })
  if (!response.ok) throw new Error(`Moderation service returned ${response.status}`)
  const body = (await response.json()) as { results?: Array<{ flagged?: boolean }> }
  return body.results?.[0]?.flagged
    ? { allowed: false, reason: "The Ship description was flagged for review. Revise it or contact Crafter Station." }
    : { allowed: true, reason: "Moderation passed." }
}
