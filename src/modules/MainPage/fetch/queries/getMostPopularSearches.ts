import { ApiQuery } from "@/fetch/ApiQuery";
import Search from "../dto/SearchLocation";
import { RevalidateTime } from "@/fetch/enums/RevalidateTime";

export async function getMostPopularSearches(): Promise<Search[]> {
    return (await ApiQuery<{ models: Search[] }>(
        "yachts/most-popular-searches",
        {
            init: {
                next: { revalidate: RevalidateTime.DAY }
            }
        }
    )).models;
}