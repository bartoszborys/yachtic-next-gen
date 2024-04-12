import Search from "../../fetch/dto/SearchLocation";

export abstract class SearchItem {
    abstract getParams(): URLSearchParams;
    abstract getCssColor(): string;
    abstract get data(): Search;
}