"use server"

import { MOCK_PRODUCTS } from "@/store/catalog"
import type { Product } from "@/types/product"

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

function maybeFail(rate = 0) {
  if (rate <= 0) return
  const roll = Math.random()
  if (roll < rate) {
    throw new Error("Falha de rede simulada")
  }
}

interface GetProductsParams {
  latencyMs?: number
  search?: string
  perPage?: number
  failRate?: number
}

export async function fetchProductsByName({
  search,
  perPage,
  failRate,
}: GetProductsParams): Promise<Product[]> {
  const q = (search ?? "").toLowerCase().trim()
  maybeFail(failRate)
  const list = q
    ? MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q))
    : MOCK_PRODUCTS
  const limited = perPage ? list.slice(0, perPage) : list
  return limited.map((p) => ({ ...p }))
}

export async function fetchProducts(
  opts: GetProductsParams = {}
): Promise<Product[]> {
  const { latencyMs = 1500, search, perPage, failRate } = opts
  await wait(latencyMs)
  maybeFail(failRate)

  const q = (search ?? "").toLowerCase().trim()
  let filteredProducts = q
    ? MOCK_PRODUCTS.filter((p) => {
        const name = p.name.toLowerCase()
        const desc = p.description.toLowerCase()
        return name.includes(q) || desc.includes(q)
      })
    : MOCK_PRODUCTS

  if (perPage) {
    filteredProducts = filteredProducts.slice(0, perPage)
  }

  return filteredProducts.map((p) => ({ ...p }))
}

export async function fetchProductById(
  id: string,
  opts: GetProductsParams = {}
): Promise<Product> {
  const { latencyMs = 400, failRate } = opts
  await wait(latencyMs)
  maybeFail(failRate)
  const found = MOCK_PRODUCTS.find((p) => p.id === id)
  if (!found) throw new Error("Produto não encontrado")
  return { ...found }
}

export async function refreshProducts(
  opts: GetProductsParams = {}
): Promise<Product[]> {
  const { latencyMs = 800 } = opts
  await wait(latencyMs)
  return fetchProducts({ ...opts, latencyMs: 0 })
}
