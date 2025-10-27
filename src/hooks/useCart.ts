"use client"
import { useMemo } from "react"
import { useCartStore } from "@/store/cartStore"
import { MOCK_PRODUCTS } from "@/store/catalog"
import type { Product } from "@/types/product"

export function useCart() {
  const { addItem, entries, removeItem, updateItemQuantity } = useCartStore()

  const items = useMemo(() => {
    return entries.map((e) => {
      const prod: Product =
        MOCK_PRODUCTS.find((p) => p.id === e.productId) ??
        ({
          id: e.productId,
          name: "Produto",
          price: 0,
          description: "",
          image: undefined,
        } as Product)
      return { product: prod, quantity: e.quantity }
    })
  }, [entries])

  const total = items.reduce((sum, it) => {
    const price = Number((it.product.price as unknown) ?? 0) || 0
    const qty = Number(it.quantity ?? 0) || 0
    return sum + price * qty
  }, 0)

  function handleRemove(productId: string) {
    removeItem(productId)
  }

  function handleDecrease(productId: string, qty: number) {
    const next = Math.max(0, qty - 1)
    if (next === 0) removeItem(productId)
    else updateItemQuantity(productId, next)
  }

  function handleIncrease(productId: string, qty: number) {
    updateItemQuantity(productId, qty + 1)
  }

  return {
    items,
    total,
    handleRemove,
    handleDecrease,
    handleIncrease,
    addItem,
  }
}
