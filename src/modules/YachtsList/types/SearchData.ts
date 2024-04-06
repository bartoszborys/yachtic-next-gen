export default interface SearchData {
    readonly id: number;
    readonly name: string;
    readonly image: {src: string};
    readonly thumbnailLabel: string | null;
}
