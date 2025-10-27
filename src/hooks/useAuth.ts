import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { mockLogin, mockRegister } from "@/lib/auth"
import { LoginData, RegisterData, UserAddress } from "@/types/user"

export function useAuth() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuthStore()

  const loginUser = async (
    { email, password }: LoginData,
    nextPath?: string
  ) => {
    try {
      setLoading(true)
      setError(null)

      const user = await mockLogin({ email, password })
      login(user)
      router.replace(nextPath || "/catalog")

      return { success: true, user }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao autenticar"
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async ({
    name,
    email,
    phone,
    password,
    address,
    cpf,
  }: Omit<RegisterData, "confirmPassword"> & { address: UserAddress }) => {
    try {
      setLoading(true)
      setError(null)

      const user = await mockRegister({ name, email, password, phone, address, cpf })

      return { success: true, user }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao registrar"
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    loginUser,
    registerUser,
    error,
    loading,
    clearError,
  }
}
