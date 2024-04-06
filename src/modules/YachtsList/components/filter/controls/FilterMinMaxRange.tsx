"use client"
import { ChangeEvent, ReactNode } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface FilterMinMaxRangeProps {
    label: string;
    filterName: [string, string];
    placeholder: [string, string];
}

const className = "border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2";

export default function FilterMinMaxRange({
    label,
    filterName: [minFilterName, maxFilterName],
    placeholder: [minPlaceholder, maxPlaceholder],
}: FilterMinMaxRangeProps): ReactNode {
    const [min, setMin] = useQueryState(
        minFilterName,
        parseAsInteger
            .withOptions(options)
    );

    const [max, setMax] = useQueryState(
        maxFilterName,
        parseAsInteger
            .withOptions(options)
    );

    function onMinChange(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);
        setMin(value ? value : null);
    };

    const onMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setMax(value ? value : null);
    };

    return (
        <>
            <div className="text-gray-500">{label}</div>
            <div className="flex">
                <input
                    className={className}
                    placeholder={minPlaceholder}
                    type="text"
                    pattern="[0-9]*"
                    value={min ?? ''}
                    onChange={onMinChange} />
                <div className="w-12 flex flex-col justify-center text-center">
                    <span>-</span>
                </div>
                <input
                    className={className}
                    placeholder={maxPlaceholder}
                    type="text"
                    pattern="[0-9]*"
                    value={max ?? ''}
                    onChange={onMaxChange}/>
            </div>
        </>
    )
}