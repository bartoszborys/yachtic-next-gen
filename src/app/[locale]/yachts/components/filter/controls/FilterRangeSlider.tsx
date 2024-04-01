"use client"
import { Box, Slider, SliderOwnProps } from "@mui/material";
import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ReactNode, useState } from "react";

interface FilterRangeSliderProps {
    text: string,
    filterName: [keyof SearchState, keyof SearchState];
}

export default function FilterRangeSlider(
    { text, filterName: [minFilterName, maxFilterName], ...sliderProps }: FilterRangeSliderProps & SliderOwnProps
): ReactNode {
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([sliderProps.min || 0, sliderProps.max || 0]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            throw new Error("Unhandled state");
        }

        setValue(newValue as [number, number]);
        dispatch(updateFlag({ value: newValue[0], filterName: minFilterName }));
        dispatch(updateFlag({ value: newValue[1], filterName: maxFilterName }));
    };

    return (
        <>
            <div className="flex justify-between">
                <span className="text-gray-500">{text}</span>
                <span className="text-gray-500">
                    <span>FROM:</span>
                    <b className="ml-1">{value[0]}{value[0] === sliderProps.max ? "+" : ""}</b>
                    <span className="ml-1">TO:</span>
                    <b className="ml-1">{value[1]}{value[1] === sliderProps.max ? "+" : ""}</b>
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
                    value={value}
                    onChange={handleChange}
                />
            </Box>
        </>
    )
}