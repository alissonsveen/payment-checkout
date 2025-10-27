"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoaderCircle } from "lucide-react"
import PasswordField from "./PasswordField"

const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

type LoginData = z.infer<typeof LoginSchema>

type LoginFormProps = {
  onSuccess?: () => void
  onError?: (message?: string) => void
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { loginUser, loading } = useAuth()
  const search = useSearchParams()
  const next = search.get("next") || undefined

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(data: LoginData) {
    const result = await loginUser(data, next)

    if (result.success) {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", "system")
        }
      } catch {}
      onSuccess?.()
    } else {
      onError?.(result.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="seu@email.com"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordField
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              autoComplete="current-password"
              field={field}
            />
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  )
}
