"use client"
import React from "react"
import { useRouter } from "next/navigation"
import useCheckoutStore from "@/store/checkoutStore"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderSummaryPage } from "../orderSummary"

export default function ReviewPage() {
  const router = useRouter()
  const { shipping, paymentMethod, setDraftOrderId, setStatus } =
    useCheckoutStore()

  const handleConfirm = () => {
    const id = String(Date.now())
    setDraftOrderId(id)
    setStatus("processando")
    router.push("/checkout/status")
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Revisão do Pedido</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Endereço de entrega</h4>
                  {!shipping ? (
                    <div className="text-sm text-muted-foreground">
                      Nenhum endereço salvo. Volte e preencha os dados de
                      entrega.
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>
                        <span className="font-medium">Nome: </span>
                        {shipping.fullName || "-"}
                      </div>
                      <div>
                        <span className="font-medium">CPF: </span>
                        {shipping.cpf || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Telefone: </span>
                        {shipping.phone || "-"}
                      </div>
                      <div>
                        <span className="font-medium">CEP: </span>
                        {shipping.zipCode || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Endereço: </span>
                        {shipping.street || "-"}, {shipping.number || "-"}
                      </div>
                      {shipping.complement && (
                        <div>
                          <span className="font-medium">Complemento: </span>
                          {shipping.complement}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Bairro: </span>
                        {shipping.neighborhood || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Cidade / Estado: </span>
                        {shipping.city || "-"} / {shipping.state || "-"}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium">Método de pagamento</h4>
                  <div className="text-sm text-muted-foreground">
                    {paymentMethod ?? "(não selecionado)"}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button onClick={() => router.push("/checkout")}>Voltar</Button>
              <Button className="ml-2" onClick={handleConfirm}>
                Confirmar
              </Button>
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
