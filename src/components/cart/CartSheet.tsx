"use client"

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import CartList from "./CartList"

export default function CartSheet() {
  return (
    <SheetContent
      side="right"
      className="sm:max-w-md lg:max-w-lg overflow-auto"
    >
      <SheetHeader>
        <SheetTitle>Carrinho de Compras</SheetTitle>
      </SheetHeader>

      <div className="p-4 min-h-screen">
        <CartList />
      </div>

      <SheetFooter />
    </SheetContent>
  )
}
