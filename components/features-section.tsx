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
    <section id="about" className="bg-background relative z-10 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-muted-foreground mb-4 text-xs tracking-[0.3em] uppercase">
          What We Do
        </p>
        <h2 className="text-foreground font-serif text-3xl font-light tracking-tight md:text-5xl text-balance">
          Built for the
          <br />
          modern web
        </h2>
        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <div className="border-border mb-6 flex h-12 w-12 items-center justify-center rounded-full border transition-colors group-hover:border-foreground/40">
                <feature.icon className="text-muted-foreground h-5 w-5 transition-colors group-hover:text-foreground" />
              </div>
              <h3 className="text-foreground mb-3 text-lg font-medium tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
