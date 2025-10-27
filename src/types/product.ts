import type { StaticImageData } from "next/image"

export interface Product {
  id: string
  name: string
  price: number
  description: string
  image?: string | StaticImageData
}
