import { ApiFetch } from "@/fetch/ApiFetch";

export async function getFirstLastMinute(): Promise<{models: Yacht[]}> {
    return await ApiFetch<{models: Yacht[]}>("yachts/first-last-minute?currencyId=2");
}