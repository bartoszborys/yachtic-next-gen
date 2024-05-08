import { ApiQuery } from "../ApiQuery";
import { SiteSetting } from "../dto/siteSetting";

export async function getSiteSetting(name: string): Promise<SiteSetting> {
    const result = (await ApiQuery<SiteSetting[]>("settings/settings")).find(item => item.name === name);
    if(!result) {
        throw new Error(`"${name}" not found in siteSetting`)
    }
    return result;
}