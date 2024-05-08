import { RevalidateTime } from "@/fetch/enums/RevalidateTime";
import { ApiQuery } from "../../../../fetch/ApiQuery";
import { BlockResponse } from "../dto/BlockResponse";
import { KnownBlocks } from "../types/KnownBlocks";

export async function getBlocks(): Promise<KnownBlocks> {
    const result = await ApiQuery<BlockResponse>("contents/5", {init: {next: {revalidate: RevalidateTime.DAY}}});
    const knownBlocks = {} as KnownBlocks;

    for (const unknowBlock of result.abeonBlocks) {
        if (!(unknowBlock.type in knownBlocks)) {
            knownBlocks[unknowBlock.type] = [];
        }
        knownBlocks[unknowBlock.type].push(<any>unknowBlock);
    }

    return knownBlocks;
}