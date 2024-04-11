import { ApiQuery } from "../ApiFetch";
import { KindData } from "../dto/kindData";

export default async function getKinds(): Promise<KindData[]> {
    return (await ApiQuery<{models: KindData[]}>("yachts/kinds")).models;
}