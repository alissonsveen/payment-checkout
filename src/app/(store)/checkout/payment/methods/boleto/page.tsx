"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useCheckoutStore from "@/store/checkoutStore"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { BarcodeIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Boleto from "@/assets/boleto.png"
import Image from "next/image"
import { OrderSummaryPage } from "../../../orderSummary"
import { ClipboardIcon } from "lucide-react"
import { toast } from "sonner"

const exampleCode = "23790.00008 60000.000009 01234.567890 1 23450000010000"

export default function BoletoMethod() {
  const router = useRouter()
  const setPaymentMethod = useCheckoutStore((s) => s.setPaymentMethod)
  const simulatedOutcome = useCheckoutStore((s) => s.simulatedOutcome)
  const setSimulatedOutcome = useCheckoutStore((s) => s.setSimulatedOutcome)
  const setBoletoExpiration = useCheckoutStore((s) => s.setBoletoExpiration)

  const [isLoading, setIsLoading] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null)

  useEffect(() => {
    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 48)
    setExpirationDate(expiration)
  }, [])

  const isBoletoExpired = expirationDate && new Date() > expirationDate

  const formatExpirationDate = (date: Date) => {
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  useEffect(() => {
    if (!expirationDate) return

    const update = () => {
      const diff = Math.max(
        0,
        Math.floor((expirationDate.getTime() - Date.now()) / 1000)
      )
      setRemainingSeconds(diff)
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [expirationDate])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exampleCode)
      toast.success("Código do boleto copiado")
    } catch (e) {
      console.error(e)
      toast.error("Não foi possível copiar. Selecione e copie manualmente.")
    }
  }

  const handleContinue = () => {
    setIsLoading(true)
    setPaymentMethod("boleto")
    if (expirationDate) setBoletoExpiration(expirationDate.getTime())
    router.push("/checkout/review")
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarcodeIcon className="w-5 h-5" />
                Pagamento via Boleto
              </CardTitle>
              <CardDescription>
                Escaneie o QR Code ou insira o código abaixo para efetuar o
                pagamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative w-full h-56 sm:w-96 sm:h-64 md:w-[520px] md:h-72">
                <Image
                  src={Boleto}
                  alt="Imagem do boleto bancário para pagamento"
                  fill
                  className="object-contain rounded-md shadow-sm"
                />
              </div>

              <div className="w-full mt-4">
                <Label htmlFor="boleto-code" className="mb-2 block">
                  Código do Boleto
                </Label>

                <div className="flex gap-2 items-start">
                  <Input
                    id="boleto-code"
                    type="text"
                    readOnly
                    value={exampleCode}
                    className="font-mono text-sm bg-muted/70 dark:bg-muted/50"
                    aria-label="Código do boleto bancário"
                    onFocus={(e) => e.currentTarget.select()}
                  />

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      aria-label="Copiar código do boleto"
                      className="whitespace-nowrap"
                    >
                      <ClipboardIcon className="w-4 h-4" />
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground w-full text-center">
                {expirationDate && !isBoletoExpired ? (
                  <div>
                    <div className="font-medium">Válido até:</div>
                    <div>{formatExpirationDate(expirationDate)}</div>
                    {remainingSeconds !== null && (
                      <div className="mt-1 text-sm" aria-live="polite">
                        Expira em:{" "}
                        {new Date(remainingSeconds * 1000)
                          .toISOString()
                          .substr(11, 8)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-red-600 font-medium">
                    O boleto expirou! Por favor, gere um novo boleto para
                    continuar o pagamento.
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <div className="w-full p-4 rounded-md border bg-muted/5 text-muted-foreground">
                <div className="font-medium mb-2">Como pagar</div>
                <ol className="list-decimal ml-4">
                  <li>Abra seu app de banco ou carteiras digitais.</li>
                  <li>Selecione a opção Pagar com Boleto.</li>
                  <li>
                    Escaneie o QR Code ou insira o código do boleto fornecido.
                  </li>
                  <li>Complete o pagamento antes do tempo expirar.</li>
                </ol>
              </div>

              <div className="flex flex-col md:flex-row gap-2 mt-2">
                <Button variant="outline" className="w-full md:w-1/2">
                  Baixar o Boleto
                </Button>

                <Button
                  onClick={handleContinue}
                  disabled={isBoletoExpired || isLoading}
                  className="w-full md:w-1/2"
                >
                  {isLoading
                    ? "Aguarde..."
                    : isBoletoExpired
                    ? "Boleto Expirado"
                    : "Continuar"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <aside className="w-full">
          <div className="sticky top-6">
            <OrderSummaryPage />
          </div>
        </aside>
      </div>
    </div>
  )
}
