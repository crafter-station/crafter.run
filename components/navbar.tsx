import Link from "next/link"
import { CrafterStationLogo } from "./crafter-station-logo"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-foreground/[0.06] bg-background/60 px-6 py-4 backdrop-blur-md md:px-12">
      <Link href="/" className="flex items-center gap-2.5">
        <CrafterStationLogo className="h-6 w-6" />
        <span className="font-mono text-sm font-medium tracking-wider text-foreground">
          crafter.run
        </span>
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <Link
          href="#gallery"
          className="font-mono text-[11px] tracking-widest text-foreground/50 uppercase transition-colors hover:text-foreground"
        >
          Gallery
        </Link>
        <Link
          href="#projects"
          className="font-mono text-[11px] tracking-widest text-foreground/50 uppercase transition-colors hover:text-foreground"
        >
          Projects
        </Link>
        <Link
          href="https://www.crafterstation.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-widest text-foreground/50 uppercase transition-colors hover:text-foreground"
        >
          Station
        </Link>
      </div>
      <Link
        href="https://github.com/CrafterStation"
        target="_blank"
        rel="noopener noreferrer"
        className="border border-foreground/20 text-foreground px-5 py-2 font-mono text-[11px] tracking-widest uppercase transition-all hover:border-accent hover:text-accent"
      >
        GitHub
      </Link>
    </nav>
  )
}
