import { ApiQuery } from "../ApiQuery";
import { KindData } from "../dto/kindData";
import { RevalidateTime } from "../enums/RevalidateTime";

export default async function getKinds(): Promise<KindData[]> {
    return (await ApiQuery<{ models: KindData[] }>(
        "yachts/kinds",
        {
            init: {
                next: { revalidate: RevalidateTime.DAY }
            }
        }
    )).models;
}