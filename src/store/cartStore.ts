"use client"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Product } from "@/types/product"

export type CartEntry = {
  productId: string
  quantity: number
}

type CartState = {
  entries: CartEntry[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateItemQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      entries: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const idx = state.entries.findIndex((e) => e.productId === product.id)
          if (idx >= 0) {
            const next = [...state.entries]
            next[idx] = {
              ...next[idx],
              quantity: next[idx].quantity + quantity,
            }
            return { entries: next }
          }
          return {
            entries: [...state.entries, { productId: product.id, quantity }],
          }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.productId !== productId),
        }))
      },
      updateItemQuantity: (productId, quantity) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.productId === productId ? { ...e, quantity } : e
          ),
        }))
      },
      clearCart: () => set({ entries: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
