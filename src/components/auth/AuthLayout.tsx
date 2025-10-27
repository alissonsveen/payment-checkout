"use client"
import Logo from "@/components/logo/logo"
import LogoImg from "@/assets/logo.png"
import cellcard from "@/assets/cellcard.svg"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthLayout({
  children,
  title = "Bem-vindo",
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className="min-h-screen flex lg:flex-row justify-center items-center p-8  bg-linear-to-b from-blue-950 to-blue-700 ">
      <div className="hidden lg:flex">
        <Logo
          src={cellcard}
          width={500}
          height={500}
          alt="Ilustração do app de pagamentos"
        />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center theme-light ">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Logo src={LogoImg} alt="CellCard" />
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
