export type DiscountName = "DISCOUNT" | "LAST MINUTE" | "FIRST MINUTE" | null;

export interface YachtHeaderDetails {
    id: number,
    locationUrl: string;
    yachtName: string;
    modelName: string;
    countryName: string;
    locationName: string;
    opinionsCount: number;
    rating: number;
    showRating: boolean;
}

export interface YachtDetails {
    berths: number;
    cabins: number;
    length: number;
    baths: number;
    built: number;
    operator: string;
    operatorUrl: string;    
    searches: Array<{id: number, src: string}>
}

export interface MainPrice {
    isBooked: boolean;
    date: Date;
    days: number;
    amount: string;
    withFee: string;
    discountName: DiscountName;
    discount: number | null;
    befoureDiscountAmount: string | null;
    currency: string;
}

export interface SubPrice {
    isBooked: boolean;
    date: Date;
    amount: string;
    befoureDiscountAmount: string | null;
}

export interface PriceData {
    main: MainPrice;
    leftBottom: SubPrice;
    rightBottom: SubPrice;
}

export interface ImageData {
    isRecommended: boolean;
    isOpportunity: boolean;
    shouldShowFirstInstallmentPercentOfTotal: boolean;
    firstInstallmentPercentOfTotal: number;
    mainImageUrl: string;
}

export interface YachtData {
    image: ImageData;
    header: YachtHeaderDetails;
    details: YachtDetails;
    price: PriceData;
}