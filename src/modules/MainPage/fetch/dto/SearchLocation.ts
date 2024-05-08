export default interface Search {
    countryId: number | null;
    regionId: number | null;
    name: string;
    elementType: "country" | "region" | "company" | "location" | "yachts" | "model";
    elementId: number;
}