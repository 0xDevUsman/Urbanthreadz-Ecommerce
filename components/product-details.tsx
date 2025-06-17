"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types/product"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select a size and color before adding to cart.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && <Badge className="absolute top-4 left-4 bg-black text-white">New Arrival</Badge>}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-black" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-black">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <Badge variant="destructive">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Color Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Color: {selectedColor && <span className="font-normal">({selectedColor})</span>}
            </Label>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Size: {selectedSize && <span className="font-normal">({selectedSize})</span>}
            </Label>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="h-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <Label className="text-base font-medium mb-3 block">Quantity</Label>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleAddToCart} className="flex-1 btn-primary" size="lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500 border-red-500" : ""}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over $100</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-gray-500">30-day return policy</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium">Secure Payment</p>
              <p className="text-xs text-gray-500">SSL encrypted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Premium quality materials</li>
                    <li>Comfortable fit for all-day wear</li>
                    <li>Durable construction</li>
                    <li>Modern streetwear design</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Washing Instructions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Machine wash cold with like colors</li>
                      <li>Use mild detergent</li>
                      <li>Do not bleach</li>
                      <li>Tumble dry low heat</li>
                      <li>Iron on low temperature if needed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Storage:</h4>
                    <p className="text-gray-600">Store in a cool, dry place. Hang or fold neatly to maintain shape.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Customer Reviews</h4>
                    <Button variant="outline">Write a Review</Button>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">John D.</span>
                          <span className="text-sm text-gray-500">Verified Purchase</span>
                        </div>
                        <p className="text-gray-600">
                          Great quality and perfect fit. The material feels premium and the design is exactly what I was
                          looking for.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
