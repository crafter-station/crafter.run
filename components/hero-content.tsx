import { ArrowDown } from "lucide-react"

export function HeroContent() {
  return (
    <div className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-muted-foreground mb-6 text-xs font-medium tracking-[0.3em] uppercase">
        Design Studio
      </p>
      <h1 className="text-foreground font-serif text-5xl font-light leading-tight tracking-tight md:text-7xl lg:text-8xl text-balance">
        Creation Without
        <br />
        Limitation
      </h1>
      <p className="text-muted-foreground mt-8 max-w-md text-base leading-relaxed md:text-lg">
        We craft digital experiences that push the boundaries of what{"'"}s possible on the web.
      </p>
      <div className="mt-12 flex items-center gap-4">
        <a
          href="#work"
          className="bg-foreground text-background rounded-full px-8 py-3 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
        >
          View Work
        </a>
        <a
          href="#about"
          className="border-foreground/20 text-foreground rounded-full border px-8 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-foreground/10"
        >
          Learn More
        </a>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">
          Scroll to explore
        </span>
        <ArrowDown className="text-muted-foreground h-4 w-4 animate-bounce" />
      </div>
    </div>
  )
}
