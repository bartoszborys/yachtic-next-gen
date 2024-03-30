"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent } from "react";
import { useAppSelector } from "../../../store/hooks";

interface StoreCheckboxProps {
    text: string,
    filterName: keyof SearchState;
}

export default function Date({text, filterName}: StoreCheckboxProps) {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateFlag({value: event.target.value, filterName})
        );
    };
    
    return (
        <>
            <span>{text}</span>
            <input value={value.toString()} onChange={onChange} className="border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1" type="date" />
        </>
    );
}