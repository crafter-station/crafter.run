import { Search } from "lucide-react"
import { CrafterStationLogo } from "./crafter-station-logo"

export function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 pt-16 pb-20 text-center sm:px-6 md:pt-20">
      <CrafterStationLogo className="mb-6 h-10 w-10 drop-shadow-[0_0_30px_rgba(248,188,49,0.5)] sm:mb-8 sm:h-12 sm:w-12 md:h-14 md:w-14" />
      <p className="mb-3 font-mono text-[9px] font-medium tracking-[0.4em] uppercase text-accent drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:text-[10px] sm:mb-4 md:text-xs md:mb-5">
        {"by crafter station"}
      </p>
      <h1 className="text-foreground text-3xl font-bold leading-[1.05] tracking-tighter drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] xs:text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] text-balance">
        crafter
        <span className="text-accent drop-shadow-[0_0_20px_rgba(248,188,49,0.4)]">.</span>run
      </h1>
      <p className="mt-4 max-w-[280px] font-mono text-[11px] font-light leading-relaxed text-foreground/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:max-w-sm sm:text-xs md:mt-6 md:max-w-md md:text-sm lg:text-base">
        Visual references and open source projects crafted by the Crafter Station team.
      </p>

      <div className="mt-6 w-full max-w-[calc(100%-1rem)] sm:mt-8 sm:max-w-md md:mt-10 md:max-w-lg">
        <div className="group flex items-center gap-2.5 border border-foreground/15 bg-background/70 px-3.5 py-2.5 backdrop-blur-md transition-all focus-within:border-accent/50 focus-within:shadow-[0_0_24px_rgba(248,188,49,0.12)] hover:border-foreground/25 sm:gap-3 sm:px-4 sm:py-3 md:px-5 md:py-3.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-foreground/40 transition-colors group-focus-within:text-accent sm:h-4 sm:w-4" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-transparent font-mono text-xs font-light text-foreground placeholder:text-foreground/35 focus:outline-none sm:text-sm sm:placeholder:content-['Search_projects,_references,_tools...']"
          />
          <kbd className="hidden shrink-0 font-mono text-[10px] text-foreground/25 sm:block">/</kbd>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:mt-5 sm:gap-2 md:mt-6">
        {["tinte", "lupa", "elements", "text0"].map((tag) => (
          <span
            key={tag}
            className="border border-foreground/10 bg-background/40 px-2.5 py-0.5 font-mono text-[10px] text-foreground/50 backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent cursor-pointer sm:px-3 sm:py-1 sm:text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  )
}
