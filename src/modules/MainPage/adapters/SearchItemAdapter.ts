import SearchLocationFactory from "../factories/SearchLocationFactory";
import Search from "../fetch/dto/SearchLocation";
import { SearchItem } from "../searchItem/SearchItem";

export class SearchItemAdapter {
    constructor(
        private searchItem: Search[]
    ) {}

    public get asItem(): SearchItem[] {
        return this.searchItem.map(dto => SearchLocationFactory.fromDto(dto));
    }
}