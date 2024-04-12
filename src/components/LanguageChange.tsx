"use client"
import { Language } from "@/fetch/dto/language";
import { NextCommand } from "@/fetch/NextFetch";
import { getLanguages } from "@/fetch/queries/getLanguages";
import { locales } from "@/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function LanguageChange() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const locale = useLocale();

    const pathParts = pathname.split("/");
    const languagePart = pathParts[1];
    const [selectedLanguage, setSelectedLanguage] = useState(languagePart);
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        setSelectedLanguage(locale);
    }, [languagePart]);

    useEffect(() => {
        getLanguages().then(result => setLanguages(result));
    }, []);

    const options = locales.map(locale => <option value={locale} key={locale}>{locale}</option>);

    const languageChanged = async (event: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value;

        if(languages.length === 0) {
            return;
        }

        const nextLanguage = languages.find(item => item.name === nextLocale);

        if(!nextLanguage) {
            throw new Error("Language not found");
        }

        const currentLanguage = {
            languageId: nextLanguage.id,
            languageName: nextLanguage.name,
        };

        await NextCommand("language", currentLanguage);

        const pathParts = pathname.split("/");
        if (locales.includes(languagePart)) {
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