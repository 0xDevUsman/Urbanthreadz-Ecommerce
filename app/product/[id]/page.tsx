import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { products } from "@/data/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id.toString() === params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}
