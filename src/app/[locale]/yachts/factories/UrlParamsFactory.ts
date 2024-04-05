import { getInitialState, parseParams, SearchState } from "../store/FilterSlice";

export function yachtsListfromFilter(search: SearchState): URLSearchParams {
    const params = new URLSearchParams();
    const initalState = getInitialState();
        
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

        if(getInitialState()[key] !== value) {
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
        
        if(value instanceof Object) {
            return;
        }

        params.append(key, value);
    });

    return params;
}