import { SiteSetting } from "../dto/siteSetting";

async function getSiteSettings(): Promise<SiteSetting[]> {
    return (await fetch("http://localhost:8080/settings/settings?currencyId=2&languageId=2")).json();
}

export async function getSiteSetting(name: string): Promise<SiteSetting> {
    const result = (await getSiteSettings()).find(item => item.name === name);
    if(!result) {
        throw new Error(`"${name}" not found in siteSetting`)
    }
    return result;
}