import { getYachts } from "../../data/list";
import Yacht from "./components/Yacht/Yacht";
import { fromYachtData } from "../../factories/YachtDetailsFactory";
import { apiYachtsListFromFilter } from "../../factories/UrlParamsFactory";
import { ReactNode } from "react";
import { Skeleton } from "@mui/material";

export default async function List({ searchParams }: { searchParams: { [key: string]: string } }) {
    const params = apiYachtsListFromFilter(searchParams);
    const yachts = await getYachts(params);

    return (
        <>
            {yachts.map((yacht, index) => <Yacht key={yacht.id + "-" + index} data={fromYachtData(yacht)} />)}
        </>
    );
}

export function ListSkeletion(): ReactNode {
    return (
        new Array(20).fill(1).map((item, index) => <Skeleton className="overflow-hidden my-3" height={257} width={939} key={index} variant="rectangular"/>)
    );
}