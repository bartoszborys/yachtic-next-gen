'use client'

import { ReactNode, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMostPopularSearches } from "../../fetch/queries/getMostPopularSearches";
import Popper from "@mui/material/Popper";
import { getMultiSearch } from "../../fetch/queries/getMultiSearch";
import { SearchLocationAdapter } from "../../adapters/SearchItemAdapter";
import { SearchItemRow } from "./SearchItemRow";
import { SearchItem } from "../../domain/SearchItem/SearchItem";

interface SearchProps {
  className: string;
  selectSearchItem: (item: SearchItem) => void;
}

export default function Search({className, selectSearchItem}: SearchProps): ReactNode {
    const input = useRef<HTMLInputElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentSearches, setCurrentSearches] = useState(new SearchLocationAdapter([]));
    const [mostPopularSearches, setMostPopularSearches] = useState(new SearchLocationAdapter([]));
    const open = Boolean(anchorEl);
    const id = open ? 'location-picker-pooper' : undefined;

    useEffect(() => {
        (async () => {
            setMostPopularSearches(
                new SearchLocationAdapter(
                    await getMostPopularSearches()
                )
            );
        })()
    }, []);

    const handleFocus = useCallback(() => {
      if (!container.current) {
        return;
      }
      setAnchorEl(container.current);
    }, []);
  
    const handleBlur = useCallback(() => {
      setTimeout(() => setAnchorEl(null), 100);
    }, []);

    const handleInput = useCallback(async (event: SyntheticEvent<HTMLInputElement>) => {
        if(!input.current) {
            return;
        }

        const params = new URLSearchParams();
        params.append("currencyId", "2");
        params.append("text", input.current.value);
        params.append("quantity", "8");

        setCurrentSearches(
            new SearchLocationAdapter(
                await getMultiSearch(params)
            )
        );
    }, []);
  
    const optionSelected = useCallback((item: SearchItem) => {
      if(!input.current) {
        return;
      }
      input.current.value = item.data.name;
      selectSearchItem(item);
    }, []);

    const popular = useMemo(
        () => mostPopularSearches.asItem.map(
          (search, index) => <SearchItemRow item={search} select={optionSelected} key={index} />
        ),
        [mostPopularSearches]
    );

    const currentSearch = useMemo(
        () => currentSearches.asItem.map(
          (search, index) => <SearchItemRow item={search} select={optionSelected} key={index} />
        ),
        [currentSearches]
    );

    return (
      <>
        <div
          className={className}
          ref={container}
          aria-describedby={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}>
          <input placeholder="Country, region, port, operator, yacht..." ref={input} className="w-full p-4 text-black" />
        </div>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start">
            <div className="bg-white shadow-inner flex flex-col text-sm w-[623px] max-w-[100vw]">
              {currentSearch}
              <div className="underline text-gray-400 px-2">Most popular searches</div>
              {popular}
            </div>
        </Popper>
      </>
    );
}