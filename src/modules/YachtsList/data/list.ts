import { ApiQuery } from "@/fetch/ApiQuery";
import YachtsData from "../types/ApiYachtData";
import { YachtsPagination } from "../types/YachtsPagination";

export async function getYachts(params: URLSearchParams): Promise<YachtsData[]> {
    return await ApiQuery(`yachts`, {params});
}

export async function getPages(params: URLSearchParams): Promise<YachtsPagination> {
    return await ApiQuery(`yachts/pagination`, {params});
}