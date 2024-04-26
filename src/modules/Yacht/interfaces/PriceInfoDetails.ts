import AmountWithCurrency from "@/interfaces/AmountWithCurrency";

export default interface PriceInfoDetails {
    readonly days: number | null;
    readonly basePrice: AmountWithCurrency | null;
    readonly displayPrice: AmountWithCurrency;
    readonly discount: number | null;
    readonly mainText: string;
    readonly percentOfTotal: number | null;
    readonly isNonRefundable: boolean;
}
