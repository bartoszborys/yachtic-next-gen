import { RevalidateTime } from "@/fetch/enums/RevalidateTime";
import { Currency } from "../dto/currency";
import { ApiQuery } from "@/fetch/ApiQuery";

export async function getCurrencies(): Promise<Currency[]> {
    return (await ApiQuery<{ models: Currency[] }>(
        "yachts/currencies",
        {
            init: { 
                next: { revalidate: RevalidateTime.DAY }
            }
        }
    )).models;
}