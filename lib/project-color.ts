/**
 * Deterministic color for a project/repo name. Same name always yields the same
 * hue. Saturation and lightness come from --project-sat/--project-lum, which
 * globals.css swaps per theme: the values tuned for the dark brutalist
 * background wash out on white, so light mode darkens and saturates instead.
 */
export function projectColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue} var(--project-sat, 65%) var(--project-lum, 60%))`
}

/** Display label for a repo full name ("owner/repo" -> "repo"). */
export function repoLabel(fullName: string): string {
  const parts = fullName.split("/")
  return parts[parts.length - 1]
}
