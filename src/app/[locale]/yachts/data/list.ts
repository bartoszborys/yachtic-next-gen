import { API_URL, noCorsFetch } from "@/TmpEnv";
import YachtsData from "../types/ApiYachtData";

export async function getYachts(params: URLSearchParams): Promise<YachtsData[]> {
    const url = `${API_URL}/yachts?currencyId=2&languageName=yachts&languageId=2&currencyId=2&page=2&sort=priceAsc&${params.toString()}`
    //const url = "http://localhost:8080/yachts?currencyId=2&languageName=yachts&languageId=2&currencyId=2&date=2024-04-06&days=7&page=2&sort=priceAsc&kindId=&companyId=&recommendedFirst=false&bathroomsMin=&bathroomsMax=&cabinsMin=&cabinsMax=&headsMin=&headsMax=&berthsMin=&berthsMax=&personsMin=&personsMax=&ratingMin=&yearMin=&priceMin=&priceMax=&lengthMin=&lengthMax=&name=&lowFirstInstallment=false&haveLicense=false&needSkipper=false&hidePinned=false&utm_campaign=&utm_term=&utm_id=&utm_source=&utm_medium=&utm_content=";
    
    return await (await noCorsFetch(url)).json();
}