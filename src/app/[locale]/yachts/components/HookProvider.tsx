"use client"

import { Fragment, ReactNode, useEffect } from "react";
import { useAppSelector } from '../store/hooks'
import { yachtsListfromFilter } from '../factories/UrlParamsFactory'
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

let reloadDebounce: NodeJS.Timeout | null = null;

export function HookProvider({children}: any): ReactNode {
    const search = useAppSelector(state => state.search);
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        const params = yachtsListfromFilter(search);

        if(reloadDebounce) {
            clearTimeout(reloadDebounce);
        }

        reloadDebounce = setTimeout(() => {
            router.push(`/${locale}/yachts?${params.toString()}`, { scroll: false });
        }, 2000);

    }, [search]);

    return (<Fragment>{children}</Fragment>)
}