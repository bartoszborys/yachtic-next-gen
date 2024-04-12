import Search from "../../fetch/dto/SearchLocation";
import { SearchItem } from "./SearchItem";

export class SearchCompany extends SearchItem {
    public constructor(
        private searchLocation: Search,
    ) {super()}

    public getCssColor(): string {
        return "#4caf50";
    }

    public getParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("companyId", this.searchLocation.elementId.toString());
        return params;
    }

    public get data(): Search {
        return this.searchLocation;
    }
}