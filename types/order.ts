export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size: string
  color: string
}

export interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  shippingAddress: string
  trackingNumber?: string
}
