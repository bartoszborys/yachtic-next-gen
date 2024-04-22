import { ApiQuery } from "@/fetch/ApiQuery";
import { RevalidateTime } from "@/fetch/enums/RevalidateTime";
import WebPermalink from "../dto/webPermalink";

export default async function getPermalink(permalink: string): Promise<WebPermalink> {
    const params = new URLSearchParams();
    params.set("permalink", permalink);

    return ApiQuery("web-permalinks", {
        params,
        init: {
            next: {
                revalidate: RevalidateTime.DAY
            }
        }
    });
}