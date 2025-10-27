"use client"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type ShippingAddress = {
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

type CheckoutState = {
  shipping: ShippingAddress | null
  paymentMethod: "card" | "pix" | "boleto" | null
  draftOrderId?: string | null
  status?: "pendente" | "processando" | "pago" | "falhou" | "expirado" | null
  simulatedOutcome?: "pago" | "falhou" | "expirado" | null
  boletoExpiration?: number | null
  setShipping: (s: ShippingAddress) => void
  setPaymentMethod: (m: "card" | "pix" | "boleto" | null) => void
  setDraftOrderId: (id: string | null) => void
  setStatus: (
    s: "pendente" | "processando" | "pago" | "falhou" | "expirado" | null
  ) => void
  setSimulatedOutcome: (v: "pago" | "falhou" | "expirado" | null) => void
  setBoletoExpiration: (t: number | null) => void
  clearCheckout: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shipping: null,
      paymentMethod: null,
      draftOrderId: null,
      status: null,
      setShipping: (s) => set({ shipping: s }),
      setPaymentMethod: (m) => set({ paymentMethod: m }),
      setDraftOrderId: (id) => set({ draftOrderId: id }),
      setStatus: (s) => set({ status: s }),
      simulatedOutcome: null,
      boletoExpiration: null,
      setSimulatedOutcome: (v) => set({ simulatedOutcome: v }),
      setBoletoExpiration: (t) => set({ boletoExpiration: t }),
      clearCheckout: () => set({ shipping: null, paymentMethod: null }),
    }),
    {
      name: "checkout-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCheckoutStore
