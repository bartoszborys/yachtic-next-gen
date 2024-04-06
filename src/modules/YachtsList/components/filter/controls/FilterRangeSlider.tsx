"use client"
import { Box, Slider, SliderOwnProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ReactNode, useState } from "react";
import { useAppSelector } from "@/modules/YachtsList/store/hooks";

interface FilterRangeSliderProps {
    text: string,
    filterName: [keyof SearchState, keyof SearchState];
}

export default function FilterRangeSlider(
    { text, filterName: [minFilterName, maxFilterName], ...sliderProps }: FilterRangeSliderProps & SliderOwnProps
): ReactNode {
    const dispatch = useDispatch();
    const [min, max] = useAppSelector(selector => [parseInt(selector.search[minFilterName]), parseInt(selector.search[maxFilterName])]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            throw new Error("Unhandled state");
        }

        dispatch(updateFlag({ value: newValue[0], filterName: minFilterName }));
        dispatch(updateFlag({ value: newValue[1], filterName: maxFilterName }));
    };

    return (
        <>
            <div className="flex justify-between">
                <span className="text-gray-500">{text}</span>
                <span className="text-gray-500">
                    <span>FROM:</span>
                    <b className="ml-1">{min}{min === sliderProps.max ? "+" : ""}</b>
                    <span className="ml-1">TO:</span>
                    <b className="ml-1">{max}{max === sliderProps.max ? "+" : ""}</b>
                </span>
            </div>
            <Box className="mx-[9px]">
                <Slider
                    {...sliderProps}
                    sx={{
                        'color': '#ace0f6',
                        'height': '8px',
                        '& .MuiSlider-thumb': {
                            borderRadius: '2px',
                            width: '14px',
                            color: '#00a0e3',
                        },
                    }}
                    value={storePair}
                    onChange={handleChange}
                />
            </Box>
        </>
    )
}