"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface ProductFiltersProps {
  filters: {
    category: string
    gender: string
    priceRange: string
    size: string
  }
  onFiltersChange: (filters: any) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function ProductFilters({ filters, onFiltersChange, sortBy, onSortChange }: ProductFiltersProps) {
  const categories = ["T-Shirts", "Hoodies", "Jeans", "Sneakers", "Accessories"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const priceRanges = [
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Over $200", value: "200-1000" },
  ]

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: filters[key as keyof typeof filters] === value ? "" : value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      gender: "",
      priceRange: "",
      size: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Sort */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gender */}
          <div>
            <Label className="text-base font-medium mb-3 block">Gender</Label>
            <div className="space-y-2">
              {["men", "women", "unisex"].map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox
                    id={gender}
                    checked={filters.gender === gender}
                    onCheckedChange={() => handleFilterChange("gender", gender)}
                  />
                  <Label htmlFor={gender} className="capitalize">
                    {gender}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Category */}
          <div>
            <Label className="text-base font-medium mb-3 block">Category</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.category === category}
                    onCheckedChange={() => handleFilterChange("category", category)}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Size */}
          <div>
            <Label className="text-base font-medium mb-3 block">Size</Label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={filters.size === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("size", size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <Label className="text-base font-medium mb-3 block">Price Range</Label>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <div key={range.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={range.value}
                    checked={filters.priceRange === range.value}
                    onCheckedChange={() => handleFilterChange("priceRange", range.value)}
                  />
                  <Label htmlFor={range.value}>{range.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
