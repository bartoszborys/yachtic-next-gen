import { RevalidateTime } from "@/fetch/enums/RevalidateTime";
import { Language } from "../dto/language";
import { ApiQuery } from "@/fetch/ApiQuery";

export async function getLanguages(): Promise<Language[]> {
    return ApiQuery(
        "abeon-languages",
        {
            init: { 
                next: { revalidate: RevalidateTime.DAY }
            }
        }
    );
}