import PriceInfoDetails from "../../interfaces/PriceInfoDetails"

interface PriceInfoProps {
    readonly details: PriceInfoDetails;
    readonly className?: string;
}

export default function PriceInfo({details, className = ""}: PriceInfoProps) {
    return (
        <section className={className + " text-secondary"}>
            <div className="flex justify-between">
                <p>{details.percentOfTotal}% prepayment</p>
                <s>{details.basePrice?.finalAmount} {details.basePrice?.finalCurrencySymbol}</s>
            </div>
            <div className="flex justify-end">
                <b className="bg-warning text-black p-1">-{details.discount}%</b>
            </div>
            <div className="flex justify-end text-success text-3xl">
                <b>{details.displayPrice.finalAmount} {details.displayPrice.finalCurrencySymbol}</b>
            </div>
            <div className="flex justify-end ">
                <p>Price for {details.days} days</p>
            </div>
            <button className="bg-success text-white font-bold w-full p-4 my-2">PRE-BOOK NOW {">>"}</button>
        </section>
    )
}