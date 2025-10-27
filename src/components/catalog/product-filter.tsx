"use client"
import { startTransition } from "react"
import { parseAsString, useQueryState } from "nuqs"
import DebouncedInput from "@/components/ui/debounced-input"

export default function ProductFilter() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString
      .withDefault("")
      .withOptions({ startTransition, shallow: true })
  )

  const handleSearchCommit = (value: string) => {
    startTransition(() => {
      void setSearch(value)
    })
  }

  return (
    <div className="flex justify-between">
      <div className="">
        <DebouncedInput
          defaultValue={search}
          delay={250}
          placeholder="Pesquisa"
          className="w-full"
          onCommit={handleSearchCommit}
        />
      </div>
    </div>
  )
}
