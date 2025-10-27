"use client"

import CartList from "@/components/cart/CartList"

export default function CartPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
      <CartList />
    </main>
  )
}
