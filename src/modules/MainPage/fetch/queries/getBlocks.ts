import { ApiFetch } from "../../../../fetch/ApiFetch";
import { HomepageTemplate } from "../dto/blocks/HomepageTemplate";
import { MapItem } from "../dto/blocks/MapItem";
import { OpinionItem } from "../dto/blocks/OpinionItem";
import { PopularItem } from "../dto/blocks/PopularItem";
import { SelectYachtItem } from "../dto/blocks/SeletYachtItem";
import { WhyUsItem } from "../dto/blocks/WhyUsItem";

type BlockTypes = "easy-charter-items"
    | "helps-items"
    | "homepage_template"
    | "maps"
    | "opinions-items"
    | "popular-items"
    | "select-yacht-items"
    | "why-us-items";
    
interface BlockResponse {
    description: string;
    id: number;
    showTitle: boolean;
    title: string;
    type: number;
    abeonBlocks: UnknownBlock[];
}

type UnknownBlock = {
    type: BlockTypes;
    [key: string]: unknown;
}

type KnownBlocks = {
    "easy-charter-items": EasyCharterItem[];
    "helps-items": HelpsItem[];
    "homepage_template": HomepageTemplate[];
    "maps": MapItem[];
    "opinions-items": OpinionItem[];
    "popular-items": PopularItem[];
    "select-yacht-items": SelectYachtItem[];
    "why-us-items": WhyUsItem[];
};

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