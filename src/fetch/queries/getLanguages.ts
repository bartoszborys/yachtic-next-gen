import { Language } from "../dto/language";
import { ProxyYachticFetch } from "../ProxyFetch";

export async function getLanguages(): Promise<Language[]> {
    return ProxyYachticFetch("abeon-languages");
}