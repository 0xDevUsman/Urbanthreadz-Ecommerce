"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { PaymentMethod } from "@/types/payment"

interface PaymentMethodsProps {
  userId: string
}

export function PaymentMethods({ userId }: PaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: "pm_1",
        type: "card",
        brand: "visa",
        last4: "4242",
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
        holderName: "John Doe",
      },
      {
        id: "pm_2",
        type: "card",
        brand: "mastercard",
        last4: "5555",
        expiryMonth: 8,
        expiryYear: 2026,
        isDefault: false,
        holderName: "John Doe",
      },
    ]

    setTimeout(() => {
      setPaymentMethods(mockPaymentMethods)
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const handleDelete = (paymentMethodId: string) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== paymentMethodId))
    toast({
      title: "Payment method removed",
      description: "The payment method has been removed from your account.",
    })
  }

  const setAsDefault = (paymentMethodId: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === paymentMethodId,
      })),
    )
    toast({
      title: "Default payment method updated",
      description: "This payment method is now your default.",
    })
  }

  const getCardIcon = (brand: string) => {
    // In a real app, you'd use actual card brand icons
    return <CreditCard className="w-6 h-6" />
  }

  const getBrandName = (brand: string) => {
    switch (brand) {
      case "visa":
        return "Visa"
      case "mastercard":
        return "Mastercard"
      case "amex":
        return "American Express"
      case "discover":
        return "Discover"
      default:
        return brand.charAt(0).toUpperCase() + brand.slice(1)
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Methods ({paymentMethods.length})
          </CardTitle>

          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardHeader>
      </Card>

      {paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No payment methods</h3>
            <p className="text-gray-600 mb-6">Add a payment method to make checkout faster and easier.</p>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((paymentMethod) => (
            <Card key={paymentMethod.id} className={paymentMethod.isDefault ? "ring-2 ring-black" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getCardIcon(paymentMethod.brand)}
                    <div>
                      <p className="font-medium">
                        {getBrandName(paymentMethod.brand)} •••• {paymentMethod.last4}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expires {paymentMethod.expiryMonth.toString().padStart(2, "0")}/{paymentMethod.expiryYear}
                      </p>
                      <p className="text-sm text-gray-600">{paymentMethod.holderName}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(paymentMethod.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {paymentMethod.isDefault ? (
                    <Badge variant="default">Default</Badge>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setAsDefault(paymentMethod.id)}>
                      Set as Default
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
