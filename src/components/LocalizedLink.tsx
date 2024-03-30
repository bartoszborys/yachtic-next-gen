import Link from "next/link";
import { ReactNode } from "react";

export interface LocalizedLinkParams {
    href: string;
    locale: string;
    children: ReactNode;
}

export default function LocalizedLink({href, locale, children}: LocalizedLinkParams) {
    return (
        <Link href={`${locale}${href}`} locale={locale}>{children}</Link>
    );
}