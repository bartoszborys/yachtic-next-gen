import Search from "../../fetch/dto/SearchLocation";
import { SearchItem } from "./SearchItem";

export class SearchModel extends SearchItem {
    public constructor(
        private searchLocation: Search,
    ) {super()}

    public getCssColor(): string {
        return "#2196f3"
    }

    public getParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("modelId", this.searchLocation.elementId.toString());
        return params;
    }

    public get data(): Search {
        return this.searchLocation;
    }
}