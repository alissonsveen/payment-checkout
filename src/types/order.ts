import { CartItem } from "./cart"
import { User } from "./user"

export interface Order {
  id: string
  user: User
  items: CartItem[]
  total: number
  paymentMethod: "pix" | "credit" | "boleto"
  status: "pendente" | "processando" | "pago" | "falhou" | "expirado"
}
