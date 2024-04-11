import Search from "../../fetch/dto/SearchLocation";
import { SearchItem } from "./SearchItem";

export class SearchYacht extends SearchItem {
    public constructor(
        private searchLocation: Search,
    ) {super()}

    public getCssColor(): string {
        return "#5C0401"
    }

    public getParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("yachtId", this.searchLocation.elementId.toString());
        return params;
    }

    public get data(): Search {
        return this.searchLocation;
    }
}