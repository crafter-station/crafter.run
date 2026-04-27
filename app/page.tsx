import { Capabilities } from "@/components/capabilities"
import { CTA } from "@/components/cta"
import { FeaturedProducts } from "@/components/featured-products"
import { SectionGap } from "@/components/grid-container"
import { Hero } from "@/components/hero"
import { OpenSourceStrip } from "@/components/open-source-strip"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Stack } from "@/components/stack"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <SectionGap />
        <Capabilities />
        <SectionGap />
        <OpenSourceStrip />
        <SectionGap />
        <FeaturedProducts />
        <SectionGap />
        <Stack />
        <SectionGap />
        <Team />
        <SectionGap />
        <Testimonials />
        <SectionGap />
        <CTA />
      </main>
      <SiteFooter />
    </>
  )
}
