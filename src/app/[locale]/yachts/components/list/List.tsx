"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getYachts } from "../../data/list";
import YachtsData from "../../types/ApiYachtData";
import Yacht from "./components/Yacht/Yacht";
import { useAppSelector } from "../../store/hooks";
import { fromYachtData } from "../../factories/YachtDetailsFactory";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faShareAlt } from "@fortawesome/free-solid-svg-icons";

let loadTimeout: null | NodeJS.Timeout = null;

export default function List() {
    const [yachts, setYachts] = useState<YachtsData[]>([]);
    const search = useAppSelector(state => state.search);
    const router = useRouter();

    useEffect(() => {
        if(loadTimeout) {
            clearTimeout(loadTimeout);
        }

        loadTimeout = setTimeout(() => {
            const params = new URLSearchParams();
        
            Object.entries(search).forEach(([key, value]) => {
                if(value instanceof Array) {
                    if(value.length === 0) {
                        return;
                    }
                }
    
                if(value) {
                    params.append(key, value);
                }
            }); 
            
            router.push(`/yachts?${params.toString()}`, {scroll: false});
    
            (async () => {
                try {
                    setYachts(await getYachts(params));
                    console.log(yachts.map(yacht => fromYachtData(yacht)));
                }
                catch {
                    setYachts([]);
                }
            })()
        }, 10);
    }, [search]);

    return (
        <>
            <div className="w-100 h-[86px] text-xs p-4 bg-white font-bold text-gray-500">FILTERS (REMOVE ALL FILTERS)</div>
            <div className="w-100 my-2 flex justify-end text-xs font-bold">
                <div className="bg-white mr-4 p-2 flex transition-shadow duration-300 hover:shadow-xl cursor-pointer">
                    <FontAwesomeIcon className="font-normal text-lg mr-2 text-cyan-500" icon={faShareAlt}/>
                    <span>SHARE WITH FRIENDS</span>
                </div>
                <div className="bg-white p-2 transition-shadow duration-300 hover:shadow-xl cursor-pointer">
                    <span className="font-normal text-gray-500">PRICE:</span>
                    <span>LOWEST FIRST</span>
                </div>
            </div>
            <div className="d-flex flex-col">
                {yachts.map((yacht, index) => <Yacht key={yacht.id + "-" + index} data={fromYachtData(yacht)}/>)}
            </div>
        </>
    );
}