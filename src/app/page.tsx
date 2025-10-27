"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { Loader } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) router.replace("/catalog")
    else router.replace("/auth")
  }, [isAuthenticated, router])

  return (
    <div className="min-h-dvh grid place-items-center">
      <Loader className="animate-spin" />
    </div>
  )
}
