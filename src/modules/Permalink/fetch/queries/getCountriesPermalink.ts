import { ApiQuery } from "@/fetch/ApiQuery";
import { RevalidateTime } from "@/fetch/enums/RevalidateTime";

export async function getCountriesPermalink(): Promise<WebCountriesCollectionAccessCountryDTO[]> {
    return await ApiQuery(
        "yachts/countries",
        {
            init: {
                next: { revalidate: RevalidateTime.DAY }
            }
        }
    );
}

interface WebCountriesCollectionAccessCountryDTO {
    id: number;
    name: string;
    url: string;
    regions: {
        id: number;
        name: string;
        url: string;
        locations: {
            id: number;
            name: string;
            url: string;
            latitude: number;
            longitude: number;
        }[];
    }[];
}