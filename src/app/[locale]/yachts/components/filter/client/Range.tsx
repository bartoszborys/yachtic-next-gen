"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent } from "react";
import { useAppSelector } from "../../../store/hooks";

interface StoreCheckboxProps {
    text: string,
    filterName: keyof SearchState;
}

export default function Range({ text, filterName }: StoreCheckboxProps) {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateFlag({ value: event.target.value, filterName })
        );
    };

    return (
        <>
            <span>{text}</span>
            <input
                value={value.toString()}
                onChange={onChange}
                min="0"
                max="5"
                className="border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1"
                type="range" />
        </>
    );
}