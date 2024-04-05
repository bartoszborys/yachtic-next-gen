export interface CountryData {
    id: number;
    name: string;
    regions: CountryRegion[];
}

export interface CountryRegion {
    id: number;
    name: string;
    locations: CountryLocation[],
}

export interface CountryLocation {
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

interface Company {
    id: number;
    name: string;
}

export async function getCountries(): Promise<CountryData[]> {
    return (
        await 
        (
            await fetch(`${process.env.API_URL}/yachts/countries?currencyId=2&languageName=yachts&languageId=2`)
        ).json()
    );
}


export async function getKinds(): Promise<KindData[]> {
    return (
        await 
        (
            await fetch(`${process.env.API_URL}/yachts/kinds`)
        ).json()
    )?.models;
}

export async function getSearches(): Promise<SearchesData[]> {
    return (
        await 
        (
            await fetch(`${process.env.API_URL}/yachts/searches?currencyId=2&languageName=yachts`)
        ).json()
    )?.models;
}

export function getYears(): number[] {
    const currentYear = new Date().getFullYear() + 1;
    const endYear = 2004;
    
    return Array.from({ length: currentYear - endYear }, (_, index) => currentYear - index);
}


export async function getCompanies(): Promise<Company[]> {
    const url = `${process.env.API_URL}/yachts/companies`;
    return (await (await fetch(url)).json()).models;
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