import Link from "next/link"
import { CrafterStationLogo } from "./crafter-station-logo"

const footerLinks = [
  { href: "https://www.crafterstation.com/", label: "Station" },
  { href: "https://github.com/CrafterStation", label: "GitHub" },
  { href: "https://x.com/CrafterStation", label: "X / Twitter" },
  { href: "https://discord.gg/crafterstation", label: "Discord" },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CrafterStationLogo className="h-4 w-4" />
          <span className="font-mono text-xs font-medium tracking-wider text-foreground">
            crafter.run
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-accent active:text-accent sm:text-[11px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="font-mono text-[9px] tracking-wider text-foreground/25 sm:text-[10px]">
          {"© 2026 Crafter Station"}
        </p>
      </div>
    </footer>
  )
}
