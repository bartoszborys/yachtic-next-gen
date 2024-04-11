import { ApiQuery } from "../ApiFetch";
import { Language } from "../dto/language";

export async function getLanguages(): Promise<Language[]> {
    return ApiQuery("abeon-languages")
}