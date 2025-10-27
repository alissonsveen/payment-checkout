import { fetchProducts } from "@/lib/mockApi"
import ProductGrid from "@/components/catalog/product-grid"

export default async function ProductsListServer() {
  const products = await fetchProducts()
  return <ProductGrid products={products} />
}
