import type { CSSProperties } from "react"
import { socials } from "@/lib/site"

const railNetworks = ["X", "Instagram", "GitHub", "YouTube"] as const
const assets: Record<string, string> = {
  Instagram: "/brand/instagram.svg",
  GitHub: "/brand/github.svg",
  YouTube: "/brand/youtube.svg",
}

export function StationSocials({ label, className = "" }: { label: string; className?: string }) {
  return (
    <nav aria-label={label} className={`station-socials ${className}`}>
      {railNetworks.map(name => {
        const social = socials.find(item => item.label === name)!
        return (
          <a key={name} href={social.href} aria-label={name} title={name}
            target="_blank" rel="noopener noreferrer">
            {name === "X" ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.311 17.403Z" />
              </svg>
            ) : (
              <span className="station-social-mark" aria-hidden="true"
                style={{ "--social-mark": `url("${assets[name]}")` } as CSSProperties} />
            )}
          </a>
        )
      })}
    </nav>
  )
}
