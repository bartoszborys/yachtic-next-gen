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


export default function useQueryStore(
    filterName: string
): UseQueryStateReturn<string, string> {
    const permalinkContext = useContext(PermalinkContext);

    const [value, setValue] = useQueryState(
        filterName,
        parseAsString.withOptions(options).withDefault(permalinkContext?.defaultValue || ""),
    );

    const proxySetValue = useCallback(async <Shallow>(value: string | ((old: string) => string | null) | null, options?: Options<Shallow> | undefined) => {   
        if(typeof value !== "string") {
            return setValue(value, options);
        }
        
        if(permalinkContext && value !== permalinkContext.defaultValue.toString()) {
            permalinkContext.changeCallback(value);
        }

        return setValue(value, options);
    }, []);

    return [value, proxySetValue];
}