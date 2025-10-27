"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { toast } from "sonner"

export default function AuthForm() {
  const [tab, setTab] = useState<"login" | "register">("login")

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="register">Criar Conta</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <LoginForm
          onSuccess={() => {
            toast.success("Login realizado com sucesso!")
          }}
          onError={(message) => {
            toast.error(message || "Senha ou email inválidos. Tente novamente.")
          }}
        />
      </TabsContent>

      <TabsContent value="register">
        <RegisterForm
          onSuccess={() => {
            setTab("login")
            toast.success("Registro bem-sucedido! Por favor, faça login.")
          }}
          onError={(message) => {
            toast.error(
              message || "Não foi possível criar a conta. Tente novamente."
            )
          }}
        />
      </TabsContent>
    </Tabs>
  )
}
