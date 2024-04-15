"use client"

import { NextCommand } from "@/fetch/NextCommand";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionMenu from "@/modules/YachtsList/components/list-top/ActionMenu";
import { Language } from "../../fetch/dto/language";
import { locales } from "@/navigation";
import Image from "next/image";
import { ReactElement, useMemo } from "react";
import { LanguageTile } from "./LanguageTile";

interface LanguageChangeProps {
    selectedLanguage: Language;
    languages: Language[];
}

export default function LanguageChange({ languages, selectedLanguage }: LanguageChangeProps): ReactElement {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const languageChanged = async (nextLanguage: Language) => {
        await NextCommand("language", {
            languageId: nextLanguage.id,
            languageName: nextLanguage.name,
        });

        const pathParts = pathname.split("/");
        const languagePart = pathParts[1];

        if (locales.includes(languagePart)) {
            pathParts[1] = nextLanguage.name;
            router.replace(`${pathParts.join("/")}?${params.toString()}`);
        }
        else {
            router.replace(`${nextLanguage.name}/${pathname}?${params.toString()}`);
        };
    }

    const options = useMemo(
        () => languages.map(language => <LanguageTile key={language.id} language={language} onClick={() => languageChanged(language)} />),
        [languages]
    );

    const button = (
        <div className="p-1 hover:bg-[#e6f2f9]">
            <Image
                className="border border-gray-400 cursor-pointer"
                src={`/flags/${selectedLanguage.name}.svg`}
                width={25}
                height={20}
                alt={`flag-${selectedLanguage.name}`} />
        </div>
    )

    return (
        <ActionMenu
            zIndex={52}
            button={button}
            placement="bottom-start"
            trigger="click">
            {options}
        </ActionMenu>
    );
}