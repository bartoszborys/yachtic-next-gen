import { ApiFetch } from "@/fetch/ApiFetch";
import YachtsData from "../types/ApiYachtData";
import { YachtsPagination } from "../types/YachtsPagination";

export async function getYachts(params: URLSearchParams): Promise<YachtsData[]> {
    return await ApiFetch(`yachts?currencyId=2&${params.toString()}`);
}

export async function getPages(params: URLSearchParams): Promise<YachtsPagination> {
    return await ApiFetch(`yachts/pagination?currencyId=2&${params.toString()}`);
}