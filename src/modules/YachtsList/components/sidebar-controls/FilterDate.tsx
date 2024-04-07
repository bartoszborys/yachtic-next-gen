"use client"

import { ChangeEvent, ReactNode } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface FilterDateProps {
    filterName: string;
    defaultValue: string;
}

export default function FilterDate({ filterName, defaultValue }: FilterDateProps): ReactNode {
    const [value, setValue] = useQueryState(
        filterName,
        parseAsString
            .withDefault(defaultValue)
            .withOptions(options)
    );

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
    return (
        <>
            <input value={value} onChange={onChange} className="border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1" type="date" />
        </>
    );
}