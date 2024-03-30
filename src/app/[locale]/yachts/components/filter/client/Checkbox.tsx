"use client"
import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent } from "react";
import { useAppSelector } from "../../../store/hooks";

interface StoreCheckboxProps {
    text: string,
    filterName: keyof SearchState;
}

export default function Checkbox({text, filterName}: StoreCheckboxProps) {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateFlag({value: event.target.checked, filterName})
        );
    };
    
    return (
        <div className="bg-blue-500 flex my-2 p-2 rounded-md">
            <input value={value.toString()} onChange={onChange} className="w-4 h-5" type="checkbox"/>
            <span className="my-1 ml-2">{text}</span>
        </div>
    );
}