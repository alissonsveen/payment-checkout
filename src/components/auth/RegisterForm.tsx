"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { LoaderCircle, ChevronLeft, ChevronRight } from "lucide-react"
import PasswordField from "./PasswordField"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const RegisterSchema = z
  .object({
    name: z.string().min(2, "Nome obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
    phone: z
      .string()
      .min(1, "Telefone obrigatório")
      .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
    cpf: z
      .string()
      .min(1, "CPF obrigatório")
      .regex(/^\d{3}\.??\d{3}\.??\d{3}-?\d{2}$/, "CPF inválido"),
    address: z.object({
      street: z.string().min(2, "Rua obrigatória"),
      number: z.string().min(1, "Número obrigatório"),
      complement: z.string().optional(),
      neighborhood: z.string().min(1, "Bairro obrigatório"),
      city: z.string().min(2, "Cidade obrigatória"),
      state: z.string().min(2, "Estado obrigatório"),
      zipCode: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem.",
    path: ["confirmPassword"],
  })

type RegisterData = z.infer<typeof RegisterSchema>

type RegisterFormProps = {
  onSuccess?: () => void
  onError?: (message?: string) => void
}

export default function RegisterFormMultiStep({
  onSuccess,
  onError,
}: RegisterFormProps) {
  const { registerUser, loading } = useAuth()
  const [step, setStep] = useState(1)

  const form = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      cpf: "",
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  })

  async function onSubmit(data: RegisterData) {
    const normalizeDigits = (s?: string) => (s ? s.replace(/\D/g, "") : "")

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      phone: normalizeDigits(data.phone),
      cpf: normalizeDigits(data.cpf),
      address: {
        city: data.address.city.trim(),
        street: data.address.street.trim(),
        number: data.address.number.trim(),
        neighborhood: data.address.neighborhood.trim(),
        complement: data.address.complement?.trim() ?? "",
        state: data.address.state.trim(),
        zipCode: normalizeDigits(data.address.zipCode),
      },
    }

    const result = await registerUser(payload)
    if (result.success) {
      form.reset()
      onSuccess?.()
    }
    if (!result.success) {
      onError?.(result.error)
    }
  }

  const validateStep = async () => {
    let isValid = false

    if (step === 1) {
      isValid = await form.trigger([
        "name",
        "email",
        "password",
        "confirmPassword",
      ])
    } else if (step === 2) {
      isValid = await form.trigger(["phone", "cpf"])
    }

    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep()
    if (isValid && step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2 rounded-full transition-all ${
            s === step
              ? "w-8 bg-primary"
              : s < step
              ? "w-2 bg-primary/50"
              : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sua conta</CardTitle>
        <CardDescription>
          Etapa {step} de 3 -{" "}
          {step === 1 ? "Dados pessoais" : step === 2 ? "Contato" : "Endereço"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStepIndicator()}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome completo"
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="email@example.com"
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
                      autoComplete="new-password"
                      field={field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <PasswordField
                      label="Confirme sua senha"
                      placeholder="Digite a senha novamente"
                      autoComplete="new-password"
                      field={field}
                    />
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="(00) 00000-0000"
                          inputMode="numeric"
                          pattern="[0-9()\-\s]+"
                          maxLength={15}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="000.000.000-00"
                          inputMode="numeric"
                          pattern="[0-9.\-]+"
                          maxLength={14}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="00000-000"
                            autoComplete="postal-code"
                            inputMode="numeric"
                            pattern="[0-9\-]+"
                            maxLength={9}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="123"
                            autoComplete="address-line2"
                            inputMode="numeric"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nome da rua"
                          autoComplete="address-line1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento (opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Apto, bloco, etc" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Bairro" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_100px] gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Sua cidade"
                            autoComplete="address-level2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem className="min-h-[76px]">
                        <FormLabel>UF</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="SP"
                            autoComplete="address-level1"
                            maxLength={2}
                            className="uppercase"
                          />
                        </FormControl>
                        <FormMessage className="whitespace-nowrap text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="flex gap-2 pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Voltar
                </Button>
              )}

              {step < 3 ? (
                <Button type="button" onClick={handleNext} className="flex-1">
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
