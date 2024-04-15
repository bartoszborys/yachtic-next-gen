import { LanguageKey } from "@/types/LanguageKey";

export interface Language {
    id: number;
    name: LanguageKey;
    isDefault: boolean;
}