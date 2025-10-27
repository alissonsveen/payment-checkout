"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import useCheckoutStore from "@/store/checkoutStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OrderSummaryPage } from "../../../orderSummary"
import { z } from "zod"
import { CreditCard } from "lucide-react"

const CardSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  cardNumber: z.string().min(13, "Número inválido").max(19, "Número inválido"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Validade deve estar em MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC inválido"),
})

export default function CreditCardMethod() {
  const router = useRouter()
  const setPaymentMethod = useCheckoutStore((s) => s.setPaymentMethod)

  const [name, setName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const normalizeNumber = (v: string) => v.replace(/\D/g, "")
  const normalizeExpiry = (v: string) =>
    v.replace(/[^0-9/]/g, "").replace(/^(\d{2})(\d)/, "$1/$2")
  const normalizeCvc = (v: string) => v.replace(/\D/g, "").slice(0, 4)

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setErrors({})

    const payload = {
      name: name.trim(),
      cardNumber: normalizeNumber(cardNumber),
      expiry: expiry.trim(),
      cvc: normalizeCvc(cvc),
    }

    const result = CardSchema.safeParse(payload)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        fieldErrors[issue.path.join(".")] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
      setPaymentMethod("card")
      router.push("/checkout/review")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 items-start">
        <form className="w-full" onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard />
                <CardTitle>Pagamento com Cartão</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                Insira os dados do cartão (dados fictícios)
              </div>
            </CardHeader>

            <CardContent>
              <div className="mt-2 grid grid-cols-1 gap-3">
                <div>
                  <Label htmlFor="cc-name">Nome no cartão</Label>
                  <Input
                    id="cc-name"
                    name="cc-name"
                    value={name}
                    className="mt-1"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome como no cartão"
                  />
                  <p className="min-h-5 text-xs text-red-600">
                    {errors["name"] ?? ""}
                  </p>
                </div>

                <div>
                  <Label htmlFor="cc-number">Número do cartão</Label>
                  <Input
                    id="cc-number"
                    name="cc-number"
                    inputMode="numeric"
                    className="mt-1"
                    autoComplete="cc-number"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(
                        e.target.value
                          .replace(/\s+/g, "")
                          .replace(/(\d{4})/g, "$1 ")
                          .trim()
                      )
                    }
                    placeholder="1234 5678 9012 3456"
                  />
                  <p className="min-h-5 text-xs text-red-600">
                    {errors["cardNumber"] ?? ""}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cc-exp">Validade (MM/YY)</Label>
                    <Input
                      id="cc-exp"
                      name="cc-exp"
                      inputMode="numeric"
                      className="mt-1"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) =>
                        setExpiry(normalizeExpiry(e.target.value))
                      }
                    />
                    <p className="min-h-5 text-xs text-red-600">
                      {errors["expiry"] ?? ""}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="cc-cvc">CVC</Label>
                    <Input
                      id="cc-cvc"
                      name="cc-cvc"
                      inputMode="numeric"
                      className="mt-1"
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(normalizeCvc(e.target.value))}
                    />
                    <p className="min-h-5 text-xs text-red-600">
                      {errors["cvc"] ?? ""}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Processando..." : "Continuar"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>

        <aside className="w-full">
          <div className="sticky top-6">
            <OrderSummaryPage />
          </div>
        </aside>
      </div>
    </div>
  )
}
