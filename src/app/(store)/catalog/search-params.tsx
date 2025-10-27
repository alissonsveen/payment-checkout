import { parseAsInteger, parseAsString, createLoader } from "nuqs/server"

export const catalogSearchParams = {
  search: parseAsString.withDefault(""),
  perPage: parseAsInteger.withDefault(12),
  offset: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(catalogSearchParams)
