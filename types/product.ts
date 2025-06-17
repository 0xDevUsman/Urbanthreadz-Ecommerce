export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  gender: "men" | "women" | "unisex"
  images: string[]
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
  isNew?: boolean
  createdAt: string
}
