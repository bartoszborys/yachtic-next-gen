import PriceWithCurrency from "../types/PriceData";
import UnavailableData from "../types/UnavailableData";
import YachtsData from "../types/ApiYachtData";
import { DiscountName, YachtData } from "../types/YachtData";

export function fromYachtData(data: YachtsData): YachtData {
    const getDiscountName = (price: PriceWithCurrency & UnavailableData): DiscountName => {
        if(price.isFirstMinute) {
            return "FIRST MINUTE";
        }
        if(price.isLastMinute) {
            return "LAST MINUTE";
        }
        if(price.isDiscount) {
            return "DISCOUNT";
        }
        return null;
    }

    return {
        image: {
            firstInstallmentPercentOfTotal: data.firstInstallmentPercentOfTotal,
            isOpportunity: data.isOpportunity,
            isRecommended: data.isRecommended,
            mainImageUrl: data.mainImage.src,
            shouldShowFirstInstallmentPercentOfTotal: data.shouldShowFirstInstallmentPercentOfTotal,
        },
        header: {
            id: data.id,
            locationUrl: data.url,
            yachtName: data.name,
            modelName: data.modelName,
            countryName: data.finalCountry.name,
            locationName: data.finalLocation.name,
            opinionsCount: data.opinionsCount,
            rating: data.rating,
            showRating: data.shouldShowRating,
        },
        details: {
            berths: data.berths,
            cabins: data.cabins,
            length: data.length,
            baths: data.bathrooms ?? 0,
            built: data.year ?? 0,
            operator: data.company.name,
            operatorUrl: data.company.url,
            searches: data.searches.map(item => ({id: item.id, src: item.image.src})),
        },
        price: {
            main: {
                isBooked: 'unavailableType' in data.price,
                date: new Date(data.price.date),
                days: data.price.days,
                amount: data.price?.priceWithCurrency?.amount.toString() ?? null,
                withFee: data.price?.priceWithAddonsWithCurrency?.amount.toString() ?? null,
                discountName: getDiscountName(data.price),
                discount: data.price?.priceDiscount ?? null,
                befoureDiscountAmount: data.price?.basePriceWithCurrency?.amount.toString() ?? null,
                currency: data.price?.priceWithCurrency?.currencySymbol ?? null,
            },
            leftBottom: {
                isBooked: 'unavailableType' in data.nextNextPrice,
                date: new Date(data.nextPrice.date),
                amount: data.nextPrice?.priceWithCurrency?.amount.toString() ?? null,
                befoureDiscountAmount: data.nextPrice   ?.basePriceWithCurrency?.amount.toString() ?? null,
            },
            rightBottom: {
                isBooked: 'unavailableType' in data.nextNextPrice,
                date: new Date(data.nextNextPrice.date),
                amount: data.nextNextPrice?.priceWithCurrency?.amount.toString() ?? null,
                befoureDiscountAmount: data.nextNextPrice?.basePriceWithCurrency?.amount.toString() ?? null,
            }
        }
    }
}