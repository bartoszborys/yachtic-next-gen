interface Yacht {
    id: number;
    discount: number;
    rating: number;
    maxRating: number;
    shouldShowRating: boolean;
    permalink: string;
    date: string;
    days: number;
    image: {
        id: number;
        sysName: string;
        src: string;
        description: string;
        alt: string;
    };
    name: string;
    locationName: string;
    locationId: number;
    year: number;
    length: number;
    berths: number;
    price: {
        finalAmount: number;
        finalCurrencySymbol: string;
        finalCurrencySymbolPosition: number;
        finalCurrencyCode: string;
    };
    type: number;
    kindName: string;
    modelName: string;
}
