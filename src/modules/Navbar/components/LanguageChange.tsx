"use client"
import { Language } from "@/fetch/dto/language";
import { NextCommand } from "@/fetch/NextCommand";
import { getLanguages } from "@/fetch/queries/getLanguages";
import { locales } from "@/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ActionMenu from "@/modules/YachtsList/components/list-top/ActionMenu";
import { useLocale } from "next-intl";

export default function LanguageChange() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

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

    const languageChanged = async (nextLocale: string) => {
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

    const options = locales.map(locale => <div onClick={() => languageChanged(locale)} key={locale}>{locale}</div>);

    return (
        <>
            <ActionMenu
                zIndex={52}
                button={<div>{selectedLanguage}</div>}
                trigger={"click"}>
                {options}
            </ActionMenu>
        </>
    );
}