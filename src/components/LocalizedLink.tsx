'use client';
import getPathnames from "@/getPathnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export interface LocalizedLinkParams {
    href: "/yachts";
    locale: "en" | "pl" | "de";
    children: ReactNode;
    search?: URLSearchParams;
    className?: string;
}

export default function LocalizedLink({href, locale, children, search, className = ""}: LocalizedLinkParams) {
    const searchParams = search ? `?${search}`: ``;
    const pathnames = getPathnames();
    const permalink = pathnames[href][locale];
    return (
        <Link className={className} href={`${locale}${permalink}${searchParams}`} locale={locale}>{children}</Link>
    );
}