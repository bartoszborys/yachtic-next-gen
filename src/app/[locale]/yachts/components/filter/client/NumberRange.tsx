"use client"

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent } from "react";

interface StoreTextProps {
    label: string;
    filterName: [keyof SearchState, keyof SearchState];
    placeholder: [string, string];
}

const className = "border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2";

export default function MinMaxRangeNumber({
    label,
    filterName: [minFilterName, maxFilterName],
    placeholder: [minPlaceholder, maxPlaceholder],
}: StoreTextProps) {
    const dispatch = useAppDispatch();

    const minValue = useAppSelector(selector => selector.search[minFilterName]);
    const maxValue = useAppSelector(selector => selector.search[maxFilterName]);

    const onMinChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFlag({ value: event.target.value, filterName: minFilterName }));
    };

    const onMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFlag({ value: event.target.value, filterName: maxFilterName }));
    };

    return (
        <>
            <div className="text-gray-500">{label}</div>
            <div className="flex">
                <input placeholder={minPlaceholder} value={minValue.toString()} onChange={onMinChange} className={className} />
                <div className="w-12 flex flex-col justify-center text-center">
                    <span>-</span>
                </div>
                <input placeholder={maxPlaceholder} value={maxValue.toString()} onChange={onMaxChange} className={className} type="text" />
            </div>
        </>
    )
}