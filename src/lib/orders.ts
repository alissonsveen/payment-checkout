export type StoredOrderItem = {
  productId: string
  name: string
  image?: string
  price?: number
  quantity: number
}

export type StoredShipping = {
  fullName?: string
  cpf?: string
  phone?: string
  zipCode?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
}

export type StoredOrder = {
  id: string
  status: string
  date: number
  items?: StoredOrderItem[]
  shipping?: StoredShipping | null
}

const STORAGE_KEY = "orders"

export function getOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredOrder[]
  } catch {
    return []
  }
}

export function addOrder(order: StoredOrder) {
  try {
    const current = getOrders()
    const exists = current.find((o) => o.id === order.id)
    if (exists) return
    current.unshift(order)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {}
}

export function clearOrders() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}
