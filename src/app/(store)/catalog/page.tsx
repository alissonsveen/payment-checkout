import { Suspense } from "react"
import ProductFilter from "@/components/catalog/product-filter"
import ProductsListServer from "@/components/catalog/products-list-server"
import ProductGridSkeleton from "@/components/catalog/product-grid-skeleton"
import { loadSearchParams } from "./search-params"
import type { SearchParams } from "nuqs/server"

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function CatalogPage({ searchParams }: PageProps) {
  await loadSearchParams(searchParams)

  return (
    <main className="flex flex-col gap-10 justify-center max-w-6xl mx-auto p-10">
      <ProductFilter />
      <Suspense fallback={<ProductGridSkeleton count={12} />}>
        <ProductsListServer />
      </Suspense>
    </main>
  )
}
