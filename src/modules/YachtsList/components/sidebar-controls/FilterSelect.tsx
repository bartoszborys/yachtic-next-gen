"use client"

import { ChangeEvent, ReactNode } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface FilterSelectProps {
    selectOptions: Array<{name: string, value: string}>,
    description: string;
    filterName: string;
    placeholder: string;
}

export default function FilterSelect({ selectOptions, description, filterName, placeholder }: FilterSelectProps): ReactNode {
    const [value, setValue] = useQueryState(
        filterName,
        parseAsString
            .withDefault('')
            .withOptions(options)
    );
    
    const onChange = (event: ChangeEvent<HTMLSelectElement>) => setValue(event.target.value);

    return (
        <>
            <span className="text-gray-500">{description}</span>
            <select value={value} onChange={onChange} className="flex-1 border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2">
                <option value={""}>{placeholder}</option>
                {selectOptions.map(option => <option className="text-green" key={option.value} value={option.value}>{option.name}</option>)}
            </select>
        </>
    );
}