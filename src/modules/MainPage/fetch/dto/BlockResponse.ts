import { UnknownBlock } from "../types/UnknownBlock";

export interface BlockResponse {
    description: string;
    id: number;
    showTitle: boolean;
    title: string;
    type: number;
    abeonBlocks: UnknownBlock[];
}