import { Search, ArrowDown } from "lucide-react"
import { CrafterStationLogo } from "./crafter-station-logo"

export function HeroContent() {
  return (
    <div className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
      <CrafterStationLogo className="mb-8 h-14 w-14 drop-shadow-[0_0_24px_rgba(248,188,49,0.4)]" />
      <p className="mb-5 font-mono text-xs font-light tracking-[0.35em] uppercase text-accent">
        {"by crafter station"}
      </p>
      <h1 className="text-foreground text-5xl font-bold leading-[1.05] tracking-tighter md:text-7xl lg:text-[5.5rem] text-balance">
        crafter
        <span className="text-accent">.</span>run
      </h1>
      <p className="mt-6 max-w-md font-mono text-sm font-light leading-relaxed text-foreground/60 md:text-base">
        Visual references and open source projects crafted by the Crafter Station team.
      </p>
      <div className="mt-10 w-full max-w-lg">
        <div className="group flex items-center gap-3 border border-foreground/15 bg-background/60 px-5 py-3.5 backdrop-blur-sm transition-all focus-within:border-accent/50 focus-within:shadow-[0_0_20px_rgba(248,188,49,0.1)] hover:border-foreground/25">
          <Search className="h-4 w-4 shrink-0 text-foreground/30 transition-colors group-focus-within:text-accent" />
          <input
            type="text"
            placeholder="Search projects, references, tools..."
            className="w-full bg-transparent font-mono text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
          <kbd className="hidden shrink-0 font-mono text-[10px] text-foreground/20 md:block">/</kbd>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {["tinte", "lupa", "elements", "text0"].map((tag) => (
          <span
            key={tag}
            className="border border-foreground/10 px-3 py-1 font-mono text-[11px] text-foreground/40 transition-colors hover:border-accent/30 hover:text-accent cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] font-light tracking-[0.35em] uppercase text-foreground/30">
          Explore gallery
        </span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-foreground/30" />
      </div>
    </div>
  )
}
