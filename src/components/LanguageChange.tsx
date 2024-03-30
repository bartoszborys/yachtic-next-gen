"use client"
import { locales } from "@/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function LanguageChange() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    
    const pathParts = pathname.split("/");
    const languagePart = pathParts[1];
    const [selectedLanguage, setSelectedLanguage] = useState(languagePart);

    useEffect(() => {
        setSelectedLanguage(languagePart);
    }, [languagePart]);

    const options = locales.map(locale => <option value={locale} key={locale}>{locale}</option>);
    
    const languageChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value;

        const pathParts = pathname.split("/");
        if(locales.includes(languagePart)) {
            pathParts[1] = nextLocale;
            router.replace(`${pathParts.join("/")}?${params.toString()}`);
        }
        else {
            router.replace(`${nextLocale}/${pathname}?${params.toString()}`);
        };
    }

    return (
        <>
            <select value={selectedLanguage} onChange={languageChanged}>
                {options}
            </select>
        </>
    );
}