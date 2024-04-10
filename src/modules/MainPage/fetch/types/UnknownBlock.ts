import { BlockTypes } from "./BlockTypes";

export type UnknownBlock = {
    type: BlockTypes;
    [key: string]: unknown;
}
