"use client"

import { SearchState } from "../../types/SearchState";
import { ReactNode, SyntheticEvent, useMemo, useState } from "react";
import { Autocomplete } from "@mui/material";
import { parseAsString, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface Option  {
    name: string;
    value: string;
}

interface FilterAutocompleteProps {
    placeholder: string;
    autocompleteOptions: Option[],
    filterName: keyof SearchState;
}

export default function FilterAutocomplete({autocompleteOptions, filterName, placeholder}: FilterAutocompleteProps): ReactNode {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useQueryState(
        filterName,
        parseAsString
            .withOptions(options)
            .withDefault('')
    );

    const filteredOptions = useMemo(
        () => autocompleteOptions.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase())),
        [inputValue]
    )

    const onChange = (event: SyntheticEvent<Element, Event>, value: Option | null) => {
        if(!value) {
            return;
        }

        setValue(value.value)
    };

    return (
        <>
            <Autocomplete
                options={autocompleteOptions}
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.value}
                onChange={onChange}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderOption={(props, option, { selected }) => {
                    return (<li key={option.value} {...props} className={props.className + " even:bg-[#e6f2f9]"}>{option.name}</li>)
                }}
                renderInput={(params) => (
                    <div className="flex" ref={params.InputProps.ref}>
                      <input 
                        {...params.inputProps}
                        placeholder={placeholder}
                        type="text"
                        className="flex-1 border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2" />
                    </div>
                )}
            />
        </>
    );
}