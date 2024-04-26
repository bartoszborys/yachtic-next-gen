import { ApiQuery } from "@/fetch/ApiQuery";

interface getYachtSpecificationData {
    id: string | number;
    date?: string;
    days?: string | number;
    locationFromId?: string | number;
    locationToId?: string | number;
    isNonRefundable?: boolean;
}

export default async function getYachtSpecification({
    id,
    date = "",
    days = 7,
    locationFromId = "",
    locationToId = "",
    isNonRefundable = false
}: getYachtSpecificationData): Promise<YachtSpecification> {
    return await ApiQuery(`yachts/specification/${id},${date},${days},${locationFromId},${locationToId},${isNonRefundable ? "1" : "0"}`);
}