import type { CSSProperties } from "react"

// Monochrome masks of each project's own icon, tinted with the accent in CSS.
const logos = new Set(["petdex", "agentfiles", "tinte", "elements", "text0", "one-hunter-vscode"])

export function RepoLogo({ name, size }: { name: string; size: "sm" | "lg" }) {
  if (!logos.has(name)) return null
  return <span className={`home-oss-logo home-oss-logo-${size}`} style={{ "--logo": `url(/oss/logos/${name}.png)` } as CSSProperties} aria-hidden="true" />
}
