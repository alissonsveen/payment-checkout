"use client"
import React, { useState, useEffect } from "react"
import useCheckoutStore from "@/store/checkoutStore"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ResultHeader from "@/components/checkout/ResultHeader"
import OrderCard from "@/components/checkout/OrderCard"
import { addOrder } from "@/lib/orders"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"

export default function ResultPage() {
  const router = useRouter()
  const { status, draftOrderId, clearCheckout } = useCheckoutStore()

  const [copied, setCopied] = useState(false)
  const [orderSaved, setOrderSaved] = useState(false)

  const handlePrimary = () => {
    if (statusVal === "pago") {
      clearCheckout()
      router.push("/")
    } else if (statusVal === "falhou") {
      router.push("/checkout/payment")
    } else if (statusVal === "expirado") {
      router.push("/checkout/payment")
    } else {
      clearCheckout()
      router.push("/")
    }
  }

  const handleViewOrders = () => {
    router.push("/orders")
  }

  const handleCopy = async () => {
    if (!draftOrderId) return
    try {
      await navigator.clipboard.writeText(String(draftOrderId))
      setCopied(true)
      toast.success("ID do pedido copiado!")
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error("Erro ao copiar:", error)
      toast.error("Não foi possível copiar. Por favor, copie manualmente.")
    }
  }
  const statusVal = status ?? "unknown"
  const { items } = useCart()

  useEffect(() => {
    if (statusVal === "pago" && draftOrderId && !orderSaved) {
      try {
        const snapshotItems = items.map((it) => ({
          productId: it.product.id,
          name: it.product.name,
          image:
            typeof it.product.image === "string"
              ? it.product.image
              : (it.product.image &&
                  (it.product.image as { src?: string }).src) ||
                undefined,
          price: Number(it.product.price) || 0,
          quantity: Number(it.quantity) || 0,
        }))

        addOrder({
          id: draftOrderId,
          status: statusVal,
          date: Date.now(),
          items: snapshotItems,
          shipping: useCheckoutStore.getState().shipping ?? null,
        })

        setOrderSaved(true)
        toast.success("Pedido salvo com sucesso!")
      } catch (error) {
        console.error("Falha ao salvar pedido:", error)
        toast.error("Não foi possível salvar o pedido. Por favor, anote o ID.")
      }
    }
  }, [statusVal, draftOrderId, items, orderSaved])

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Resultado do pagamento</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <ResultHeader status={statusVal} />
              <div className="w-full mt-2">
                <OrderCard
                  orderId={draftOrderId}
                  status={statusVal}
                  onCopy={handleCopy}
                  copied={copied}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 p-4">
          <div className="flex-1">
            <Button variant="ghost" size="sm" onClick={handleViewOrders}>
              Ver Pedidos
            </Button>
          </div>
          <div className="flex gap-3">
            <Button onClick={handlePrimary}>
              {statusVal === "pago"
                ? "Continuar Comprando"
                : statusVal === "falhou"
                ? "Tentar outro método"
                : statusVal === "expirado"
                ? "Gerar novo boleto"
                : "Concluir"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
