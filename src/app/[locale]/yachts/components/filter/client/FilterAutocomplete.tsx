"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { SyntheticEvent, useMemo, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Autocomplete } from "@mui/material";

interface Option  {
    name: string;
    value: string | number;
}
interface SelectProps {
    options: {
        name: string;
        value: string | number;
    }[],
    filterName: keyof SearchState;
}

export default function FilterAutocomplete({options, filterName}: SelectProps) {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const filteredOptions = useMemo(
        () => options.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase())),
        [inputValue]
    )

    const onChange = (event: SyntheticEvent<Element, Event>, value: Option | null) => {
        if(!value) {
            return;
        }

        dispatch(
            updateFlag({value: value.value, filterName})
        );
    };

    return (
        <>
            <Autocomplete
                options={filteredOptions}
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
                        placeholder="Any..."
                        type="text"
                        className="flex-1 border-solid border-2 bg-[#e6f2f9] p-1 rounded my-1 py-2" />
                    </div>
                )}
            />
        </>
    );
}