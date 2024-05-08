'use client';

import getPathnames from "@/getPathnames";
import { LanguageKey } from "@/types/LanguageKey";
import Link from "next/link";
import { ReactNode } from "react";

export interface LocalizedLinkParams {
    href: string;
    locale: LanguageKey;
    children?: ReactNode;
    search?: URLSearchParams | string;
    className?: string;
}

export default function LocalizedLink({href, locale, children, search = "", className = ""}: LocalizedLinkParams) {
    const searchParams = search ? `?${search.toString()}`: ``;
    const pathnames = getPathnames();
    let permalink = href in pathnames ? pathnames[href][locale] : href;

    if(!permalink.startsWith("/")) {
        permalink = "/" + permalink;
    }

    return (
        <Link className={className} href={`/${locale}${permalink}${searchParams}`} locale={locale}>{children}</Link>
    );
}