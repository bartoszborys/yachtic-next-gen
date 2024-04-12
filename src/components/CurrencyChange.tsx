"use client"

import { Currency } from "@/fetch/dto/currency";
import { NextCommand } from "@/fetch/NextCommand";
import { getCurrencies } from "@/fetch/queries/getCurrencies";
import ActionMenu from "@/modules/YachtsList/components/list-top/ActionMenu";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

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

    
    const languageChanged = async (currencyId: number) => {
        await NextCommand("currency", {currencyId});
        setCurrencyId(currencyId.toString());
    }
    
    const options = currencies.map(currency => <div onClick={() => languageChanged(currency.id)} key={currency.id}>{currency.code}</div>);

    return (
        <>
            <ActionMenu
                zIndex={52}
                button={<div>{currencies.find(item => item.id.toString() === currencyId)?.code || "UNKNOWN"}</div>}
                trigger={"click"}>
                {options}
            </ActionMenu>
        </>
    );
}