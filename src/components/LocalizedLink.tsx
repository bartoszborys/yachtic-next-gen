'use client';
import getPathnames from "@/getPathnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export interface LocalizedLinkParams {
    href: "/yachts";
    locale: "en" | "pl" | "de";
    children: ReactNode;
}

export default function LocalizedLink({href, locale, children}: LocalizedLinkParams) {
    const search = useSearchParams();
    const pathnames = getPathnames();
    const permalink = pathnames[href][locale];
    return (
        <Link href={`${locale}${permalink}?${search}`} locale={locale}>{children}</Link>
    );
}