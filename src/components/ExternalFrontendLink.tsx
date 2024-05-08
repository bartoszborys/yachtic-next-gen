'use client'

import "client-only";
import { LanguageKey } from "@/types/LanguageKey";
import { ReactElement } from "react";

export interface ExternalFrontendLinkParams {
    href: string;
    locale: LanguageKey;
    children: ReactElement;
    className?: string;
}

export default function ExternalFrontendLink({href, locale, children, className = ""}: ExternalFrontendLinkParams) {
    const url = `${process.env.EXTERNAL_FRONTEND_URL}${locale !== "en" ? '/' + locale : ""}${href}`;
    return (
        <a className={className + " border !border-red-600"} href={url}>{children}</a>
    );
}