"use client"

import { useState, useMemo } from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Filter, Grid, List } from "lucide-react"
import { products } from "@/data/products"

export default function ShopPage() {
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    priceRange: "",
    size: "",
  })
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }
    if (filters.gender) {
      filtered = filtered.filter((product) => product.gender === filters.gender)
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((product) => product.price >= min && product.price <= max)
    }
    if (filters.size) {
      filtered = filtered.filter((product) => product.sizes.includes(filters.size))
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        // Keep original order for featured
        break
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Shop Collection</h1>
            <p className="text-gray-600">Discover our latest streetwear essentials</p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <ProductFilters filters={filters} onFiltersChange={setFilters} sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <ProductGrid products={filteredProducts} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
