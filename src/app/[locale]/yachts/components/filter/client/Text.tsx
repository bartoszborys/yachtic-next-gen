"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent } from "react";
import { useAppSelector } from "../../../store/hooks";

interface StoreTextProps {
    filterName: keyof SearchState;
}

export default function Text({filterName}: StoreTextProps) {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateFlag({value: event.target.value, filterName})
        );
    };
    
    return (
        <>
            <input value={value.toString()} onChange={onChange} className="border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1" type="text"/>
        </>
    );
}