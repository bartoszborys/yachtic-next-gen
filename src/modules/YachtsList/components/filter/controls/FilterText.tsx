"use client"

import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

type HtmlInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface FilterTextProps {
    filterName: string;
}

export default function FilterText({ filterName, ...props }: FilterTextProps & HtmlInputProps): ReactNode {
    const [value, setValue] = useQueryState(
        filterName,
        parseAsString
            .withOptions(options)
            .withDefault('')
    );

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <>
            <input
                {...props}
                value={value}
                onChange={onChange}
                className="flex-1 border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2"
                type="text" />
        </>
    );
}