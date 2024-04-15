"use client"

import { NextCommand } from "@/fetch/NextCommand";
import { locales } from "@/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionMenu from "@/modules/YachtsList/components/list-top/ActionMenu";
import { Language } from "../fetch/dto/language";

interface LanguageChangeProps {
    selectedLanguage: string;
    languages: Language[];
}

export default function LanguageChange({languages, selectedLanguage}: LanguageChangeProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const pathParts = pathname.split("/");
    const languagePart = pathParts[1];

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