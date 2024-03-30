"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent } from "react";
import { useAppSelector } from "../../../store/hooks";

interface SelectProps {
    options: Array<{
        name: string,
        value: string|number
    }>,
    description: string;
    filterName: keyof SearchState;
}

export default function Select({options, description, filterName}: SelectProps) {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            updateFlag({value: event.target.value, filterName})
        );
    };
    
    return (
        <>
            <span>{description}</span>
            <select value={value.toString()} onChange={onChange} className="border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1">
                <option value={""}>Select</option>
                {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
            </select>
        </>
    );
}