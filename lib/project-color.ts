/**
 * Deterministic color for a project/repo name. Same name always yields the same
 * hue. Saturation/lightness are fixed so every color stays legible on the dark
 * brutalist background.
 */
export function projectColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 65%, 60%)`
}

/** Display label for a repo full name ("owner/repo" -> "repo"). */
export function repoLabel(fullName: string): string {
  const parts = fullName.split("/")
  return parts[parts.length - 1]
}
