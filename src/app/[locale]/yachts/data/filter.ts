interface CountryData {
    id: number;
    name: string;
}

interface KindData {
    id: number;
    name: string;
}

export interface SearchesData {
    id: number;
    name: string;
    image: {src: string}
}

export async function getCountries(): Promise<CountryData[]> {
    return (
        await 
        (
            await fetch('http://localhost:8080/yachts/countries?currencyId=2&languageName=yachts&languageId=2')
        ).json()
    );
}


export async function getKinds(): Promise<KindData[]> {
    return (
        await 
        (
            await fetch('http://localhost:8080/yachts/kinds')
        ).json()
    )?.models;
}

export async function getSearches(): Promise<SearchesData[]> {
    return (
        await 
        (
            await fetch('http://localhost:8080/yachts/searches?currencyId=2&languageName=yachts')
        ).json()
    )?.models;
}

export function getYears(): number[] {
    const currentYear = new Date().getFullYear() + 1;
    const endYear = 2004;
    
    return Array.from({ length: currentYear - endYear }, (_, index) => currentYear - index);
}

export const rates = [
    {
        id: 4,
        name: "**",
    },
    {
        id: 6,
        name: "***",
    },
    {
        id: 8,
        name: "****",
    },
    {
        id: 10,
        name: "*****",
    },
].reverse();