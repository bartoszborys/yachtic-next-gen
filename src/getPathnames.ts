import { LanguageKey, LanguagePath } from "./types/LanguageKey";

export default function getPathnames(): {[key: string]: LanguagePath} {
    return {
        "/yachts": {
          en: "/yachts",
          pl: "/jachty",
          de: "/yachten",
          cz: "/yachts",
          es: "/yachts",
          fr: "/yachts",
          it: "/yachts",
          ru: "/yachts",
          si: "/yachts",
        },
      };
}