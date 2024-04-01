"use client"

import { useDispatch } from "react-redux";
import { SearchState, updateFlag } from "../../../store/FilterSlice";
import { ReactNode, SyntheticEvent } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
                        checkedIcon={(
                            <div className="flex flex-col justify-center bg-[#00a27d] border border-white text-white w-[22px] h-[22px] text-center rounded">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                        icon={(
                            <div className="flex flex-col justify-center bg-white border border-white text-white w-[22px] h-[22px] text-center rounded" />
                        )}
                    />
                }
            />
        </div>
    );
}