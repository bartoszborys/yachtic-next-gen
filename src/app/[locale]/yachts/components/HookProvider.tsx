"use client"

import { ReactNode, useEffect } from "react";
import { useAppSelector } from '../store/hooks'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { yachtsListfromFilter } from '../factories/UrlParamsFactory'

let loadTimeout: null | NodeJS.Timeout = null;

export function HookProvider({children}: any): ReactNode {
    const search = useAppSelector(state => state.search);
    const router = useRouter();
    const locale = useLocale();
  
    useEffect(() => {
        if (loadTimeout) {
            clearTimeout(loadTimeout);
        }
  
        loadTimeout = setTimeout(() => {
            const params = yachtsListfromFilter(search);
            router.push(`/${locale}/yachts?${params.toString()}`, { scroll: false });
        }, 10);
    }, [search]);

    return (<div className="bg-red">{children}</div>)
}