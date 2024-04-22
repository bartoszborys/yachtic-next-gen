'use client'

import "client-only";
import { Options, parseAsString, ParserBuilder, useQueryState, UseQueryStateReturn } from "nuqs";
import { useCallback, useContext, useEffect } from "react";
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

    
    if(permalinkContext && filterName === permalinkContext.filterName) {
        const proxySetValue = useCallback(async <Shallow>(value: unknown, options?: Options<Shallow> | undefined) => {            
            if(value !== permalinkContext.defaultValue.toString()) {
                permalinkContext.changeCallback(value);
            }

            return new URLSearchParams;
        }, []);

        const [value, setValue] = useQueryState(
            filterName,
            parseAsString.withOptions(options).withDefault(permalinkContext.defaultValue),
        );

        return [value, proxySetValue];
    }

    return useQueryState(
        filterName,
        parseAsString.withOptions(options).withDefault(""),
    );
}