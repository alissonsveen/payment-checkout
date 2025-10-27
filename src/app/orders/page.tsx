"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getOrders, StoredOrder, clearOrders } from "@/lib/orders"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<StoredOrder[]>([])

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleString("pt-BR", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "-"

  const formatCurrency = (value?: number) =>
    typeof value === "number"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)
      : "R$ 0,00"

  const orderTotal = (o: StoredOrder) => {
    const items = o.items || []
    return items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0)
  }

  const totalItems = (o: StoredOrder) => {
    const items = o.items || []
    return items.reduce((s, it) => s + (it.quantity || 0), 0)
  }

  const addressLine = (o: StoredOrder) => {
    const s = o.shipping
    if (!s) return ""
    const parts: string[] = []
    if (s.street) parts.push(`${s.street}${s.number ? ", " + s.number : ""}`)
    if (s.neighborhood) parts.push(s.neighborhood)
    if (s.city) parts.push(`${s.city}${s.state ? " / " + s.state : ""}`)
    return parts.join(" · ")
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
    >
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <ModeToggle />
            <CardTitle>Meus Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                Nenhum pedido encontrado.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="bg-white dark:bg-zinc-700 border border-zinc-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold">
                            Pedido #{o.id}
                          </h3>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(o.date)}
                          </div>
                        </div>
                        <div className="ml-4 flex items-center gap-2">
                          <div className="text-sm text-green-400 font-medium rounded-full px-3 py-1 bg-zinc-100 dark:bg-zinc-400">
                            {o.status}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {(o.items || []).slice(0, 3).map((it, i) => (
                            <div
                              key={i}
                              className="w-12 h-12 rounded-md overflow-hidden border bg-gray-50"
                            >
                              {it.image ? (
                                <Image
                                  src={it.image}
                                  alt={it.name}
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-muted-foreground">
                                  {it.name
                                    ? it.name.charAt(0).toUpperCase()
                                    : "?"}
                                </div>
                              )}
                            </div>
                          ))}

                          {(o.items || []).length > 3 && (
                            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-gray-100 text-sm text-muted-foreground border">
                              +{(o.items || []).length - 3}
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">
                            {totalItems(o)} itens
                          </div>
                          <div className="text-sm mt-1">{addressLine(o)}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            Total
                          </div>
                          <div className="text-lg font-semibold mt-1">
                            {formatCurrency(orderTotal(o))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <div className="p-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                clearOrders()
                setOrders([])
              }}
            >
              Limpar
            </Button>
            <Button onClick={() => router.push("/")}>
              Continuar Comprando
            </Button>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  )
}
