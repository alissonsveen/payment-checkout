"use client"
import { Suspense } from "react"
import AuthLayout from "@/components/auth/AuthLayout"
import AuthForm from "@/components/auth/AuthForm"
import { Loader } from "lucide-react"

export default function AuthPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin" />
          </div>
        }
      >
        <AuthForm />
      </Suspense>
    </AuthLayout>
  )
}
