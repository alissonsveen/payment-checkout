"use client"

import React, { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import useCheckoutStore from "@/store/checkoutStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderCircle } from "lucide-react"

export default function StatusPage() {
  const router = useRouter()
  const { draftOrderId, status, setStatus, paymentMethod, boletoExpiration } =
    useCheckoutStore()

  const simulatedOutcome = useCheckoutStore((s) => s.simulatedOutcome)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!draftOrderId) {
      router.replace("/checkout")
      return
    }

    if (status !== "processando") {
      router.replace("/checkout/result")
      return
    }
    if (simulatedOutcome) {
      const final =
        simulatedOutcome === "expirado"
          ? "expirado"
          : simulatedOutcome === "falhou"
          ? "falhou"
          : "pago"

      timeoutRef.current = window.setTimeout(() => {
        setStatus(final)
        router.replace("/checkout/result")
      }, 1000)

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }

    timeoutRef.current = window.setTimeout(() => {
      let outcome: "pago" | "falhou" | "expirado" = "pago"

      if (paymentMethod === "boleto") {
        if (boletoExpiration && Date.now() > boletoExpiration) {
          outcome = "expirado"
        } else {
          const r = Math.random()
          outcome = r < 0.15 ? "falhou" : "pago"
        }
      } else if (paymentMethod === "pix") {
        const r = Math.random()
        outcome = r < 0.05 ? "falhou" : "pago"
      } else if (paymentMethod === "card") {
        const r = Math.random()
        outcome = r < 0.03 ? "falhou" : "pago"
      } else {
        const r = Math.random()
        outcome = r < 0.1 ? "falhou" : "pago"
      }

      setStatus(outcome)
      router.replace("/checkout/result")
    }, 3000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [
    draftOrderId,
    status,
    simulatedOutcome,
    paymentMethod,
    boletoExpiration,
    router,
    setStatus,
  ])

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            Processando o pagamento...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex flex-col items-center gap-4 py-6"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <LoaderCircle
              className="h-16 w-16 animate-spin"
              aria-hidden="true"
            />
            <div className="text-center text-sm text-muted-foreground">
              Estamos processando seu pagamento. Isso pode levar alguns
              segundos.
            </div>
            <span className="sr-only">
              Processando pagamento. Por favor, aguarde. Não feche esta página.
            </span>
            {draftOrderId && (
              <div className="text-xs text-muted-foreground">
                Pedido {draftOrderId}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
