export default interface AbeonContent {
    id: number;
    title: string;
    description: string;
    type: number;
    abeonBlocks?: Array<{
        type: string;
        order: number;
        text: {
            type: string;
            content: string;
        }
    }>
}

