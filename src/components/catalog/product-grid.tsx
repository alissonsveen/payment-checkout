"use client"
import { parseAsString, useQueryState } from "nuqs"
import { useMemo } from "react"
import type { Product } from "@/types/product"
import ProductCard from "@/components/catalog/product-card"

type Props = {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  const [search] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )

  const limited = useMemo(() => {
    const q = search.toLowerCase().trim()
    const filtered = q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
      : products
    return filtered
  }, [products, search])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {limited.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
