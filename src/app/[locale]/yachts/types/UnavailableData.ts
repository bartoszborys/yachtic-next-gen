export default interface UnavailableData {
    readonly date: Date;
    readonly days: number;
    readonly locationFromId: number;
    readonly unavailableType: YachtsSearchYachtUnavailablePriceUnavailableTypes;
}

export const enum YachtsSearchYachtUnavailablePriceUnavailableTypes {
    temporary = 1,
    permanently = 2,
}