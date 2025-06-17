"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Fashion Blogger",
      content:
        "UrbanThreadz has completely transformed my wardrobe. The quality is incredible and the designs are always ahead of the curve.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=38",
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      role: "Creative Director",
      content:
        "I love how UrbanThreadz combines sustainability with style. Finally, a brand that aligns with my values without compromising on fashion.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=35",
    },
    {
      id: 3,
      name: "Jordan Smith",
      role: "Photographer",
      content:
        "The attention to detail in every piece is remarkable. UrbanThreadz isn't just clothing, it's wearable art.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=30",
    },
    {
      id: 4,
      name: "Zoe Williams",
      role: "Influencer",
      content:
        "Customer service is top-notch and the fit is always perfect. UrbanThreadz has become my go-to for statement pieces.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=25",
    },
  ];
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Join thousands of satisfied customers who love our products</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-black">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
