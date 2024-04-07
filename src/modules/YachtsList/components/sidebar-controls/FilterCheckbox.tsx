"use client"

import { ReactNode, SyntheticEvent } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { parseAsBoolean, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface FilterCheckboxProps {
    text: string,
    filterName: string;
}

export default function FilterCheckbox({text, filterName}: FilterCheckboxProps): ReactNode {
    const [value, setValue] = useQueryState(
        filterName,
        parseAsBoolean
            .withDefault(false)
            .withOptions(options)
    );
    const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        setValue(checked);
    };
    
    return (
        <div className="bg-[#00a0e3] flex my-2 p-2 rounded-md h-[35px]">
            <FormControlLabel
                onChange={onChange}
                label={<span className="text-xs text-[#e6f2f9]">{text}</span>}
                control={
                    <Checkbox
                        checked={value}
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