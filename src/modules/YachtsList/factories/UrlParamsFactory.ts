import { filterDefaults } from "../constants/urlQuery";
import { SearchState } from "../types/SearchState";

export function yachtsListfromFilter(search: SearchState): URLSearchParams {
    const params = new URLSearchParams();

    Object.entries(search).forEach(([key, value]) => {
        if(value instanceof Array) {
            value.forEach((item, index) => {
                params.append(`${key}[${index}][id]`, item.toString());
            });
            return;
        }
        
        if(value instanceof Object) {
            return;
        }

        //@ts-ignore
        if(filterDefaults[key] !== value) {
            params.append(key, value);
        }
    });

    return params;
}

export function apiYachtsListFromFilter(search: {[key: string]: string;}): URLSearchParams {
    const storeValues = parseParams(search);
    const params = new URLSearchParams();
        
    Object.entries(storeValues).forEach(([key, value]) => {
        if(value instanceof Array) {
            value.forEach((item, index) => {
                params.append(`${key}[${index}][id]`, item.toString());
            });
            return;
        }
        params.append(key, value);
    });

    return params;
}

function parseParams(params: { [key: string]: string }): SearchState {
    const payload = { ...params };
    // @ts-ignore
    const state: SearchState = Object.assign({...filterDefaults}, payload);
  
    if (payload.searches) {
      state.searches = payload.searches.split(",").filter((item: string) => item).map((item: string) => parseInt(item));
    }
  
    return state;
  }