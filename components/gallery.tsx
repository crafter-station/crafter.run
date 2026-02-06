import { ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "tinte",
    description: "Theme generator for VSCode & shadcn/ui",
    tags: ["VSCode", "shadcn/ui"],
    stars: "500+",
    href: "https://tinte.railly.dev",
    image: null,
    color: "#F8BC31",
  },
  {
    title: "lupa",
    description: "Knowledge Platform for AI Agents",
    tags: ["AI", "RAG"],
    stars: "New",
    href: "https://github.com/CrafterStation/lupa",
    image: null,
    color: "#6EE7B7",
  },
  {
    title: "elements",
    description: "Fullstack shadcn/ui components",
    tags: ["React", "Fullstack"],
    stars: "200+",
    href: "https://github.com/CrafterStation/elements",
    image: null,
    color: "#93C5FD",
  },
  {
    title: "text0",
    description: "Absurdly smart autocomplete",
    tags: ["AI", "Editor"],
    stars: "Winner",
    href: "https://text0.dev",
    image: null,
    color: "#FCA5A5",
  },
  {
    title: "crafter.run",
    description: "Visual references by Crafter Station",
    tags: ["Gallery", "References"],
    stars: "This site",
    href: "#",
    image: null,
    color: "#C4B5FD",
  },
  {
    title: "crafter registry",
    description: "AI Native Design System",
    tags: ["AI", "Design"],
    stars: "New",
    href: "https://github.com/CrafterStation",
    image: null,
    color: "#FDBA74",
  },
]

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative z-10 border-t border-border bg-background px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
              {"// projects"}
            </p>
            <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-5xl text-balance">
              What we{"'"}ve
              <br />
              <span className="font-light text-foreground/60">been crafting</span>
            </h2>
          </div>
          <a
            href="https://github.com/CrafterStation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-accent"
          >
            View all on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:bg-card/80"
            >
              <div
                className="mb-6 flex h-32 w-full items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.color}08, ${project.color}15)`,
                }}
              >
                <span
                  className="font-mono text-2xl font-bold tracking-tighter opacity-30 transition-opacity group-hover:opacity-60"
                  style={{ color: project.color }}
                >
                  {project.title}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-mono text-[10px] font-medium tracking-wider px-2 py-0.5"
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
                    className="font-mono text-[10px] tracking-wider text-foreground/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-1.5 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <p className="font-mono text-xs font-light leading-relaxed text-foreground/40">
                {project.description}
              </p>

              <div className="mt-auto pt-5">
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-foreground/25 uppercase transition-colors group-hover:text-accent/70">
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
