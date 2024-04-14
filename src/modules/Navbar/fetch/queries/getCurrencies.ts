import { Currency } from "../dto/currency";
import { ProxyYachticFetch } from "../../../../fetch/ProxyFetch";

export async function getCurrencies(): Promise<Currency[]> {
    return (await ProxyYachticFetch<{models: Currency[]}>("yachts/currencies")).models;
}