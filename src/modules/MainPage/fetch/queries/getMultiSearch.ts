import Search from "../dto/SearchLocation";
import { URLSearchParams } from "url";
import { ProxyYachticFetch } from "@/fetch/ProxyFetch";

export async function getMultiSearch(params: URLSearchParams): Promise<Search[]> {
    return (await ProxyYachticFetch<{models: Search[]}>("yachts/multi-search-options", params)).models;
}