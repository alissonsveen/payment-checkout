"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { Loader } from "lucide-react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Header } from "@/components/catalog/header"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Sheet } from "@/components/ui/sheet"
import CartSheet from "@/components/cart/CartSheet"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!ready) return
    if (!isAuthenticated) {
      const next = encodeURIComponent(pathname || "/catalog")
      router.replace(`/auth?next=${next}`)
    }
  }, [isAuthenticated, ready, router, pathname])

  if (!ready) {
    return (
      <NuqsAdapter>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="min-h-screen grid place-items-center bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
            <Loader className="animate-spin text-black dark:text-white" />
          </div>
        </ThemeProvider>
      </NuqsAdapter>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <NuqsAdapter>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
      >
        <Sheet>
          <div className="min-h-screen">
            <Header />
            {children}
          </div>

          <CartSheet />
        </Sheet>
      </ThemeProvider>
    </NuqsAdapter>
  )
}
