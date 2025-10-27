"use client"
import React from "react"
import CopyButton from "@/components/checkout/CopyButton"

type Props = {
  orderId?: string | null
  status: string
  onCopy?: () => void
  copied?: boolean
}

export default function OrderCard({ orderId, status, onCopy, copied }: Props) {
  const displayId = orderId ?? "—"

  return (
    <div className="bg-white dark:bg-zinc-600 border border-zinc-200 rounded-xl p-4 text-center w-full">
      <div className="text-xs text-muted-foreground dark:text-white">
        Número do pedido
      </div>
      <div className="flex items-center justify-center gap-2 mt-1">
        <code className="text-lg font-bold">#{displayId}</code>
        {orderId && onCopy && (
          <div className="flex items-center gap-2">
            <CopyButton onClick={onCopy} size="sm" />
            {copied && <span className="text-xs text-green-600">Copiado!</span>}
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground mt-2 dark:text-white">
        Status atual: {status}
      </div>
    </div>
  )
}
