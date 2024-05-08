import { ApiQuery } from "@/fetch/ApiQuery";
import { RevalidateTime } from "@/fetch/enums/RevalidateTime";

export default async function getPrices(yachtId: string | number, locationFormId: string | number): Promise<any[]> {
    const params = new URLSearchParams;
    params.append("yachtId", "");
    return await ApiQuery(
        `prices/availability/${yachtId}/${locationFormId}`,
        {
            params,
            init: {
                //next: { revalidate: RevalidateTime.DAY }
            }
        }
    );
}
