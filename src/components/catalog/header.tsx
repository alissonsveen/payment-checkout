"use client"

import { LogOut, ShoppingCartIcon } from "lucide-react"
import { SheetTrigger } from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"
import { useAuthStore } from "@/store/authStore"
import { useTheme } from "next-themes"
import { useCart } from "@/hooks/useCart"

export function Header() {
  const { logout } = useAuthStore()
  const { setTheme } = useTheme()
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <header className="flex justify-between p-4 bg-zinc-800 gap-2">
      <span className="hidden">
        <p className="text-white font-bold md:text-lg">Produtos</p>
      </span>
      <div>
        <SheetTrigger
          className="cursor-pointer"
          aria-label={`Abrir carrinho (${count})`}
        >
          <div className="flex items-center relative text-white">
            <ShoppingCartIcon />
            {count > 0 && (
              <span
                className="inline-flex items-center justify-center absolute bottom-2 left-3 bg-red-500 text-white text-xs rounded-full w-4 h-4"
                data-testid="cart-count"
              >
                {count}
              </span>
            )}
          </div>
        </SheetTrigger>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <Button
          className="dark:bg-zi"
          variant={"secondary"}
          onClick={() => {
            setTheme("light")
            logout()
          }}
        >
          <LogOut />
        </Button>
      </div>
    </header>
  )
}
