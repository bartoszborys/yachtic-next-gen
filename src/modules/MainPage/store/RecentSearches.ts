'use client'

import { SearchItemAdapter } from "../adapters/SearchItemAdapter";
import { SearchItem } from "../domain/SearchItem/SearchItem";
import Search from "../fetch/dto/SearchLocation";

export function getRecentSearches(): SearchItemAdapter {
    const items: Search[] = JSON.parse(localStorage.getItem("recent-searches") || "[]");
    return new SearchItemAdapter(items);
}

export function addRecentSearch(item: SearchItem): void {
    const current = getRecentSearches().asItem.map(item => item.data);

    if(current.length > 4) {
        current.shift();
    }

    current.push(item.data)

    localStorage.setItem("recent-searches", JSON.stringify(current));
}