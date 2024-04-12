
import { SearchCompany } from "../domain/SearchItem/SearchCompany";
import { SearchCountry } from "../domain/SearchItem/SearchCountry";
import { SearchItem } from "../domain/SearchItem/SearchItem";
import { SearchLocation } from "../domain/SearchItem/SearchLocation";
import { SearchModel } from "../domain/SearchItem/SearchModel";
import { SearchRegion } from "../domain/SearchItem/SearchRegion";
import { SearchYacht } from "../domain/SearchItem/SearchYacht";
import Search from "../fetch/dto/SearchLocation";


function fromDto(from: Search): SearchItem {
    switch(from.elementType) {
        case "country": return new SearchCountry(from);
        case "region": return new SearchRegion(from);
        case "company": return new SearchCompany(from);
        case "location": return new SearchLocation(from);
        case "model": return new SearchModel(from);
        case "yachts": return new SearchYacht(from);
        default: throw new Error(`Unknown type ${from.elementType}`);
    }
}

const SearchLocationFactory = {fromDto}; 

export default SearchLocationFactory;