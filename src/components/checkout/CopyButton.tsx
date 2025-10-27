"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

type Props = {
  onClick: () => void
  size?: "sm" | "default"
}

export default function CopyButton({ onClick, size = "default" }: Props) {
  return (
    <Button size={size} variant="ghost" onClick={onClick}>
      <Copy className="w-4 h-4" />
      <span className="sr-only">Copiar número do pedido</span>
    </Button>
  )
}
