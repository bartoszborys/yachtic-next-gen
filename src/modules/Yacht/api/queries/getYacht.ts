import { ApiQuery } from "@/fetch/ApiQuery";
import Yacht from "../dto/Yacht";

interface getYachtData {
    id: string | number;
    date?: string;
    days?: string | number;
    locationFromId?: string | number;
    locationToId?: string | number;
    isNonRefundable?: boolean;
}

export default async function getYacht({
    id,
    date = "",
    days = 7,
    locationFromId = "",
    locationToId = "",
    isNonRefundable = false
}: getYachtData): Promise<Yacht> {
    return await ApiQuery(`yachts/${id},${date},${days},${locationFromId},${locationToId},${isNonRefundable ? "1" : "0"}`);
}