import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import { Box } from "lucide-react"

export function OrderSummaryPage() {
  const { items, total } = useCart()

  const fmt = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resumo do pedido</CardTitle>
      </CardHeader>
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-1 justify-center">
          Seu carrinho está vazio
          <Box />
        </div>
      ) : (
        <>
          <CardContent>
            <div className="flex flex-col gap-4 overflow-auto max-h-96 p-2 pr-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 border rounded-md p-2"
                >
                  <div className="w-16 h-16 relative shrink-0 bg-white">
                    <Image
                      src={
                        typeof item.product.image === "string"
                          ? item.product.image
                          : item.product.image?.src ?? "/vercel.svg"
                      }
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qtd: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    {fmt.format(item.product.price)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </>
      )}

      <Separator />

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-medium">{fmt.format(total)}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted-foreground">Frete</span>
          <span className="text-sm text-green-600 font-medium">Grátis</span>
        </div>
        <div className="flex items-center justify-between mt-4 border-t pt-3">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">{fmt.format(total)}</span>
        </div>
      </div>
    </Card>
  )
}
