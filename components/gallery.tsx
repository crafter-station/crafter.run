import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "tinte",
    description: "Theme generator for VSCode & shadcn/ui",
    tags: ["VSCode", "shadcn/ui"],
    stars: "500+",
    href: "https://tinte.railly.dev",
    color: "#F8BC31",
  },
  {
    title: "lupa",
    description: "Knowledge Platform for AI Agents",
    tags: ["AI", "RAG"],
    stars: "New",
    href: "https://github.com/CrafterStation/lupa",
    color: "#6EE7B7",
  },
  {
    title: "elements",
    description: "Fullstack shadcn/ui components",
    tags: ["React", "Fullstack"],
    stars: "200+",
    href: "https://github.com/CrafterStation/elements",
    color: "#93C5FD",
  },
  {
    title: "text0",
    description: "Absurdly smart autocomplete",
    tags: ["AI", "Editor"],
    stars: "Winner",
    href: "https://text0.dev",
    color: "#FCA5A5",
  },
  {
    title: "crafter.run",
    description: "Visual references by Crafter Station",
    tags: ["Gallery", "References"],
    stars: "This site",
    href: "#",
    color: "#C4B5FD",
  },
  {
    title: "crafter registry",
    description: "AI Native Design System",
    tags: ["AI", "Design"],
    stars: "New",
    href: "https://github.com/CrafterStation",
    color: "#FDBA74",
  },
]

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative z-10 border-t border-border bg-background px-4 py-14 sm:px-6 sm:py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-start gap-3 sm:mb-12 sm:gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.35em] text-accent uppercase sm:mb-3 sm:text-[11px]">
              {"// projects"}
            </p>
            <h2 className="text-2xl font-bold tracking-tighter text-foreground sm:text-3xl md:text-5xl text-balance">
              What we{"'"}ve
              <br />
              <span className="font-light text-foreground/60">been crafting</span>
            </h2>
          </div>
          <a
            href="https://github.com/CrafterStation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-accent sm:text-[11px]"
          >
            View all on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col border border-border bg-card p-4 transition-all hover:border-foreground/20 hover:bg-card/80 active:border-foreground/20 sm:p-5 md:p-6"
            >
              <div
                className="mb-4 flex h-24 w-full items-center justify-center sm:mb-5 sm:h-28 md:mb-6 md:h-32"
                style={{
                  background: `linear-gradient(135deg, ${project.color}08, ${project.color}15)`,
                }}
              >
                <span
                  className="font-mono text-xl font-bold tracking-tighter opacity-30 transition-opacity group-hover:opacity-60 sm:text-2xl"
                  style={{ color: project.color }}
                >
                  {project.title}
                </span>
              </div>

              <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:mb-3 sm:gap-2">
                <span
                  className="font-mono text-[9px] font-medium tracking-wider px-1.5 py-0.5 sm:text-[10px] sm:px-2"
                  style={{
                    color: project.color,
                    backgroundColor: `${project.color}15`,
                  }}
                >
                  {project.stars}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-wider text-foreground/30 sm:text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-1 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:mb-1.5 sm:text-lg">
                {project.title}
              </h3>
              <p className="font-mono text-[11px] font-light leading-relaxed text-foreground/40 sm:text-xs">
                {project.description}
              </p>

              <div className="mt-auto pt-4 sm:pt-5">
                <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-foreground/25 uppercase transition-colors group-hover:text-accent/70 sm:text-[10px]">
                  Explore
                  <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
