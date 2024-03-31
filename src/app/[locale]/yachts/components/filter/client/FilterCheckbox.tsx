"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ReactNode, SyntheticEvent } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

interface FilterCheckboxProps {
    text: string,
    filterName: keyof SearchState;
}

export default function FilterCheckbox({text, filterName}: FilterCheckboxProps): ReactNode {
    const dispatch = useDispatch();
    const value = useAppSelector(selector => selector.search[filterName]);
    const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        dispatch(
            updateFlag({value: checked, filterName})
        );
    };
    
    return (
        <div className="bg-[#00a0e3] flex my-2 p-2 rounded-md h-[35px]">
            <FormControlLabel
                value={value.toString()}
                onChange={onChange}
                label={<span className="text-xs text-[#e6f2f9]">{text}</span>}
                control={
                    <Checkbox
                        sx={{
                            'color': '#e6f2f9',
                            '&.Mui-checked': {
                              color: "#00a27d",
                            },
                            '&.MuiButtonBase-root svg' : {
                                backgroundColor: "white",
                            }
                        }}
                    />
                }
            />
        </div>
    );
}