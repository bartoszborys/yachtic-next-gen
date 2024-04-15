"use client"

import { NextCommand } from "@/fetch/NextCommand";
import ActionMenu from "@/modules/YachtsList/components/list-top/ActionMenu";
import { Currency } from "../../fetch/dto/currency";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { CurrencyTile } from "./CurrencyTile";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

interface LanguageChangeProps {
    currencies: Currency[],
    selected: Currency;
}

export default function LanguageChange({currencies, selected}: LanguageChangeProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    const changeCurrency = async (currencyId: number) => {
        await NextCommand("currency", {currencyId});
        startTransition(() => {
            router.refresh();
        })
    }
    
    const options = useMemo(
        () => currencies.map(currency => <CurrencyTile key={currency.id} currency={currency} onClick={() => changeCurrency(currency.id)} />),
        [currencies],
    );

    return (
        <>
        {
            isPending
            ? <CircularProgress color="inherit" className="mx-5 text-gray-500" variant="indeterminate" size={20} thickness={4} />
            : <ActionMenu
                zIndex={52}
                className="p-2 hover:bg-[#e6f2f9]"
                button={<b className="text-xs text-gray-500 cursor-pointer">{selected.code} ({selected.symbol})</b>}
                trigger={"click"}
                placement="bottom-start">
                {options}
            </ActionMenu>
        }
        </>
    );
}