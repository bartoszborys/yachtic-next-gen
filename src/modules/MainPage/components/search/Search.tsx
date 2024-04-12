'use client'

import { ReactNode, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMostPopularSearches } from "../../fetch/queries/getMostPopularSearches";
import Popper from "@mui/material/Popper";
import { getMultiSearch } from "../../fetch/queries/getMultiSearch";
import { SearchItemAdapter } from "../../adapters/SearchItemAdapter";
import { SearchItemRow } from "./SearchItemRow";
import { SearchItem } from "../../searchItem/SearchItem";
import { addRecentSearch, getRecentSearches } from "../../store/RecentSearches";

interface SearchProps {
  className: string;
  selectSearchItem: (item: SearchItem) => void;
}

export default function Search({className, selectSearchItem}: SearchProps): ReactNode {
    const input = useRef<HTMLInputElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentSearches, setCurrentSearches] = useState(new SearchItemAdapter([]));
    const [mostPopularSearches, setMostPopularSearches] = useState(new SearchItemAdapter([]));
    const [recentSearches, setRecentSearches] = useState(new SearchItemAdapter([]));
    const open = Boolean(anchorEl);
    const id = open ? 'location-picker-pooper' : undefined;

    useEffect(() => {
        setRecentSearches(getRecentSearches());
        (async () => {
            setMostPopularSearches(
                new SearchItemAdapter(
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
      setTimeout(() => setAnchorEl(null), 200);
    }, []);

    const handleInput = useCallback(async (event: SyntheticEvent<HTMLInputElement>) => {
        if(!input.current) {
            return;
        }

        const params = new URLSearchParams();
        params.append("text", input.current.value);
        params.append("quantity", "8");

        setCurrentSearches(
            new SearchItemAdapter(
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
      addRecentSearch(item);
      setRecentSearches(getRecentSearches());
    }, []);

    const popular = useMemo(
        () => mostPopularSearches.asItem.map(
          (search, index) => <SearchItemRow item={search} select={optionSelected} key={index} />
        ),
        [mostPopularSearches]
    );

    const recent = useMemo(
      () => recentSearches.asItem.map(
        (search, index) => <SearchItemRow item={search} select={optionSelected} key={index} />
      ),
      [recentSearches]
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
              <div className="underline text-gray-400 px-2">Recent searches</div>
              {recent}
              <div className="underline text-gray-400 px-2">Most popular searches</div>
              {popular}
            </div>
        </Popper>
      </>
    );
}