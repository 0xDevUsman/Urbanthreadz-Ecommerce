"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types/product"

interface WishlistProps {
  userId: string
}

export function Wishlist({ userId }: WishlistProps) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockWishlist: Product[] = [
      {
        id: 1,
        name: "Urban Classic Hoodie",
        description: "Premium cotton blend hoodie with modern streetwear design.",
        price: 89.99,
        originalPrice: 119.99,
        category: "Hoodies",
        gender: "unisex",
        images: ["https://images.pexels.com/photos/2013898/pexels-photo-2013898.jpeg"],
        colors: ["Black", "White", "Gray"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.8,
        reviews: 124,
        isNew: true,
        createdAt: "2024-01-15",
      },
      {
        id: 5,
        name: "High-Top Sneakers",
        description: "Classic high-top sneakers with modern comfort technology.",
        price: 149.99,
        category: "Sneakers",
        gender: "unisex",
        images: ["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"],
        colors: ["White", "Black", "Red"],
        sizes: ["7", "8", "9", "10", "11", "12"],
        rating: 4.7,
        reviews: 203,
        createdAt: "2024-01-12",
      },
    ]

    setTimeout(() => {
      setWishlistItems(mockWishlist)
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            My Wishlist ({wishlistItems.length})
          </CardTitle>
        </CardHeader>
      </Card>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist and shop them later.</p>
            <Link href="/shop">
              <Button className="btn-primary">Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-semibold text-black mb-1 hover:text-gray-600 transition-colors">{item.name}</h3>
                </Link>

                <p className="text-sm text-gray-600 mb-2">{item.category}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-black">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => addToCart(item)} className="flex-1 btn-primary" size="sm">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link href={`/product/${item.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
