import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrbanThreadz - Trendy Streetwear & Casual Fashion",
  description:
    "Discover the latest in urban fashion. Shop trendy casual wear for men and women aged 18-35. Bold, stylish, minimalist designs.",
  keywords:
    "streetwear, urban fashion, casual wear, trendy clothing, men fashion, women fashion",
  openGraph: {
    title: "UrbanThreadz - Trendy Streetwear & Casual Fashion",
    description:
      "Discover the latest in urban fashion. Shop trendy casual wear for men and women.",
    type: "website",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
