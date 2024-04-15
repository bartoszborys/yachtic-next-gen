'use client'

import Image from "next/image";
import { ReactElement } from "react";
import { Language } from "../../fetch/dto/language";

interface LanguageTileProps {
    language: Language;
    onClick: () => void
}

export function LanguageTile({ language, onClick }: LanguageTileProps): ReactElement {
    const languageNames = {
        "en": "ENGLISH",
        "pl": "POLSKI",
        "de": "DEUTSCH",
        "es": "ESPANIOL",
        "fr": "FRANCAIS",
        "it": "ITALIANO",
        "ru": "PYCCKNN",
        "si": "SLOVENSCINA",
        "cz": "CESTINA",
    };

    return (
        <div
            className="p-1 flex text-sm hover:bg-[#00a0e3] hover:text-white text-[#00a0e3] transition-colors duration-200 cursor-pointer"
            onClick={onClick}
            key={language.id}>
            <div className="my-auto mr-2">
                <Image className="border border-gray-400 bg-cover" src={`/flags/${language.name}.svg`} width={25} height={16} alt={`flag-${language.name}`} />
            </div>
            <b className="">{languageNames[language.name]}</b>
        </div>
    );
}