import { ArrowDown } from "lucide-react"

export function HeroContent() {
  return (
    <div className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 font-mono text-xs font-light tracking-[0.35em] uppercase text-foreground/60">
        {"// design studio"}
      </p>
      <h1 className="text-foreground text-5xl font-bold leading-[1.05] tracking-tighter md:text-7xl lg:text-[5.5rem] text-balance drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        Creation Without
        <br />
        <span className="font-light text-foreground/80">Limitation</span>
      </h1>
      <p className="mt-8 max-w-lg font-mono text-sm font-light leading-relaxed text-foreground/50 md:text-base">
        We craft digital experiences that push the boundaries of what{"'"}s possible on the web.
      </p>
      <div className="mt-12 flex items-center gap-4">
        <a
          href="#work"
          className="bg-foreground text-background px-8 py-3 font-mono text-xs font-medium tracking-wider uppercase transition-all hover:bg-foreground/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          View Work
        </a>
        <a
          href="#about"
          className="border border-foreground/25 text-foreground px-8 py-3 font-mono text-xs font-medium tracking-wider uppercase transition-all hover:border-foreground/50 hover:bg-foreground/5"
        >
          Learn More
        </a>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] font-light tracking-[0.35em] uppercase text-foreground/40">
          Scroll
        </span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-foreground/40" />
      </div>
    </div>
  )
}
