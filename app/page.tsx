import { Hero } from "@/components/hero"
import { FeaturedCollections } from "@/components/featured-collections"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Stats } from "@/components/stats"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <FeaturedCollections />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
