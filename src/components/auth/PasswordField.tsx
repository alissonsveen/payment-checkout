"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

type PasswordFieldProps = {
  label: string
  placeholder?: string
  autoComplete?: string
  field: {
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    ref: (instance: HTMLInputElement | null) => void
  }
}

export function PasswordField({
  label,
  placeholder,
  autoComplete,
  field,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <Input
            {...field}
            type={show ? "text" : "password"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="pr-10"
          />
        </FormControl>
        <Button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          title={show ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-transparent hover:bg-transparent"
        >
          {show ? (
            <EyeOff size={16} className="text-gray-500" />
          ) : (
            <Eye size={16} className="text-gray-500" />
          )}
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  )
}

export default PasswordField
