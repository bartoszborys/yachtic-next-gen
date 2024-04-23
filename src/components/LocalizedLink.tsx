'use client';
import getPathnames from "@/getPathnames";
import { LanguageKey } from "@/types/LanguageKey";
import Link from "next/link";
import { ReactNode } from "react";

export interface LocalizedLinkParams {
    href: "/yachts" | string;
    locale: LanguageKey;
    children: ReactNode;
    search?: URLSearchParams;
    className?: string;
}

export default function LocalizedLink({href, locale, children, search, className = ""}: LocalizedLinkParams) {
    const searchParams = search ? `?${search}`: ``;
    const pathnames = getPathnames();
    const permalink = href in pathnames ? pathnames[href][locale] : href;
    return (
        <Link className={className} href={`${locale}${permalink}${searchParams}`} locale={locale}>{children}</Link>
    );
}