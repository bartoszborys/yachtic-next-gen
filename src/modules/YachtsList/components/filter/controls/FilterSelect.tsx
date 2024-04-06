"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent, ReactNode } from "react";
import { useAppSelector } from "../../../store/hooks";

interface FilterSelectProps {
    options: Array<{
        name: string,
        value: string | number
    }>,
    description: string;
    filterName: keyof SearchState;
    placeholder: string;
}

export default function FilterSelect({ options, description, filterName, placeholder }: FilterSelectProps): ReactNode {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            updateFlag({ value: event.target.value, filterName })
        );
    };

    return (
        <>
            <span className="text-gray-500">{description}</span>
            <select value={value.toString()} onChange={onChange} className="flex-1 border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2">
                <option  value={""}>{placeholder}</option>
                {options.map(option => <option className="text-green" key={option.value} value={option.value}>{option.name}</option>)}
            </select>
        </>
    );
}