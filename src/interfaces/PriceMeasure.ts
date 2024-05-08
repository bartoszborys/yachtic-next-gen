import { PriceMeasureKrnType } from "@/enums/PriceMeasureKrnType";

export default interface PriceMeasure {
    id: number | null;
    krn_type: PriceMeasureKrnType | null;
    name: string;
}