import { ApiQuery } from "@/fetch/ApiQuery";
import YachtPrimaryKey from "../dto/YachtPrimaryKey";

export default async function getYachtSpecification({
    id,
    date = "",
    days = 7,
    locationFromId = "",
    locationToId = "",
    isNonRefundable = false
}: YachtPrimaryKey): Promise<YachtSpecification> {
    return await ApiQuery(`yachts/specification/${id},${date},${days},${locationFromId},${locationToId},${isNonRefundable ? "1" : "0"}`);
}