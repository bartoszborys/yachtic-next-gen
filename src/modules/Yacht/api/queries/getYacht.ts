import { ApiQuery } from "@/fetch/ApiQuery";
import Yacht from "../dto/Yacht";
import YachtPrimaryKey from "../dto/YachtPrimaryKey";

export default async function getYacht({
    id,
    date = "",
    days = 7,
    locationFromId = "",
    locationToId = "",
    isNonRefundable = false
}: YachtPrimaryKey): Promise<Yacht> {
    return await ApiQuery(`yachts/${id},${date},${days},${locationFromId},${locationToId},${isNonRefundable ? "1" : "0"}`);
}