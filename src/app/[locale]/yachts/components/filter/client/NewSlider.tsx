"use client"
import { Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ChangeEvent, useState } from "react";

interface StoreCheckboxProps {
    text: string,
    filterName: keyof SearchState;
}

export default function NewSlider({ text, filterName }: StoreCheckboxProps) {
    const dispatch = useDispatch();
    const [value, setValue] = useState<number[]>([1, 12]);

    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
    };

    const value2 = useAppSelector(selector => selector.search[filterName]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateFlag({ value: event.target.value, filterName })
        );
    };
    
    return (
        <>
            <span>{text}</span>
            <Slider
                value={value}
                onChange={handleChange}
                min={1}
                max={12}
            />
        </>
    )
}