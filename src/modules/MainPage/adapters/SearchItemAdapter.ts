import { SearchItem } from "../domain/SearchItem/SearchItem";
import SearchLocationFactory from "../factories/SearchLocationFactory";
import Search from "../fetch/dto/SearchLocation";

export class SearchItemAdapter {
    constructor(
        private searchItem: Search[]
    ) {}

    public get asItem(): SearchItem[] {
        return this.searchItem.map(dto => SearchLocationFactory.fromDto(dto));
    }
}