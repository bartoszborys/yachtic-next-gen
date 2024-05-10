export default interface YachtPrimaryKey {
    readonly id: string | number;
    readonly date?: string;
    readonly days?: string | number;
    readonly locationFromId?: string | number;
    readonly locationToId?: string | number;
    readonly isNonRefundable?: boolean;
}