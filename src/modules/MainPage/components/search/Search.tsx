'use client'

import { ReactNode, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMostPopularSearches } from "../../fetch/queries/getMostPopularSearches";
import { getMultiSearch } from "../../fetch/queries/getMultiSearch";
import { SearchItemAdapter } from "../../adapters/SearchItemAdapter";
import { SearchItemRow } from "./SearchItemRow";
import { addRecentSearch, getRecentSearches } from "../../store/RecentSearches";
import { SearchItem } from "../../domain/SearchItem/SearchItem";
import { FocusMenu } from "./FocuseMenu";

interface SearchProps {
  className: string;
  selectSearchItem: (item: SearchItem) => void;
}

export default function Search({ className, selectSearchItem }: SearchProps): ReactNode {
  const input = useRef<HTMLInputElement>(null);
  const [currentSearches, setCurrentSearches] = useState(new SearchItemAdapter([]));
  const [mostPopularSearches, setMostPopularSearches] = useState(new SearchItemAdapter([]));
  const [recentSearches, setRecentSearches] = useState(new SearchItemAdapter([]));

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

  const handleInput = useCallback(async (event: SyntheticEvent<HTMLInputElement>) => {
    if (!input.current) {
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
    if (!input.current) {
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

  const pooper = (
    <div className="bg-white shadow-inner flex flex-col text-sm w-[623px] max-w-[100vw]">
      {currentSearch}
      <div className="underline text-gray-400 px-2">Recent searches</div>
      {recent}
      <div className="underline text-gray-400 px-2">Most popular searches</div>
      {popular}
    </div>
  )

  return (
    <>
      <FocusMenu className={className} popper={pooper}>
        <input
          className="w-full p-4 text-black"
          placeholder="Country, region, port, operator, yacht..." 
          onInput={handleInput}
          ref={input}/>
      </FocusMenu>
    </>
  );
}