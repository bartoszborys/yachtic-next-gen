import { ApiQuery } from "@/fetch/ApiQuery";
import Search from "../dto/SearchLocation";

export async function getMostPopularSearches(): Promise<Search[]> {
    return (await ApiQuery<{models: Search[]}>("yachts/most-popular-searches")).models;
}