import { MainPrice } from "@/app/[locale]/yachts/types/YachtData";
import { ReactNode } from "react";
import BookedPlaceholder from "./BookedPlaceholder";

export default function MainPriceBox({ price }: { price: MainPrice }): ReactNode {
    const date = [
        price.date.getDay().toString().padStart(2, "0"),
        price.date.getMonth().toString().padStart(2, "0"),
        price.date.getFullYear(),
    ].join(".");

    return (
        <>
            <div className="bg-[#ccc] text-xs p-1 flex justify-between">
                {
                    price.discount
                        ? <span className="mx-1 bg-yellow-400 text-black font-bold px-4">{price.discountName}</span>
                        : <span></span>
                }
                <span className="flex flex-col justify-center">
                    <span>
                        <b>{date}</b>
                        <span className="ml-1">( {price.days} days )</span>
                    </span>
                </span>
            </div>
            {
                price.isBooked
                    ? <BookedPlaceholder />
                    : <div className="bg-[#ebedec] p-2 flex justify-between">
                        {
                            price.discount
                                ? <div className="flex flex-col text-center flex-1">
                                    <s className="text-sm">{price.befoureDiscountAmount} {price.currency}</s>
                                    <div className="font-bold text-xl bg-yellow-400 text-black">-{price.discount}%</div>
                                </div>
                                : <></>
                        }
                        <div className="flex-[2]">
                            <div className="text-2xl font-bold text-[#00a27d]">{price.amount} {price.currency}</div>
                            <div className="text-xs">with fees {price.withFee} {price.currency}</div>
                        </div>
                    </div>
            }
        </>
    );
}