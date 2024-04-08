'use client'

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseAsString, useQueryState } from "nuqs";
import { ReactNode, useCallback, useMemo } from "react";
import { options } from "../../constants/urlQuery";

interface FilterTileProps {
    name: string;
}

export function FilterTile({name}: FilterTileProps): ReactNode {
    const [queryParam, setQueryParam] = useQueryState(
        name,
        parseAsString
            .withDefault('')
            .withOptions(options)
    );

    const onClick = useCallback(() => {setQueryParam(null)}, []);
    const tile = useMemo(() => 
        <div className="mr-2 mb-2 ml-0 text-xs cursor-pointer flex" onClick={onClick}>
            <span className="bg-[#e6f2f9] py-1 px-2">{name} : {queryParam}</span>
            <span className="bg-[#ace0f6] hover:bg-[#00a0e3] py-1 px-2 transition-colors duration-300">
                <FontAwesomeIcon icon={faTimes} />
            </span>
    </div>
    , [queryParam]);

    return (
        <>
            {
                (queryParam === null) ? <></> : tile
            } 
        </>
    );
}