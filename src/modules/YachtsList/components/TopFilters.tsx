import { ReactNode } from "react";
import { FilterTile } from "./list-top/FilterTile";
import { ClearAllFilters } from "./list-top/ClearAllFilters";

export function TopFilters({searchParams}: {searchParams: {[key: string]: string}}): ReactNode {
    return (
        <div className="flex flex-col">
            <ClearAllFilters />
            <div className="flex my-2 flex-wrap text-xs">
                {Object.keys(searchParams).map((key) => <FilterTile key={key} name={key}/>)}
            </div>
        </div>
    )
}