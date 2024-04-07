import { ApiFetch } from "../ApiFetch";
import { Language } from "../dto/language";

export async function getLanguages(): Promise<Language[]> {
    return ApiFetch("abeon-languages?currencyId=2&languageName=yachts")
}