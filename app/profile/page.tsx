"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Heart, Settings, MapPin, CreditCard } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ProfileInfo } from "@/components/profile/profile-info"
import { OrderHistory } from "@/components/profile/order-history"
import { AddressBook } from "@/components/profile/address-book"
import { PaymentMethods } from "@/components/profile/payment-methods"
import { Wishlist } from "@/components/profile/wishlist"
import { AccountSettings } from "@/components/profile/account-settings"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/auth/login")
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-black mb-2">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mb-4">Member since {new Date(user.createdAt).toLocaleDateString()}</p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{user.totalOrders} Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{user.wishlistCount} Wishlist Items</span>
                </div>
                <Badge variant={user.membershipTier === "VIP" ? "default" : "secondary"}>
                  {user.membershipTier} Member
                </Badge>
              </div>
            </div>

            <Button variant="outline" onClick={() => setActiveTab("settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-white">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProfileInfo user={user} />
          </TabsContent>

          <TabsContent value="orders">
            <OrderHistory userId={user.id} />
          </TabsContent>

          <TabsContent value="wishlist">
            <Wishlist userId={user.id} />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressBook userId={user.id} />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentMethods userId={user.id} />
          </TabsContent>

          <TabsContent value="settings">
            <AccountSettings user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
