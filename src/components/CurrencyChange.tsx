"use client"

import { Currency } from "@/fetch/dto/currency";
import { NextCommand } from "@/fetch/NextFetch";
import { getCurrencies } from "@/fetch/queries/getCurrencies";
import { parseAsString, useQueryState } from "nuqs";
import { ChangeEvent, useEffect, useState } from "react";

export default function LanguageChange() {
    const [currencyId, setCurrencyId] = useQueryState(
        "currencyId", 
        parseAsString
            .withDefault("2")
            .withOptions({shallow: false, clearOnDefault: true})
    );
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        getCurrencies().then(result => setCurrencies(result));
    }, []);

    const options = currencies.map(currency => <option value={currency.id} key={currency.id}>{currency.code}</option>);

    const languageChanged = async (event: ChangeEvent<HTMLSelectElement>) => {
        const currencyId = event.target.value;
        await NextCommand("currency", {currencyId});
        setCurrencyId(currencyId);
    }

    return (
        <>
            <select value={currencyId} onChange={languageChanged}>
                {options}
            </select>
        </>
    );
}