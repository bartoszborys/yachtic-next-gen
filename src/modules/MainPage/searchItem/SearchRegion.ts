import Search from "../../fetch/dto/SearchLocation";
import { SearchItem } from "./SearchItem";

export class SearchRegion extends SearchItem {
    public constructor(
        private searchLocation: Search,
    ) {super()}

    public getCssColor(): string {
        return "#e91e63";
    }

    public getParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("regionId", this.searchLocation.elementId.toString());
        return params;
    }

    public get data(): Search {
        return this.searchLocation;
    }
}