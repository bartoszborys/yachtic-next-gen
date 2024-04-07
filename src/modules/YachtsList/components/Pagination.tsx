'use client'
import { Button } from "@mui/material";
import { parseAsInteger, useQueryState } from "nuqs";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { filterDefaults, options } from "../constants/urlQuery";
import { getPages } from "../data/list";
import { apiYachtsListFromFilter } from "../factories/UrlParamsFactory";
import { useSearchParams } from "next/navigation";

export function Pagination(): ReactNode {
    const [previousPage, setPreviousPage] = useState<number | null>(null);
    const [page, setPage] = useQueryState(
        'page',
        parseAsInteger
            .withDefault(filterDefaults.page)
            .withOptions({ ...options, scroll: true })
    );
    const [maxPage, setMaxPage] = useState<number>(1);
    const searchParams = useSearchParams();

    useEffect(() => {
        (async () => {
            const onlyPageChanged = previousPage !== page;

            if (onlyPageChanged) {
                setPreviousPage(page);
                return;
            }

            const search = Object.fromEntries([...searchParams.entries()]);
            const parsedParams = apiYachtsListFromFilter(search);
            const pagination = await getPages(parsedParams);
            setMaxPage(pagination.pages);
        })()
    }, [searchParams]);

    useEffect(() => {
        setPage(1);
    }, [maxPage])

    useEffect(() => {
        (async () => {
            const search = Object.fromEntries([...searchParams.entries()]);
            const parsedParams = apiYachtsListFromFilter(search);
            const pagination = await getPages(parsedParams);
            setMaxPage(pagination.pages);
        })();
    }, [])

    const increment = useCallback(() => {
        if (page >= maxPage) {
            return;
        }
        setPage(page + 1);
    }, [maxPage, page])


    const decrement = useCallback(() => {
        if (page <= 1) {
            return;
        }
        setPage(page - 1);
    }, [maxPage, page])

    return (
        <>
            {
                maxPage === 1
                    ? <></>
                    : <div className="flex justify-center">
                        <Button variant="contained" color="secondary" onClick={decrement}>
                            <span>Previous</span>
                        </Button>
                        <div className="flex flex-col justify-center text-black font-bold text-xs mx-10">Page {page} of {maxPage}</div>
                        <Button variant="contained" color="primary" onClick={increment}>
                            <span>NEXT</span>
                        </Button>
                    </div>
            }
        </>
    )
}