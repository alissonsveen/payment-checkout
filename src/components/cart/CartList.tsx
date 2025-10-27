"use client"

import Image from "next/image"
import { Trash, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"

export default function CartList() {
  const { items, total, handleIncrease, handleDecrease, handleRemove } =
    useCart()
  const router = useRouter()

  function handleToCheckout() {
    router.replace("/checkout")
  }

  return (
    <div className="flex flex-col gap-4 h-full ">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-sm text-muted-foreground">
          <ShoppingBag className="size-20" />
          Seu carrinho está vazio.
        </div>
      ) : (
        <>
          {items.map((it) => (
            <div
              key={it.product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-2 bg-neutral-100 dark:bg-neutral-800 border rounded-md"
            >
              <div className="w-14 h-14 relative bg-white rounded overflow-hidden">
                <Image
                  src={it.product.image ?? "/vercel.svg"}
                  alt={it.product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">
                    {it.product.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    R$ {Number(it.product.price ?? 0).toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-none w-full sm:w-auto justify-start sm:justify-end">
                  <button
                    aria-label="Diminuir quantidade"
                    className="p-2 h-7 w-7 flex bg-white dark:bg-zinc-700 items-center justify-center rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-500  transition-colors focus:ring-zinc-400 dark:focus:ring-zinc-700"
                    onClick={() => handleDecrease(it.product.id, it.quantity)}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-6 text-center text-sm">{it.quantity}</div>
                  <button
                    aria-label="Aumentar quantidade"
                    className="p-2 h-7 w-7 flex bg-white dark:bg-zinc-700 items-center justify-center rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700"
                    onClick={() => handleIncrease(it.product.id, it.quantity)}
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    aria-label="Remover item"
                    className="p-1 h-7 w-7 flex items-center justify-center text-red-600"
                    onClick={() => handleRemove(it.product.id)}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">Total</div>
              <div className="font-semibold">
                R$ {Number(total ?? 0).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="w-full" onClick={() => handleToCheckout()}>
              Finalizar Compra
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
