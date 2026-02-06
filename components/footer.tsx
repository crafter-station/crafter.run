import Link from "next/link"
import { CrafterStationLogo } from "./crafter-station-logo"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <CrafterStationLogo className="h-4 w-4" />
          <span className="font-mono text-xs font-medium tracking-wider text-foreground">
            crafter.run
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="https://www.crafterstation.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-accent"
          >
            Station
          </Link>
          <Link
            href="https://github.com/CrafterStation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-accent"
          >
            GitHub
          </Link>
          <Link
            href="https://x.com/CrafterStation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-accent"
          >
            X / Twitter
          </Link>
          <Link
            href="https://discord.gg/crafterstation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-accent"
          >
            Discord
          </Link>
        </div>
        <p className="font-mono text-[10px] tracking-wider text-foreground/25">
          {"© 2026 Crafter Station. Open source, from Lima to the world."}
        </p>
      </div>
    </footer>
  )
}
