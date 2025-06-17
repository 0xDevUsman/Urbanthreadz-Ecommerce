import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Award, Heart } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-gray-800/70" />
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl max-w-2xl mx-auto">Redefining streetwear with bold designs and sustainable practices</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Brand Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">The UrbanThreadz Journey</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, UrbanThreadz emerged from the streets with a simple mission: to create clothing that
                  speaks to the bold, the creative, and the unapologetically authentic.
                </p>
                <p>
                  We believe fashion should be more than just clothing—it should be a statement, a form of
                  self-expression that empowers you to stand out in a world that often tries to make everyone blend in.
                </p>
                <p>
                  Every piece in our collection is carefully crafted with attention to detail, quality materials, and
                  designs that push the boundaries of conventional streetwear.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="UrbanThreadz team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  Committed to eco-friendly materials and ethical manufacturing processes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Building a global community of creative individuals who dare to be different.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">Premium materials and craftsmanship in every piece we create.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                <p className="text-gray-600">Staying true to our roots and the culture that inspires us.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-gray-50 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            To empower the next generation of trendsetters with clothing that reflects their individuality, while
            building a more sustainable and inclusive fashion industry. We're not just making clothes—we're crafting the
            uniform for the bold.
          </p>
        </section>
      </div>
    </div>
  )
}
