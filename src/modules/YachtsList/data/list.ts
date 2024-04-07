import YachtsData from "../types/ApiYachtData";

interface YachtListsQueryParams {
    currencyId: number;
    languageName: string;
    languageId: number;
    date: string;
    days: number;
    page: number;
    sort: string;
    // countries[0][id]: 59
    // countries[0][regions][0][id]: 152
    // countries[0][regions][1][id]: 86
    // countries[0][regions][2][id]: 89
    // countries[0][regions][3][id]: 44
    // searches[0][id]: 5
    // searches[1][id]: 8
    // searches[2][id]: 17
    // searches[3][id]: 20
    // searches[4][id]: 32
    // searches[5][id]: 35
    kindId: number;
    companyId: number;
    recommendedFirst: boolean;
    bathroomsMin: number;
    bathroomsMax: number;
    cabinsMin: number;
    cabinsMax: number;
    headsMin: number;
    headsMax: number;
    berthsMin: number;
    berthsMax: number;
    personsMin: number;
    personsMax: number;
    ratingMin: number;
    yearMin: number;
    priceMin: number;
    priceMax: number;
    lengthMin: number;
    lengthMax: number;
    name: string;
    lowFirstInstallment: boolean;
    haveLicense: boolean;
    needSkipper: boolean;
    hidePinned: boolean;
    utm_campaign: string; 
    utm_term: string; 
    utm_id: string; 
    utm_source: string;
    utm_medium: string; 
    utm_content: string;
}

export async function getYachts(params: URLSearchParams): Promise<YachtsData[]> {
    const url = `${process.env.API_URL}/yachts?currencyId=2&languageName=yachts&languageId=2&currencyId=2&${params.toString()}`
    //const url = "http://localhost:8080/yachts?currencyId=2&languageName=yachts&languageId=2&currencyId=2&date=2024-04-06&days=7&page=2&sort=priceAsc&kindId=&companyId=&recommendedFirst=false&bathroomsMin=&bathroomsMax=&cabinsMin=&cabinsMax=&headsMin=&headsMax=&berthsMin=&berthsMax=&personsMin=&personsMax=&ratingMin=&yearMin=&priceMin=&priceMax=&lengthMin=&lengthMax=&name=&lowFirstInstallment=false&haveLicense=false&needSkipper=false&hidePinned=false&utm_campaign=&utm_term=&utm_id=&utm_source=&utm_medium=&utm_content=";
    return await (await fetch(url)).json();
}