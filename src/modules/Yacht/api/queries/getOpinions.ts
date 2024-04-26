import { ApiQuery } from "@/fetch/ApiQuery";
import Opinion from "../dto/Opinion";

export default async function getOpinions(id: string | number): Promise<Opinion[]> {
    const params = new URLSearchParams;
    params.append("yachtId", id.toString());
    return (await ApiQuery<ModelReviewResponse<Opinion>>("opinions", {params})).models;
}