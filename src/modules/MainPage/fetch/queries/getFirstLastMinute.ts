import { ApiQuery } from "@/fetch/ApiQuery";

export async function getFirstLastMinute(): Promise<{models: Yacht[]}> {
    return await ApiQuery<{models: Yacht[]}>("yachts/first-last-minute");
}