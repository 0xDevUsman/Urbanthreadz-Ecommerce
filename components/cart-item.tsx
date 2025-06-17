"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import type { CartItem as CartItemType } from "@/types/cart"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(item.id, item.size, item.color)
    } else {
      updateQuantity(item.id, item.size, item.color, newQuantity)
    }
  }

  return (
    <div className="flex gap-4 p-6 bg-white rounded-lg border">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded-lg" />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-black mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Size: {item.size} • Color: {item.color}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.quantity - 1)}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.quantity + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id, item.size, item.color)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
