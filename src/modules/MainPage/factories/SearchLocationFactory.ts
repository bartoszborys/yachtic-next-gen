
import Search from "../fetch/dto/SearchLocation";
import { SearchCompany } from "../searchItem/SearchCompany";
import { SearchCountry } from "../searchItem/SearchCountry";
import { SearchItem } from "../searchItem/SearchItem";
import { SearchLocation } from "../searchItem/SearchLocation";
import { SearchModel } from "../searchItem/SearchModel";
import { SearchRegion } from "../searchItem/SearchRegion";
import { SearchYacht } from "../searchItem/SearchYacht";

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