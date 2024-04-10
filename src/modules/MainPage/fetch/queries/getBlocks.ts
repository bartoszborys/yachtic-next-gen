import { ApiFetch } from "../../../../fetch/ApiFetch";
import { BlockResponse } from "../dto/BlockResponse";
import { KnownBlocks } from "../types/KnownBlocks";

export async function getBlocks(): Promise<KnownBlocks> {
    const result = await ApiFetch<BlockResponse>("contents/5?currencyId=2");
    const knownBlocks = {} as KnownBlocks;

    for (const unknowBlock of result.abeonBlocks) {
        if (!(unknowBlock.type in knownBlocks)) {
            knownBlocks[unknowBlock.type] = [];
        }
        knownBlocks[unknowBlock.type].push(<any>unknowBlock);
    }

    return knownBlocks;
}