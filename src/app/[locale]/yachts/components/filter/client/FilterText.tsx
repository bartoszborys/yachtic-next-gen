"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { useAppSelector } from "../../../store/hooks";

type HtmlInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface FilterTextProps {
    filterName: keyof SearchState;
}

export default function FilterText({ filterName, ...props }: FilterTextProps & HtmlInputProps): ReactNode {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateFlag({ value: event.target.value, filterName })
        );
    };

    return (
        <>
            <input
                {...props}
                value={value.toString()}
                onChange={onChange}
                className="flex-1 border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2"
                type="text" />
        </>
    );
}