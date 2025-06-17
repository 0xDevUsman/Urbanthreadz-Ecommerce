import { TrendingUp, Users, Award, Truck } from "lucide-react"

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      description: "Worldwide community",
    },
    {
      icon: Award,
      value: "4.9★",
      label: "Customer Rating",
      description: "Based on 10K+ reviews",
    },
    {
      icon: Truck,
      value: "24h",
      label: "Fast Shipping",
      description: "Free over $100",
    },
    {
      icon: TrendingUp,
      value: "1000+",
      label: "Products",
      description: "Always fresh styles",
    },
  ]

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-black/5 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
              <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
