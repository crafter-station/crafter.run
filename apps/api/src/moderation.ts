type ModeratedShip = { name: string; tagline: string; description: string }

// allowed: false rejects the text outright. review: true means automated moderation could not run, so the
// Ship waits for an admin instead of going live unchecked.
export type ModerationResult = { allowed: boolean; review: boolean; reason: string }

const unsafeContent = /(?:-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{16,})/

export async function moderateShip(ship: ModeratedShip): Promise<ModerationResult> {
  const content = `${ship.name}\n${ship.tagline}\n${ship.description}`
  if (unsafeContent.test(content)) {
    return { allowed: false, review: false, reason: "Remove credentials or private keys before publishing." }
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return { allowed: true, review: true, reason: "Automated moderation is not configured." }
  let response: Response
  try {
    response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({ model: "omni-moderation-latest", input: content }),
    })
  } catch {
    return { allowed: true, review: true, reason: "Automated moderation is unavailable." }
  }
  if (!response.ok) return { allowed: true, review: true, reason: `Moderation service returned ${response.status}.` }
  const body = (await response.json()) as { results?: Array<{ flagged?: boolean }> }
  return body.results?.[0]?.flagged
    ? { allowed: false, review: false, reason: "The Ship description was flagged for review. Revise it or contact Crafter Station." }
    : { allowed: true, review: false, reason: "Moderation passed." }
}
