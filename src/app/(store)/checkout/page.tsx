"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrderSummaryPage } from "./orderSummary"
import { useAuthStore } from "@/store/authStore"
import { Package } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import useCheckoutStore from "@/store/checkoutStore"

export default function CheckoutPage() {
  const { user } = useAuthStore()
  const router = useRouter()

  const checkout = useCheckoutStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const shipping = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      cpf: String(fd.get("cpf") ?? "").replace(/\D/g, ""),
      phone: String(fd.get("phone") ?? "").replace(/\D/g, ""),
      zipCode: String(fd.get("zipCode") ?? "").replace(/\D/g, ""),
      street: String(fd.get("street") ?? "").trim(),
      number: String(fd.get("number") ?? "").trim(),
      complement: String(fd.get("complement") ?? "").trim(),
      neighborhood: String(fd.get("neighborhood") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      state: String(fd.get("state") ?? "").trim(),
    }

    checkout.setShipping(shipping)
    router.push("/checkout/payment")
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 items-start"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package /> Informações da entrega
            </CardTitle>
            <CardDescription>Revise seus dados de entrega</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={user?.name ?? ""}
                />
                <Label className="mt-2" htmlFor="cpf">
                  CPF
                </Label>
                <Input id="cpf" name="cpf" defaultValue={user?.cpf ?? ""} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={user?.phone ?? ""}
                />
                <Label className="mt-2" htmlFor="zipCode">
                  CEP
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  defaultValue={user?.zipCode ?? ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" name="city" defaultValue={user?.city ?? ""} />
                <Label className="mt-2" htmlFor="state">
                  Estado
                </Label>
                <Input
                  id="state"
                  name="state"
                  defaultValue={user?.state ?? ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  defaultValue={user?.neighborhood ?? ""}
                />
                <Label className="mt-2" htmlFor="number">
                  Número
                </Label>
                <Input id="number" name="number" defaultValue={user?.number} />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                className="text-sm cursor-pointer hover:text-zinc-400 text-muted-foreground"
                onClick={() => router.replace("/catalog")}
                type="button"
              >
                Voltar
              </Button>
            </div>

            <div>
              <Button type="submit">Continuar</Button>
            </div>
          </CardFooter>
        </Card>

        <aside className="w-full">
          <div className="sticky top-6">
            <OrderSummaryPage />
          </div>
        </aside>
      </form>
    </div>
  )
}
