"use client"
import { useState } from "react"
import type { ComponentType, SVGProps } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarcodeIcon, CreditCard, QrCode, Check } from "lucide-react"
import { useRouter } from "next/navigation"

type Method = "creditCard" | "pix" | "boleto"

function Option({
  id,
  name,
  value,
  title,
  description,
  icon: Icon,
  checked,
  onChange,
}: {
  id: string
  name: string
  value: Method
  title: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  checked: boolean
  onChange: (v: Method) => void
}) {
  return (
    <label
      htmlFor={id}
      className={`relative flex items-center gap-4 p-4 rounded-lg border transition-shadow cursor-pointer
  ${
    checked
      ? "border-blue-500 bg-blue-50 dark:bg-zinc-700 shadow-sm dark:text-white "
      : "border-gray-200 bg-white dark:border-gray-700 dark:bg-zinc-600 dark:text-white hover:shadow"
  }`}
    >
      <Input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-md bg-white/80 dark:bg-zinc-700 border dark:border-zinc-600">
          <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-100" />
        </div>

        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>

      <div className="ml-auto">
        {checked ? (
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white">
            <Check className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border" />
        )}
      </div>
    </label>
  )
}

export default function PaymentMethodForm() {
  const [method, setMethod] = useState<Method>("creditCard")
  const router = useRouter()

  const handleConfirm = () => {
    router.push(`/checkout/payment/methods/${method}`)
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-xl ">
        <CardHeader>
          <CardTitle>Escolha o método de pagamento</CardTitle>
          <CardDescription>Selecione como deseja pagar</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-3 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3  dark:text-black">
            <Option
              id="pm-credit"
              name="paymentMethod"
              value="creditCard"
              title="Cartão de Crédito"
              description="Aprovação imediata"
              icon={CreditCard}
              checked={method === "creditCard"}
              onChange={(v) => setMethod(v)}
            />

            <Option
              id="pm-pix"
              name="paymentMethod"
              value="pix"
              title="Pix"
              description="Pagamento instantâneo"
              icon={QrCode}
              checked={method === "pix"}
              onChange={(v) => setMethod(v)}
            />

            <Option
              id="pm-boleto"
              name="paymentMethod"
              value="boleto"
              title="Boleto"
              description="Liberação em 1-3 dias"
              icon={BarcodeIcon}
              checked={method === "boleto"}
              onChange={(v) => setMethod(v)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end p-4">
          <button
            onClick={() => handleConfirm()}
            className="bg-zinc-500 text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            Confirmar
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
