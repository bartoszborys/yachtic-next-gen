"use client"
import { Box, Slider, SliderOwnProps } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface FilterRangeSliderProps {
    text: string;
    filterName: [string, string];
}

export default function FilterRangeSlider(
    { text, filterName: [minFilterName, maxFilterName], min = 0, max = 0, ...sliderProps }: FilterRangeSliderProps & SliderOwnProps
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

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            throw new Error("Unhandled state");
        }

        setMin(newValue[0]);
        setMax(newValue[1]);
    };

    const slider = useMemo(() => (
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
            value={[minValue, maxValue]}
            onChange={handleChange}
        />
    ), [minValue, maxValue])

    return (
        <>
            <div className="flex justify-between">
                <span className="text-gray-500">{text}</span>
                <span className="text-gray-500">
                    <span>FROM:</span>
                    <b className="ml-1">{minValue}</b>
                    <span className="ml-1">TO:</span>
                    <b className="ml-1">{maxValue}{maxValue === max ? "+" : ""}</b>
                </span>
            </div>
            <Box className="mx-[9px]">{slider}</Box>
        </>
    )
}