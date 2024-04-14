import { ApiQuery } from "@/fetch/ApiQuery";
import { RevalidateTime } from "@/fetch/enums/RevalidateTime";

export async function getFirstLastMinute(): Promise<{models: Yacht[]}> {
    return await ApiQuery<{models: Yacht[]}>(
        "yachts/first-last-minute",
        {
            init: { 
                next: { revalidate: RevalidateTime.DAY }
            }
        }
    );
}