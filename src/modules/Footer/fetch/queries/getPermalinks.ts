import { ApiQuery } from "@/fetch/ApiQuery";
import { FooterItem } from "../dto/FooterItem";
import { RevalidateTime } from "@/fetch/enums/RevalidateTime";

export default async function getPermalinks(): Promise<FooterItem[]> {
    return (await ApiQuery<{ items: FooterItem[] }>(
        "menu/links/footer",
        {
            init: {
                next: {
                    revalidate: RevalidateTime.DAY
                }
            }
        }
    )).items;
}