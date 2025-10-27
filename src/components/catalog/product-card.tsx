"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Product } from "@/types/product"
import Image from "next/image"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/useCart"

function formatBRL(value: number) {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return `R$ ${value.toFixed(2)}`
  }
}

interface ProductCard {
  product: Product
}

export default function ProductCard({ product }: ProductCard) {
  const imgSrc = product.image || "/vercel.svg"
  const { addItem } = useCart()
  return (
    <Card className="p-0 flex flex-col justify-between bg-neutral-100 dark:bg-neutral-800">
      <CardHeader className="p-0 relative">
        <div className="w-full h-48 relative overflow-hidden">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain w-full h-full rounded-t-xl bg-white"
            priority={false}
          />
        </div>
        <div className="p-6">
          <CardTitle className="text-neutral-900 dark:text-white">
            {product.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-xl font-bold ">{formatBRL(product.price)}</p>
        <CardDescription className="truncate">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mb-2 flex justify-end">
        <Button
          className="bg-red-500 text-white hover:bg-red-800 transition-colors cursor-pointer"
          aria-label={`Adicionar ${product.name} ao carrinho`}
          onClick={() => addItem(product, 1)}
        >
          <ShoppingCart className="size-4" />
          comprar
        </Button>
      </CardFooter>
    </Card>
  )
}
