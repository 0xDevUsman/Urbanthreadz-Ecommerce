import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1595065666634-4725aa7e8379?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000"
          alt="Urban fashion hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Shop the <span className="text-beige">Drop</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in">
          Discover the latest in urban streetwear. Bold designs for the fearless.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link href="/shop">
            <Button size="lg" className="btn-primary text-lg px-8 py-3">
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-gray-300">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-gray-300">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
