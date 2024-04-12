import { ApiQuery } from "@/fetch/ApiQuery";
import Search from "../dto/SearchLocation";
import { URLSearchParams } from "url";

export async function getMultiSearch(params: URLSearchParams): Promise<Search[]> {
    return (await ApiQuery<{models: Search[]}>("yachts/multi-search-options", params)).models;
}