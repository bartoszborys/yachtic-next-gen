"use client"
import { Language } from "@/fetch/dto/language";
import { getLanguages } from "@/fetch/queries/getLanguages";
import { locales } from "@/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { ChangeEvent, useEffect, useState } from "react";

export default function LanguageChange() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const locale = useLocale();
    const [urlParams, setUrlParams] = useQueryStates({
        languageId: parseAsInteger.withDefault(2),
        languageName: parseAsString.withDefault("en")
    });

    const pathParts = pathname.split("/");
    const languagePart = pathParts[1];
    const [selectedLanguage, setSelectedLanguage] = useState(languagePart);
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        setSelectedLanguage(locale);
        setUrlParamsCallback();
    }, [languagePart]);

    useEffect(() => {
        setUrlParamsCallback();
    }, [languages]);

    useEffect(() => {
        getLanguages().then(result => setLanguages(result));
    }, []);

    const options = locales.map(locale => <option value={locale} key={locale}>{locale}</option>);

    const setUrlParamsCallback = () => {
        if(languages.length === 0) {
            return;
        }

        const nextLanguage = languages.find(item => item.name === locale);

        if(!nextLanguage) {
            throw new Error("Language not found");
        }

        setUrlParams({
            languageId: nextLanguage.id,
            languageName: nextLanguage.name,
        });
    }

    const languageChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value;

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