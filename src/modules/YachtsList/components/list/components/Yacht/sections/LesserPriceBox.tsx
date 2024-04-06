import { SubPrice } from "@/modules/YachtsList/types/YachtData";
import { ReactNode } from "react";
import BookedPlaceholder from "./BookedPlaceholder";

export default function SubPriceBox({price, currency}: {price: SubPrice; currency: string;}): ReactNode {
    const date = price.date.getDay().toString().padStart(2, '0') + "." + price.date.getMonth().toString().padStart(2, '0')
    
    return (
        <>
            <div className="bg-[#ccc] text-xs">
                <span>next week</span>
                <span className="ml-1">({date})</span>
            </div>
            {
                price.isBooked
                ? <BookedPlaceholder/>
                : <div className="bg-[#ebedec] flex flex-col">
                      <s className="text-sm text-gray-500">{price.befoureDiscountAmount} {currency}</s>
                      <div className="text-lg font-bold text-[#00a27d]">{price.amount} {currency}</div>
                  </div>
            }
        </>
    );
}