import { Language } from "../dto/language";
import { ProxyYachticFetch } from "../../../../fetch/ProxyFetch";

export async function getLanguages(): Promise<Language[]> {
    return ProxyYachticFetch("abeon-languages");
}