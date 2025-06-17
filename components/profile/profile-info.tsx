import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package, Heart, Star, Gift, TrendingUp, Calendar } from "lucide-react"
import type { User } from "@/types/user"

interface ProfileInfoProps {
  user: User
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const membershipProgress = (user.totalSpent / user.nextTierThreshold) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Account Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Orders</span>
            <span className="font-semibold">{user.totalOrders}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Spent</span>
            <span className="font-semibold">${user.totalSpent.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average Order</span>
            <span className="font-semibold">
              ${user.totalOrders > 0 ? (user.totalSpent / user.totalOrders).toFixed(2) : "0.00"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Membership Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Membership Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current Tier</span>
            <Badge variant={user.membershipTier === "VIP" ? "default" : "secondary"}>{user.membershipTier}</Badge>
          </div>

          {user.membershipTier !== "VIP" && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress to VIP</span>
                  <span className="font-medium">
                    ${user.totalSpent.toFixed(0)} / ${user.nextTierThreshold}
                  </span>
                </div>
                <Progress value={membershipProgress} className="h-2" />
              </div>
              <p className="text-sm text-gray-600">
                Spend ${(user.nextTierThreshold - user.totalSpent).toFixed(2)} more to unlock VIP benefits!
              </p>
            </>
          )}

          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Your Benefits:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Free shipping on orders over $100</li>
              <li>• Early access to sales</li>
              {user.membershipTier === "VIP" && (
                <>
                  <li>• Exclusive VIP-only products</li>
                  <li>• Priority customer support</li>
                  <li>• Birthday rewards</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Wishlist Items
            </span>
            <span className="font-semibold">{user.wishlistCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Rewards Points
            </span>
            <span className="font-semibold">{user.rewardPoints}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Member Since
            </span>
            <span className="font-semibold">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.date}</p>
                </div>
                {activity.amount && <span className="text-sm font-semibold">${activity.amount}</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
