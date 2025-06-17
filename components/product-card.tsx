"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star } from "lucide-react"
import type { Product } from "@/types/product"

// Import hooks conditionally to avoid SSR issues
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  // Use cart context
  let addItem: ((item: any) => void) | null = null
  let toast: ((options: any) => void) | null = null

  try {
    const cartContext = useCart()
    addItem = cartContext?.addItem || null
    const toastContext = useToast()
    toast = toastContext?.toast || null
  } catch (error) {
    console.error("Cart context not available:", error)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!addItem || !toast) {
      console.error("Cart functionality not available")
      return
    }

    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/placeholder.svg?height=300&width=300",
        size: product.sizes[0] || "M",
        color: product.colors[0] || "Black",
        quantity: 1,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      if (toast) {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  if (viewMode === "list") {
    return (
      <Link href={`/product/${product.id}`}>
        <div className="flex gap-6 p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src={product.images[0] || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-black">{product.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={isLiked ? "text-red-500" : "text-gray-400"}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </div>

            <p className="text-gray-600 mb-3">{product.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              {addItem && (
                <Button onClick={handleAddToCart} className="btn-primary">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group product-card bg-white rounded-lg overflow-hidden border">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[imageIndex] || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onMouseEnter={() => product.images[1] && setImageIndex(1)}
            onMouseLeave={() => setImageIndex(0)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-black text-white">New</Badge>}
            {product.originalPrice && (
              <Badge variant="destructive">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLike}
              className={`rounded-full ${isLiked ? "text-red-500" : "text-gray-600"}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Quick Add */}
          {addItem && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button onClick={handleAddToCart} className="w-full btn-primary">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-black mb-1 group-hover:text-gray-600 transition-colors">{product.name}</h3>

          <p className="text-sm text-gray-600 mb-2">{product.category}</p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
