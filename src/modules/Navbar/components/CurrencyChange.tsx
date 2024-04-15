"use client"

import { NextCommand } from "@/fetch/NextCommand";
import ActionMenu from "@/modules/YachtsList/components/list-top/ActionMenu";
import { Currency } from "../fetch/dto/currency";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface LanguageChangeProps {
    currencies: Currency[],
    selected: Currency;
}

export default function LanguageChange({currencies, selected}: LanguageChangeProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    const languageChanged = async (currencyId: number) => {
        await NextCommand("currency", {currencyId});
        startTransition(() => {
            router.refresh();
        })
    }
    
    const options = currencies.map(currency => <div onClick={() => languageChanged(currency.id)} key={currency.id}>{currency.code}</div>);

    return (
        <>
            {isPending ? "TAK" : "NIE"}
            <ActionMenu
                zIndex={52}
                button={<div>{selected.code}</div>}
                trigger={"click"}>
                {options}
            </ActionMenu>
        </>
    );
}