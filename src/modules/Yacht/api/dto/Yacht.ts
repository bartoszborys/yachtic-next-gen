import { Trip } from "./Trip";
import YachtContentDetials from "./YachtContentDetails";
import YachtContentSearches from "./YachtContentSearches";

export default interface Yacht {
    id: number;
    url: string;
    name: string;
    modelName: string;
    company_id: number;
    location_id: number;
    model_id: number;
    isRecommended: boolean;
    rating: number;
    shouldShowRating: boolean;
    krn_likes_number: number;
    opinionsCount: number;
    finalLocation: {
        id: number;
        name: string;
        url: string;
        latitude: number;
        longitude: number;
    };
    finalRegion: {
        id: number;
        name: string;
        url: string;
    };
    finalCountry: {
        id: number;
        name: string;
        url: string;
    };
    price: {
        yacht_id: number;
        date: string;
        days: number;
        location_from_id: number;
        location_to_id: number;
        basePriceWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        krnPriceWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        bestPriceWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        nonRefundableWithCurrency: unknown;
        krnPriceWithAddonsWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        nonRefundableDiscount: number | null;
        krnPriceDiscount: number;
        availableType: number;
        unavailableType: boolean;
        isFirstMinute: boolean;
        isLastMinute: boolean;
        isDiscount: boolean;
        bestPriceDiscount: number;
        locationFrom: {
            id: number;
            name: string;
            url: string;
            latitude: number;
            longitude: number;
        };
        calculatedInstallments: {
            date: string;
            amountWithCurrency: {
                finalAmount: number;
                finalCurrencySymbol: string;
                finalCurrencySymbolPosition: number;
                finalCurrencyCode: string;
            };
            percentOfTotalAmount: number;
            shouldShowInstallmentPercentOfTotal: boolean;
            number: number;
        }[];
        reservationConfirmationDate: string;
    };
    description: string;
    videoUrl: string;
    mainDescription: string;
    skipperRequirementsDescription: string | null;
    krnRequiredPermissionsDescription: string;
    defaultCheckInTime: string;
    defaultCheckOutTime: string;
    yachtsExtraSkipper: unknown;
    yachtsExtras: {
        yacht_id: number;
        extra_id: number;
        priceWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        pricePerAssignmentWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        price_type: number;
        price_measure_id: number;
        assignment_date_from: string;
        assignment_date_to: string;
        execution_date_from: string;
        execution_date_to: string;
        is_obligatory: boolean;
        payable_on_assignment: boolean;
        included_in_base_price: boolean;
        location_id: number | null;
        extra: {
            id: number;
            type: number;
            highlighted: boolean;
            name: string;
        };
        priceMeasure: {
            id: number;
            krn_type: number;
            name: string;
        };
        canChangeAfterConfirm: boolean;
        encourageBeforePaying: boolean;
    }[];
    yachtsKrnAdditionals: {
        yacht_id: number;
        krn_additional_id: number;
        priceWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        pricePerAssignmentWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
        krnAdditional: {
            id: number;
            price_type: number;
            priceTypePerPersonKind: number;
            price_measure_id: number;
            is_obligatory: boolean;
            payable_on_assignment: boolean;
            included_in_base_price: boolean;
            highlighted: boolean;
            name: string;
            description: string;
            priceMeasure: {
                id: number;
                krn_type: number;
                name: string;
            };
            canChangeAfterConfirm: boolean;
            encourageBeforePaying: boolean;
            assignableMinDaysBeforeSail: number;
        };
    }[];
    usefulInfos: {
        id: number;
        description: string;
    }[];
    extendedInfos: {
        id: number;
        description: string;
    }[];
    trips: Trip[];
    companyName: string;
    krnOpportunity: boolean;
    kindName: string;
    yachtContent: {
        details: YachtContentDetials;
        searches: YachtContentSearches[];
    };
    serviceTypeHasCrew: boolean;
    autoMainImage: {
        id: number;
        sysName: string;
        src: string;
        description: string;
        alt: string;
    };
    recommendedPrice: {
        date: string;
        days: number;
        location_from_id: number;
        krnPriceWithCurrency: {
            finalAmount: number;
            finalCurrencySymbol: string;
            finalCurrencySymbolPosition: number;
            finalCurrencyCode: string;
        };
    };
}
