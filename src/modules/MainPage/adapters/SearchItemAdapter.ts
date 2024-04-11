import SearchLocationFactory from "../factories/SearchLocationFactory";
import Search from "../fetch/dto/SearchLocation";
import { SearchItem } from "../domain/SearchItem/SearchItem";

export class SearchLocationAdapter {
    constructor(
        private searchItem: Search[]
    ) {}

    public get asItem(): SearchItem[] {
        return this.searchItem.map(dto => SearchLocationFactory.fromDto(dto));
    }
}