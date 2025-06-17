export interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
  totalOrders: number
  totalSpent: number
  membershipTier: "Standard" | "Premium" | "VIP"
  nextTierThreshold: number
  wishlistCount: number
  rewardPoints: number
  recentActivity: Array<{
    action: string
    date: string
    amount?: string
  }>
}
