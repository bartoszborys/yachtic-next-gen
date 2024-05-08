import Yacht from "@/modules/Yacht/api/dto/Yacht";
import YachtData, { BookingData, DetailsData, HeaderData, YachtService, YachtServiceOld } from "../interfaces/YachtData";
import PriceInfoDetails from "../interfaces/PriceInfoDetails";
import { YachtServicePriceType } from "@/enums/YachtServicePriceType";
import { YachtServiceType } from "@/enums/YachtServiceType";
import { PriceTypeTypes } from "@/enums/PriceTypeTypes";
import { ExtraType } from "@/enums/ExtraType";
import { PriceMeasureKrnType } from "@/enums/PriceMeasureKrnType";

function getOldServicesFromExtras(yacht: Yacht): YachtServiceOld[] {
    return yacht.yachtsExtras.map(yachtExtra => ({
        canChangeAfterConfirm: yachtExtra.canChangeAfterConfirm,
        encourageBeforePaying: yachtExtra.encourageBeforePaying,
        highlighted: yachtExtra.extra.highlighted,
        includedInBasePrice: yachtExtra.included_in_base_price,
        isObligatory: yachtExtra.is_obligatory,
        description: "",
        name: (() => {
            if (yachtExtra.extra === null) {
                return "";
            }

            return yachtExtra.extra.name;
        })(),
        payableOnAssignment: yachtExtra.payable_on_assignment,
        priceMeasure: yachtExtra.priceMeasure
            ? yachtExtra.priceMeasure
            : null,
        priceType: (() => {
            switch (yachtExtra.price_type) {
                case PriceTypeTypes.perAssignment:
                    return YachtServicePriceType.perAssignment;

                case PriceTypeTypes.perPerson:
                    return YachtServicePriceType.perPerson;

                default:
                    throw new Error(`Unexpected price_type state: '${yachtExtra.price_type}'.`);
            }
        })(),
        priceWithCurrency: yachtExtra.priceWithCurrency,
        showPricePerAssignmentInsteadPrice: false,
        showPricePerAssignmentInsteadPriceInSummary: yachtExtra.payable_on_assignment,
        pricePerAssignmentWithCurrency: yachtExtra.pricePerAssignmentWithCurrency,
        priceMeasurePerAssignment: yachtExtra.priceMeasure,
        priceTypePerAssignment: YachtServicePriceType.perAssignment,
        type: (() => {
            switch (yachtExtra.extra.type) {
                case ExtraType.unknown:
                    return YachtServiceType.unknown;
                case ExtraType.skipper:
                    return YachtServiceType.skipper;
                case ExtraType.deposit:
                    return YachtServiceType.deposit;
                default:
                    return null;
            }
        })(),
        source: yachtExtra,
        assignableMinDaysBeforeSail: 0,
    }))
}

function getOldServicesFromAdditionals(yacht: Yacht): YachtServiceOld[] {
    const priceTypePerPersonKindCrewMember = 0;
    const priceTypePerPersonKindPlaceOnBoat = 1;

    return yacht.yachtsKrnAdditionals.map((yachtKrnAddtional) => ({
        canChangeAfterConfirm: yachtKrnAddtional.krnAdditional.canChangeAfterConfirm,
        encourageBeforePaying: yachtKrnAddtional.krnAdditional.encourageBeforePaying,
        highlighted: yachtKrnAddtional.krnAdditional.highlighted,
        includedInBasePrice: yachtKrnAddtional.krnAdditional.included_in_base_price,
        isObligatory: yachtKrnAddtional.krnAdditional.is_obligatory,
        name: yachtKrnAddtional.krnAdditional ? yachtKrnAddtional.krnAdditional.name : "",
        description: yachtKrnAddtional.krnAdditional ? yachtKrnAddtional.krnAdditional.description : "",
        payableOnAssignment: yachtKrnAddtional.krnAdditional.payable_on_assignment,
        priceMeasure: (() => {
            if (yachtKrnAddtional.krnAdditional && yachtKrnAddtional.krnAdditional.priceMeasure) {
                return yachtKrnAddtional.krnAdditional.priceMeasure;
            }
            return null;
        })(),
        priceType: yachtKrnAddtional.krnAdditional.price_type,
        priceWithCurrency: yachtKrnAddtional.priceWithCurrency,
        showPricePerAssignmentInsteadPrice:
            yachtKrnAddtional.krnAdditional.priceTypePerPersonKind === priceTypePerPersonKindPlaceOnBoat,
        showPricePerAssignmentInsteadPriceInSummary:
            yachtKrnAddtional.krnAdditional.priceTypePerPersonKind === priceTypePerPersonKindPlaceOnBoat,
        pricePerAssignmentWithCurrency: yachtKrnAddtional.pricePerAssignmentWithCurrency,
        priceMeasurePerAssignment: {
            id: null,
            krn_type: PriceMeasureKrnType.perBooking,
            name: "",
        },
        priceTypePerAssignment: YachtServicePriceType.perAssignment,
        type: YachtServiceType.unknown,
        source: yachtKrnAddtional,
        assignableMinDaysBeforeSail: yachtKrnAddtional.krnAdditional.assignableMinDaysBeforeSail,
    }));
}

function getServicesFromExtras(yacht: Yacht): YachtService[] {
    return yacht.yachtsExtras.map(extras => {
        const isFree = extras.priceWithCurrency.finalAmount === 0;
        const isMandatory = extras.is_obligatory && extras.payable_on_assignment && !isFree;
        const isOnSpot = extras.is_obligatory && !extras.payable_on_assignment && !isFree
        const isOptional = !extras.is_obligatory && !isFree

        return {
            amount: extras.priceWithCurrency.finalAmount,
            currencySymbol: extras.priceWithCurrency.finalCurrencySymbol,
            name: extras.extra.name,
            priceMeasure: extras.priceMeasure.name,
            isFree,
            isMandatory,
            isOnSpot,
            isOptional,
        } as YachtService
    })
}

function getServicesFromAdditionals(yacht: Yacht): YachtService[] {
    return yacht.yachtsKrnAdditionals.map(additional => {
        const isFree = additional.priceWithCurrency.finalAmount === 0;
        const isMandatory = additional.krnAdditional.is_obligatory && additional.krnAdditional.payable_on_assignment && !isFree;
        const isOnSpot = additional.krnAdditional.is_obligatory && !additional.krnAdditional.payable_on_assignment && !isFree
        const isOptional = !additional.krnAdditional.is_obligatory && !isFree

        return {
            amount: additional.priceWithCurrency.finalAmount,
            currencySymbol: additional.priceWithCurrency.finalCurrencySymbol,
            name: additional.krnAdditional.name,
            priceMeasure: "per booking",
            isFree,
            isMandatory,
            isOnSpot,
            isOptional,
        } as YachtService
    })
}

function getBooking(yacht: Yacht): BookingData {
    const nonRefundableDetails =
        (yacht.price.nonRefundableWithCurrency)
            ? {
                percentOfTotal: 100,
                days: yacht.price.days,
                displayPrice: yacht.price.nonRefundableWithCurrency,
                discount: yacht.price.nonRefundableDiscount,
                basePrice: yacht.price.basePriceWithCurrency,
                isNonRefundable: true,
            } as PriceInfoDetails
            : null;

    const priceDetails = (!yacht.price.krnPriceDiscount)
        ? {
            percentOfTotal: yacht.price.calculatedInstallments[0].percentOfTotalAmount,
            days: yacht.price.days,
            displayPrice: yacht.price.basePriceWithCurrency,
            discount: null,
            basePrice: null,
            isNonRefundable: false,
        } as PriceInfoDetails
        : {
            percentOfTotal: yacht.price.calculatedInstallments[0].percentOfTotalAmount,
            days: yacht.price.days,
            displayPrice: yacht.price.krnPriceWithCurrency,
            discount: yacht.price.krnPriceDiscount,
            basePrice: yacht.price.basePriceWithCurrency,
            isNonRefundable: false,
        } as PriceInfoDetails;

    const services = [
        ...getServicesFromAdditionals(yacht),
        ...getServicesFromExtras(yacht),
    ]

    const extendedInfos = yacht.extendedInfos;
    const usefulInfos = yacht.usefulInfos;

    return {
        nonRefundableDetails,
        priceDetails,
        services,
        extendedInfos,
        usefulInfos,
    } as const
}

export function fromYachtDto(yacht: Yacht): YachtData {
    const header: HeaderData = {
        yachtId: yacht.id,
        yachtName: yacht.name,
        modelName: yacht.modelName,
        countryName: yacht.finalCountry.name,
        locationName: yacht.finalLocation.name,
        showRating: yacht.shouldShowRating,
        rating: yacht.rating
    };

    const details: DetailsData = {
        content: yacht.yachtContent.details,
        highlights: yacht.yachtContent.searches,
        mainDescription: yacht.mainDescription,
        krnRequiredPermissionsDescription: yacht.krnRequiredPermissionsDescription,
        trips: yacht.trips,
    }

    const booking: BookingData = getBooking(yacht);
    const companyName = yacht.companyName;

    return { header, details, booking, companyName } as const;
}