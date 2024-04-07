'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export interface LocalizedLinkParams {
    href: string;
    locale: string;
    children: ReactNode;
}

export default function LocalizedLink({href, locale, children}: LocalizedLinkParams) {
    const search = useSearchParams();
    return (
        <Link href={`${locale}${href}?${search}`} locale={locale}>{children}</Link>
    );
}