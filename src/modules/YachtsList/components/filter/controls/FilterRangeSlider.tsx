"use client"
import { Box, Slider, SliderOwnProps } from "@mui/material";
import { ReactNode, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface FilterRangeSliderProps {
    text: string;
    filterName: [string, string];
}

export default function FilterRangeSlider(
    {text, filterName: [minFilterName, maxFilterName], min = 0, max = 0, ...sliderProps}: FilterRangeSliderProps & SliderOwnProps
): ReactNode {
    const [minValue, setMin] = useQueryState(
        minFilterName,
        parseAsInteger
            .withDefault(min)
            .withOptions(options)
    );

    const [maxValue, setMax] = useQueryState(
        maxFilterName,
        parseAsInteger
            .withDefault(max)
            .withOptions(options)
    );

    const [value, setValue] = useState([minValue, maxValue]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            throw new Error("Unhandled state");
        }

        setMin(newValue[0] !== min ? newValue[0] : null);
        setMax(newValue[1] !== max ? newValue[1] : null);
        setValue([newValue[0], newValue[1]]);      
    };

    return (
        <>
            <div className="flex justify-between">
                <span className="text-gray-500">{text}</span>
                <span className="text-gray-500">
                    <span>FROM:</span>
                    <b className="ml-1">{value[0]}</b>
                    <span className="ml-1">TO:</span>
                    <b className="ml-1">{value[1]}{value[1] === max ? "+" : ""}</b>
                </span>
            </div>
            <Box className="mx-[9px]">
                <Slider
                    {...sliderProps}
                    min={min}
                    max={max}
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