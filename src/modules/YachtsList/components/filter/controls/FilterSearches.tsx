"use client"

import { ReactNode, useCallback, useMemo } from "react";
import { SearchesData } from "../../../data/filter";
import { options } from "@/modules/YachtsList/constants/urlQuery";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";

interface FilterSearchesProps {
    data: SearchesData[];
}

export default function FilterSearches({ data }: FilterSearchesProps): ReactNode {
    const [serviceIds, setServiceIds] = useQueryState(
        "searches",
        parseAsArrayOf(parseAsInteger)
            .withOptions(options)
            .withDefault([])
    );

    const list = useMemo(() => {
        return data.map(
            (item: SearchesData) => {
                const borderColor = serviceIds.includes(item.id) ? "border-sky-500" : "hover:border-sky-300";
                const onClick = () => {
                    if (!serviceIds.includes(item.id)) {
                        const newServiceIds = [...serviceIds, item.id];
                        setServiceIds(newServiceIds.length ? newServiceIds : null);
                    }
                    else {
                        const newServiceIds = serviceIds.filter(id => id !== item.id);
                        setServiceIds(newServiceIds.length ? newServiceIds : null);
                    }
                };
                return <img
                    key={item.id}
                    onClick={onClick}
                    className={"cursor-pointer w-8 h-8 rounded bg-[#e6f2f9] my-1 p-1 border-2 " + borderColor}
                    alt=""
                    src={item.image.src}
                />
            }
        );
    }, [data, serviceIds]);
    
    return (
        <>
            <div className="grid grid-cols-5">
                {list}
            </div>
        </>
    );
}