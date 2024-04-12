import Search from "../../fetch/dto/SearchLocation";
import { SearchItem } from "./SearchItem";

export class SearchLocation extends SearchItem {
    public constructor(
        private searchLocation: Search,
    ) {super()}

    public getCssColor(): string {
        return "#9c27b0"
    }

    public getParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("locationId", this.searchLocation.elementId.toString());
        return params;
    }

    public get data(): Search {
        return this.searchLocation;
    }
}