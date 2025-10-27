"use client"
import React from "react"
import { Check, Clock, X } from "lucide-react"

type Props = {
  status: string
}

export default function ResultHeader({ status }: Props) {
  let icon = null
  let bgColor = "bg-zinc-200"
  let statusText = "Resultado indisponível"

  if (status === "pago") {
    icon = <Check className="h-6 w-6 text-white" />
    bgColor = "bg-green-500"
    statusText = "Pagamento realizado com sucesso!"
  } else if (status === "falhou") {
    icon = <X className="h-6 w-6 text-white" />
    bgColor = "bg-red-500"
    statusText = "Falha no pagamento. Tente novamente."
  } else if (status === "expirado") {
    icon = <Clock className="h-6 w-6 text-white" />
    bgColor = "bg-yellow-500"
    statusText = "Pagamento expirado. Por favor, reinicie o processo."
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`rounded-full flex items-center justify-center w-20 h-20 ring-4 ring-white shadow-md ${bgColor}`}
        role="img"
      >
        {icon}
      </div>
      <div
        role="status"
        aria-live="polite"
        className="text-lg font-semibold text-center"
      >
        {statusText}
      </div>
    </div>
  )
}
