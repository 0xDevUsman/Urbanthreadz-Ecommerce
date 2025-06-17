"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Eye, RotateCcw, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Order } from "@/types/order"

interface OrderHistoryProps {
  userId: string
}

export function OrderHistory({ userId }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-2024-001",
        date: "2024-01-15",
        status: "delivered",
        total: 159.98,
        items: [
          {
            id: 1,
            name: "Urban Classic Hoodie",
            price: 89.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            size: "M",
            color: "Black",
          },
          {
            id: 2,
            name: "Street Essential Tee",
            price: 34.99,
            quantity: 2,
            image: "/placeholder.svg?height=80&width=80",
            size: "L",
            color: "White",
          },
        ],
        shippingAddress: "123 Main St, New York, NY 10001",
        trackingNumber: "1Z999AA1234567890",
      },
      {
        id: "ORD-2024-002",
        date: "2024-01-20",
        status: "shipped",
        total: 199.99,
        items: [
          {
            id: 3,
            name: "Distressed Denim Jacket",
            price: 129.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            size: "L",
            color: "Blue",
          },
        ],
        shippingAddress: "123 Main St, New York, NY 10001",
        trackingNumber: "1Z999AA1234567891",
      },
      {
        id: "ORD-2024-003",
        date: "2024-01-25",
        status: "processing",
        total: 79.99,
        items: [
          {
            id: 4,
            name: "Cargo Utility Pants",
            price: 79.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            size: "32",
            color: "Olive",
          },
        ],
        shippingAddress: "123 Main St, New York, NY 10001",
      },
    ]

    setTimeout(() => {
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setIsLoading(false)
    }, 1000)
  }, [userId])

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order History ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "You haven't placed any orders yet."}
              </p>
              <Link href="/shop">
                <Button className="btn-primary">Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Return
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        {order.status === "delivered" && (
                          <Button variant="ghost" size="sm" className="mt-1">
                            <Star className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Tracking Number: {order.trackingNumber}</p>
                    <p className="text-sm text-blue-700">Shipping to: {order.shippingAddress}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
