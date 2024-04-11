'use client'

import { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "./search/Search";
import { SearchItem } from "../domain/SearchItem/SearchItem";
import { KindData } from "@/fetch/dto/kindData";
import getKinds from "@/fetch/queries/getKinds";
import LocalizedLink from "@/components/LocalizedLink";

export function SearchControls({locale}: {locale: string}): ReactNode {
    const [selected, setSelected] = useState<SearchItem | null>(null);
    const [kinds, setKindData] = useState<KindData[]>([]);

    useEffect(() => {
        (async () => setKindData(await getKinds()))();
    }, []);
    
    return (
        <div className="flex gap-5 my-6 flex-col lg:flex-row">
            <div className="flex-[5] w-full flex">
                <Search selectSearchItem={setSelected} className="w-full flex"/>
            </div>
            <div className="flex-[5] w-full flex gap-8">
                <input className="flex-1 rounded p-4 text-gray-400" type="date" />
                <select className="flex-1 rounded p-4 text-gray-400">
                    <option defaultValue={''}>Select Boats</option>
                    {kinds.map(kind => (<option key={kind.id} value={kind.id}>{kind.name}</option>))}    
                </select>
            </div>
            <LocalizedLink className="flex-[2] flex" href="/yachts" locale={locale as any} search={selected?.getParams()}>                
                <span className="bg-[#00a27d] flex text-center border-white border-2 rounded font-bold text-lg cursor-pointer">
                    <FontAwesomeIcon className="my-auto ml-2" icon={faSearch} />
                    <span className="my-auto mx-4">SEARCH</span>
                </span>
            </LocalizedLink>
        </div>
    );
}