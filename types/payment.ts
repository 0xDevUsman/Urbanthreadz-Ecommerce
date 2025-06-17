export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple_pay"
  brand: string
  last4: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
  holderName: string
}
