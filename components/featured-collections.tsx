import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function FeaturedCollections() {
 const collections = [
    {
      id: 1,
      name: "Street Essentials",
      description: "Core pieces for your urban wardrobe",
      image:
        "https://images.stockcake.com/public/9/3/4/934a4b48-d15a-4235-be15-ab6d8d79a7a2_large/urban-athletes-advance-stockcake.jpg",
      itemCount: 24,
      href: "/shop?category=essentials",
    },
    {
      id: 2,
      name: "Limited Edition",
      description: "Exclusive drops you won't find anywhere else",
      image:
        "https://images.pexels.com/photos/20417442/pexels-photo-20417442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      itemCount: 12,
      href: "/shop?category=limited",
    },
    {
      id: 3,
      name: "Sustainable Line",
      description: "Eco-friendly fashion for conscious consumers",
      image:
        "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      itemCount: 18,
      href: "/shop?category=sustainable",
    },
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Featured Collections</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated selections that define modern streetwear culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {collection.itemCount} items
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">{collection.name}</h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>

                <Link href={collection.href}>
                  <Button className="btn-secondary group">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" className="btn-primary">
              View All Collections
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
