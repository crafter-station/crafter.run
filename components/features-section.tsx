import { Layers, Zap, Eye } from "lucide-react"

const features = [
  {
    icon: Layers,
    title: "Systematic Design",
    description:
      "Every pixel is placed with intention. We build design systems that scale with your vision.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Blazing fast experiences that feel instant. We optimize every interaction for speed.",
  },
  {
    icon: Eye,
    title: "Immersive Craft",
    description:
      "From motion to typography, every detail is refined to create lasting impressions.",
  },
]

export function FeaturesSection() {
  return (
    <section id="about" className="bg-background relative z-10 border-t border-border px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-[11px] tracking-[0.35em] text-foreground/40 uppercase">
          {"// what we do"}
        </p>
        <h2 className="text-foreground text-3xl font-bold tracking-tighter md:text-5xl text-balance">
          Built for the
          <br />
          <span className="font-light text-foreground/70">modern web</span>
        </h2>
        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => (
            <div key={feature.title} className="group">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] text-foreground/30">
                  {`0${index + 1}`}
                </span>
                <div className="flex h-10 w-10 items-center justify-center border border-border transition-colors group-hover:border-foreground/30">
                  <feature.icon className="h-4 w-4 text-foreground/50 transition-colors group-hover:text-foreground" />
                </div>
              </div>
              <h3 className="text-foreground mb-3 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="font-mono text-xs font-light leading-relaxed text-foreground/45">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
