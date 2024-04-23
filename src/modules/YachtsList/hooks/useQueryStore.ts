'use client'

import "client-only";
import { Options, parseAsString, useQueryState, UseQueryStateReturn } from "nuqs";
import { useCallback, useContext } from "react";
import { PermalinkContext } from "../context/PermalinkProvider";

const options: Options = {
    shallow: false,
    clearOnDefault: true,
    throttleMs: 500,
} as const;


export default function useStringQueryStore(
    filterName: string
): UseQueryStateReturn<string, string> {
    const permalinkContext = useContext(PermalinkContext);

    const [value, setValue] = useQueryState(
        filterName,
        parseAsString.withOptions(options).withDefault(permalinkContext?.defaultValue || ""),
    );

    const proxySetValue = useCallback(async <Shallow>(value: string | ((old: string) => string | null) | null, options?: Options<Shallow> | undefined) => {   
        if(!permalinkContext) {
            return setValue(value, options);
        }
        
        if(typeof value !== "string") {
            return setValue(value, options);
        }
        
        if(filterName === permalinkContext?.filterName) {
            return setValue(value, options);
        }

        if(value === permalinkContext.defaultValue.toString()) {
            return setValue(value, options);
        }
        
        permalinkContext.changeCallback(value);
        return new URLSearchParams;
    }, []);

    return [value, proxySetValue];
}