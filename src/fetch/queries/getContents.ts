import { ApiQuery } from "@/fetch/ApiQuery";
import AbeonContent from "../dto/abeonContent";

export async function getContents(id: number | string): Promise<AbeonContent> {
    return await ApiQuery(`contents/${id}`);
}