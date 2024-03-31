"use client"

import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { addSearchId, removeSearchId } from "../../../store/FilterSlice";
import { SearchesData } from "../../../data/filter";
import { useAppDispatch } from "../../../store/hooks";

export default function FilterSearches({ data }: { data: SearchesData[] }): ReactNode {
    const dispatch = useAppDispatch();
    const serviceIds = useSelector<any, number[]>(state => state.search.searches);

    const list = useMemo(() => {
        return data.map(
            (item: SearchesData) => {
                const borderColor = serviceIds.includes(item.id) ? "border-sky-500" : "hover:border-sky-300";
                const onClick = () => {
                    if (serviceIds.includes(item.id)) {
                        dispatch(removeSearchId(item.id));
                    }
                    else {
                        dispatch(addSearchId(item.id));
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