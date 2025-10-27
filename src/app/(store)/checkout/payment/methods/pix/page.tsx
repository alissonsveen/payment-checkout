"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { QrCode } from "lucide-react"
import useCheckoutStore from "@/store/checkoutStore"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Timer from "@/components/checkout/timer"
import pixImage from "@/assets/qrcode.png"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { OrderSummaryPage } from "../../../orderSummary"

export default function PixMethod() {
  const router = useRouter()
  const setPaymentMethod = useCheckoutStore((s) => s.setPaymentMethod)
  const [isLoading, setIsLoading] = React.useState(false)
  const [expired, setExpired] = React.useState(false)

  const exampleKey =
    "00230236580277br.gov.bcb.pix01812cK67c2D-e2f1-1542-lk4aj-b14db1d3-4284-4897-9322-6fad61561b5f321aMinha Outra Loja357857823TCG3048692532C7"

  const handleContinue = () => {
    if (expired) return
    setIsLoading(true)
    setPaymentMethod("pix")
    router.push("/checkout/review")
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Pagamento via Pix
              </CardTitle>
              <CardDescription>
                Escaneie o QR Code abaixo para efetuar o pagamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                <Image
                  src={pixImage}
                  alt="QR Code para pagamento via Pix"
                  fill
                  className="object-contain rounded-md"
                />
              </div>

              <div className="w-full">
                <Label className="mb-1">Chave Pix:</Label>
                <Input
                  type="text"
                  className="p-2 bg-gray-100 rounded-md select-all"
                  defaultValue={exampleKey}
                ></Input>
              </div>

              <div className="flex flex-col items-center">
                <span>Tempo Restante: </span>
                <Timer onExpire={() => setExpired(true)} />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <div className="w-full p-4 rounded-md border bg-muted/5 text-muted-foreground">
                <span className="font-medium">Como pagar</span>
                <p>1. Abra seu app de banco ou carteiras digitais.</p>
                <p>2. Selecione a opção Pagar com Pix.</p>
                <p>3. Escaneie o QR Code ou insira a chave Pix fornecida.</p>
                <p>4. Complete o pagamento antes do tempo expirar.</p>
              </div>

              <div className="w-full">
                <Button
                  onClick={handleContinue}
                  disabled={expired || isLoading}
                  className="w-full"
                >
                  {expired
                    ? "QR Code expirado"
                    : isLoading
                    ? "Carregando..."
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
