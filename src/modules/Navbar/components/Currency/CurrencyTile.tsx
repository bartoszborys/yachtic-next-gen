'use client'

import { ReactElement } from "react";
import { Currency } from "../../fetch/dto/currency";

interface CurrencyTileProps {
    currency: Currency;
    onClick?: () => void
}

export function CurrencyTile({ currency, onClick }: CurrencyTileProps): ReactElement {
    return (
        <div
            className="px-2 py-1 flex text-sm hover:bg-[#00a0e3] hover:text-white text-[#00a0e3] transition-colors duration-200 cursor-pointer"
            onClick={onClick}
            key={currency.id}>
            <b className="text-xs">{currency.code} ({currency.symbol})</b>
        </div>
    );
}