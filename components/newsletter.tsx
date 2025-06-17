"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Welcome to UrbanThreadz!",
      description: "You've been subscribed to our newsletter. Check your email for a 10% off coupon!",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-full">
              <Mail className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be the first to know about new drops, exclusive sales, and styling tips. Plus, get 10% off your first order!
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button type="submit" disabled={isLoading} className="bg-white text-black hover:bg-gray-200 px-8">
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Gift className="w-4 h-4" />
            <span>10% off your first order • Exclusive access • No spam, ever</span>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 mb-4">Join 50,000+ fashion enthusiasts</p>
            <div className="flex justify-center gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-gray-400">Subscribers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-gray-400">Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24h</div>
                <div className="text-gray-400">Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
