export default interface PriceWithCurrency {
    readonly amount: number;
    readonly currencySymbol: string;
    readonly currencyCode: string;
    readonly currencySymbolPosition: PriceWithCurrencyCurrencySymbolPosition;
    readonly isNonRefundable: boolean;
}

export default interface YachtsSearchYachtPrice {
    readonly date: Date;
    readonly days: number;
    readonly locationFromId: number;
    readonly basePriceWithCurrency: PriceWithCurrency;
    readonly priceWithCurrency: PriceWithCurrency;
    readonly priceWithAddonsWithCurrency: PriceWithCurrency;
    readonly priceDiscount: number;
    readonly isFirstMinute: boolean;
    readonly isLastMinute: boolean;
    readonly isDiscount: boolean;
}

export const enum PriceWithCurrencyCurrencySymbolPosition {
    beforeAmount = 1,
    afterAmount = 2,
}