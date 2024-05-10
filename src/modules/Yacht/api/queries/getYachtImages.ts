import { ApiQuery } from "@/fetch/ApiQuery";
import YachtPrimaryKey from "../dto/YachtPrimaryKey";
import YachtSliderImage from "../dto/YachtImage";

export default async function getYachtImages({
    id,
    date = "",
    days = 7,
    locationFromId = "",
    locationToId = "",
    isNonRefundable = false
}: YachtPrimaryKey): Promise<YachtSliderImage[]> {
    return await ApiQuery(`yachts/images/${id},${date},${days},${locationFromId},${locationToId},${isNonRefundable ? "1" : "0"}`);
}