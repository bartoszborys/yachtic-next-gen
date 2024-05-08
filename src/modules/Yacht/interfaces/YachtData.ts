import { Trip } from "@/modules/Yacht/api/dto/Trip";
import YachtContentDetials from "@/modules/Yacht/api/dto/YachtContentDetails";
import YachtContentSearches from "@/modules/Yacht/api/dto/YachtContentSearches";
import PriceInfoDetails from "./PriceInfoDetails";
import PriceMeasure from "@/interfaces/PriceMeasure";
import AmountWithCurrency from "@/interfaces/AmountWithCurrency";
import { YachtServicePriceType } from "@/enums/YachtServicePriceType";
import { YachtServiceType } from "@/enums/YachtServiceType";

export interface YachtServiceOld {
    readonly priceWithCurrency: AmountWithCurrency;
    readonly priceType: YachtServicePriceType | null;
    readonly includedInBasePrice: boolean;
    readonly payableOnAssignment: boolean;
    readonly isObligatory: boolean;
    readonly highlighted: boolean;
    readonly name: string;
    readonly description: string;
    readonly priceMeasure: PriceMeasure | null;
    readonly canChangeAfterConfirm: boolean;
    readonly encourageBeforePaying: boolean;
    readonly showPricePerAssignmentInsteadPrice: boolean;
    readonly showPricePerAssignmentInsteadPriceInSummary: boolean;
    readonly pricePerAssignmentWithCurrency: AmountWithCurrency;
    readonly priceMeasurePerAssignment: PriceMeasure | null;
    readonly priceTypePerAssignment: YachtServicePriceType | null;
    readonly type: YachtServiceType | null;
    readonly assignableMinDaysBeforeSail: number;
}

export interface YachtService {
    readonly name: string;
    readonly amount: string | number;
    readonly currencySymbol: string;
    readonly priceMeasure: string;
    readonly isFree: boolean;
    readonly isMandatory: boolean;
    readonly isOnSpot: boolean;
    readonly isOptional: boolean;
}

export interface DetailsData {
    readonly content: YachtContentDetials;
    readonly highlights: YachtContentSearches[];
    readonly mainDescription: string;
    readonly krnRequiredPermissionsDescription: string;
    readonly trips: Trip[];
}

export interface HeaderData {
    readonly yachtId: number | string;
    readonly yachtName: string;
    readonly modelName: string;
    readonly countryName: string;
    readonly locationName: string;
    readonly showRating: boolean;
    readonly rating: number;
}

export interface BookingData {
    readonly extendedInfos: {
        id: number;
        description: string;
    }[];
    readonly usefulInfos: {
        id: number;
        description: string;
    }[];
    readonly services: YachtService[];
    readonly nonRefundableDetails: PriceInfoDetails | null;
    readonly priceDetails: PriceInfoDetails;
}

export default interface YachtData {
    readonly header: HeaderData;
    readonly details: DetailsData;
    readonly booking: BookingData;
    readonly companyName: string;
}