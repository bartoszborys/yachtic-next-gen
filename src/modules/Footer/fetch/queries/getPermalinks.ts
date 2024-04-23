import { ApiQuery } from "@/fetch/ApiQuery";
import { FooterItem } from "../dto/FooterItem";

export default async function getPermalinks(): Promise<FooterItem[]> {
    return (await ApiQuery<{items: FooterItem[]}>("menu/links/footer")).items;
}