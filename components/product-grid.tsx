import { ProductCard } from "./product-card"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  )
}
